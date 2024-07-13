"use client";

import { useEffect, useState } from "react";
import Search from "@/components/Search";
import ResultCard from "@/components/ResultCard";
import { Box, Stack, Typography } from "@mui/material";
import { searchImages } from "../api/pixabay/route";

function setError(arg0: string) {
  throw new Error("Function not implemented.");
}

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

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

function parsePlants(text: string): {
  imgUrl: any;
  name: string;
  plantType: string;
  caringGuide: string;
}[] {
  const plantEntries = text.split(/\d+\.\s+/); // Split text based on numbers followed by a dot and optional whitespace

  const plants = plantEntries.map((entry) => {
    const lines = entry.trim().split("\n");
    const plantInfo: {
      name: string;
      plantType: string;
      caringGuide: string;
      imgUrl: string;
    } = { name: "", plantType: "", caringGuide: "", imgUrl: "" };

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

async function generatePlants(scenario: string) {
  const output = await gptCall(scenario);
  const plantMap = parsePlants(output);
  return plantMap;
}

const replaceSpaces = (query: string) => {
  return query.replace(/\s/g, "+");
};

export default function Home() {
  const [search, setSearch] = useState("");

  const [cardData, setCardData] = useState<
    { name: string; plantType: string; caringGuide: string; imgUrl: string }[]
  >([
    {
      name: "Birds of Paradise",
      plantType: "Tropical Flowering Plant",
      caringGuide: "Place in bright, indirect light.",
      imgUrl:
        "https://pixabay.com/get/g3c17b692fc2658adefb832447f7830f9a7b8bf4c8b0e831ac6630dcb371c45ca5c261d0f0cc31dda916b6f606b9d8cec98015d02d4b7ccd7d62a03aac791e9e4_640.jpg",
    },
    {
      name: "Areca Palm",
      plantType: "Tropical Palm Tree",
      caringGuide: "Thrives in bright, indirect light.",
      imgUrl:
        "https://pixabay.com/get/g258ae454b5cbc21dfcc2c2d31716d9cf886a3d0d8048c8e7564aa13218dfd3d85ca665176ee9cbe893c9dfefb9f654da59179838198521139ad29300573aa6c0_640.jpg",
    },
    {
      name: "Peace Lily",
      plantType: "Tropical Flowering Plant",
      caringGuide: "Prefers shade and weekly watering.",
      imgUrl:
        "https://pixabay.com/get/g579303d31bd7933116aeec7a45ce423c76b080d20e094db917856fa9006330ae6466c797574f1dc51c49f4c6fb74ee5b238c3650d77352d3a7cc9e4d818e5e70_640.jpg",
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await generatePlants(search);

        if (data) {
          // Update cardData with imgSrc included
          const updatedCardData = await Promise.all(
            data.map(async (plant) => {
              const searchQuery = replaceSpaces(plant.name);
              const images = await searchImages(searchQuery);
              plant.imgUrl = images.hits[0]?.webformatURL || ""; // Ensure to handle case where images.hits[0] is undefined
              return plant;
            })
          );

          console.log(updatedCardData);

          // Set the updated cardData
          setCardData(updatedCardData);
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
        // Optionally handle error state or rethrow if necessary
      }
    }

    fetchData();
  }, [search]);

  const plants = [
    {
      id: 1,
      name: "Plant 1",
      species: "Species 1",
      summary: "This is plant 1",
      description:
        "Plant 1 is really cool and native to place. It is a great plant to have in your garden.",
      wateringFrequency: "Once a week",
      maintenance: "Low",
      image: "https://via.placeholder.com/150",
      imageAlt: "Plant 1",
    },
    {
      id: 2,
      name: "Plant 2",
      species: "Species 2",
      summary: "This is plant 2",
      description:
        "Plant 2 is really cool and native to place. It is a great plant to have in your garden.",
      wateringFrequency: "Once a week",
      maintenance: "Low",
      image: "https://via.placeholder.com/150",
      imageAlt: "Plant 2",
    },
    {
      id: 3,
      name: "Plant 3",
      species: "Species 3",
      summary: "This is plant 3",
      description:
        "Plant 3 is really cool and native to place. It is a great plant to have in your garden.",
      wateringFrequency: "Once a week",
      maintenance: "Low",
      image: "https://via.placeholder.com/150",
      imageAlt: "Plant 3",
    },
    {
      id: 4,
      name: "Plant 4",
      species: "Species 4",
      summary: "This is plant 4",
      description:
        "Plant 4 is really cool and native to place. It is a great plant to have in your garden.",
      wateringFrequency: "Once a week",
      maintenance: "Low",
      image: "https://via.placeholder.com/150",
      imageAlt: "Plant 4",
    },
    {
      id: 5,
      name: "Plant 5",
      species: "Species 5",
      summary: "This is plant 5",
      description:
        "Plant 5 is really cool and native to place. It is a great plant to have in your garden.",
      wateringFrequency: "Once a week",
      maintenance: "Low",
      image: "https://via.placeholder.com/150",
      imageAlt: "Plant 5",
    },
  ];

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          backgroundColor: "gray",
          color: "white",
          textAlign: "center",
          paddingTop: 10,
        }}
      >
        <b>Search for a plant</b>
      </Typography>
      <div
        className="bg-cover bg-center"
        style={{ backgroundColor: "gray", paddingBottom: 30 }}
      >
        <Search search={search} setSearch={setSearch} />
      </div>
      <Box
        height={500}
        justifyContent={"center"}
        sx={{
          backgroundColor: "white",
          overflow: "auto",
          paddingTop: 5,
          paddingRight: 50,
          paddingLeft: 50,
        }}
      >
        <Stack spacing={2}>
          {plants
            .filter((plant) =>
              plant.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((plant) => (
              <ResultCard key={plant.id} plant={plant} />
            ))}
        </Stack>
      </Box>
    </>
  );
}
