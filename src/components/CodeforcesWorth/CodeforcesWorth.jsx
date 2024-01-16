import React, { useCallback, useEffect } from "react";
import { LuBadgeDollarSign } from "react-icons/lu";
import * as htmlToImage from "html-to-image";
import { useRef } from "react";
import { useState } from "react";
import { SiCodeforces } from "react-icons/si";
import codeforcesWorthAlgorithm from "../../algorithms/codeforces-worth-algorithms.js";
import {getNumberOfContests,getNumberOfSubmissions,getUserInfo} from '../../api/codeforces-worth-api.js'

function CodeforcesWorth() {
    const [data,setData] = useState({});
    const [worth,setWorth] = useState(null);
    const [contestCount,setContestCount] = useState(null);



    const onSubmit = async (e) => {
      try {
          e.preventDefault();
          const handle = e.target[0].value;
          const data = await getUserInfo(handle);
          if(!data){
              alert("Invalid Handle");
              return;
          }
          const contestCount = await getNumberOfContests(handle);
          setData(data);
          setContestCount(contestCount);
          const worth = await codeforcesWorthAlgorithm(handle);
            setWorth(worth);
          console.log(worth);
      } catch (error) {
            alert(error.message);
           
            throw error;
      }
    }


  return (
    <div className="flex flex-col items-center justify-center mt-10 ">
      <div className="heading text-4xl font-semibold max-sm:text-2xl mb-3 ">
        Know Your Codeforces worth
      </div>
      <form onSubmit={onSubmit} className="flex flex-col items-center  ">
        <input
          type="text"
          placeholder="Enter your Codeforces handle"
          className="border-2 border-gray-800 rounded-md p-2  m-2 bg-transparent text-white w-full  mx-36 text-lg max-sm:text-lg  max-sm:mx-10"
        ></input>
        <button
          type="submit"
          className="flex items-center justify-center w-fit  rounded-md p-3 m-2 bg-white text-black text-center text-lg font-medium gap-2"
        >
          <LuBadgeDollarSign className="font-medium" />
          <p>Generate Worth</p>
        </button>
      </form>

      {worth && (<div className="codeforces-worth border  border-slate-600 w-[35%] max-sm:w-[90%] h-[55vh] my-6">
        <div className="profile flex justify-center border-b border-slate-600  ">
          <div className="left flex items-center w-1/2  justify-center">
            <img
              src={data.titlePhoto}
              alt="profile-pic"
              className="rounded-full w-28 h-28 max-sm:w-20 max-sm:h-20 mx-4 my-4"
            />
            <div className="about my-4 mx-4 max-sm:mx-0">
              <div className="full-name text-xl max-sm:text-base font-bold">
                {data.firstName} {data.lastName}
              </div>
              <div className="handle text-lg text-slate-400">{data.handle}</div>
              <div className="rating text-lg text-slate-400">
                {data.organization}
              </div>
              {/* <div className="max-rating text-lg text-slate-400">
                Max Rating: {data.maxRating} ({data.maxRank})
              </div> */}
            </div>
          </div>
          <div className="right-flex w-1/2  flex flex-col justify-center items-center   ">
            <SiCodeforces className="text-8xl max-sm:text-3xl" />
            <p className="text-base font-normal">Codeforces Worth</p>
          </div>
        </div>
        <div className="user-records flex justify-around mt-10">
          <div className="rating text-xl flex flex-col items-center">
            <span>{data.rating}</span>
            <span className="text-lg text-slate-500">Rating</span>
          </div>

          <div className="maxRating text-lg flex flex-col items-center">
            <span>{data.rank}</span>
            <span className="text-lg text-slate-500">Rank</span>
          </div>
          <div className="no-of-contest text-xl flex flex-col items-center">
            <span>{contestCount}</span>
            <span className="text-lg text-slate-500">Contests</span>
          </div>
        </div>

        <div className="total-worth my-5">
          <h1 className="text-3xl font-semibold text-center mt-2">{worth}💲 </h1>
          <h1 className="text-2xl font-normal text-center mt-2">
            Estimated Worth
          </h1>
        </div>
        <div className="total-worth">
          <h1 className="text-lg text-center mt-2">
           <span className="font-semibold ">Get yours</span>  codeforces-worth.vercel.app{" "}
          </h1>
        </div>
      </div>)}
    </div>
  );
}

export default CodeforcesWorth;
