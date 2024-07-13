import React, { useState, useEffect } from "react";

interface ModalProps {
  id: string;
  isOpen: boolean;
  toggleModal: () => void;
}

function getRandomPlantasticWord(): string {
  const plantasticWords: string[] = [
    "Plantastic", // combining "plant" and "fantastic"
    "Flora-mazing", // combining "flora" and "amazing"
    "Botaniful", // combining "botany" and "beautiful"
    "Verdantastic", // combining "verdant" and "fantastic"
    "Botanicalicious", // combining "botanical" and "delicious"
    "Leaf-tastic", // combining "leaf" and "fantastic"
    "Herb-amazing", // combining "herb" and "amazing"
    "Bloomtastic", // combining "bloom" and "fantastic"
    "Gardenificent", // combining "garden" and "magnificent"
    "Blossomazing", // combining "blossom" and "amazing"
  ];

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * plantasticWords.length);

  // Return the randomly selected word
  return plantasticWords[randomIndex];
}

const Modal: React.FC<ModalProps> = ({ id, isOpen, toggleModal }) => {
  const [randomPlantasticWord, setRandomPlantasticWord] = useState<string>("");

  useEffect(() => {
    // Set the random plantastic word on initial mount
    setRandomPlantasticWord(getRandomPlantasticWord());
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <>
      {/* Hidden checkbox that controls modal visibility */}
      <input
        type="checkbox"
        id={id}
        className="modal-toggle"
        checked={isOpen}
        onChange={toggleModal}
      />

      <div className={`modal ${isOpen ? "open" : ""}`} role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{randomPlantasticWord}</h3>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </>
  );
};

export default Modal;
