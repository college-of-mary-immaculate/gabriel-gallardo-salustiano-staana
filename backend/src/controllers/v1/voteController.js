// backend/src/controllers/v1/voteController.js
import Vote from "../../models/vote.js";
import User from "../../models/user.js";

class VoteController {
  constructor() {
    this.vote = new Vote();
    this.user = new User();
  }

  async create(request, response) {
    try {
      const { candidateId, userId } = request.body || {};
      await this.vote.create(candidateId, userId);
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

  async createBatch(request, response) {
    try {
      const { userEmail, votes } = request.body || {};

      if (!userEmail || !Array.isArray(votes) || votes.length === 0) {
        return response.status(400).json({
          success: false,
          message: "Invalid request. Provide userEmail and votes array.",
        });
      }

      const invalidVote = votes.find((v) => !v.candidateId);
      if (invalidVote) {
        return response.status(400).json({
          success: false,
          message: "Each vote must have candidateId.",
        });
      }

      const user = await this.user.get(userEmail);

      if (!user) {
        return response.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      await this.vote.createBatch(user.userId, votes);

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

  async getVoteCounts(request, response) {
    try {
      const { electionId } = request.query;
      const voteCounts = await this.vote.getVoteCounts(electionId);
      response.status(200).json({
        success: true,
        voteCounts,
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
      const { candidateId, userId } = request.query;
      const voted = await this.vote.hasVoted(candidateId, userId);
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

  async hasVotedInElection(request, response) {
    try {
      const { electionId, userEmail } = request.query;

      if (!electionId || !userEmail) {
        return response.status(400).json({
          success: false,
          message: "electionId and userEmail are required.",
        });
      }

      const user = await this.user.get(userEmail);

      if (!user) {
        return response.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      const voted = await this.vote.hasVotedInElection(electionId, user.userId);
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
