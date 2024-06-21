import { Video } from "@/types/Video";
import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Heart, X } from "lucide-react";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type Props = {
  videos: Video[];
  likeVideo: (video: Video, pos: number) => void;
  isDone: () => void;
};

function VideoSelector({ videos, likeVideo, isDone }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pos, setPos] = useState(0.5 - ((9 / 16) * (9 / 16)) / 2);
  const [video, setVideo] = useState<Video>();

  const size = (window.screen.width * 2) / 5;

  const removeKeyword = (keyword: string) => {
    setVideo(
      (v) => v && { ...v, keywords: v.keywords.filter((i) => i !== keyword) }
    );
  };

  const next = (good: boolean) => {
    if (!video) return;

    if (good) {
      likeVideo(video, pos);
    }

    if (currentIndex === videos.length - 1) {
      isDone();
      return;
    }

    setCurrentIndex((i) => i + 1);
    setVideo(videos[currentIndex + 1]);
  };

  useEffect(() => {
    setCurrentIndex(0);
    setVideo({ ...videos[0] });
  }, [videos]);

  if (!video) return;

  return (
    <div>
      <p>
        Index: {currentIndex + 1} / {videos.length} (
        {Math.floor(((currentIndex + 1) / videos.length) * 100)}%)
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Video: {video.title}</CardTitle>
          <CardDescription>Description: {video.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-2">
            <p>Keywords: </p>
            <div className="flex flex-row flex-wrap gap-2">
              {video.keywords.map((i) => (
                <button onClick={() => removeKeyword(i)}>
                  <Badge variant={"outline"}>
                    {i} <X />{" "}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
          <p>ID: {video.id}</p>
          <div className="flex flex-row justify-between items-center">
            <div className="relative m-4 w-1/2">
              <video
                draggable={false}
                className="rounded-lg"
                style={{
                  width: `${size}px`,
                  height: `${(size * 9) / 16}px`,
                }}
                width={`${size}px`}
                height={`${(size * 9) / 16}px`}
                autoPlay
                controls
                loop
                key={video.id}
              >
                <source key={video.id} src={video.url} type="video/mp4" />
              </video>
              <Slider
                defaultValue={[pos]}
                onValueChange={(e) => {
                  setPos(e[0]);
                }}
                min={0}
                max={1}
                className="pt-4 w-full"
                step={0.002}
              />
              <div
                className="top-0 left-0 absolute border-8 border-cyan-600 rounded-[16px] w-4 h-4"
                style={{
                  left: `${pos * 100}%`,
                  height: `${(size * 9) / 16}px`,
                  width: `${size * (9 / 16) * (9 / 16)}px`,
                }}
              />
            </div>
            <div className="flex flex-col justify-center gap-12 w-1/2">
              <div className="flex flex-col justify-center items-center">
                <p className="font-bold text-2xl text-center">{video.title}</p>
                <Textarea
                  className="w-2/3 h-36 text-lg"
                  value={video.description}
                  onChange={(e) =>
                    setVideo({ ...video, description: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-row justify-evenly items-center">
                <Button
                  onClick={() => next(true)}
                  className="bg-green-500 hover:bg-green-400 active:bg-green-600 w-36 h-36 transition-all duration-75 aspect-square active:scale-125 active:rotate-6"
                >
                  <Heart size={72} />
                </Button>
                <Button
                  onClick={() => next(false)}
                  className="bg-red-500 hover:bg-red-400 active:bg-red-600 w-36 h-36 transition-all duration-75 aspect-square active:scale-75 active:-rotate-3"
                >
                  <X size={72} />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default VideoSelector;
