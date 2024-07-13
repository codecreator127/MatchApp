"use client";

import React, { useState } from "react";
import Card from "./Card";
import { AnimatePresence, motion } from "framer-motion";
import { cardData } from "../constants/cardData";
import { searchImages } from "../app/api/pixabay/route"

const CardContainer = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [dragOffset, setDragOffset] = useState(0);

  const query = "snake+plant";

  React.useEffect(() => {
    searchImages(query);
  }, []);

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
                  age={card.age}
                  type={card.type}
                  needs={card.needs}
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
