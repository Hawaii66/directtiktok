"use server";

import { Script, Video } from "@/types/Video";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs/promises";
import path from "path";

const openai = new OpenAI({
  organization: process.env.OPENAI_ORG!,
  project: process.env.OPENAI_PROJECT!,
  apiKey: process.env.OPENAI_KEY!,
});

const systemPrompt = `
	You are a Motivational Tiktok video generator.
	The videos should motivate the user to close the app and do something in real life.
	Each video consists of a background video (description will be provided), a quote on the screen and a voice for a narrator.
	The videos you write the text for should be inspired by the video description I provide, dont overcomplicate, keep it simple and easy to understand
	Dont reference the people in the videos, focus on the person watching.
	On some you can also include a video effect, not all
	You should generate 2 scripts from each provided video following this type:
	{
		quoute:string (max one sentence),
		text:string (3-5 sentences),
		hashtags: string[] (3-5),
		videoId:string,
		effect?:blur,grayscale,slow,reverse
	}
	Return the response in a JSON format.
`;

export async function GenerateVideoSuggestions(
  videos: Video[]
): Promise<Script[]> {
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: JSON.stringify(videos),
      },
    ],
    model: "gpt-4o",
  });

  const parsed =
    response.choices[0].message.content
      ?.replaceAll("'", "")
      .replaceAll("\n", "")
      .replaceAll("\t", "")
      .replaceAll("```", "")
      .replaceAll("json", "") ?? "[]";

  const test = JSON.parse(parsed);
  return test.map((i: any) => ({ ...i, id: uuidv4() }));
}

export async function GenerateSpeech(script: Script) {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "onyx",
    input: `${script.quote}                                         ${script.text}`,
    speed: 0.8,
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.writeFile(path.resolve("./speech.mp3"), buffer);
}
