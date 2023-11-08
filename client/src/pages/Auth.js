import React, { useState } from "react";
import SignIn from "../components/signin/SignIn";
import SignUp from "../components/signup/SignUp";

const Auth = () => {
  const [flag, setFlag] = useState(true);
  return (
    <div className="h-screen select-none">
      <div className="h-full w-full flex justify-center items-center">
        {flag ? <SignIn setFlag={setFlag} /> : <SignUp setFlag={setFlag} />}
      </div>
    </div>
  );
};

export default Auth;
