#!/bin/bash


words=(
"drawtext=fontfile=./notoserif.ttf:text='The':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.2090)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,0.0000,0.2090)'"
"drawtext=fontfile=./notoserif.ttf:text='smallest':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.6150)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,0.2090,0.8240)'"
"drawtext=fontfile=./notoserif.ttf:text='streets':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.8710)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,0.8240,1.6950)'"
"drawtext=fontfile=./notoserif.ttf:text='hold':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.4060)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,1.6950,2.1010)'"
"drawtext=fontfile=./notoserif.ttf:text='the':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.1170)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,2.1010,2.2180)'"
"drawtext=fontfile=./notoserif.ttf:text='biggest':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.4990)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,2.2180,2.7170)'"
"drawtext=fontfile=./notoserif.ttf:text='stories.':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/1.6140)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,2.7170,4.3310)'"
"drawtext=fontfile=./notoserif.ttf:text='Pause':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.5100)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,4.3310,4.8410)'"
"drawtext=fontfile=./notoserif.ttf:text='your':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.2790)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,4.8410,5.1200)'"
"drawtext=fontfile=./notoserif.ttf:text='scrolling':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.9290)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,5.1200,6.0490)'"
"drawtext=fontfile=./notoserif.ttf:text='and':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.3480)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,6.0490,6.3970)'"
"drawtext=fontfile=./notoserif.ttf:text='immerse':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.4060)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,6.3970,6.8030)'"
"drawtext=fontfile=./notoserif.ttf:text='yourself':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.8020)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,6.8030,7.6050)'"
"drawtext=fontfile=./notoserif.ttf:text='in':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.1850)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,7.6050,7.7900)'"
"drawtext=fontfile=./notoserif.ttf:text='the':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.1400)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,7.7900,7.9300)'"
"drawtext=fontfile=./notoserif.ttf:text='world':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.6610)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,7.9300,8.5910)'"
"drawtext=fontfile=./notoserif.ttf:text='around':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.6740)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,8.5910,9.2650)'"
"drawtext=fontfile=./notoserif.ttf:text='you.':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.9290)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,9.2650,10.1940)'"
"drawtext=fontfile=./notoserif.ttf:text='Go':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.2670)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,10.1940,10.4610)'"
"drawtext=fontfile=./notoserif.ttf:text='explore':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.6610)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,10.4610,11.1220)'"
"drawtext=fontfile=./notoserif.ttf:text='those':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.3250)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,11.1220,11.4470)'"
"drawtext=fontfile=./notoserif.ttf:text='charming':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.5000)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,11.4470,11.9470)'"
"drawtext=fontfile=./notoserif.ttf:text='alleyways':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.7540)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,11.9470,12.7010)'"
"drawtext=fontfile=./notoserif.ttf:text='and':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.2330)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,12.7010,12.9340)'"
"drawtext=fontfile=./notoserif.ttf:text='hidden':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.4290)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,12.9340,13.3630)'"
"drawtext=fontfile=./notoserif.ttf:text='gems.':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/1.2770)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,13.3630,14.6400)'"
"drawtext=fontfile=./notoserif.ttf:text='You':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.2090)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,14.6400,14.8490)'"
"drawtext=fontfile=./notoserif.ttf:text='never':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.2440)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,14.8490,15.0930)'"
"drawtext=fontfile=./notoserif.ttf:text='know':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.2210)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,15.0930,15.3140)'"
"drawtext=fontfile=./notoserif.ttf:text='what':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.2900)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,15.3140,15.6040)'"
"drawtext=fontfile=./notoserif.ttf:text='memories':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.5800)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,15.6040,16.1840)'"
"drawtext=fontfile=./notoserif.ttf:text='youll':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/0.3370)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,16.1840,16.5210)'"

)

drawtext_filters=$(IFS=, ; echo "${words[*]}")

# Input files
video1="https://cdn.coverr.co/videos/coverr-a-narrow-alleyway-in-spain-80/1080p.mp4"
audio1="https://smavtjhbibxqsksbvgbp.supabase.co/storage/v1/object/public/tiktok/./sounds/f4e8d8ce-3a4c-414f-825c-aad28d4d08b3.mp3"
video2="https://smavtjhbibxqsksbvgbp.supabase.co/storage/v1/object/public/tiktok/overlay.mp4"

# Intermediate files
output1="output.mp4"

# Final output file
final_output="f4e8d8ce-3a4c-414f-825c-aad28d4d08b3.mp4"

# TikTok resolution
tiktok_width=1080
tiktok_height=1920

# Crop position as a percentage of the video width
position=0.7

echo What

# Process the first video and audio, ensuring the video matches the audio length
ffmpeg -i "$video1" -i "$audio1" -filter_complex "[0:v]crop=w=ih*9/16:h=ih:x=iw*${position}-(iw*9/16)/2:y=0,scale=${tiktok_width}:${tiktok_height},${drawtext_filters}[v0];[1:a]aresample=async=1[a1];[v0][a1]concat=n=1:v=1:a=1[v][a]" -map "[v]" -map "[a]" -shortest -y "$output1"

# Create a file list for concatenation
echo "file '$output1'" > concat_list.txt
echo "file '$video2'" >> concat_list.txt

# Concatenate the two videos with re-encoding
ffmpeg -f concat -safe 0 -protocol_whitelist file,http,https,tcp,tls,crypto -i concat_list.txt -c:v libx264 -c:a aac -strict experimental  -b:a 192k "$final_output"

# Clean up intermediate files
rm concat_list.txt 
rm "$output1"
