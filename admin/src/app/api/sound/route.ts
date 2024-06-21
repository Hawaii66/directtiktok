import { FetchSound } from "@/lib/elevenlabs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { id, text }: { id: string; text: string } = await request.json();

  const sound = await FetchSound(id, text);

  return NextResponse.json(sound);
};
