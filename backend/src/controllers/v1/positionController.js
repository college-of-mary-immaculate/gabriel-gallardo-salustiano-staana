// backend/src/controllers/v1/positionController.js
import Position from "../../models/position.js";

class PositionController {
  constructor() {
    this.position = new Position();
  }

  async createBulk(request, response) {
    try {
      const { electionId, positions } = request.body || {};

      if (!Array.isArray(positions) || positions.length === 0) {
        return response.status(400).json({
          success: false,
          message: "positions must be a non-empty array",
        });
      }

      await this.position.createBatch(electionId, positions);
      const createdPositions = await this.position.getAllByElection(electionId);

      response.status(201).json({
        success: true,
        created: createdPositions.length,
        positions: createdPositions,
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
      const { electionId, name } = request.body || {};
      const result = await this.position.create(electionId, name);
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
      const { positionId, name } = request.body || {};
      const result = await this.position.update(positionId, name);
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
