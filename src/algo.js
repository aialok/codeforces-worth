// // Define factors and their weights
// const RATING_WEIGHT = 50.0;
// const BADGE_WEIGHT = 20.0;
// const CONTRIBUTION_WEIGHT = 10.0;
// const CONTEST_RANK_WEIGHT = 30.0;
// const QUESTIONS_SOLVED_WEIGHT = 5.0;

// // Sample user data
// const user = {
//   rating: 2200,
//   badge: "grandmaster",
//   contribution: 150,
//   contestRank: 10,
//   questionsSolved: 500,
// };

// // Function to calculate Codeforces account worth
// function calculateCodeforcesWorth(user) {
//   const ratingWorth = user.rating * RATING_WEIGHT;
//   const badgeWorth = getBadgeWorth(user.badge) * BADGE_WEIGHT;
//   const contributionWorth = user.contribution * CONTRIBUTION_WEIGHT;
//   const contestRankWorth = (1 / user.contestRank) * CONTEST_RANK_WEIGHT;
//   const questionsSolvedWorth = user.questionsSolved * QUESTIONS_SOLVED_WEIGHT;

//   const totalWorth =
//     ratingWorth + badgeWorth + contributionWorth + contestRankWorth + questionsSolvedWorth;

//   return totalWorth;
// }

// // Function to get badge worth
// function getBadgeWorth(badge) {
//   // Assign a value based on the badge
//   switch (badge) {
//     case "newbie":
//       return 100;
//     case "pupil":
//       return 200;
//     case "specialist":
//       return 300;
//     case "expert":
//       return 400;
//     case "candidate master":
//       return 500;
//     case "master":
//       return 600;
//     case "international master":
//       return 700;
//     case "grandmaster":
//       return 800;
//     // Add more cases as needed
//     default:
//       return 0; // No badge or unknown badge
//   }
// }

// // Example usage
// const worth = calculateCodeforcesWorth(user);
// console.log(`Codeforces account worth: $${worth.toFixed(2)}`);

// https://codeforces.com/api/user.rating?handle=Fefer_Ivan

const fetchData = async () => {
  const response = await fetch(
    "https://codeforces.com/api/user.rating?handle=tourist"
  );
  const data = await response.json();
//   console.log(data.result);
  let sum=0;

  data.result.map(async (contest)=>{
    const totalParticipant = await fetch(`https://codeforces.com/api/contest.standings?contestId=${contest.contestId}`)
    console.log(await totalParticipant.json());
    sum = sum+(1/(contest.rank))*500;
  })

//   const worth = (1/10458)*100

  console.log("Rank Sum", sum.toFixed(2))

};

fetchData();