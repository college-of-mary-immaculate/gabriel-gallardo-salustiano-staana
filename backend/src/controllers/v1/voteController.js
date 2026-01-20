// backend/src/controllers/v1/voteController.js
import Vote from "../../models/vote.js";

class VoteController {
  constructor() {
    this.vote = new Vote();
  }

  async create(request, response) {
    try {
      const { electionId, positionId, candidateId, userId } = request.body || {};
      await this.vote.create(electionId, positionId, candidateId, userId);
      response.status(200).json({
        success: true,
        message: "Voted successfully.",
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // expects: { electionId, userId, votes: [{ positionId, candidateId }, ...] }
  async createBatch(request, response) {
    try {
      const { electionId, userId, votes } = request.body || {};

      // Validation
      if (!electionId || !userId || !Array.isArray(votes) || votes.length === 0) {
        return response.status(400).json({
          success: false,
          message: "Invalid request. Provide electionId, userId, and votes array.",
        });
      }

      const invalidVote = votes.find((v) => !v.positionId || !v.candidateId);
      if (invalidVote) {
        return response.status(400).json({
          success: false,
          message: "Each vote must have positionId and candidateId.",
        });
      }

      await this.vote.createBatch(electionId, userId, votes);

      response.status(200).json({
        success: true,
        message: `Successfully submitted ${votes.length} vote(s).`,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async get(request, response) {
    try {
      const { electionId, candidateId } = request.query;
      const result = await this.vote.getByCandidate(electionId, candidateId);
      if (!result)
        return response.status(404).json({
          success: false,
          message: "No votes for candidate or candidate not found.",
        });
      response.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAll(request, response) {
    try {
      const { electionId } = request.query;
      const tally = await this.vote.tally(electionId);
      response.status(200).json({
        success: true,
        tally,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async hasVoted(request, response) {
    try {
      const { electionId, positionId, userId } = request.query;
      const voted = await this.vote.hasVoted(electionId, positionId, userId);
      response.status(200).json({
        success: true,
        voted,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async hasVotedAll(request, response) {
    try {
      const { electionId, userId } = request.query;
      const voted = await this.vote.hasVotedInElection(electionId, userId);

      response.status(200).json({
        success: true,
        voted,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default VoteController;
