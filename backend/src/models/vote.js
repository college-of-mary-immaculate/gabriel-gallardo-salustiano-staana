// backend/src/models/vote.js
import { masterConnection, slaveConnection } from "../core/database.js";

class Vote {
  constructor() {
    this.masterDB = masterConnection;
    this.slaveDB = slaveConnection;
  }

  async create(candidateId, userId) {
    try {
      const [existing] = await this.slaveDB.execute("SELECT * FROM Vote WHERE candidateId=? AND userId=?", [candidateId, userId]);
      if (existing.length > 0) throw new Error("Already voted for this candidate.");
      const [results] = await this.masterDB.execute("INSERT INTO Vote (candidateId, userId) VALUES (?, ?)", [candidateId, userId]);
      return results;
    } catch (error) {
      console.error("<e> vote.create", error);
      throw error;
    }
  }

  async createBatch(userId, votes) {
    // votes = [{ candidateId }, { candidateId }, ...]
    const connection = await this.masterDB.getConnection();
    try {
      await connection.beginTransaction();

      const candidateIds = votes.map((v) => v.candidateId);
      const placeholders = candidateIds.map(() => "?").join(",");
      const [existing] = await connection.execute(`SELECT candidateId FROM Vote WHERE userId=? AND candidateId IN (${placeholders})`, [userId, ...candidateIds]);

      if (existing.length > 0) {
        throw new Error(`Already voted for some candidates`);
      }

      for (const vote of votes) {
        await connection.execute("INSERT INTO Vote (candidateId, userId) VALUES (?, ?)", [vote.candidateId, userId]);
      }

      await connection.commit();
      return { affectedRows: votes.length };
    } catch (error) {
      console.error("<e> vote.createBatch", error);
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async tally(electionId) {
    try {
      const [results] = await this.slaveDB.execute(
        `SELECT 
          cand.positionId, v.candidateId, COUNT(*) as voteCount, cand.fullname as candidateName, p.name as positionName
        FROM Vote v
        INNER JOIN Candidate cand ON cand.candidateId = v.candidateId
        INNER JOIN Position p ON p.positionId = cand.positionId
        WHERE p.electionId = ?
        GROUP BY cand.positionId, v.candidateId
        ORDER BY cand.positionId, voteCount DESC`,
        [electionId],
      );
      const [totals] = await this.slaveDB.execute(
        `SELECT cand.positionId, COUNT(*) as totalVotes
        FROM Vote v
        INNER JOIN Candidate cand ON cand.candidateId = v.candidateId
        INNER JOIN Position p ON p.positionId = cand.positionId
        WHERE p.electionId = ?
        GROUP BY cand.positionId`,
        [electionId],
      );
      const totalsByPosition = Object.fromEntries(totals.map((t) => [t.positionId, t.totalVotes]));
      return results.map((row) => ({
        ...row,
        voteCount: Number(row.voteCount),
        votePercentage: totalsByPosition[row.positionId] > 0 ? (row.voteCount / totalsByPosition[row.positionId]) * 100 : 0,
      }));
    } catch (error) {
      console.error("<e> vote.tally", error);
      throw error;
    }
  }

  async getByCandidate(electionId, candidateId) {
    try {
      const [result] = await this.slaveDB.execute(
        `SELECT 
          cand.positionId, v.candidateId, COUNT(*) as voteCount, cand.fullname as candidateName, p.name as positionName
        FROM Vote v
        INNER JOIN Candidate cand ON cand.candidateId = v.candidateId
        INNER JOIN Position p ON p.positionId = cand.positionId
        WHERE p.electionId = ? AND v.candidateId = ?
        GROUP BY cand.positionId, v.candidateId
        ORDER BY voteCount DESC`,
        [electionId, candidateId],
      );
      if (!result.length) return null;
      const [total] = await this.slaveDB.execute(
        `SELECT COUNT(*) as totalVotes 
        FROM Vote v
        INNER JOIN Candidate cand ON cand.candidateId = v.candidateId
        WHERE cand.positionId = ?`,
        [result[0].positionId],
      );
      return {
        ...result[0],
        voteCount: Number(result[0].voteCount),
        votePercentage: total[0].totalVotes > 0 ? (result[0].voteCount / total[0].totalVotes) * 100 : 0,
      };
    } catch (error) {
      console.error("<e> vote.getByCandidate", error);
      throw error;
    }
  }

  async hasVoted(candidateId, userId) {
    try {
      const [results] = await this.slaveDB.execute("SELECT * FROM Vote WHERE candidateId=? AND userId=?", [candidateId, userId]);
      return results.length > 0;
    } catch (error) {
      console.error("<e> vote.hasVoted", error);
      throw error;
    }
  }

  async hasVotedForPosition(positionId, userId) {
    try {
      const [results] = await this.slaveDB.execute(
        `SELECT * FROM Vote v
        INNER JOIN Candidate cand ON cand.candidateId = v.candidateId
        WHERE cand.positionId = ? AND v.userId = ?`,
        [positionId, userId],
      );
      return results.length > 0;
    } catch (error) {
      console.error("<e> vote.hasVotedForPosition", error);
      throw error;
    }
  }
}

export default Vote;
