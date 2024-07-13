import { cardData } from "@/constants/cardData";

// Function to update cardData with fetched images
export async function searchImages(query) {
  const url = `https://pixabay.com/api/?key=44912840-fe2e51bd2401b4ddeef5f62d4&q=${encodeURIComponent(query)}&image_type=photo&pretty=true&category=nature`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    displayImages(data.hits);
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

function displayImages(images) {
  for (let i = 0; i < images.length && i < cardData.length; i++) {
    cardData[i].imgSrc = images[i].webformatURL;
  }
}
