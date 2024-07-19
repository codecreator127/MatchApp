import React, { useState, useEffect } from "react";
import Card from "./Card";
import { AnimatePresence, motion } from "framer-motion";
import { searchImages } from "../app/api/pixabay/route";

import { auth, db } from "../../firebase/firebase";
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import Modal from "./NewMembers";
import { useRouter } from "next/navigation";

// Function to fetch the first document in the preferences collection
async function fetchFirstPreferencesMap(userId: string) {
  try {
    // Reference to the preferences collection
    const prefsCollectionRef = collection(db, `users/${userId}/preferences`);

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

      const preferencesMap = await fetchFirstPreferencesMap(userId);

      if (preferencesMap) {
        const newPreferencesMap = new Map<string, string>(
          Object.entries(preferencesMap)
        );

        const transformedString = Array.from(newPreferencesMap.entries())
          .map(([preference, value]) => `${value} ${preference}`)
          .join(", ");

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

// effects
const applyRedGlow = () => {
  // Create a div element for the red overlay
  const redOverlay = document.createElement("div");

  // Apply styles to the overlay to cover the entire screen and give it a red glow
  redOverlay.style.position = "fixed";
  redOverlay.style.top = "0";
  redOverlay.style.left = "0";
  redOverlay.style.width = "100vw";
  redOverlay.style.height = "100vh";
  redOverlay.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
  redOverlay.style.zIndex = "9999";
  redOverlay.style.pointerEvents = "none";
  redOverlay.style.boxShadow = "0 0 20px 10px rgba(255, 0, 0, 0.75)";

  // Add an ID to the overlay for future reference (optional)
  redOverlay.id = "red-glow-overlay";

  // Append the overlay to the body
  document.body.appendChild(redOverlay);
};

// Function to remove the red glow effect
const removeRedGlow = () => {
  const redOverlay = document.getElementById("red-glow-overlay");
  if (redOverlay) {
    document.body.removeChild(redOverlay);
  }
};

const applyGreenGlow = () => {
  // Create a div element for the red overlay
  const redOverlay = document.createElement("div");

  // Apply styles to the overlay to cover the entire screen and give it a red glow
  redOverlay.style.position = "fixed";
  redOverlay.style.top = "0";
  redOverlay.style.left = "0";
  redOverlay.style.width = "100vw";
  redOverlay.style.height = "100vh";
  redOverlay.style.backgroundColor = "rgba(201, 242, 155, 0.5)";
  redOverlay.style.zIndex = "9999";
  redOverlay.style.pointerEvents = "none";
  redOverlay.style.boxShadow = "0 0 20px 10px rgba(201, 242, 155, 0.75)";

  // Add an ID to the overlay for future reference (optional)
  redOverlay.id = "red-glow-overlay";

  // Append the overlay to the body
  document.body.appendChild(redOverlay);
};

// Function to remove the red glow effect
const removeGreenGlow = () => {
  const redOverlay = document.getElementById("red-glow-overlay");
  if (redOverlay) {
    document.body.removeChild(redOverlay);
  }
};

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

    if (preferences) {
      const output = await gptCall(preferences);
      const plantMap = parsePlants(output);
      return plantMap;
    }
  }
  const user = auth.currentUser;

  const [cardData, setCardData] = useState<
    { name: string; plantType: string; caringGuide: string; imgSrc: string }[]
  >([
    {
      name: "Birds of Paradise",
      plantType: "Tropical Flowering Plant",
      caringGuide: "Place in bright, indirect light.",
      imgSrc:
        "https://images.immediate.co.uk/production/volatile/sites/10/2021/04/2048x1365-Strelitzia-reginae-GettyImages-1270647929-4f76714.jpg?quality=90&webp=true&resize=1880,1254",
    },
    {
      name: "Peace Lily",
      plantType: "Tropical Flowering Plant",
      caringGuide: "Prefers shade and weekly watering.",
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/b/bd/Spathiphyllum_cochlearispathum_RTBG.jpg",
    },
  ]);

  // function to replace whitespaces with '+' in the search query
  const replaceSpaces = (query: string) => {
    return query.replace(/\s/g, "+");
  };

  useEffect(() => {
    generatePlants()
      .then(async (data) => {
        if (data) {
          // Extract existing names from current cardData
          const existingNames = cardData.map((item) => item.name);

          // Filter data to include only items whose names are not in cardData
          const uniqueItems = data.filter(
            (item) => !existingNames.includes(item.name)
          );

          // Concatenate cardData and uniqueItems, then update state
          setCardData((prevCardData) => [
            ...prevCardData,
            ...uniqueItems.map((item) => ({ ...item, imgSrc: "" })),
          ]);

          for (let i = 0; i < cardData.length; i++) {
            const searchQuery = replaceSpaces(cardData[i].name);
            const images = await searchImages(searchQuery);
            cardData[i].imgSrc = images.hits[0].webformatURL;
          }
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

      applyGreenGlow();
      setTimeout(removeGreenGlow, 500);

      toggleModal();

      setTimeout(() => {
        navigateToOrders(
          cardData[currentCard].name,
          cardData[currentCard].imgSrc,
          cardData[currentCard].caringGuide,
          cardData[currentCard].plantType
        );
      }, 500);
    } else if (offsetX < -100) {
      setDirection("left");
      // Function when swiping left (ignore)

      applyRedGlow();
      // Remove the glow after 3 seconds (example)
      setTimeout(removeRedGlow, 500);

      generatePlants()
        .then(async (data) => {
          if (data) {
            // Extract existing names from current cardData
            const existingNames = cardData.map((item) => item.name);

            for (let i = 0; i < cardData.length; i++) {
              const searchQuery = replaceSpaces(cardData[i].name);
              const images = await searchImages(searchQuery);
              cardData[i].imgSrc = images.hits[0].webformatURL;
            }

            // Filter data to include only items whose names are not in cardData
            const uniqueItems = data.filter(
              (item) => !existingNames.includes(item.name)
            );

            // Concatenate cardData and uniqueItems, then update state
            setCardData((prevCardData) => [
              ...prevCardData,
              ...uniqueItems.map((item) => ({ ...item, imgSrc: "" })),
            ]);
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
                  type={card.plantType}
                  description={card.caringGuide}
                  title={card.name}
                  imgSrc={card.imgSrc}
                  imgAlt={card.name}
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
