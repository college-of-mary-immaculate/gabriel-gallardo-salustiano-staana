// server/utils/positionManager.js
import { createBulkPosition } from "./position.js";

const POSITIONS = ["President", "Vice President", "Senator", "Party-List"];

export async function initializePositions(electionId) {
  try {
    const createdPositions = await createBulkPosition(electionId, POSITIONS);

    const positionMap = {};
    createdPositions.forEach((position) => {
      positionMap[position.name] = position.positionId;
    });

    return positionMap;
  } catch (error) {
    console.error("Error initializing positions:", error);
    throw error;
  }
}
