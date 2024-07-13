"use client";

import { auth } from "../../../firebase/firebase";
import SignUp from "@/components/SignUp";

const SignUpPage = () => {
  return <SignUp auth={auth} />;
};

export default SignUpPage;
