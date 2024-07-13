// Function to fetch all documents in the plants collection
async function fetchPlantCollection(userId: string) {
  try {
    const plantsCollectionRef = collection(db, `users/${userId}/plants`);
    const querySnapshot = await getDocs(plantsCollectionRef);

    console.log(querySnapshot);

    if (!querySnapshot.empty) {
      const plantsArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      console.log(plantsArray);

      // return;
    } else {
      console.log("No documents found in the plants collection!");
      return [];
    }
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
}
