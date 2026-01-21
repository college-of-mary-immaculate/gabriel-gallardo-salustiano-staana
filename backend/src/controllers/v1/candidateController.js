// backend/src/controllers/v1/candidateController.js
import Candidate from "../../models/candidate.js";

class CandidateController {
  constructor() {
    this.candidate = new Candidate();
  }

  async create(request, response) {
    try {
      const { positionId, fullname, description = "", imageUrl = "" } = request.body || {};
      const result = await this.candidate.create(positionId, fullname, description, imageUrl);
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

  async getAll(request, response) {
    try {
      const { positionId } = request.query;
      const results = await this.candidate.getAllByPosition(positionId);
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
