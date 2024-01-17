import React from "react";
import { SiCodeforces, SiGithub,SiBuymeacoffee } from "react-icons/si";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#020817] p-4 border-b border-slate-600">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg flex items-end gap-2 flex-col">
          <Link to="/">
            <span className="ml-2 text-4xl max-sm:text-xl flex items-center= gap-4">
              <SiCodeforces className="text-5xl max-sm:text-3xl" />
              Codeforces Worth
            </span>
          </Link>
          <span className="text-xs">Made with ❤️ by aialok</span>
        </div>
        <div className="space-x-2 flex items-center">
          <a
            href="https://www.github.com/aialok"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 text-3xl hover:bg-slate-800 rounded-md p-2"
          >
            <SiGithub className="text-3xl" />
          </a>
          <a
            href="https://www.buymeacoffee.com/aialok"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 text-3xl hover:bg-slate-800 rounded-md p-2"
          >
            <SiBuymeacoffee className="text-3xl" />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
