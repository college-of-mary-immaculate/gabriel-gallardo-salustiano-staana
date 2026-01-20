// backend/src/models/vote.js
import { masterConnection, slaveConnection } from "../core/database.js";

class Vote {
  constructor() {
    this.masterDB = masterConnection;
    this.slaveDB = slaveConnection;
  }

  async create(electionId, positionId, candidateId, userId) {
    const [existing] = await this.slaveDB.execute("SELECT * FROM Vote WHERE electionId=? AND positionId=? AND userId=?", [electionId, positionId, userId]);
    if (existing.length > 0) throw new Error("Already voted.");
    const [results] = await this.masterDB.execute("INSERT INTO Vote (electionId, positionId, candidateId, userId) VALUES (?, ?, ?, ?)", [
      electionId,
      positionId,
      candidateId,
      userId,
    ]);
    return results;
  }

  async createBatch(electionId, userId, votes) {
    // votes = [{ positionId, candidateId }, { positionId, candidateId }, ...]
    const connection = await this.masterDB.getConnection();
    try {
      await connection.beginTransaction();

      const positionIds = votes.map((v) => v.positionId);
      const placeholders = positionIds.map(() => "?").join(",");
      const [existing] = await connection.execute(
        `SELECT positionId FROM Vote 
         WHERE electionId=? AND userId=? AND positionId IN (${placeholders})`,
        [electionId, userId, ...positionIds],
      );

      if (existing.length > 0) {
        const votedPositions = existing.map((e) => e.positionId).join(", ");
        throw new Error(`Already voted for position(s): ${votedPositions}`);
      }

      // for multiple inserts, execute individually or use a different approach pa
      for (const vote of votes) {
        await connection.execute("INSERT INTO Vote (electionId, positionId, candidateId, userId) VALUES (?, ?, ?, ?)", [electionId, vote.positionId, vote.candidateId, userId]);
      }

      await connection.commit();
      return { affectedRows: votes.length };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async tally(electionId) {
    const [results] = await this.slaveDB.execute(
      `SELECT 
          v.positionId, v.candidateId, COUNT(*) as voteCount, c.fullname as candidateName, p.fullname as positionName
        FROM Vote v
        INNER JOIN Candidate c ON c.candidateId = v.candidateId
        INNER JOIN Position p ON p.positionId = v.positionId
        WHERE v.electionId = ?
        GROUP BY v.positionId, v.candidateId
        ORDER BY v.positionId, voteCount DESC`,
      [electionId],
    );
    // get total votes per position
    const [totals] = await this.slaveDB.execute(
      `SELECT positionId, COUNT(*) as totalVotes
        FROM Vote
        WHERE electionId = ?
        GROUP BY positionId`,
      [electionId],
    );
    const totalsByPosition = Object.fromEntries(totals.map((t) => [t.positionId, t.totalVotes]));
    return results.map((row) => ({
      ...row,
      voteCount: Number(row.voteCount),
      votePercentage: totalsByPosition[row.positionId] > 0 ? (row.voteCount / totalsByPosition[row.positionId]) * 100 : 0,
    }));
  }

  // get vote count/percentage for just one candidate in election
  async getByCandidate(electionId, candidateId) {
    const [result] = await this.slaveDB.execute(
      `SELECT 
          v.positionId, v.candidateId, COUNT(*) as voteCount, c.fullname as candidateName, p.fullname as positionName
        FROM Vote v
        INNER JOIN Candidate c ON c.candidateId = v.candidateId
        INNER JOIN Position p ON p.positionId = v.positionId
        WHERE v.electionId = ? AND v.candidateId = ?
        GROUP BY v.positionId, v.candidateId
        ORDER BY voteCount DESC`,
      [electionId, candidateId],
    );
    if (!result.length) return null;
    const [total] = await this.slaveDB.execute(`SELECT COUNT(*) as totalVotes FROM Vote WHERE electionId = ? AND positionId = ?`, [electionId, result[0].positionId]);
    return {
      ...result[0],
      voteCount: Number(result[0].voteCount),
      votePercentage: total[0].totalVotes > 0 ? (result[0].voteCount / total[0].totalVotes) * 100 : 0,
    };
  }

  async hasVoted(electionId, positionId, userId) {
    const [results] = await this.slaveDB.execute("SELECT * FROM Vote WHERE electionId=? AND positionId=? AND userId=?", [electionId, positionId, userId]);
    return results.length > 0;
  }

  async hasVotedAll(electionId, userId) {
    const [results] = await this.slaveDB.execute("SELECT COUNT(*) as count FROM Vote WHERE electionId=? AND userId=?", [electionId, userId]);
    return results[0].count > 0;
  }
}

export default Vote;
