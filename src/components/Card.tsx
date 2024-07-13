"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface CardProps {
  title: string;
  imgSrc: string;
  imgAlt: string;
  onDragEnd: (offsetX: number) => void;
  dragOffset: number;
  setDragOffset: (offset: number) => void;
}

const Card: React.FC<CardProps> = ({ title, imgSrc, imgAlt, onDragEnd, dragOffset, setDragOffset }) => {
  const controls = useAnimation();
  const [isLeaning, setIsLeaning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isLeaning) return;

      if (event.key === "ArrowRight") {
        setIsLeaning(true);
        controls.start({
          rotate: 5,
          originX: "0%",
          originY: "100%",
          translateX: 10,
          transition: { duration: 0.5 },
        });
      } else if (event.key === "ArrowLeft") {
        setIsLeaning(true);
        controls.start({
          rotate: -5,
          originX: "100%",
          originY: "100%",
          translateX: -10,
          transition: { duration: 0.5 },
        });
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (
        isLeaning &&
        (event.key === "ArrowRight" || event.key === "ArrowLeft")
      ) {
        setIsLeaning(false);
        controls.start({
          rotate: 0,
          translateX: 0,
          transition: { duration: 0.5 },
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [controls, isLeaning]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (event: any, info: any) => {
    const { offset } = info;
    setDragOffset(offset.x);
    if (offset.x > 0) {
      controls.start({
        rotate: 5,
        originX: "0%",
        originY: "100%",
        translateX: 10,
        transition: { duration: 0.2 },
      });
    } else if (offset.x < 0) {
      controls.start({
        rotate: -5,
        originX: "100%",
        originY: "100%",
        translateX: -10,
        transition: { duration: 0.2 },
      });
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    const { offset } = info;
    onDragEnd(offset.x);

    controls.start({
      rotate: 0,
      translateX: 0,
      transition: { duration: 0.5 },
    });
  };

  return (
    <motion.div
      className={`card bg-base-100 shadow-xl relative overflow-hidden group ${isDragging ? "dragging" : ""} w-full h-full`}
      animate={controls}
      drag="x"
      dragElastic={0.1}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{ x: dragOffset }}
    >
      <div className="w-full h-full">
        <img
          style={{ pointerEvents: "none" }}
          src={imgSrc}
          alt={imgAlt}
          className="w-full h-full object-cover transition-all duration-300 brightness-80 group-hover:brightness-50"
        />
        <div className="absolute bottom-0 left-0 p-4">
          <h2 className="text-white font-sans">{title}</h2>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
