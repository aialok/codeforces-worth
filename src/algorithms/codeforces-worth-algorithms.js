import {
  getNumberOfContests,
  getNumberOfSubmissions,
  getUserInfo,
} from "../api/codeforces-worth-api.js";

const RankWorth = {
  "newbie": 2.0,
  "pupil": 4.0,
  "specialist": 8.0,
  "expert": 16.0,
  "candidate master": 32.0,
  "master": 64.0,
  "international master": 128.0,
  "international grandmaster": 150.0,
  "grandmaster": 200.0,
  "legendary grandmaster": 280.0,
};

function formatMoney(amount) {
  if (amount >= 1000000000) {
    return (amount / 1000000000).toFixed(2) + "B";
  } else if (amount >= 1000000) {
    return (amount / 1000000).toFixed(2) + "M";
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(2) + "K";
  } else {
    return amount.toFixed(2);
  }
}

const codeforcesWorthAlgorithm = async (handle) => {
  const numberOfSubmissions = await getNumberOfSubmissions(handle);
  const numberOfContests = await getNumberOfContests(handle);
  const userInfo = await getUserInfo(handle);

  const ratingWorth = userInfo.rating * RankWorth[userInfo.rank];
  const contributionWorth = userInfo.contribution * 20;
  const maxRating = userInfo.maxRating;
  const NumberOfContestsWorth = numberOfContests * 10;
  const questionsSolvedWorth = numberOfSubmissions * 4;

  let totalWorth =
    ratingWorth +
    contributionWorth +
    maxRating +
    questionsSolvedWorth +
    NumberOfContestsWorth;

  totalWorth = formatMoney(totalWorth);
  return totalWorth;
};

export default codeforcesWorthAlgorithm;
