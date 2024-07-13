import React from "react";

type SearchProps = {
  search: string;
  setSearch: (search: string) => void;
};

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

async function generatePlants(scenario: string) {
  const output = await gptCall(scenario);
  const plantMap = parsePlants(output);
  return plantMap;
}

// function to generate plants + images underneath

// generatePlants()
// .then(async (data) => {
//   if (data) {

//     // gets images
//     for (let i = 0; i < cardData.length; i++) {
//       const searchQuery = replaceSpaces(cardData[i].name);
//       const images = await searchImages(searchQuery);
//       cardData[i].imgSrc = images.hits[0].webformatURL;
//     }
//   }
// })
// .catch((error) => {
//   console.error("Error in generatePlants:", error);
//   // Optionally handle error state or rethrow if necessary
// });

function Search({ search, setSearch }: SearchProps) {
  return (
    <>
      <label className="mx-auto relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300">
        <input
          id="search-bar"
          placeholder="Whats your situation?"
          className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
          <div className="relative">
            <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
              <svg
                className="opacity-0 animate-spin w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <div className="flex items-center transition-all opacity-1 valid:">
              <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                Search
              </span>
            </div>
          </div>
        </button>
      </label>
    </>
  );
}

export default Search;
function setError(arg0: string) {
  throw new Error("Function not implemented.");
}

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
