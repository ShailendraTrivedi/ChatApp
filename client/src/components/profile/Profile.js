import React from "react";
import Sidebar from "../sidebar/Sidebar";

const Profile = () => {
  return (
    <div>
      <div className="absolute transform sm:translate-x-[25%] translate-x-0 sm:translate-y-10 translate-y-0 z-10 bg-transparent select-none">
        <div className="relative flex justify-center items-center">
          <div className="sm:w-[60rem] sm:h-[40rem] w-full m-2 h-[45rem] bg-white rounded-3xl  flex overflow-hidden">
            <Sidebar />
            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
