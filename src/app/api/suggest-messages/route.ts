

import { google } from "@ai-sdk/google";
import {streamText } from "ai";




export async function POST(req: Request) {
  const model: any = google("models/gemini-1.5-flash");
  const topics: string[] = ["Holiday", "Space", "Work", "Books", "Movies", "Music", "Food", "Photography", "Hobbies", "Sports", "Arts", "Technology", "Culture"]
  const random: string = topics[Math.floor(Math.random() * topics.length)];
  const prompt =
      `Create a list of three open-ended and engaging questions on ${random} formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.`;
  
  const result = await streamText({
    model: model ,
    prompt: prompt,
    maxTokens: 400,
    topP: 0.4,
  });

  return result.toDataStreamResponse();
}


