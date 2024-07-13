import React, { useState, useEffect } from "react";
import Card from "./Card";
import Image from "../../public/test_image.jpeg";
import { AnimatePresence, motion } from "framer-motion";

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
} from "firebase/firestore";

interface Preferences {
  [key: string]: string;
}

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

// Function to fetch the first document in the preferences collection
async function fetchFirstPreferencesMap(userId: string) {
  try {
    // Reference to the preferences collection
    const prefsCollectionRef = collection(db, `users/${userId}/preferences`);

    console.log("Preferences Collection Reference:", prefsCollectionRef);

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

        console.log(transformedString);
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

  const user = auth.currentUser;

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

  function processGPTResponse() {}

  async function generatePlants() {
    const preferences = await fetchUserPreferences();
    console.log(preferences);

    if (preferences) {
      const output = await gptCall(preferences);
      console.log(typeof output);
      return output;
    }
  }

  useEffect(() => {
    // Call generatePlants function once when component mounts
    generatePlants();
  }, [user]); // Empty dependency array ensures this effect runs only once

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
