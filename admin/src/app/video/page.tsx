"use client";

import VideoSelector from "@/components/VideoSelector";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { CoverrResponse, Video } from "@/types/Video";
import { useState } from "react";
import { z } from "zod";

const LoadedKeywordsSchema = z.string().array();

export default function Home() {
  const [keywords, setKeywords] = useState(["morning", "desk", "ski"]);
  const [loadedKeywords, setLoadedKeywords] = useState("");
  const [open, setOpen] = useState(false);
  const [keywordIndex, setKeywordIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<Video[]>();
  const [liked, setLiked] = useState<Video[]>([]);
  const [saving, setSaving] = useState(false);

  const loadVideos = async (keyword: string) => {
    setLoading(true);
    const response = await fetch(
      `https://coverr.co/api/videos?lang=en&camel_case=true&filter=&page=0&page_size=50&query=${keyword}&sort_by=date&urls=true&extends=keywords&extends=variant&userId=guest`
    );
    if (response.status !== 200) {
      alert(`Failed to fetch videos from coverr with keyword: ${keyword}`);
      setLoading(false);
      return;
    }

    const data: CoverrResponse = await response.json();

    if (data.hits.length === 0) {
      alert(`No videos found for keyword: ${keyword}`);
      setLoading(false);
      return;
    }

    const videos: Video[] = data.hits
      .filter((i) => !i.isPremium)
      .map((i) => ({
        title: i.title,
        description: i.description,
        id: i.objectID,
        keywords: i.tags ?? [],
        url: i.urls.mp4,
      }));
    setVideos(videos);
    setLoading(false);
  };

  return (
    <div className="p-12">
      <h1 className="font-bold text-lg">TikTok Video Generation</h1>
      <Separator />
      <div className="flex gap-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant={"outline"}>Load keywords</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Load keywords</DialogTitle>
              <DialogDescription>
                Load keywords from chatgpt, must be in format
                ["keyword","keyword2"]
              </DialogDescription>
            </DialogHeader>
            <Textarea
              value={loadedKeywords}
              onChange={(e) => setLoadedKeywords(e.target.value)}
            />
            <DialogFooter>
              <DialogClose />
              <Button
                onClick={() => {
                  try {
                    const keywords = LoadedKeywordsSchema.parse(
                      JSON.parse(loadedKeywords)
                    );
                    setKeywords(keywords);
                    setOpen(false);
                  } catch (e) {
                    alert("Something is wrong with the formatting");
                  }
                }}
              >
                Load
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          variant={"outline"}
          onClick={() => setKeywordIndex((i) => (i + 1) % keywords.length)}
        >
          Next keyword
        </Button>
      </div>
      <Separator />
      <p>
        Selected keyword:{" "}
        <span className="font-semibold">{keywords[keywordIndex]}</span>
      </p>
      <Button
        onClick={() => loadVideos(keywords[keywordIndex])}
        disabled={loading}
      >
        {loading ? "Laddar ..." : "Load videos"}
      </Button>
      <Separator />
      {videos ? (
        <VideoSelector
          isDone={() => loadVideos(keywords[keywordIndex])}
          likeVideo={(v) => {
            setLiked((l) => [...l, v]);
          }}
          videos={videos}
        />
      ) : (
        <p>Load videos above</p>
      )}
      <Separator />
      <Button
        disabled={saving}
        onClick={async () => {
          setSaving(true);
          await fetch("/api/liked", {
            method: "POST",
            body: JSON.stringify(liked),
          });
          setSaving(false);
        }}
      >
        Save
      </Button>
    </div>
  );
}
