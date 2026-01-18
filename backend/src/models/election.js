// backend/src/models/election.js
import { masterConnection, slaveConnection } from "../core/database.js";

class Election {
  constructor() {
    this.masterDB = masterConnection;
    this.slaveDB = slaveConnection;
  }

  async create(title, startTime, endTime) {
    const [results] = await this.masterDB.execute("INSERT INTO Election (title, startTime, endTime, status) VALUES (?, ?, ?, 'active')", [title, startTime, endTime]);
    return results;
  }

  async getCurrent() {
    const [results] = await this.slaveDB.execute("SELECT * FROM Election WHERE status = 'active' LIMIT 1", []);
    return results?.[0];
  }

  async end(electionId) {
    const [result] = await this.masterDB.execute("UPDATE Election SET status='ended' WHERE electionId=?", [electionId]);
    return result;
  }

  async getHistory() {
    const [results] = await this.slaveDB.execute("SELECT * FROM Election ORDER BY startTime DESC", []);
    return results;
  }
}

export default Election;
