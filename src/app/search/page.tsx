"use client";

import { useEffect, useState } from "react";
import Search from "@/components/Search";
import ResultCard from "@/components/ResultCard";
import { Box, Stack, Typography } from "@mui/material";
import { searchImages } from "../api/pixabay/route";

export default function Home() {
  const [search, setSearch] = useState("");
  const [enterPressed, setEnterPressed] = useState(false);

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
      // setError("Error: Could not fetch response");
    } finally {
      // setLoading(false);
    }
  }

  function parsePlants(text: string): {
    imgUrl: any;
    name: string;
    plantType: string;
    caringGuide: string;
    description: string;
  }[] {
    const plantEntries = text.split(/\d+\.\s+/); // Split text based on numbers followed by a dot and optional whitespace

    const plants = plantEntries.map((entry) => {
      const lines = entry.trim().split("\n");
      const plantInfo: {
        name: string;
        plantType: string;
        caringGuide: string;
        imgUrl: string;
        description: string;
      } = {
        name: "",
        plantType: "",
        caringGuide: "",
        imgUrl: "",
        description: "",
      };

      lines.forEach((line) => {
        if (line.startsWith("Name:")) {
          plantInfo.name = line.split(": ")[1].trim();
        } else if (line.startsWith("Plant Type:")) {
          plantInfo.plantType = line.split(": ")[1].trim();
        } else if (line.startsWith("Caring Guide:")) {
          plantInfo.caringGuide = line.split(": ")[1].trim();
        } else if (line.startsWith("Description:")) {
          plantInfo.description = line.split(": ")[1].trim();
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

    console.log(output);
    const plantMap = parsePlants(output);
    console.log(plantMap);
    // const plantMap = [
    //   {
    //     name: "Heartleaf Philodendron",
    //     plantType: "Indoor vine",
    //     caringGuide:
    //       "Bright, indirect light. Water when top inch of soil is dry.",
    //     imgUrl:
    //       "https://pixabay.com/get/gb299173c7ed50e9e591cca48609a1d6e434a62f9b6d57611fdb846614cc50b388d7dfd2579b0d10c8bedc21df2d2024f0256f306f9626fc65965391a03fe834e_640.jpg",
    //   },
    //   {
    //     name: "String of Hearts",
    //     plantType: "Hanging succulent",
    //     caringGuide:
    //       "Bright, indirect light. Allow soil to dry between waterings.",
    //     imgUrl:
    //       "https://pixabay.com/get/g681cd8794628b71cc0874e72cb29de52faba62f8b1c59ab67fef472ca1fbd5fb945c629567af96841bbc3aaee34294af888646483caae8ebdd3498385b2a294c_640.jpg",
    //   },
    //   {
    //     name: "Anthurium",
    //     plantType: "Flowering houseplant",
    //     caringGuide:
    //       "Bright, indirect light. Keep soil consistently moist but not soggy.",
    //     imgUrl:
    //       "https://pixabay.com/get/ga83b26b7a693c4849212e7dab3e94c9e145bdc7de298c4c3e4cb542af80b4493c7a442a8d6063a1d2ab6542fc847a88afe7ea5c93b45d790ef542ab8f9243388_640.jpg",
    //   },
    // ];
    return plantMap;
  }

  const replaceSpaces = (query: string) => {
    return query.replace(/\s/g, "+");
  };

  useEffect(() => {
    console.log(search);
    async function fetchData(searchParam: string) {
      try {
        const data = await generatePlants(searchParam);

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

    fetchData(search);
  }, [enterPressed]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setEnterPressed((prev) => !prev); // Toggle to ensure useEffect triggers on every Enter press
    }
  };

  const handleSearchClick = () => {
    setEnterPressed((prev) => !prev); // Toggle to ensure useEffect triggers on search button click
  };

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          backgroundColor: "#357960",
          color: "white",
          textAlign: "center",
          paddingTop: 10,
        }}
      >
        <b>Search for a plant</b>
      </Typography>
      <div
        className="bg-cover bg-center"
        style={{ backgroundColor: "#357960", paddingBottom: 30 }}
      >
        <Search
          search={search}
          setSearch={setSearch}
          onPress={handleKeyPress}
          onButtonClick={handleSearchClick}
        />
      </div>
      <Box
        height={"100%"}
        justifyContent={"center"}
        sx={{
          backgroundColor: "#a8c4b8",
          overflow: "auto",
          paddingTop: 5,
          paddingRight: 50,
          paddingLeft: 50,
          paddingBottom: 5
        }}
      >
        <Stack spacing={2}>
          {cardData.map((plant) => (
            <ResultCard key={plant.name} plant={plant} />
          ))}
        </Stack>
      </Box>
    </>
  );
}
