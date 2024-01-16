import axios from "axios";

// User Info API

const getUserInfo = async (handle) => {
  const response = await axios.get(
    `https://codeforces.com/api/user.info?handles=${handle}`
  );
  return response.data.result[0];
};

// Number of Questions Solved

const getNumberOfSubmissions = async (handle) => {
  const response = await axios.get(
    `https://codeforces.com/api/user.status?handle=${handle}`
  );
  return response.data.result.length;
};

// Total Number of Contests Participated

const getNumberOfContests = async (handle) => {
  const response = await axios.get(
    `https://codeforces.com/api/user.rating?handle=${handle}`
  );
  return response.data.result.length;
};

export { getNumberOfSubmissions, getNumberOfContests, getUserInfo };
