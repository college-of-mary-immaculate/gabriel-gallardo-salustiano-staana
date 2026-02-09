// backend/src/controllers/v1/candidateController.js
import Candidate from "../../models/candidate.js";

class CandidateController {
  constructor() {
    this.candidate = new Candidate();
  }

  async createBulk(request, response) {
    try {
      const { electionId, position, candidates } = request.body || {};

      if (!Array.isArray(candidates) || candidates.length === 0) {
        return response.status(400).json({
          success: false,
          message: "candidates must be a non-empty array",
        });
      }

      const results = await this.candidate.createBatch(electionId, position, candidates);

      response.status(201).json({
        success: true,
        created: results.affectedRows,
        electionId,
        position,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.toString(),
      });
    }
  }

  async create(request, response) {
    try {
      const { electionId, position, fullname, description = "", imageUrl = "" } = request.body || {};
      const result = await this.candidate.create(electionId, position, fullname, description, imageUrl);
      response.status(201).json({
        success: true,
        candidateId: result.insertId,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.toString(),
      });
    }
  }

  async get(request, response) {
    try {
      const { candidateId } = request.params;
      const result = await this.candidate.getById(candidateId);
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

  async getCurrent(request, response) {
    try {
      const results = await this.candidate.getCurrent();
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

  async getByElection(request, response) {
    try {
      const { electionId } = request.params;
      const results = await this.candidate.getByElection(electionId);
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

  async update(request, response) {
    try {
      const { candidateId, fullname, description, imageUrl } = request.body || {};
      const result = await this.candidate.update(candidateId, fullname, description, imageUrl);
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

  async markNotCurrent(request, response) {
    try {
      const { electionId } = request.params;
      const result = await this.candidate.markNotCurrent(electionId);
      response.status(200).json({
        success: true,
        result,
        affectedRows: result.affectedRows,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.toString(),
      });
    }
  }

  async delete(request, response) {
    try {
      const { candidateId } = request.body || {};
      const result = await this.candidate.delete(candidateId);
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
export default CandidateController;
