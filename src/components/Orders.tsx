import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addDoc, collection, doc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";
import { CenterFocusStrong } from "@mui/icons-material";

async function addPlantToCollection(
  plantName: string,
  url: string,
  type: string,
  guide: string
) {
  console.log(plantName);
  console.log(url);
  console.log(type);
  console.log(guide);

  const user = await auth.currentUser;
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const collectionRef = collection(userRef, "plants");

    await addDoc(collectionRef, {
      name: plantName,
      url: url,
      type: type,
      guide: guide,
    });
  }
}

const Orders: React.FC = () => {
  const [activeDiv, setActiveDiv] = useState<number | null>(null);
  const [result, setResult] = useState<string>("");

  const searchParams = useSearchParams();
  const plantName = searchParams.get("name");
  const image = searchParams.get("image");
  const guide = searchParams.get("guide");
  const type = searchParams.get("type");

  const router = useRouter();

  const url = "https://www.kings.co.nz/search?q=";

  const divs: { name: string; action: () => void }[] = [
    {
      name: "Buy",
      action: () => {
        window.open(url + plantName, "_blank");
        router.push("/dex");
      },
    },
    {
      name: "Trade",
      action: () => router.push("/dex"),
    },
    {
      name: "Sponsor",
      action: () => router.push("/dex"),
    },
  ];

  const handleClick = (index: number): void => {
    addPlantToCollection(
      plantName || "plant",
      image || "image",
      type || "type",
      guide || "guide"
    );
    setActiveDiv(index);
    divs[index].action();
  };

  return (
    <>
      <Card style={{ maxHeight: 1500 }}>
        <CardHeader
          title={`You've matched with ${plantName}!`}
          subheader="You can now buy, trade or sponsor this plant"
        />
        <CardMedia
          component="img"
          style={{
            borderRadius: "50%",
            maxHeight: 250,
            maxWidth: 250,
          }}
          image={`${image}`}
          alt="Plant"
        />
        <CardContent>
          <Stack spacing={2}>
            {divs.map((div, index) => (
              <Button
                variant="contained"
                key={index}
                sx={{
                  backgroundColor: "#8cb1a1",
                  "&:hover": { backgroundColor: "#a8c4b8" },
                  height: 50,
                  fontSize: 18,
                  borderRadius: 100,
                  textTransform: "lowercase",
                }}
                onClick={() => handleClick(index)} // Add onClick handler here
              >
                {div.name} Plant
              </Button>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default Orders;
