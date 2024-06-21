"use server";

import { Sound, Word } from "@/types/Video";
import { supabaseClient } from "./supabase";

export async function FetchSound(
  id: string,
  text: string
): Promise<Sound | undefined> {
  const VOICE_ID = process.env.ELEVENLABS_SOUND_ID!;
  const YOUR_XI_API_KEY = process.env.ELEVENLABS_API_KEY!;

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps`;

  const headers = {
    "Content-Type": "application/json",
    "xi-api-key": YOUR_XI_API_KEY,
  };

  const data = {
    text: text,
    model_id: "eleven_turbo_v2",
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.75,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers,
  });

  const responseData: {
    audio_base64: string;
    alignment: {
      characters: string[];
      character_start_times_seconds: string[];
      character_end_times_seconds: string[];
    };
  } = await response.json();
  if (response.status !== 200) {
    console.log(
      `Error encountered, status: ${response.status}, content: ${responseData}`
    );
    return undefined;
  }

  // Get the audio as a base64 encoded string and decode it to bytes
  const audioBytes = Buffer.from(responseData.audio_base64, "base64");

  // Save the audio to a file
  const supabase = supabaseClient();
  const path = `./sounds/${id}.mp3`;
  const result = await supabase.storage
    .from("tiktok")
    .upload(path, audioBytes, {
      contentType: "audio/mp3",
    });

  const words: Word[] = [];
  for (var i = 0; i < responseData.alignment.characters.length; i++) {
    for (var j = i; j < responseData.alignment.characters.length; j++) {
      if (responseData.alignment.characters[j] === " ") {
        const word = responseData.alignment.characters.slice(i, j);
        words.push({
          word: word.join(""),
          start: parseFloat(
            responseData.alignment.character_start_times_seconds[i]
          ),
          end: parseFloat(
            responseData.alignment.character_end_times_seconds[j]
          ),
        });
        j += 1;
        i = j;
      }
    }
  }

  return {
    words,
    soundUrl: supabase.storage.from("tiktok").getPublicUrl(result.data?.path!)
      .data.publicUrl,
    scriptId: id,
  };
}
