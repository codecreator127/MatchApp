"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

export default function GptResponse() {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const preferences = [
    { category: "Location Preferences", option: "Nationwide" },
    { category: "Plant Maintenance Preferences", option: "Low" },
    { category: "Climate Preferences", option: "Arid" },
    { category: "Plant Size Preferences", option: "Medium" },
    { category: "Sunlight Preferences", option: "Partial Sun" },
    { category: "Soil Type Preferences", option: "Sandy" },
    { category: "Watering Frequency Preferences", option: "Weekly" },
  ];

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
