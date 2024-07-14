import { Box, Card, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";

function PlantDex() {

  const data = [
    {
        "id": "9tBQrAO6Phe5k1qdDs8Y",
        "name": "Birds of Paradise",
        "guide": "Place in bright, indirect light.",
        "url": "https://pixabay.com/get/g3c17b692fc2658adefb832447f7830f9a7b8bf4c8b0e831ac6630dcb371c45ca5c261d0f0cc31dda916b6f606b9d8cec98015d02d4b7ccd7d62a03aac791e9e4_640.jpg",
        "type": "Tropical Flowering Plant"
    },
    {
        "id": "PNzO0UvxMFZinC8abcYA",
        "url": "https://pixabay.com/get/g3c17b692fc2658adefb832447f7830f9a7b8bf4c8b0e831ac6630dcb371c45ca5c261d0f0cc31dda916b6f606b9d8cec98015d02d4b7ccd7d62a03aac791e9e4_640.jpg",
        "name": "Birds of Paradise",
        "guide": "Place in bright, indirect light.",
        "type": "Tropical Flowering Plant"
    },
    {
        "id": "U1keakyz56T6n1lcuMZs",
        "name": "Peace Lily",
        "guide": "Prefers shade and weekly watering.",
        "url": "https://pixabay.com/get/g579303d31bd7933116aeec7a45ce423c76b080d20e094db917856fa9006330ae6466c797574f1dc51c49f4c6fb74ee5b238c3650d77352d3a7cc9e4d818e5e70_640.jpg",
        "type": "Tropical Flowering Plant"
    },
    {
        "id": "qwBxqQc5zIztSNolU1ps",
        "type": "Tropical Palm Tree",
        "guide": "Thrives in bright, indirect light.",
        "name": "Areca Palm",
        "url": "https://media.post.rvohealth.io/wp-content/uploads/2022/01/snake-plant-detail-732x549-thumbnail-732x549.jpg"
    },
    {
      "id": "qwBxqQc5zIztSNolU1ps",
      "type": "Tropical Palm Tree",
      "guide": "Thrives in bright, indirect light.",
      "name": "Areca Palm",
      "url": "https://media.post.rvohealth.io/wp-content/uploads/2022/01/snake-plant-detail-732x549-thumbnail-732x549.jpg"
    },
    {
      "id": "qwBxqQc5zIztSNolU1ps",
      "type": "Tropical Palm Tree",
      "guide": "Thrives in bright, indirect light.",
      "name": "Areca Palm",
      "url": "https://media.post.rvohealth.io/wp-content/uploads/2022/01/snake-plant-detail-732x549-thumbnail-732x549.jpg"
    }
  ]

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", paddingTop: 5, paddingBottom: 5, backgroundColor: "#357960", color: "white" }}>
        <b>PlantDex</b>
      </Typography>
      <Box sx={{ backgroundColor: "#a8c4b8", paddingTop: 5, paddingBottom: 5, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Grid container spacing={3} sx={{ maxWidth: 1000 }}>
          {data.map((plant, index) => (
            <Grid item xs={4} key={index}>
              <Card sx={{ width: 300, height: 310, borderRadius: 3 }}>
                <CardHeader title={plant.name} subheader={plant.type} />
                <CardMedia component="img" image={plant.url} alt={plant.name} style={{ maxHeight: 160 }} />
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
