import { supabaseClient } from "@/lib/supabase";
import { Script, Sound } from "@/types/Video";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const script: Script = await request.json();

  const supabase = supabaseClient();

  await supabase.from("tiktok_script").insert({
    hashtags: script.hashtags,
    id: script.id,
    quote: script.quote,
    text: script.text,
    videoId: script.videoId,
  });

  return NextResponse.json({});
};

export const PUT = async (request: NextRequest) => {
  const sound: Sound = await request.json();

  const supabase = supabaseClient();

  await supabase
    .from("tiktok_script")
    .update({
      sound_url: sound.soundUrl,
    })
    .eq("id", sound.scriptId);

  await supabase.from("tiktok_words").insert(
    sound.words.map((i) => ({
      word: i.word,
      start: i.start,
      end: i.end,
      scriptId: sound.scriptId,
    }))
  );

  return NextResponse.json({});
};
