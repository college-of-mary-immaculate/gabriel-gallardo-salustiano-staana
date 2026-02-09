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
      const [results] = await this.masterDB.execute("INSERT INTO Vote (candidateId, userId) VALUES (?, ?)", [
        candidateId,
        userId,
      ]);
      return results;
    } catch (error) {
      console.error("<error> vote.create", error);
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
      const [existing] = await connection.execute(
        `SELECT candidateId FROM Vote WHERE userId=? AND candidateId IN (${placeholders})`,
        [userId, ...candidateIds],
      );

      if (existing.length > 0) {
        throw new Error(`Already voted for some candidates`);
      }

      for (const vote of votes) {
        await connection.execute("INSERT INTO Vote (candidateId, userId) VALUES (?, ?)", [vote.candidateId, userId]);
      }

      await connection.commit();
      return { affectedRows: votes.length };
    } catch (error) {
      console.error("<error> vote.createBatch", error);
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async getVoteCounts(electionId) {
    try {
      const [results] = await this.slaveDB.execute(
        `SELECT v.candidateId, COUNT(*) as voteCount
        FROM Vote v
        INNER JOIN Candidate c ON c.candidateId = v.candidateId
        WHERE c.electionId = ?
        GROUP BY v.candidateId`,
        [electionId],
      );
      return results.map((row) => ({
        candidateId: row.candidateId,
        voteCount: Number(row.voteCount),
      }));
    } catch (error) {
      console.error("<error> vote.getVoteCounts", error);
      throw error;
    }
  }

  async hasVoted(candidateId, userId) {
    try {
      const [results] = await this.slaveDB.execute("SELECT * FROM Vote WHERE candidateId=? AND userId=?", [candidateId, userId]);
      return results.length > 0;
    } catch (error) {
      console.error("<error> vote.hasVoted", error);
      throw error;
    }
  }

  async hasVotedInElection(electionId, userId) {
    try {
      const [results] = await this.slaveDB.execute(
        `SELECT 1 FROM Vote v
        INNER JOIN Candidate c ON c.candidateId = v.candidateId
        WHERE c.electionId = ? AND v.userId = ?
        LIMIT 1`,
        [electionId, userId],
      );
      return results.length > 0;
    } catch (error) {
      console.error("<error> vote.hasVotedInElection", error);
      throw error;
    }
  }
}

export default Vote;
