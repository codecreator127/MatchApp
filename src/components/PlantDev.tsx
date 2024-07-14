import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { auth, db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

interface Plant {
  id: string;
  name: string;
  type: string;
  guide: string;
  url: string;
}

function PlantDex() {
  const [cardData, setCardData] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch all documents in the plants collection
  async function fetchPlantCollection(userId: string): Promise<Plant[]> {
    try {
      const plantsCollectionRef = collection(db, `users/${userId}/plants`);
      const querySnapshot = await getDocs(plantsCollectionRef);

      if (!querySnapshot.empty) {
        const plantsArray = querySnapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Plant
        );

        console.log(plantsArray);
        return plantsArray;
      } else {
        console.log("No documents found in the plants collection!");
        return [];
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw error;
    }
  }

  useEffect(() => {
    async function loadPlantData() {
      setIsLoading(true);
      const user = auth.currentUser;
      if (user) {
        try {
          const plants = await fetchPlantCollection(user.uid);
          setCardData(plants);
          setError(null);
        } catch (err) {
          console.error("Error loading plant data:", err);
          setError("Failed to load plant data. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setError("No user logged in");
        setIsLoading(false);
      }
    }

    loadPlantData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: "#357960",
        }}
      >
        <b>PlantDex</b>
      </Typography>
      <Box
        sx={{
          backgroundColor: "#a8c4b8",
          paddingTop: 5,
          paddingBottom: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={3} sx={{ maxWidth: 1000 }}>
          {cardData.map((plant: Plant) => (
            <Grid item xs={4} key={plant.id}>
              <Card sx={{ width: 300, height: 310, borderRadius: 3 }}>
                <CardHeader title={plant.name} subheader={plant.type} />
                <CardMedia
                  component="img"
                  image={plant.url}
                  alt={plant.name}
                  style={{ maxHeight: 160 }}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {plant.guide}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default PlantDex;
