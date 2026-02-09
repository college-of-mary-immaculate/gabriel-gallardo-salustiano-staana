// backend/src/models/candidate.js
import { masterConnection, slaveConnection } from "../core/database.js";

class Candidate {
  constructor() {
    this.masterDB = masterConnection;
    this.slaveDB = slaveConnection;
  }

  async createBatch(electionId, position, candidates) {
    try {
      let affectedRows = 0;

      for (const cand of candidates) {
        const [results] = await this.masterDB.execute(
          `INSERT INTO Candidate
         (electionId, position, fullname, description, imageUrl, isCurrent)
         VALUES (?, ?, ?, ?, ?, ?)`,
          [electionId, position, cand.fullname, cand.description || "", cand.imageUrl || "", cand.isCurrent ?? true],
        );

        affectedRows += results.affectedRows;
      }

      return { affectedRows };
    } catch (error) {
      console.error("<error> candidate.createBatch", error);
      throw error;
    }
  }

  async create(electionId, position, fullname, description, imageUrl, isCurrent = true) {
    try {
      const [results] = await this.masterDB.execute(
        `INSERT INTO Candidate
       (electionId, position, fullname, description, imageUrl, isCurrent)
       VALUES (?, ?, ?, ?, ?, ?)`,
        [electionId, position, fullname, description || "", imageUrl || "", isCurrent],
      );
      return results;
    } catch (error) {
      console.error("<error> candidate.create", error);
      throw error;
    }
  }

  async getCurrent() {
    try {
      const [results] = await this.slaveDB.execute(
        `SELECT candidateId, electionId, position, fullname, description, imageUrl, isCurrent
        FROM Candidate
        WHERE isCurrent = ?`,
        [true],
      );
      return results;
    } catch (error) {
      console.error("<error> candidate.getCurrent", error);
      throw error;
    }
  }

  async getByElection(electionId) {
    try {
      const [results] = await this.slaveDB.execute(
        `SELECT candidateId, electionId, position, fullname, description, imageUrl, isCurrent
        FROM Candidate
        WHERE electionId = ?`,
        [electionId],
      );
      return results;
    } catch (error) {
      console.error("<error> candidate.getByElection", error);
      throw error;
    }
  }

  async getById(candidateId) {
    try {
      const [results] = await this.slaveDB.execute("SELECT * FROM Candidate WHERE candidateId = ?", [candidateId]);
      return results[0] || null;
    } catch (error) {
      console.error("<error> candidate.getById", error);
      throw error;
    }
  }

  async update(candidateId, fullname, description, imageUrl) {
    try {
      const [results] = await this.masterDB.execute(
        "UPDATE Candidate SET fullname=?, description=?, imageUrl=? WHERE candidateId = ?",
        [fullname, description, imageUrl, candidateId],
      );
      return results;
    } catch (error) {
      console.error("<error> candidate.update", error);
      throw error;
    }
  }

  async markNotCurrent(electionId) {
    try {
      const [results] = await this.masterDB.execute(
        `UPDATE Candidate SET isCurrent = false WHERE electionId = ?`,
        [electionId],
      );
      return results;
    } catch (error) {
      console.error("<error> candidate.markNotCurrent", error);
      throw error;
    }
  }

  async delete(candidateId) {
    try {
      const [results] = await this.masterDB.execute("DELETE FROM Candidate WHERE candidateId = ?", [candidateId]);
      return results;
    } catch (error) {
      console.error("<error> candidate.delete", error);
      throw error;
    }
  }
}

export default Candidate;
