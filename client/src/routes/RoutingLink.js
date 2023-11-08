import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ChatApplication from "../pages/ChatApplication";
import Auth from "../pages/Auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";

const RoutingLink = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/chat" element={<ChatApplication />} />
      </Routes>
    </div>
  );
};

export default RoutingLink;
