import HomeBackground from "../../public/homeBackgroundGreen.png";
import { AnimatedHambuger } from "@/components/AnimatedHamburger";
import Toolbar from "@/components/Toolbar";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Preferences from "@/components/Preference";

import { auth } from "../../firebase/firebase";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";

export default function Home() {
  const [isActive, setActive] = useState(false);

  return (
    <>
      <div className="h-screen w-screen">
        <div className="h-full w-2/5 mx-auto flex justify-center items-center">
          <Preferences />
        </div>
    </div>
    </>
  );
}
