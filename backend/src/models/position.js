// backend/src/models/position.js
import { masterConnection, slaveConnection } from "../core/database.js";

class Position {
  constructor() {
    this.masterDB = masterConnection;
    this.slaveDB = slaveConnection;
  }

  async createBatch(electionId, positions) {
    try {
      let affectedRows = 0;

      for (const posName of positions) {
        const [results] = await this.masterDB.execute("INSERT INTO `Position` (electionId, name) VALUES (?, ?)", [electionId, posName]);
        affectedRows += results.affectedRows;
      }

      return { affectedRows };
    } catch (error) {
      console.error("<error> position.createBatch", error);
      throw error;
    }
  }

  async create(electionId, name) {
    try {
      const [results] = await this.masterDB.execute("INSERT INTO `Position` (electionId, name) VALUES (?, ?)", [electionId, name]);
      return results;
    } catch (error) {
      console.error("<error> position.create", error);
      throw error;
    }
  }

  async getById(positionId) {
    try {
      const [results] = await this.slaveDB.execute("SELECT * FROM `Position` WHERE positionId = ?", [positionId]);
      return results[0] || null;
    } catch (error) {
      console.error("<error> position.getById", error);
      throw error;
    }
  }

  async getAllByElection(electionId) {
    try {
      const [results] = await this.slaveDB.execute("SELECT * FROM `Position` WHERE electionId = ?", [electionId]);
      return results;
    } catch (error) {
      console.error("<error> position.getAllByElection", error);
      throw error;
    }
  }

  async update(positionId, name) {
    try {
      const [results] = await this.masterDB.execute("UPDATE `Position` SET name = ? WHERE positionId = ?", [name, positionId]);
      return results;
    } catch (error) {
      console.error("<error> position.update", error);
      throw error;
    }
  }

  async delete(positionId) {
    try {
      const [results] = await this.masterDB.execute("DELETE FROM `Position` WHERE positionId = ?", [positionId]);
      return results;
    } catch (error) {
      console.error("<error> position.delete", error);
      throw error;
    }
  }
}

export default Position;
