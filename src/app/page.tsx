
"use client";

import { auth } from "../../firebase/firebase";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";

export default function Home() {
  return (
    <div>
      <Login auth={auth} />
      <SignUp auth={auth} />
    </div>
    </>
  );
}
