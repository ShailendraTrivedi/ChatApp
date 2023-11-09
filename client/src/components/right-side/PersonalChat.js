import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLink, AiOutlineSend } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { db, storage } from "../../firebase.config";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ref } from "firebase/database";

const PersonalChat = ({ currentUser, idSelected, message }) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const ref = useRef();

  // console.log({ currentUser, idSelected , message });

  const handleSendMessage = async () => {
    if (text.trim() === "") {
      return;
    }

    try {
      const chatDocRef = doc(db, "chats", idSelected);

      const chatDocSnapshot = await getDoc(chatDocRef);
      if (!chatDocSnapshot.exists()) {
        await setDoc(chatDocRef, { messages: [] });
      }

      if (img) {
        const storageRef = ref(storage, new Date().getDate());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Upload progres s, if needed
          },
          (error) => {
            // console.error("Error uploading image:", error);
          },
          async () => {
            // Upload completed
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateDoc(chatDocRef, {
              messages: arrayUnion({
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          }
        );
      } else {
        await updateDoc(chatDocRef, {
          messages: arrayUnion({
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
    } catch (error) {
      // console.error("Error sending message:", error);
    }

    // await updateDoc;(doc(db,"chats",currentUser.uid),{
    //   [idSelected]
    // })
    setText("");
    setImg(null);
  };

  useEffect(() => {
    const container = ref.current;
    container.scrollTop = container.scrollHeight;
  }, [message]);

  return (
    <div ref={ref} className="flex flex-col justify-between h-full">
      <div className="sm:h-[32.5rem] h-[38rem] py-1 px-2">
        <div className="flex flex-col gap-2 h-full w-full overflow-y-scroll">
          {message.map((item, i) => {
            return (
              <div
                key={i}
                className={`flex ${
                  item.senderId === currentUser.uid
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div className="bg-[rgb(0,171,228)] max-w-[60%] text-white rounded-xl p-2">
                  {item.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-[3rem] bg-gray-300 rounded-br-3xl w-full flex sm:gap-5 gap-2 items-center sm:px-5 px-3">
        <BsEmojiSmile size={25} />
        <label htmlFor="uploadImg" className="">
          <AiOutlineLink size={25} />
          <input
            id="uploadImg"
            type="file"
            onClick={(e) => e.target.files[0]}
            className="hidden"
          />
        </label>
        <div className="w-full flex sm:gap-5 gap-2 justify-between items-center">
          <input
            type="text"
            className="w-full h-10 outline-none px-2"
            placeholder="Write a message...."
            onChange={(e) => setText(e.target.value)}
          />
          <AiOutlineSend size={25} onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default PersonalChat;
