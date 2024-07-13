"use client";

import React, { useState } from "react";
import Card from "./Card";
import Image from "../../public/test_image.jpeg";
import { AnimatePresence, motion } from "framer-motion";

// Data for each card
const cardData = [
  {
    title: "Item 1",
    description: "Description 1",
    imgSrc: Image.src,
    imgAlt: "Item 1",
  },
  {
    title: "Item 2",
    description: "Description 2",
    imgSrc: Image.src,
    imgAlt: "Item 2",
  },
  {
    title: "Item 3",
    description: "Description 3",
    imgSrc: Image.src,
    imgAlt: "Item 3",
  },
  {
    title: "Item 4",
    description: "Description 4",
    imgSrc: Image.src,
    imgAlt: "Item 4",
  },
  {
    title: "No more items",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imgSrc: Image.src,
    imgAlt: "No more items",
  },
];

const CardContainer = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [dragOffset, setDragOffset] = useState(0);

  const handleDragEnd = (offsetX: number) => {
    setCurrentCard((prev) => (prev === cardData.length - 1 ? 0 : prev + 1));
    if (offsetX > 100) {
      setDirection("right");
      // Function whe  swiping right (accept)
    } else if (offsetX < -100) {
      setDirection("left");
      // Function when swiping left (ignore)
    }
    setDragOffset(0); // Reset drag offset after changing the card
  };

  return (
    <div className="relative w-[50vw] h-[90vh] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {cardData.map(
          (card, index) =>
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
                  description={card.description}
                  imgSrc={card.imgSrc}
                  imgAlt={card.imgAlt}
                  onDragEnd={handleDragEnd}
                  dragOffset={dragOffset}
                  setDragOffset={setDragOffset}
                />
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardContainer;

