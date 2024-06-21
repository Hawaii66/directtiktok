import { LoadLikedVideos, SaveLikedVideos } from "@/lib/supabase";
import { Video } from "@/types/Video";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const liked = await LoadLikedVideos();

  return NextResponse.json(liked);
};

export const POST = async (request: NextRequest) => {
  const videos: Video[] = await request.json();

  await SaveLikedVideos(videos);
  return NextResponse.json({});
};
