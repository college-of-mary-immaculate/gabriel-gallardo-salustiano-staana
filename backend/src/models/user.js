// backend/src/models/user.js
import { masterConnection, slaveConnection } from "../core/database.js";
import { encrypt } from "../utils/hash.js";
import { generateVIN } from "../utils/generate.js";
import validator from "validator";

class User {
  constructor() {
    this.masterDB = masterConnection;
    this.slaveDB = slaveConnection;
  }

  // Get user by email or vin
  async get(identifier) {
    try {
      const queryField = validator.isEmail(identifier) ? "email" : "vin";
      // console.log(queryField);
      const [results] = await this.slaveDB.execute(`SELECT userId, vin, fullname, email, created_at, updated_at FROM User WHERE ${queryField}=?`, [identifier]);
      return results?.[0];
    } catch (error) {
      console.error("<error> user.get", error);
      throw error;
    }
  }

  async create(email, fullname, password) {
    try {
      const vin = await generateVIN();

      const [results] = await this.masterDB.execute("INSERT INTO User (vin, fullname, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())", [
        vin,
        fullname,
        email,
        await encrypt(password),
      ]);

      return results;
    } catch (error) {
      console.error("<error> user.create", error);
      throw error;
    }
  }

  async verify(identifier, password) {
    try {
      const queryField = validator.isEmail(identifier) ? "email" : "vin";
      // console.log(queryField);

      const [results] = await this.slaveDB.execute(`SELECT * FROM User WHERE ${queryField}=? AND password=?`, [identifier, await encrypt(password)]);
      return results?.[0];
    } catch (error) {
      console.error("<error> user.verify", error);
      throw error;
    }
  }

  async update(userId, fullname, email) {
    try {
      const [results] = await this.masterDB.execute("UPDATE User SET fullname=?, email=?, updated_at=NOW() WHERE userId=?", [fullname, email, userId]);
      return results;
    } catch (error) {
      console.error("<error> user.update", error);
      throw error;
    }
  }
}

export default User;
