import React from "react";

/** Icons */
import { BsChat } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";

const Sidebar = () => {
  return (
    <div className="w-[5rem] bg-black flex flex-col justify-between items-center text-white h-full py-5">
      <div className="flex flex-col items-center gap-20">
        <div className="relative h-12 w-12 rounded-full bg-white">
          <img src="" alt="" className="" />
          <span className="absolute bottom-0 right-0 h-2 w-2 bg-[green] m-1 rounded-full" />
        </div>
        <div className="space-y-5">
          <FaRegUser size={25} />
          <BsChat size={25} />
        </div>
      </div>
      <div className="">
        <AiOutlineSetting size={30} />
      </div>
    </div>
  );
};

export default Sidebar;
