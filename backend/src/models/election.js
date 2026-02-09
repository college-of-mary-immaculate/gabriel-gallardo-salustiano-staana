// backend/src/models/election.js
import { masterConnection, slaveConnection } from "../core/database.js";

class Election {
  constructor() {
    this.masterDB = masterConnection;
    this.slaveDB = slaveConnection;
  }

  async create(title, startTime, endTime) {
    try {
      const [results] = await this.masterDB.execute(
        "INSERT INTO Election (title, startTime, endTime, status) VALUES (?, ?, ?, 'active')",
        [title, startTime, endTime],
      );
      return results;
    } catch (error) {
      console.error("<error> election.create", error);
      throw error;
    }
  }

  async getCurrent() {
    try {
      const [results] = await this.slaveDB.execute("SELECT * FROM Election WHERE status = 'active' LIMIT 1", []);
      return results?.[0];
    } catch (error) {
      console.error("<error> election.getCurrent", error);
      throw error;
    }
  }

  async getHistory() {
    try {
      const [results] = await this.slaveDB.execute("SELECT * FROM Election WHERE status = 'ended' ORDER BY startTime DESC", []);
      return results;
    } catch (error) {
      console.error("<error> election.getHistory", error);
      throw error;
    }
  }

  async getLastElection(offset) {
    try {
      const [result] = await this.slaveDB.execute(`SELECT * FROM Election ORDER BY startTime DESC LIMIT 1 OFFSET ${offset}`);
      return result?.[0];
    } catch (error) {
      console.error("<error> election.getLastElection", error);
      throw error;
    }
  }

  async end(electionId) {
    try {
      const [result] = await this.masterDB.execute("UPDATE Election SET status='ended' WHERE electionId=?", [electionId]);
      return result;
    } catch (error) {
      console.error("<error> election.end", error);
      throw error;
    }
  }
}

export default Election;
