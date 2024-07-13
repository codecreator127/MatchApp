"use client";

import { useState } from "react";
import Search from "@/components/Search";
import ResultCard from "@/components/ResultCard";

export default function Home() {
  const [search, setSearch] = useState("");

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
    <div className="bg-cover bg-center" style={{ backgroundColor: "gray" }}>
      <Search search={search} setSearch={setSearch} />
      <div className="flex min-h-screen flex-col items-center justify-between">
        {plants
          .filter((plant) =>
            plant.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((plant) => (
            <ResultCard key={plant.id} plant={plant} />
          ))}
      </div>
    </div>
  );
}
