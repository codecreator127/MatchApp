"use client";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { db, auth } from "../../firebase/firebase";

export default function GptResponse() {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Function to fetch the first document in the preferences collection
  async function fetchFirstPreferencesMap(userId: string) {
    try {
      // Reference to the preferences collection
      const prefsCollectionRef = collection(db, `users/${userId}/preferences`);

      console.log("Preferences Collection Reference:", prefsCollectionRef);

      // Query to get the first document ordered by __name__ and limit to 1
      const q = query(prefsCollectionRef, orderBy("__name__"), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Get the first document
        const doc = querySnapshot.docs[0];
        return doc.data().transformedData;
      } else {
        console.log("No documents found in the preferences collection!");
        return undefined;
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      return undefined;
    }
  }

  // Function to handle fetching and logging preferences map for the current user
  function fetchUserPreferences() {
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;

      fetchFirstPreferencesMap(userId)
        .then((preferencesMap) => {
          if (preferencesMap) {
            console.log("Preferences Map:", preferencesMap);

            const transformedString = preferencesMap
              .map(
                (item: { preference: any; name: any }) =>
                  `${item.preference} ${item.name}`
              )
              .join(", ");
            console.log(transformedString);
            return transformedString;
          }
        })
        .catch((error) => {
          console.error("Error fetching preferences map:", error);
        });
    } else {
      console.log("No user is currently signed in.");
    }
  }
  const preferences = fetchUserPreferences();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ preferences }),
      });

      console.log("RESPONSE", response);
      const result = await response.json();
      setResponse(result);
    } catch (error) {
      console.error("Error:", error);
      setError("Error: Could not fetch response");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>ChatGPT Text Prompt</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={handleChange}
          rows={5} // Correctly specify as a number
          cols={50} // Correctly specify as a number
          placeholder="Enter your prompt here..."
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
        <br />
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px" }}
        >
          {loading ? "Generating..." : "Submit"}
        </button>
      </form>
      {error && (
        <div style={{ marginTop: "20px", padding: "10px", color: "red" }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
      {response && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
