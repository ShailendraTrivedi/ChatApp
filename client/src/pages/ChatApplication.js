import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import LeftSide from "../components/left-side/LeftSide";
import RightSide from "../components/right-side/RightSide";
import { auth, db } from "../firebase.config";
import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ChatApplication = () => {
  const navigate = useNavigate();
  const [userSelected, setUserSelected] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("uid"));

  const handleSelectUser = async (selectedUser) => {
    console.log({ selectedUser, currentUser });

    setUserSelected(selectedUser);

    const combinedId =
      currentUser.uid < selectedUser.uid
        ? `${currentUser.uid}_${selectedUser.uid}`
        : `${selectedUser.uid}_${currentUser.uid}`;

    try {
      const chatDoc = doc(db, "chats", combinedId);
      const chatDocSnapshot = await getDoc(chatDoc);

      if (!chatDocSnapshot.exists()) {
        // Create a new chat document if it doesn't exist
        await setDoc(chatDoc, { messages: [] });
      }

      // Update userChats for the current user
      const currentUserChatDoc = doc(db, "userChats", currentUser.uid);
      await updateDoc(currentUserChatDoc, {
        [combinedId]: {
          userInfo: {
            uid: selectedUser.uid,
            userName: selectedUser.userName,
            userImg: selectedUser.userImg,
          },
          data: serverTimestamp(),
        },
      });

      // Update userChats for the selected user
      const selectedUserChatDoc = doc(db, "userChats", selectedUser.uid);
      await updateDoc(selectedUserChatDoc, {
        [combinedId]: {
          userInfo: {
            uid: currentUser.uid,
            userName: currentUser.displayName,
            userImg: currentUser.photoURL,
          },
          data: serverTimestamp(),
        },
      });
    } catch (error) {
      console.error("Error selecting user:", error);
    }
  };

  const [chatting, setChatting] = useState([]);
  useEffect(() => {
    const getChats = () => {
      const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChatting(doc.data());
      });

      return () => {
        unSub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  return (
    <div className="relative min-h-screen bg-[rgb(0,171,228)] flex justify-center items-center">
      <div className="sm:w-[80%] sm:h-[40rem] w-full m-2 h-[50rem] bg-white rounded-3xl  flex overflow-hidden">
        <Sidebar />
        <div className="w-full h-full grid sm:grid-cols-3 grid-cols-1">
          <LeftSide chatting={chatting} handleSelectUser={handleSelectUser} />
          <div className="col-span-2 sm:flex hidden">
            <RightSide
              selectedUser={userSelected}
              chatting={chatting}
              setChatting={setChatting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApplication;
