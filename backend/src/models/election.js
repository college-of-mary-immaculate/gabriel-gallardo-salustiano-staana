// backend/src/models/election.js
import { masterConnection, slaveConnection } from "../core/database.js";

class Election {
  constructor() {
    this.masterDB = masterConnection;
    this.slaveDB = slaveConnection;
  }

  async create(title, startTime, endTime) {
    try {
      const [results] = await this.masterDB.execute("INSERT INTO Election (title, startTime, endTime, status) VALUES (?, ?, ?, 'active')", [title, startTime, endTime]);
      return results;
    } catch (error) {
      console.error("<e> election.create", error);
      throw error;
    }
  }

  async getCurrent() {
    try {
      const [results] = await this.slaveDB.execute("SELECT * FROM Election WHERE status = 'active' LIMIT 1", []);
      return results?.[0];
    } catch (error) {
      console.error("<e> election.getCurrent", error);
      throw error;
    }
  }

  async getHistory() {
    try {
      const [results] = await this.slaveDB.execute("SELECT * FROM Election ORDER BY startTime DESC", []);
      return results;
    } catch (error) {
      console.error("<e> election.getHistory", error);
      throw error;
    }
  }

  async getLastElection(offset) {
    try {
      const [result] = await this.slaveDB.execute(`SELECT * FROM Election ORDER BY startTime DESC LIMIT 1 OFFSET ${offset}`);
      return result?.[0];
    } catch (error) {
      console.error("<e> election.getLastElection", error);
      throw error;
    }
  }

  async getWinners(electionId) {
    try {
      const [results] = await this.slaveDB.execute(
        `SELECT 
        cand.positionId,
        v.candidateId,
        COUNT(*) as voteCount,
        cand.fullname as candidateName,
        p.name as positionName
        FROM Vote v
        INNER JOIN Candidate cand ON cand.candidateId = v.candidateId
        INNER JOIN Position p ON p.positionId = cand.positionId
        WHERE p.electionId = ?
        GROUP BY cand.positionId, v.candidateId
        ORDER BY cand.positionId, voteCount DESC
        `,
        [electionId],
      );

      const winners = [];
      const positionMap = new Map();

      for (const row of results) {
        if (!positionMap.has(row.positionId)) {
          positionMap.set(row.positionId, row);
          winners.push({
            positionId: row.positionId,
            positionName: row.positionName,
            candidateId: row.candidateId,
            candidateName: row.candidateName,
            voteCount: Number(row.voteCount),
          });
        }
      }

      return winners;
    } catch (error) {
      console.error("<e> election.getWinners", error);
      throw error;
    }
  }

  async end(electionId) {
    try {
      const [result] = await this.masterDB.execute("UPDATE Election SET status='ended' WHERE electionId=?", [electionId]);
      return result;
    } catch (error) {
      console.error("<e> election.end", error);
      throw error;
    }
  }
}

export default Election;
