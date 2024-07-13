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
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (dragDirection: string) => {
    if (dragDirection === "left" || dragDirection === "right") {
      setDirection(dragDirection);
      setIsDragging(false); // Reset dragging state after drag ends
      if (currentCard === cardData.length - 1) {
        setCurrentCard(cardData.length - 1);
      } else if (dragDirection === "left") {
        setCurrentCard((prev) => (prev === 0 ? cardData.length - 1 : prev - 1));
      } else {
        setCurrentCard((prev) => (prev === cardData.length - 1 ? 0 : prev + 1));
      }
    }
  };

  return (
    <div className="relative w-[50vw] h-[90vh] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: index === currentCard ? 1 : 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === "left" ? 100 : -100 }}
            transition={{ duration: 0.5 }}
            drag={isDragging ? "x" : false}
            dragElastic={0.1}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(event, info) => {
              const { offset } = info;
              if (offset.x > 100) {
                handleDragEnd("right");
              } else if (offset.x < -100) {
                handleDragEnd("left");
              } else {
                setIsDragging(false);
              }
            }}
          >
            {index === currentCard && (
              <Card
                title={card.title}
                imgSrc={card.imgSrc}
                imgAlt={card.imgAlt}
                onDragEnd={handleDragEnd}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CardContainer;
