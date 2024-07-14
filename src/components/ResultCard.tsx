import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import type { Plant } from "@/types/types.d.ts";

type ResultCardProps = {
  plant: {
    name: string;
    plantType: string;
    caringGuide: string;
    imgUrl: string;
  };
};

function ResultCard(props: ResultCardProps) {
  return (
    <>
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 180, height: 160 }}
          image={props.plant.imgUrl}
          alt={props.plant.name}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 490,
            height: 160,
            overflowY: "auto",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {props.plant.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {props.plant.caringGuide}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </>
  );
}

export default ResultCard;
