// backend/src/models/user.js
import { masterConnection, slaveConnection } from "../core/database.js";
import { generateOTP } from "../utils/generate.js";
import { encrypt } from "../utils/hash.js";
import validator from "validator";

class Otp {
  constructor() {
    this.masterDB = masterConnection;
    this.slaveDB = slaveConnection;
  }

  // Get otp by destination
  async get(email) {
    try {
      const [results] = await this.slaveDB.execute(`SELECT * FROM Otp WHERE destination=?`, [email]);
      return results?.[0];
    } catch (error) {
      console.error("<error> otp.get", error);
      throw error;
    }
  }

  // Create new otp
  async create(otp, email, purpose) {
    try {
      const hashedOTP = await encrypt(otp);
      const expires_at = new Date(Date.now() + 10 * 60 * 1000);

      const [results] = await this.masterDB.execute(
        `INSERT INTO Otp (otp, destination, purpose, attempts, verified, created_at, expires_at) 
        VALUES (?, ?, ?, 0, FALSE, NOW(), ?) 
        ON DUPLICATE KEY UPDATE otp = ?, purpose = ?, attempts = 0, verified = FALSE, created_at = NOW(), expires_at = ?`,
        [hashedOTP, email, purpose, expires_at, hashedOTP, purpose, expires_at],
      );

      return {
        results,
        expires_at,
        destination: email,
        purpose,
      };
    } catch (error) {
      console.error("<error> otp.create", error);
      throw error;
    }
  }

  // Verify otp credentials for login
  async verify(identifier, password) {
    try {
      const queryField = validator.isEmail(identifier) ? "email" : "vin";
      // console.log(queryField);

      const [results] = await this.slaveDB.execute(`SELECT * FROM Users WHERE ${queryField}=? AND password=?`, [identifier, encryptPassword(password)]);
      return results?.[0];
    } catch (error) {
      console.error("<error> otp.verify", error);
      throw error;
    }
  }
}

export default Otp;
