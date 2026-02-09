// server/utils/tallyComputer.js
const DEFAULT_AVATAR_URL = "https://res.cloudinary.com/hamsters-api/image/upload/v1770500115/default_wdoaeg.jpg";

function assignColor(rank) {
  if (rank === 1) return "blue";
  if (rank === 2) return "cyan";
  if (rank === 3) return "green";
  return "gray";
}

/**
 * Computes a leaderboard grouped by position with rankings and percentages.
 *
 * @param {Array} voteCounts - Raw vote counts: [{ candidateId, voteCount }, ...]
 * @param {Array} candidates - Candidate data: [{ candidateId, position, fullname, imageUrl, ... }, ...]
 * @returns {Array} Leaderboard grouped by position:
 *   [{ title, candidates: [{ candidateId, rank, name, image, votes, percentage, color }, ...] }, ...]
 */
export function computeLeaderboard(voteCounts, candidates) {
  const voteMap = new Map();

  for (const { candidateId, voteCount } of voteCounts) {
    voteMap.set(candidateId, voteCount);
  }

  const positionGroups = new Map();
  for (const candidate of candidates) {
    if (!positionGroups.has(candidate.position)) {
      positionGroups.set(candidate.position, []);
    }
    positionGroups.get(candidate.position).push({
      candidateId: candidate.candidateId,
      name: candidate.fullname,
      image: candidate.imageUrl || DEFAULT_AVATAR_URL,
      votes: voteMap.get(candidate.candidateId) || 0,
    });
  }

  const positionOrder = ["President", "Vice President", "Senator", "Party-List"];

  const leaderboard = [];
  for (const position of positionOrder) {
    const group = positionGroups.get(position);
    if (!group) continue;

    const totalVotes = group.reduce((sum, c) => sum + c.votes, 0);

    group.sort((a, b) => b.votes - a.votes || a.name.localeCompare(b.name));

    const rankedCandidates = group.map((c, index) => ({
      ...c,
      rank: index + 1,
      percentage: totalVotes > 0 ? Math.round((c.votes / totalVotes) * 100 * 10) / 10 : 0,
      color: assignColor(index + 1),
    }));

    leaderboard.push({ title: position, candidates: rankedCandidates });
  }

  return leaderboard;
}

/**
 * Computes winners
 *
 * @param {Array} voteCounts - Raw vote counts: [{ candidateId, voteCount }, ...]
 * @param {Array} candidates - Candidate data: [{ candidateId, position, fullname, imageUrl, ... }, ...]
 * @returns {Array} Winners: [{ position, candidateId, name, image, votes, percentage }, ...]
 */
export function computeWinners(voteCounts, candidates) {
  const leaderboard = computeLeaderboard(voteCounts, candidates);

  const winners = [];
  for (const { title, candidates: rankedCandidates } of leaderboard) {
    const topVotes = rankedCandidates[0].votes;

    if (topVotes === 0) continue;

    const tied = rankedCandidates.filter((c) => c.votes === topVotes);
    const winner = tied[Math.floor(Math.random() * tied.length)];

    winners.push({
      position: title,
      candidateId: winner.candidateId,
      name: winner.name,
      image: winner.image,
      votes: winner.votes,
      percentage: winner.percentage,
    });
  }

  return winners;
}
