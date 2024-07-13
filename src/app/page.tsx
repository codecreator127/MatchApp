"use client"

import HomeBackground from "../../public/homeBackgroundGreen.png";
import { AnimatedHambuger } from "@/components/AnimatedHamburger";
import Toolbar from "@/components/Toolbar";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [isActive, setActive] = useState(false);

  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${HomeBackground.src})` }}
    >
      <div className="fixed right-5 top-5">
        <AnimatedHambuger isActive={isActive} setActive={setActive} />
        <AnimatePresence mode="wait">
          {isActive && <Toolbar setActive={setActive} />}
        </AnimatePresence>
      </div>
    </div >
  );
}
