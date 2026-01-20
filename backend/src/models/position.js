// backend/src/models/position.js
import { masterConnection, slaveConnection } from "../core/database.js";

class Position {
  constructor() {
    this.masterDB = masterConnection;
    this.slaveDB = slaveConnection;
  }

  async create(electionId, fullname) {
    const [results] = await this.masterDB.execute("INSERT INTO Position (electionId, fullname) VALUES (?, ?)", [electionId, fullname]);
    return results;
  }

  async getById(positionId) {
    const [results] = await this.slaveDB.execute("SELECT * FROM Position WHERE positionId = ?", [positionId]);
    return results[0] || null;
  }

  async getAllByElection(electionId) {
    const [results] = await this.slaveDB.execute("SELECT * FROM Position WHERE electionId = ?", [electionId]);
    return results;
  }

  async update(positionId, fullname) {
    const [results] = await this.masterDB.execute("UPDATE Position SET fullname = ? WHERE positionId = ?", [fullname, positionId]);
    return results;
  }

  async delete(positionId) {
    const [results] = await this.masterDB.execute("DELETE FROM Position WHERE positionId = ?", [positionId]);
    return results;
  }
}

export default Position;
