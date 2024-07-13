// Function to update cardData with fetched images
export async function searchImages(query) {
  const url = `https://pixabay.com/api/?key=44912840-fe2e51bd2401b4ddeef5f62d4&q=${encodeURIComponent(query)}&image_type=photo&pretty=true&category=nature&per_page=3`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // return data when it is ready
    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}
