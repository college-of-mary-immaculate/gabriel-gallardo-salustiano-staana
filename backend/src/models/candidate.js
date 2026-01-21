// backend/src/models/candidate.js
import { masterConnection, slaveConnection } from "../core/database.js";

class Candidate {
  constructor() {
    this.masterDB = masterConnection;
    this.slaveDB = slaveConnection;
  }

  async getAllByPosition(positionId) {
    const [results] = await this.slaveDB.execute("SELECT * FROM Candidate WHERE positionId = ?", [positionId]);
    return results;
  }

  async create(positionId, fullname, description = "", imageUrl = "") {
    const [results] = await this.masterDB.execute("INSERT INTO Candidate (positionId, fullname, description, imageUrl) VALUES (?, ?, ?, ?)", [
      positionId,
      fullname,
      description,
      imageUrl,
    ]);
    return results;
  }

  async getById(candidateId) {
    const [results] = await this.slaveDB.execute("SELECT * FROM Candidate WHERE candidateId = ?", [candidateId]);
    return results[0] || null;
  }

  async update(candidateId, fullname, description, imageUrl) {
    const [results] = await this.masterDB.execute("UPDATE Candidate SET fullname=?, description=?, imageUrl=? WHERE candidateId = ?", [
      fullname,
      description,
      imageUrl,
      candidateId,
    ]);
    return results;
  }

  async delete(candidateId) {
    const [results] = await this.masterDB.execute("DELETE FROM Candidate WHERE candidateId = ?", [candidateId]);
    return results;
  }
}

export default Candidate;
