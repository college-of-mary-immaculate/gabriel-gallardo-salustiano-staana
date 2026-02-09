// server/utils/candidateManager.js
import { generateElectionCandidates } from "./candidateGenerator.js";
import { createBulkCandidate, getCurrentCandidates } from "../api/candidate.js";

export async function initializeElectionCandidates(electionId) {
  try {
    const existingCandidates = await getCurrentCandidates();

    if (existingCandidates && existingCandidates.length > 0) {
      console.log(`Election ${electionId} already has ${existingCandidates.length} candidates, skipping initialization`);
      return {
        electionId,
        totalCreated: 0,
        skipped: true,
        existingCount: existingCandidates.length,
      };
    }

    console.log(`Creating candidates for new election ${electionId}...`);

    const candidateConfig = {
      presidents: 5,
      vicePresidents: 5,
      senators: 24,
      partyLists: 30,
    };

    const candidates = generateElectionCandidates(candidateConfig);

    const candidatesByPosition = {
      President: candidates.presidents,
      "Vice President": candidates.vicePresidents,
      Senator: candidates.senators,
      "Party-List": candidates.partyLists,
    };

    let totalCreated = 0;

    for (const [position, candidateList] of Object.entries(candidatesByPosition)) {
      await createBulkCandidate(electionId, position, candidateList);
      totalCreated += candidateList.length;
    }

    console.log(`Created ${totalCreated} candidates for election ${electionId}`);
    return { electionId, totalCreated };
  } catch (error) {
    console.error("Error initializing candidates:", error);
    throw error;
  }
}
