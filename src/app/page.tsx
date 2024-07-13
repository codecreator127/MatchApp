"use client";

import HomeBackground from "../../public/homeBackgroundGreen.png";
import { AnimatedHamburger } from "@/components/AnimatedHamburger";
import Toolbar from "@/components/Toolbar";
import { AnimatePresence } from "framer-motion";
import Preferences from "@/components/Preference";

import { auth } from "../../firebase/firebase";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import GptResponse from "@/components/GptResponse";

export default function Home() {
  return (
    <>
      <div className="h-screen w-screen">
        <div className="h-full w-2/5 mx-auto flex justify-center items-center">
          <GptResponse />
        </div>
      </div>
    </>
  );
}
