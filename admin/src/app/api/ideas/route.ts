import { LoadIdeas } from "@/lib/supabase";
import { GenerateVideo } from "@/types/Video";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const scripts = await LoadIdeas();

  return NextResponse.json(scripts);
};

export const POST = async (request: NextRequest) => {
  const video: GenerateVideo = await request.json();

  const url = await fetch(`${process.env.GO_VIDEO_URL}/generate`, {
    method: "POST",
    body: JSON.stringify({
      id: video.script.id,
      quote: video.script.quote,
      text: video.script.text,
      videoId: video.video.id,
      words: video.sound.words,
      urls: {
        background: video.video.url,
        overlay:
          "https://smavtjhbibxqsksbvgbp.supabase.co/storage/v1/object/public/tiktok/overlay.mp4",
        voice: video.sound.soundUrl,
      },
    }),
  }).then((res) => res.text());

  return NextResponse.json(url);
};
