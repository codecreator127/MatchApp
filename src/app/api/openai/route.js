import { NextResponse } from "next/server";
import { config } from "dotenv";
import OpenAI from "openai";

config();

export async function POST(request) {
  const openai = new OpenAI({
    apiKey: process.env.API_KEY,
  });

  // grab user input
  const params = await request.json();

  // pass to GPT
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a plant tinder bot. You are helping people find the perfect plant for their home. Match based on preferences.",
      },
      {
        role: "user",
        content: params.prompt,
      },
    ],
    temperature: 0,
    max_tokens: 10,
    top_p: 0.5,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return NextResponse.json(response.choices[0].message.content);
}
