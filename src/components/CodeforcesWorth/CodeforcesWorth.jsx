import React, { useRef, useState } from "react";
import { LuBadgeDollarSign, LuSave } from "react-icons/lu";
import domtoimage from "dom-to-image";
import { SiCodeforces } from "react-icons/si";
import { saveAs } from "file-saver";

import codeforcesWorthAlgorithm from "../../algorithms/codeforces-worth-algorithms.js";
import {
  getNumberOfContests,
  getUserInfo,
} from "../../api/codeforces-worth-api.js";
import LoadingComponent from "../loadingComponent/LoadingComponent.jsx";

function CodeforcesWorth() {
  const [data, setData] = useState({});
  const [worth, setWorth] = useState(0);
  const [contestCount, setContestCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [rating, setRating] = useState(0);
  const [rank, setRank] = useState("N/A");
  const [maxRating, setMaxRating] = useState(0);
  const ref = useRef(null);

  const downloadImage = async (e) => {
    e.preventDefault();

    try {
      const blob = await domtoimage.toBlob(ref.current, {
        style: {
          backgroundColor: "#020817",
        },
      });
      saveAs(blob, "codeforces-worth.png");
    } catch (err) {
      console.error("Error downloading image:", err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const handle = e.target[0].value;
      const userInfo = await getUserInfo(handle);

      if (!userInfo) {
        setShowCard(false);
        alert("Invalid Handle");
        return;
      }

      setShowCard(true);
      setData(userInfo);

      const contests = await getNumberOfContests(handle);
      setContestCount(contests);

      const userWorth = await codeforcesWorthAlgorithm(handle);
      setWorth(userWorth);

      const { rating, rank, maxRating } = userInfo;
      setRating(rating || 0);
      setRank(rank || "N/A");
      setMaxRating(maxRating || 0);
    } catch (error) {
      console.error("Error fetching data:", error.response.data.comment);
      setShowCard(false);
      alert(error.response.data.comment);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 ">
      <div className="heading text-4xl font-semibold max-sm:text-2xl mb-3 ">
        Know Your Codeforces worth
      </div>
      <form onSubmit={onSubmit} className="flex flex-col items-center mb-6 ">
        <input
          type="text"
          placeholder="Enter your Codeforces handle"
          className="border-2 border-gray-800 rounded-md p-2  m-2 bg-transparent text-white w-full mx-36 text-lg max-sm:text-lg  max-sm:mx-10"
          required
        ></input>
        <button
          type="submit"
          className="flex items-center justify-center w-fit rounded-md p-3 m-2 bg-white text-black text-center text-lg font-medium gap-2"
        >
          <LuBadgeDollarSign className="font-medium" />
          <p>Generate Worth</p>
        </button>
      </form>

      {loading ? (
        <LoadingComponent />
      ) : (
        showCard && (
          <div
            id="codeforces"
            ref={ref}
            className="codeforces-worth border  border-slate-600 w-[35%] max-sm:w-[90%] h-fit mb-6"
          >
            <div className="profile flex justify-center border-b border-slate-600  ">
              <div className="left flex items-center w-1/2  justify-center">
                <img
                  src={data.titlePhoto || ""}
                  alt="profile-pic"
                  className="rounded-full w-28 h-28 max-sm:w-20 max-sm:h-20 mx-4 my-4"
                />
                <div className="about my-4 mx-4 max-sm:mx-0">
                  <div className="full-name text-xl max-sm:text-base font-bold">
                    {data.firstName} {data.lastName}
                  </div>
                  <div className="handle text-lg text-slate-400">
                    {data.handle}
                  </div>
                  <div className="rating text-lg text-slate-400">
                    {data.country}
                  </div>
                </div>
              </div>
              <div className="right-flex w-1/2  flex flex-col justify-center items-center   ">
                <SiCodeforces className="text-8xl max-sm:text-3xl" />
                <p className="text-base font-normal">Codeforces Worth</p>
              </div>
            </div>
            <div className="user-records flex max-sm:flex-col justify-around mt-10 max-sm:text-base">
              <div className="rating text-xl flex flex-col items-center max-sm:text-base">
                <span>{rating === "" ? "0" : rating}</span>
                <span className="text-lg text-slate-500">Rating</span>
              </div>

              <div className="maxRating text-lg flex flex-col items-center max-sm:text-base">
                <span>{rank}</span>
                <span className="text-lg text-slate-500">Rank</span>
              </div>
              <div className="no-of-contest text-xl flex flex-col items-center max-sm:text-base ">
                <span>{contestCount}</span>
                <span className="text-lg text-slate-500">Contests</span>
              </div>
              <div className="no-of-contest text-xl flex flex-col items-center max-sm:text-base ">
                <span>{maxRating}</span>
                <span className="text-lg text-slate-500">Max Rating</span>
              </div>
            </div>

            <div className="total-worth my-5">
              <h1 className="text-3xl font-semibold text-center mt-2">
                {worth}💲{" "}
              </h1>
              <h1 className="text-2xl font-normal text-center mt-2">
                Estimated Worth
              </h1>
            </div>
            <div className="total-worth">
              <h1 className="text-lg max-sm:text-base text-center my-4">
                <span className="font-semibold ">Get yours</span>{" "}
                codeforces-worth.vercel.app{" "}
              </h1>
            </div>
          </div>
        )
      )}
      {showCard && !loading && (
        <button
          onClick={downloadImage}
          className="flex items-center justify-center w-fit rounded-md p-3 m-2 bg-green-500 text-white text-center text-lg font-normal gap-2 mb-4"
        >
          <LuSave className="font-medium" />
          <p className="font-semibold">Download Image</p>
        </button>
      )}
    </div>
  );
}

export default CodeforcesWorth;
