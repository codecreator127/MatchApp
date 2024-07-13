"use client"

import { AnimatedHamburger } from "@/components/AnimatedHamburger";
import Orders from "@/components/Orders";
import Toolbar from "@/components/Toolbar";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

// below are possible ways to add the coloured overlay using css (which would make it easy to change themes)
// currently the green background is part odf the image because text appears behind the coloured overlay otherwise.
// , boxShadow: "inset 0 0 0 1000px rgba(0,55,0,.2)"
// <div className="fixed top-0 left-0 w-48 h-full z-0 bg-base-100 z-0 opacity-80"></div>

export default function Ordering() {
  const [isActive, setActive] = useState(false);

  return (
    <div className="h-screen w-screen">
      <div className="h-full w-2/5 mx-auto flex justify-center items-center">
        <Orders />
      </div>

      <div className="fixed right-5 top-5">
        <AnimatedHamburger isActive={isActive} setActive={setActive} />
        <AnimatePresence mode="wait">
          {isActive && <Toolbar setActive={setActive} />}
        </AnimatePresence>
      </div>
    </div>

  );
}
