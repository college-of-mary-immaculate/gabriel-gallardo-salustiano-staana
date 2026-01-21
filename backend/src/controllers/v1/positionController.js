// backend/src/controllers/v1/positionController.js
import Position from "../../models/position.js";

class PositionController {
  constructor() {
    this.position = new Position();
  }

  async create(request, response) {
    try {
      const { electionId, fullname } = request.body || {};
      const result = await this.position.create(electionId, fullname);
      response.status(201).json({
        success: true,
        positionId: result.insertId,
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
      const { positionId } = request.params;
      const result = await this.position.getById(positionId);
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
      const { electionId } = request.query;
      const results = await this.position.getAllByElection(electionId);
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
      const { positionId, fullname } = request.body || {};
      const result = await this.position.update(positionId, fullname);
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
      const { positionId } = request.body || {};
      const result = await this.position.delete(positionId);
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
export default PositionController;
