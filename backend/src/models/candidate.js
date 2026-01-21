// backend/src/models/candidate.js
import { masterConnection, slaveConnection } from "../core/database.js";

class Candidate {
  constructor() {
    this.masterDB = masterConnection;
    this.slaveDB = slaveConnection;
  }

  async createBatch(positionId, candidates) {
    try {
      let affectedRows = 0;
      for (const cand of candidates) {
        const [results] = await this.masterDB.execute("INSERT INTO Candidate (positionId, fullname, description, imageUrl) VALUES (?, ?, ?, ?)", [
          positionId,
          cand.fullname,
          cand.description || "",
          cand.imageUrl || "",
        ]);
        affectedRows += results.affectedRows;
      }

      return { affectedRows };
    } catch (error) {
      console.error("<error> candidate.createBatch", error);
      throw error;
    }
  }

  async create(positionId, fullname, description, imageUrl) {
    try {
      const [results] = await this.masterDB.execute("INSERT INTO Candidate (positionId, fullname, description, imageUrl) VALUES (?, ?, ?, ?)", [
        positionId,
        fullname,
        description || "",
        imageUrl || "",
      ]);
      return results;
    } catch (error) {
      console.error("<error> candidate.create", error);
      throw error;
    }
  }

  async getAllByPosition(positionId) {
    try {
      const [results] = await this.slaveDB.execute("SELECT * FROM Candidate WHERE positionId = ?", [positionId]);
      return results;
    } catch (error) {
      console.error("<error> candidate.getAllByPosition", error);
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
      const [results] = await this.masterDB.execute("UPDATE Candidate SET fullname=?, description=?, imageUrl=? WHERE candidateId = ?", [
        fullname,
        description,
        imageUrl,
        candidateId,
      ]);
      return results;
    } catch (error) {
      console.error("<error> candidate.update", error);
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
