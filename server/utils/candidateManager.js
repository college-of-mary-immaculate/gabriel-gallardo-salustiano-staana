// server/utils/candidateManager.js
import { generateElectionCandidates } from "./candidateGenerator.js";
import { createBulkCandidate } from "./candidate.js";
import { initializePositions } from "./positionManager.js";

export async function initializeElectionCandidates(electionId) {
  try {
    // Step 1: Create positions
    const positionMap = await initializePositions(electionId);

    // Step 2: Generate candidates
    const candidateConfig = {
      presidents: 5,
      vicePresidents: 5,
      senators: 24,
      partyLists: 30,
    };

    const candidates = generateElectionCandidates(candidateConfig);

    // Step 3: Create candidates in database
    const candidatesByPosition = {
      President: candidates.presidents,
      "Vice President": candidates.vicePresidents,
      Senator: candidates.senators,
      "Party-List": candidates.partyLists,
    };

    let totalCreated = 0;

    for (const [positionName, candidateList] of Object.entries(candidatesByPosition)) {
      const positionId = positionMap[positionName];
      await createBulkCandidate(positionId, candidateList);
      totalCreated += candidateList.length;
    }

    return { electionId, positionMap, totalCreated };
  } catch (error) {
    console.error("Error initializing candidates:", error);
    throw error;
  }
}
