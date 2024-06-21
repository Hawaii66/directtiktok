export type CoverrResponse = {
  hits: {
    title: string;
    description: string;
    tags?: string[] | null;
    isPremium: boolean;
    urls: {
      mp4: string;
    };
    objectID: string;
  }[];
};

export type Video = {
  title: string;
  description: string;
  id: string;
  keywords: string[];
  url: string;
};

export type Script = {
  videoId: string;
  quote: string;
  text: string;
  hashtags: string[];
  id: string;
};

export type VideoScripts = {
  video: Video;
  scripts: Script[];
};

export type Word = {
  word: string;
  start: number;
  end: number;
};

export type Sound = {
  words: Word[];
  soundUrl: string;
  scriptId: string;
};

export type GenerateVideo = {
  sound: Sound;
  script: Script;
  video: Video;
};
