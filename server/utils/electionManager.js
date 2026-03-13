// server/utils/electionManager.js
import { getLastElection, createElection, getActiveElection, endElection } from "../api/election.js";
import { markCandidatesNotCurrent } from "../api/candidate.js";

function formatDateForMySQL(date, { withSeconds = true } = {}) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return withSeconds ? `${year}-${month}-${day} ${hours}:${minutes}:${seconds}` : `${year}-${month}-${day} ${hours}:${minutes}`;
}

export async function getOrCreateElection() {
  try {
    const currentElection = await getActiveElection();
    if (currentElection) {
      console.log(`Resuming: ${currentElection.title} (ID: ${currentElection.electionId})`);
      return {
        electionId: currentElection.electionId,
        name: currentElection.title,
        startTime: currentElection.startTime,
        endTime: currentElection.endTime,
      };
    }

    const now = new Date();
    const endTime = new Date(now.getTime() + 60 * 3000);
    // const endTime = new Date(now.getTime() + 60 * 60 * 1000);

    const newElectionName = `Election – ${formatDateForMySQL(now, { withSeconds: false })}`;
    const startTimeFormatted = formatDateForMySQL(now);
    const endTimeFormatted = formatDateForMySQL(endTime);

    const electionId = await createElection(newElectionName, startTimeFormatted, endTimeFormatted);

    return { electionId, name: newElectionName, startTime: now, endTime };
  } catch (error) {
    console.error("Error in getOrCreateElection:", error);
    throw error;
  }
}

export async function markElectionEnd(electionId) {
  try {
    await endElection(electionId);
    await markCandidatesNotCurrent(electionId);
    const newElection = await getOrCreateElection();
    return newElection;
  } catch (error) {
    console.error("Error handling election end:", error);
    throw error;
  }
}
