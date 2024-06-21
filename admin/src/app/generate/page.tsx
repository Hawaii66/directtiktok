"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { GenerateVideo } from "@/types/Video";
import React, { useState } from "react";

function page() {
  const [ideas, setIdeas] = useState<GenerateVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState<string[]>([]);
  const [generated, setGenerated] = useState<{ id: string; url: string }[]>([]);

  const generate = async (id: string) => {
    setGenerating((g) => [...g, id]);

    await new Promise<void>((res) => setTimeout(() => res(), 1000));

    const url: string = await fetch("/api/ideas", {
      method: "POST",
      body: JSON.stringify(ideas.find((i) => i.script.id === id)),
    }).then((res) => res.json());

    setGenerated((g) => [
      ...g,
      {
        id: id,
        url: url,
      },
    ]);

    setGenerating((g) => g.filter((i) => i !== id));
  };

  const loadIdeas = async () => {
    setLoading(true);
    const ideas: GenerateVideo[] = await fetch("/api/ideas").then((res) =>
      res.json()
    );

    setIdeas(ideas);
    setLoading(false);
  };

  return (
    <div className="p-12">
      <h1 className="font-bold text-lg">TikTok Video Generation</h1>
      <Separator />
      <div className="flex gap-4">
        <Button disabled={loading} onClick={loadIdeas}>
          {loading ? "Loading ..." : "Load"}
        </Button>
      </div>
      <Separator />

      <div className="flex flex-col gap-4">
        {ideas.map(({ script, sound, video }) => (
          <Card>
            <CardHeader>
              <CardTitle>{script.quote}</CardTitle>
              <CardDescription>
                {script.text} {script.id}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row gap-4">
                <video className="rounded-lg" width={520} controls>
                  <source src={video.url} />
                </video>
                <div className="flex flex-col justify-between">
                  <div>
                    <p>Sound URL: {sound.soundUrl}</p>
                    <p>Word count: {sound.words.length}</p>
                    <br />
                    <p>
                      {script.quote} {script.text} {script.hashtags.join(" ")}{" "}
                      #InspiredBreak
                    </p>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <audio controls>
                      <source src={sound.soundUrl} type="audio/mp3" />
                    </audio>
                    {generated.filter((i) => i.id === script.id).length ===
                    1 ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>View video</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Generated Video</DialogTitle>
                            <DialogDescription>
                              This video is now generated and ready for download
                            </DialogDescription>
                          </DialogHeader>
                          <div>
                            <video controls>
                              <source
                                src={
                                  generated.find((i) => i.id === script.id)?.url
                                }
                                type="audio/mp4"
                              />
                            </video>
                          </div>
                          <DialogFooter>
                            <DialogClose />
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button
                        disabled={generating.includes(script.id)}
                        onClick={() => generate(script.id)}
                      >
                        {generating.includes(script.id)
                          ? "Generating ..."
                          : "Generate Video"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default page;
