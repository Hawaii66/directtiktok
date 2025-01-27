#!/bin/bash


words=(
  "drawtext=fontfile=./notoserif.ttf:text='Success':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.813)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,0,0.813)'"
  "drawtext=fontfile=./notoserif.ttf:text='is':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,0.813,1.138)'"
  "drawtext=fontfile=./notoserif.ttf:text='in':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,1.138,1.277)'"
  "drawtext=fontfile=./notoserif.ttf:text='the':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,1.277,1.393)'"
  "drawtext=fontfile=./notoserif.ttf:text='details.':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,1.393,2.577)'"
  "drawtext=fontfile=./notoserif.ttf:text='Paying':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,2.577,2.914)'"
  "drawtext=fontfile=./notoserif.ttf:text='attention':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,2.914,3.413)'"
  "drawtext=fontfile=./notoserif.ttf:text='to':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,3.413,3.541)'"
  "drawtext=fontfile=./notoserif.ttf:text='the':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,3.541,3.657)'"
  "drawtext=fontfile=./notoserif.ttf:text='smallest':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,3.657,4.145)'"
  "drawtext=fontfile=./notoserif.ttf:text='task':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,4.145,4.876)'"
  "drawtext=fontfile=./notoserif.ttf:text='can':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,4.876,5.166)'"
  "drawtext=fontfile=./notoserif.ttf:text='lead':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,5.166,5.41)'"
  "drawtext=fontfile=./notoserif.ttf:text='to':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,5.41,5.526)'"
  "drawtext=fontfile=./notoserif.ttf:text='the':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,5.526,5.654)'"
  "drawtext=fontfile=./notoserif.ttf:text='greatest':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,5.654,6.351)'"
  "drawtext=fontfile=./notoserif.ttf:text='achievements.':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,6.351,7.709)'"
  "drawtext=fontfile=./notoserif.ttf:text='Take':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,7.709,8.081)'"
  "drawtext=fontfile=./notoserif.ttf:text='pride':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,8.081,8.916)'"
  "drawtext=fontfile=./notoserif.ttf:text='in':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,8.916,9.16)'"
  "drawtext=fontfile=./notoserif.ttf:text='every':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,9.16,9.416)'"
  "drawtext=fontfile=./notoserif.ttf:text='action':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,9.416,9.845)'"
  "drawtext=fontfile=./notoserif.ttf:text='you':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,9.845,10.054)'"
  "drawtext=fontfile=./notoserif.ttf:text='perform.':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.1*sin(2*PI*(t))):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,10.054,11.006)'"
)

drawtext_filters=$(IFS=, ; echo "${words[*]}")

# Input files
video1="input_video.mp4"
audio1="your_audio_file.mp3"
video2="overlay_video.mp4"
audio2="overlay_audio.mp3"

# Intermediate files
output1="output1.mp4"

# Final output file
final_output="final_output.mp4"

# TikTok resolution
tiktok_width=1080
tiktok_height=1920

# Crop position as a percentage of the video width
position=0.7

# Process the first video and audio, ensuring the video matches the audio length
ffmpeg -i "$video1" -i "$audio1" -filter_complex "[0:v]crop=w=ih*9/16:h=ih:x=iw*${position}-(iw*9/16)/2:y=0,scale=${tiktok_width}:${tiktok_height},${drawtext_filters}[v0];[1:a]aresample=async=1[a1];[v0][a1]concat=n=1:v=1:a=1[v][a]" -map "[v]" -map "[a]" -shortest -y "$output1"

# Create a file list for concatenation
echo "file '$output1'" > concat_list.txt
echo "file '$video2'" >> concat_list.txt

# Concatenate the two videos with re-encoding
ffmpeg -f concat -safe 0 -i concat_list.txt -c:v libx264 -c:a aac -strict experimental -b:a 192k "$final_output"

# Clean up intermediate files
rm concat_list.txt 
rm "$output1"
