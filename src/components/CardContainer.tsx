"use client";

import React, { useState } from "react";
import Card from "./Card";
import Image from "../../public/test_image.jpeg";
import { AnimatePresence, motion } from "framer-motion";

const cardData = [
  {
    title: "Item 1",
    imgSrc: Image.src,
    imgAlt: "Item 1",
  },
  {
    title: "Item 2",
    imgSrc: Image.src,
    imgAlt: "Item 2",
  },
  {
    title: "Item 3",
    imgSrc: Image.src,
    imgAlt: "Item 3",
  },
  {
    title: "Item 4",
    imgSrc: Image.src,
    imgAlt: "Item 4",
  },
  {
    title: "No more items",
    imgSrc: Image.src,
    imgAlt: "No more items",
  },
];

const CardContainer = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [dragOffset, setDragOffset] = useState(0);

  const handleDragEnd = (offsetX: number) => {
    if (offsetX > 100) {
      setDirection("right");
      setCurrentCard((prev) => (prev === cardData.length - 1 ? 0 : prev + 1));
    } else if (offsetX < -100) {
      setDirection("left");
      setCurrentCard((prev) => (prev === 0 ? cardData.length - 1 : prev - 1));
    }
    setDragOffset(0); // Reset drag offset after changing the card
  };

  return (
    <div className="relative w-[50vw] h-[90vh] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {cardData.map((card, index) => (
          index === currentCard && (
            <motion.div
              key={index}
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "left" ? 50 : -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                title={card.title}
                imgSrc={card.imgSrc}
                imgAlt={card.imgAlt}
                onDragEnd={handleDragEnd}
                dragOffset={dragOffset}
                setDragOffset={setDragOffset}
              />
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CardContainer;
