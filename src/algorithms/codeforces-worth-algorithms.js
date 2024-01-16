import {
  getNumberOfContests,
  getNumberOfSubmissions,
  getUserInfo,
} from "../api/codeforces-worth-api.js";

// const handle = "ai.alok";

const RankWorth = {
  newbie: 2.0,
  pupil: 4.0,
  specialist: 8.0,
  expert: 16.0,
  "candidate master": 32.0,
  master: 64.0,
  "international master": 128.0,
  "legendary grandmaster": 256.0,
};

const codeforcesWorthAlgorithm = async (handle) => {
  const numberOfSubmissions = await getNumberOfSubmissions(handle);
  const numberOfContests = await getNumberOfContests(handle);
  const userInfo = await getUserInfo(handle);

  const ratingWorth = userInfo.rating * RankWorth[userInfo.rank];
  const contributionWorth = userInfo.contribution * 20;
  const maxRating = userInfo.maxRating;
  const NumberOfContestsWorth = numberOfContests * 10;
  const questionsSolvedWorth = numberOfSubmissions * 4;

  console.log(ratingWorth);
  console.log(contributionWorth);
  console.log(maxRating);
  console.log(questionsSolvedWorth);
  console.log(NumberOfContestsWorth);

  const totalWorth =
    ratingWorth +
    contributionWorth +
    maxRating +
    questionsSolvedWorth +
    NumberOfContestsWorth;
  console.log(totalWorth);
  return totalWorth.toFixed(1);
};

// codeforcesWorthAlgorithm(handle);

export default codeforcesWorthAlgorithm;
