import React from "react";
import RoutingLink from "./routes/RoutingLink";
import { auth } from "./firebase.config";

const App = () => {
  console.log(auth.lastNotifiedUid)
  return (
    <div className="">
      <RoutingLink />
    </div>
  );
};

export default App;
