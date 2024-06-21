import { Database } from "@/types/Database";
import { GenerateVideo, Script, Video, Word } from "@/types/Video";
import * as supabase from "@supabase/supabase-js";

export const supabaseClient = () => {
  const client = supabase.createClient<Database>(
    process.env.SUPABASE_DEVELOPMENT_URL || "",
    process.env.SUPABASE_DEVELOPMENT_ANON_KEY || ""
  );

  return client;
};

export async function SaveLikedVideos(videos: Video[]) {
  const supabase = supabaseClient();

  await supabase.from("tiktok_videos").insert(
    videos.map((i) => ({
      id: i.id,
      title: i.title,
      description: i.description,
      keywords: i.keywords,
      url: i.url,
    }))
  );
}

export async function LoadLikedVideos(): Promise<Video[]> {
  const supabase = supabaseClient();

  const videos = await supabase.from("tiktok_videos").select("*");

  return (
    videos.data?.map((i) => ({
      description: i.description,
      id: i.id,
      keywords: i.keywords,
      title: i.title,
      url: i.url,
    })) ?? []
  );
}

export async function LoadIdeas(): Promise<GenerateVideo[]> {
  const supabase = supabaseClient();

  const videoData = await supabase.from("tiktok_videos").select("*");
  const videos: Video[] =
    videoData.data?.map((i) => ({
      description: i.description,
      id: i.id,
      keywords: i.keywords,
      title: i.title,
      url: i.url,
    })) ?? [];

  const wordData = await supabase.from("tiktok_words").select("*");
  const words: { word: Word; scriptId: string }[] =
    wordData.data?.map((i) => ({
      word: { end: i.end, start: i.start, word: i.word },
      scriptId: i.scriptId,
    })) ?? [];

  const scriptsData = await supabase.from("tiktok_script").select("*");
  const scripts: GenerateVideo[] =
    scriptsData.data?.map((i) => ({
      script: {
        hashtags: i.hashtags,
        id: i.id,
        quote: i.quote,
        text: i.text,
        videoId: i.videoId,
      },
      sound: {
        scriptId: i.id,
        soundUrl: i.sound_url ?? "",
        words: words.filter((j) => j.scriptId === i.id).map((i) => i.word),
      },
      video: videos.find((j) => j.id === i.videoId)!,
    })) ?? [];

  return scripts;
}
