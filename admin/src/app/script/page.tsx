"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GenerateSpeech, GenerateVideoSuggestions } from "@/lib/ai";
import { SliceArrayIntoChunks } from "@/lib/array";
import { FetchSound } from "@/lib/elevenlabs";
import { Script, Sound, Video, VideoScripts } from "@/types/Video";
import { Check, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function Page() {
  const [videoScripts, setVideoScripts] = useState<VideoScripts[]>([]);
  const [approved, setApproved] = useState<string[]>([]);
  const [approveProgress, setApproveProgress] = useState(-1);

  const addScriptsToVideo = (script: Script) => {
    setVideoScripts((old) =>
      old.map((i) =>
        i.video.id === script.videoId
          ? {
              video: i.video,
              scripts: [...i.scripts, script],
            }
          : i
      )
    );
  };

  const loadScripts = async (videos: Video[]) => {
    const scripts = await GenerateVideoSuggestions(videos);
    scripts.forEach((s) => addScriptsToVideo(s));
  };

  const generateSound = async (approved: string[]) => {
    setApproveProgress(0);
    const scripts: Script[] = [];
    videoScripts.forEach((video) => {
      video.scripts.forEach((script) => {
        if (approved.includes(script.id)) {
          scripts.push(script);
        }
      });
    });

    for (var i = 0; i < scripts.length; i++) {
      await fetch("/api/script", {
        method: "POST",
        body: JSON.stringify(scripts[i]),
      });
      const sound: Sound = await fetch("/api/sound", {
        method: "POST",
        body: JSON.stringify({
          id: scripts[i].id,
          text: `${scripts[i].quote} ${scripts[i].text}`,
        }),
      }).then((res) => res.json());
      await fetch("/api/script", {
        method: "PUT",
        body: JSON.stringify(sound),
      });
      setApproveProgress((i) => i + 1);
    }
    setApproveProgress(-1);
  };

  return (
    <div className="p-12">
      <h1 className="font-bold text-lg">TikTok Video Generation</h1>
      <Separator />
      <div className="flex gap-4">
        <Link href="/video">Videos</Link>
        <Button
          onClick={async () => {
            const videos: Video[] = await fetch("/api/liked").then((res) =>
              res.json()
            );
            setVideoScripts(videos.map((i) => ({ scripts: [], video: i })));
          }}
        >
          Load
        </Button>
      </div>
      <Separator />
      <Button
        onClick={() => {
          const slices = SliceArrayIntoChunks(videoScripts.map((i) => i.video));
          slices.forEach((videoSlice) => {
            loadScripts(videoSlice);
          });
        }}
      >
        Generate text
      </Button>
      <Separator />

      <div className="flex flex-col gap-4">
        {videoScripts.map(({ scripts, video }) => (
          <Card>
            <CardHeader>
              <CardTitle>{video.title}</CardTitle>
              <CardDescription>{video.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row gap-4">
                <video className="rounded-lg" width={520} controls>
                  <source src={video.url} />
                </video>
                <ul className="flex flex-col flex-grow gap-2">
                  {scripts.map((script) => (
                    <li className="flex flex-row justify-between items-center gap-4 p-2 border rounded-sm w-full">
                      <div>
                        <span className="font-semibold">{script.quote}</span>
                        <br />
                        {script.text}
                        <br />
                        {script.hashtags.join(", ")}
                      </div>
                      <Button
                        onClick={() => {
                          if (approved.includes(script.id)) {
                            setApproved((a) =>
                              a.filter((i) => i !== script.id)
                            );
                          } else {
                            setApproved((a) => [...a, script.id]);
                          }
                        }}
                        variant={
                          approved.includes(script.id) ? "default" : "outline"
                        }
                      >
                        {approved.includes(script.id) ? <X /> : <Check />}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />
      <Button
        disabled={approveProgress !== -1}
        onClick={() => generateSound(approved)}
      >
        Generate Sounds
      </Button>
      {approveProgress !== -1 && (
        <div>
          <p>Processing sound generation</p>
          <p>{approveProgress} have been processed</p>
        </div>
      )}
    </div>
  );
}

export default Page;
