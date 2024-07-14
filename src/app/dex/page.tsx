"use client";

import PlantDex from "@/components/PlantDev";

import { AnimatedHamburger } from "@/components/AnimatedHamburger";
import Toolbar from "@/components/Toolbar";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const LoginPage = () => {
  const [isActive, setActive] = useState(false);
  return (
    <>
      <PlantDex />

      <div className="fixed right-5 top-5">
        <AnimatedHamburger isActive={isActive} setActive={setActive} />
        <AnimatePresence mode="wait">
          {isActive && <Toolbar setActive={setActive} />}
        </AnimatePresence>
      </div>
    </>
  );
};

export default LoginPage;
