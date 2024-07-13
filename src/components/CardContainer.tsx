import React, { useState, useEffect } from "react";
import Card from "./Card";
import { AnimatePresence, motion } from "framer-motion";
import { cardData } from "../constants/cardData";
import { searchImages } from "../app/api/pixabay/route";

import { auth, db } from "../../firebase/firebase";
import {
  doc,
  collection,
  addDoc,
  getDoc,
  query,
  orderBy,
  getDocs,
  limit,
  updateDoc,
} from "firebase/firestore";
import Modal from "./MatchPopUp";
import { useRouter } from "next/navigation";

interface Preferences {
  [key: string]: string;
}

interface Plant {
  name: string;
  plantType: string;
  caringGuide: string;
}

// Function to fetch the first document in the preferences collection
async function fetchFirstPreferencesMap(userId: string) {
  try {
    // Reference to the preferences collection
    const prefsCollectionRef = collection(db, `users/${userId}/preferences`);

    // console.log("Preferences Collection Reference:", prefsCollectionRef);

    // Query to get the first document ordered by __name__ and limit to 1
    const q = query(prefsCollectionRef, orderBy("__name__"), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Get the first document
      const doc = querySnapshot.docs[0];
      return doc.data().transformedData;
    } else {
      console.log("No documents found in the preferences collection!");
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return undefined;
  }
}

// Function to handle fetching and logging preferences map for the current user
async function fetchUserPreferences() {
  try {
    const user = await auth.currentUser;

    if (user) {
      const userId = user.uid;
      console.log("User ID:", userId);

      const preferencesMap = await fetchFirstPreferencesMap(userId);

      if (preferencesMap) {
        const newPreferencesMap = new Map<string, string>(
          Object.entries(preferencesMap)
        );

        const transformedString = Array.from(newPreferencesMap.entries())
          .map(([preference, value]) => `${value} ${preference}`)
          .join(", ");

        // console.log(transformedString);
        return transformedString;
      } else {
        console.log("No preferences found for the user.");
      }
    } else {
      console.log("No user is currently signed in.");
    }
  } catch (error) {
    console.error("Error fetching user preferences:", error);
  }

  return ""; // Return empty string if preferences cannot be fetched or user not logged in
}

const CardContainer = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function gptCall(preferences: string) {
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ preferences }),
      });

      console.log("RESPONSE", response);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
      setError("Error: Could not fetch response");
    } finally {
      setLoading(false);
    }
  }

  function parsePlants(
    text: string
  ): { name: string; plantType: string; caringGuide: string }[] {
    const plantEntries = text.split(/\d+\.\s+/); // Split text based on numbers followed by a dot and optional whitespace

    const plants = plantEntries.map((entry) => {
      const lines = entry.trim().split("\n");
      const plantInfo: {
        name: string;
        plantType: string;
        caringGuide: string;
      } = { name: "", plantType: "", caringGuide: "" };

      lines.forEach((line) => {
        if (line.startsWith("Name:")) {
          plantInfo.name = line.split(": ")[1].trim();
        } else if (line.startsWith("Plant Type:")) {
          plantInfo.plantType = line.split(": ")[1].trim();
        } else if (line.startsWith("Caring Guide:")) {
          plantInfo.caringGuide = line.split(": ")[1].trim();
        }
      });

      return plantInfo;
    });

    return plants.filter(
      (plant) =>
        plant.name !== "" && plant.plantType !== "" && plant.caringGuide !== ""
    );
  }

  async function generatePlants() {
    const preferences = await fetchUserPreferences();
    // console.log(preferences);

    if (preferences) {
      const output = await gptCall(preferences);
      // console.log(output);

      const plantMap = parsePlants(output);
      // console.log(plantMap);
      return plantMap;
    }
  }
  const user = auth.currentUser;

  const [cardData, setCardData] = useState<
    { name: string; plantType: string; caringGuide: string }[]
  >([
    {
      name: "Bird of Paradise",
      plantType: "Tropical Flowering Plant",
      caringGuide: "Place in bright, indirect light.",
    },
    {
      name: "Areca Palm",
      plantType: "Tropical Palm Tree",
      caringGuide: "Thrives in bright, indirect light.",
    },
    {
      name: "Peace Lily",
      plantType: "Tropical Flowering Plant",
      caringGuide: "Prefers shade and weekly watering.",
    },
  ]);

  useEffect(() => {
    generatePlants()
      .then((data) => {
        if (data) {
          // Extract existing names from current cardData
          const existingNames = cardData.map((item) => item.name);

          // console.log(existingNames);

          // Filter data to include only items whose names are not in cardData
          const uniqueItems = data.filter(
            (item) => !existingNames.includes(item.name)
          );

          // console.log(uniqueItems);

          // Concatenate cardData and uniqueItems, then update state
          setCardData((prevCardData) => [...prevCardData, ...uniqueItems]);
          console.log(cardData);
        }
      })
      .catch((error) => {
        console.error("Error in generatePlants:", error);
        // Optionally handle error state or rethrow if necessary
      });
    // Call generatePlants function once when component mounts
  }, [user]); // Empty dependency array ensures this effect runs only once

  const [currentCard, setCurrentCard] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [dragOffset, setDragOffset] = useState(0);

  const query = "snake+plant";

  React.useEffect(() => {
    searchImages(query);
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const router = useRouter();

  const navigateToOrders = (
    plantName: string,
    imageUrl: string,
    guide: string,
    type: string
  ) => {
    const queryParams = {
      name: plantName,
      image: imageUrl,
      guide: guide,
      type: type,
    }; // Ensure query parameters are strings
    const queryString = new URLSearchParams(queryParams).toString();
    const href = `/ordering?${queryString}`;
    router.push(href);
  };

  const handleDragEnd = (offsetX: number) => {
    setCurrentCard((prev) => (prev === cardData.length - 1 ? 0 : prev + 1));
    if (offsetX > 100) {
      setDirection("right");
      // Function whe  swiping right (accept)
      toggleModal();

      setTimeout(() => {
        navigateToOrders(
          cardData[currentCard].name,
          "https://media.post.rvohealth.io/wp-content/uploads/2022/01/snake-plant-detail-732x549-thumbnail-732x549.jpg",
          cardData[currentCard].caringGuide,
          cardData[currentCard].plantType
          // cardData[currentCard].image
        );
      }, 1000);
    } else if (offsetX < -100) {
      setDirection("left");
      // Function when swiping left (ignore)

      generatePlants()
        .then((data) => {
          if (data) {
            // Extract existing names from current cardData
            const existingNames = cardData.map((item) => item.name);

            // console.log(existingNames);

            // Filter data to include only items whose names are not in cardData
            const uniqueItems = data.filter(
              (item) => !existingNames.includes(item.name)
            );

            // console.log(uniqueItems);

            // Concatenate cardData and uniqueItems, then update state
            setCardData((prevCardData) => [...prevCardData, ...uniqueItems]);

            console.log(cardData);
          }
        })
        .catch((error) => {
          console.error("Error in generatePlants:", error);
          // Optionally handle error state or rethrow if necessary
        });
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
                  age={0}
                  description={card.caringGuide}
                  title={card.name}
                  imgSrc={card.plantType}
                  imgAlt={card.name}
                  onDragEnd={handleDragEnd}
                  dragOffset={dragOffset}
                  setDragOffset={setDragOffset}
                  type={""}
                  needs={""}
                />
              </motion.div>
            )
        )}
      </AnimatePresence>
      <Modal id="my_modal_7" isOpen={modalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default CardContainer;
