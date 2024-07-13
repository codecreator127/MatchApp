"use client";

import { useState } from "react";
import Preferences from "@/components/Preference";

export default function Preference() {
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
