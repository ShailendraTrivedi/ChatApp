import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { BsSearch } from "react-icons/bs";
import { db } from "../../firebase.config";

const LeftSide = ({ chatting, handleSelectUser }) => {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchText) {
        const q = query(
          collection(db, "users"),
          where("userName", "==", searchText)
        );
        try {
          const querySnapshot = await getDocs(q);
          const usersData = [];
          querySnapshot.forEach((doc) => {
            usersData.push(doc.data());
          });
          setUsers(usersData);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };
    handleSearch();
  }, [searchText]);

  return (
    <div>
      <div className="w-full h-full p-5 overflow-y-scroll bg-gray-50 select-none">
        <div className="space-y-10">
          <div className="relative">
            <span className="absolute top-3 left-3">
              <BsSearch size={20} />
            </span>
            <input
              type="text"
              className="input w-full ps-10 p-2 rounded-full"
              placeholder="Search User Here..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            {users.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  handleSelectUser(item, "user");
                }}
                className="flex gap-2 items-center px-5 w-full hover:bg-gray-200 rounded p-2"
              >
                <div className="relative h-12 w-12 rounded-full bg-black">
                  <img src={item.userImg} alt={item.userName} />
                  {item.online && (
                    <span className="absolute bottom-0 right-0 h-2 w-2 bg-[green] m-1 rounded-full" />
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="text-xl">{item.userName}</div>
                </div>
              </div>
            ))}

            {Object.entries(chatting).map(([_, chatInfo], i) => (
              <div
                key={i}
                onClick={() => {
                  handleSelectUser(chatInfo.userInfo);
                }}
                className="flex gap-2 items-center px-5 w-full hover:bg-gray-200 rounded p-2"
              >
                <div className="relative h-12 w-12 rounded-full bg-black">
                  <img
                    src={chatInfo.userInfo.userImg}
                    alt={chatInfo.userInfo.userName}
                  />
                  {chatInfo.online && (
                    <span className="absolute bottom-0 right-0 h-2 w-2 bg-[green] m-1 rounded-full" />
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="text-xl">{chatInfo.userInfo.userName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
