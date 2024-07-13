"use client";

import { auth } from "../../../firebase/firebase";
import Login from "@/components/Login";

const LoginPage = () => {
  return <Login auth={auth} />;
};

export default LoginPage;
