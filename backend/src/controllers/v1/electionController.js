// backend/src/controllers/v1/electionController.js
import Election from "../../models/election.js";

class ElectionController {
  constructor() {
    this.election = new Election();
  }

  async create(request, response) {
    try {
      const { title, startTime, endTime } = request.body || {};
      const result = await this.election.create(title, startTime, endTime);

      response.status(200).json({
        success: true,
        electionId: result.insertId,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.toString(),
      });
    }
  }

  async getCurrent(request, response) {
    try {
      const election = await this.election.getCurrent();

      response.status(200).json({
        success: true,
        election,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.toString(),
      });
    }
  }

  async getHistory(request, response) {
    try {
      const results = await this.election.getHistory();

      response.status(200).json({
        success: true,
        results,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.toString(),
      });
    }
  }

  async getLastElection(request, response) {
    try {
      const { offset } = request.query;
      const result = await this.election.getLastElection(offset);

      response.status(200).json({
        success: true,
        result,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.toString(),
      });
    }
  }

  async end(request, response) {
    try {
      const { electionId } = request.body || {};
      const result = await this.election.end(electionId);

      response.status(200).json({
        success: true,
        result,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.toString(),
      });
    }
  }
}

export default ElectionController;
