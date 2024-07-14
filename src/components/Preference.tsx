"use client";

import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { db, auth } from "../../firebase/firebase";
import { collection, addDoc, doc } from "firebase/firestore";

interface PreferenceOption {
  category: string;
  option: string;
}

interface Preference {
  name: string;
  pref: string[];
}

interface FirestoreDocument {
  [key: string]: string; // Define an index signature
}

const Preferences: React.FC = () => {
  const [selectedPreferences, setSelectedPreferences] = useState<
    PreferenceOption[]
  >([]);

  const pref: Preference[] = [
    {
      name: "Location",
      pref: ["Local", "Nationwide", "International"],
    },
    {
      name: "Plant Maintenance",
      pref: ["Low", "Medium", "High"],
    },
    {
      name: "Climate",
      pref: ["Tropical", "Arid", "Temperate", "Cold"],
    },
    {
      name: "Plant Size",
      pref: ["Small", "Medium", "Large", "Extra Large"],
    },
    {
      name: "Sunlight",
      pref: ["Full Sun", "Partial Sun", "Shade"],
    },
    {
      name: "Soil Type",
      pref: ["Moist", "Sandy", "Clay", "Loamy"],
    },
    {
      name: "Watering Frequency",
      pref: ["Daily", "Weekly", "Bi-weekly", "Monthly"],
    },
  ];

  const handleSelection = (category: string, option: string) => {
    setSelectedPreferences((prev) => {
      const categoryExists = prev.find((pref) => pref.category === category);
      if (categoryExists) {
        return prev.map((pref) =>
          pref.category === category ? { ...pref, option } : pref
        );
      } else {
        return [...prev, { category, option }];
      }
    });
  };

  const handleSave = async () => {
    const user = auth.currentUser;

    console.log(selectedPreferences);

    // Type assertion on the accumulator
    const transformedData = selectedPreferences.reduce(
      (acc: FirestoreDocument, item) => {
        acc[item.category] = item.option;
        return acc;
      },
      {} as FirestoreDocument
    );

    console.log(transformedData);

    try {
      if (user) {
        const userRef = doc(db, "users", user.uid);

        const docRef = await addDoc(collection(userRef, "preferences"), {
          transformedData,
        });

        console.log("Preferences added to Firestore with ID: ", docRef.id);

        window.location.href = "/swiper";
      }
    } catch (error) {
      console.error("Error adding preferences to Firestore:", error);
      // Handle error appropriately
    }
  };

  return (
    <>
      <Box
        height={700}
        width={600}
        my={4}
        gap={4}
        p={2}
        textAlign={"center"}
        position={"relative"}
        overflow={"scroll"}
        sx={{ backgroundColor: "white", borderRadius: 2 }}
      >
        <h1 style={{ color: "black", fontSize: 25 }}>
          <b>Plant Preferences</b>
        </h1>

        <Box height={540} sx={{ overflowY: "scroll" }}>
          {pref.map((preference, index) => (
            <Box key={index} p={2}>
              <Typography
                variant="h6"
                sx={{ color: "black", textAlign: "left" }}
              >
                <b>{preference.name}</b>
              </Typography>
              <Stack direction="row" spacing={2}>
                {preference.pref.map((option, idx) => (
                  <Box
                    height={45}
                    width={110}
                    key={idx}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{
                      borderRadius: 2,
                      cursor: "pointer",
                      opacity: selectedPreferences.some(
                        (pref) =>
                          pref.category === preference.name &&
                          pref.option === option
                      )
                        ? 0.7
                        : 1,
                      backgroundColor: selectedPreferences.some(
                        (pref) =>
                          pref.category === preference.name &&
                          pref.option === option
                      )
                        ? "#8cb1a1"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: "#c5d8cf",
                      },
                    }}
                    onClick={() => handleSelection(preference.name, option)}
                  >
                    <p style={{ color: "black" }}>{option}</p>
                  </Box>
                ))}
              </Stack>
            </Box>
          ))}
        </Box>

        <Button
          variant="contained"
          sx={{
            position: "absolute",
            bottom: 20,
            right: 25,
            left: 25,
            height: 55,
            fontSize: 18,
            borderRadius: 2,
            backgroundColor: "#357960",
            "&:hover": {
              backgroundColor: "#234537",
            },
          }}
          onClick={handleSave}
        >
          Save my preferences
        </Button>
      </Box>
    </>
  );
};

export default Preferences;
