import React from "react";
import { SiCodeforces } from "react-icons/si";
import { SiGithub } from "react-icons/si";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#020817] p-4 border-b  border-slate-600">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white font-bold text-lg flex items-center gap-2"
        >
          <SiCodeforces className="text-5xl max-sm:text-3xl" />
          <span className="ml-2 text-4xl max-sm:text-xl">Codeforces Worth</span>
        </Link>

        <div className="space-x-4 flex items-center">
          <Link
            to="/"
            className="text-white hover:text-gray-300 text-3xl max-sm:text-xl hover:bg-slate-800 rounded-md p-2 max-sm:hidden"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-gray-300 text-3xl hover:bg-slate-800 rounded-md p-2 max-sm:hidden"
          >
            About
          </Link>
          <Link
            to="www.github.com/aialok"
            className="text-white hover:text-gray-300 text-3xl hover:bg-slate-800 rounded-md p-2 "
          >
            <SiGithub />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
