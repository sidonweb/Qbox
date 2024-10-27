

import { google } from "@ai-sdk/google";
import { streamText } from "ai";




export async function POST(req: Request) {
  const model = google("models/gemini-1.5-flash");
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





// import OpenAI from 'openai';
// import { OpenAIStream, StreamingTextResponse } from 'ai';
// import { NextResponse } from 'next/server';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const runtime = 'edge';

// export async function POST(req: Request) {
//   try {
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     const response = await openai.completions.create({
//       model: 'gpt-3.5-turbo-instruct',
//       max_tokens: 400,
//       stream: true,
//       prompt,
//     });

//     const stream = OpenAIStream(response);
    
    
//     return new StreamingTextResponse(stream);
//   } catch (error) {
//     if (error instanceof OpenAI.APIError) {
//       // OpenAI API error handling
//       const { name, status, headers, message } = error;
//       console.log(error)
//       return NextResponse.json({ name, status, headers, message}, { status });
//     } else {
//       // General error handling
//       console.error('An unexpected error occurred:', error);
//       throw error;
//     }
//   }
// }



// import { streamText } from 'ai'
// import { google } from '@ai-sdk/google'

// export async function POST(req: Request) {
//   const prompt =
//         "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//   // Get a language model
//   const model = google('models/gemini-1.5-flash-latest')

//   // Call the language model with the prompt
//   const result = await streamText({
//     model,
//     prompt,
//     maxTokens: 4096,
//     temperature: 0.7,
//     topP: 0.4,
//   })

//   // Respond with a streaming response
//   return result.toAIStreamResponse()
// }

// import Chat from './chat'

// export default function Page() {
//   return <Chat />
// }


// 'use client'

// import { useChat } from 'ai/react';

// export default function Chat() {
//    const { messages, input, handleInputChange, handleSubmit } = useChat({
//     api: '/api/chat'
//   })

  
// }
