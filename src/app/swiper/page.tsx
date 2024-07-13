"use client";

import { AnimatedHamburger } from "@/components/AnimatedHamburger";
import CardContainer from "@/components/CardContainer";
import GptResponse from "@/components/GptResponse";
import Toolbar from "@/components/Toolbar";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [isActive, setActive] = useState(false);

  return (
    <div className="bg-gray-100">
      <div className="flex min-h-screen flex-col items-center justify-between">
        <CardContainer />
      </div>

      <div className="fixed right-5 top-5">
        <AnimatedHamburger isActive={isActive} setActive={setActive} />
        <AnimatePresence mode="wait">
          {isActive && <Toolbar setActive={setActive} />}
        </AnimatePresence>
      </div>

      <GptResponse />
    </div>
  );
}
