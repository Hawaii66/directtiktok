package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	storage_go "github.com/supabase-community/storage-go"
)

type VideoURLS struct {
	Background string `json:"background"`
	Voice      string `json:"voice"`
	Overlay    string `json:"overlay"`
}

type Video struct {
	Urls    VideoURLS `json:"urls"`
	Quote   string    `json:"quote"`
	Text    string    `json:"text"`
	Id      string    `json:"id"`
	VideoId string    `json:"videoId"`
	Words   []Word    `json:"words"`
}

type Word struct {
	Word  string  `json:"word"`
	Start float64 `json:"start"`
	End   float64 `json:"end"`
}

func FormatWordString(words []Word) string {
	str := "drawtext=fontfile=./notoserif.ttf:text='$TEXT$':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=80*(1+0.2*sin(t/$DURATION$)):fontcolor=white:borderw=6:bordercolor=black:enable='between(t,$START$,$END$)'"

	final := ""
	for _, word := range words {
		duration := word.End - word.Start
		modify := strings.Clone(str)
		modify = strings.ReplaceAll(modify, "$TEXT$", word.Word)
		modify = strings.ReplaceAll(modify, "$DURATION$", strconv.FormatFloat(duration, 'f', 4, 64))
		modify = strings.ReplaceAll(modify, "$START$", strconv.FormatFloat(word.Start, 'f', 4, 64))
		modify = strings.ReplaceAll(modify, "$END$", strconv.FormatFloat(word.End, 'f', 4, 64))
		final += fmt.Sprintln(`"` + modify + `"`)
	}

	fmt.Println(final)
	return final

}

func RenderVideo(video Video) (error, string) {
	content, err2 := os.ReadFile("commandreplace.txt")
	if err2 != nil {
		log.Fatal(err2)
	}

	videoName := video.Id + ".mp4"

	contentString := strings.ReplaceAll(string(content), "$WORDS$", FormatWordString(video.Words))
	contentString = strings.ReplaceAll(contentString, "$INPUT$", video.Urls.Background)
	contentString = strings.ReplaceAll(contentString, "$SOUND$", video.Urls.Voice)
	contentString = strings.ReplaceAll(contentString, "$OVERLAY$", video.Urls.Overlay)
	contentString = strings.ReplaceAll(contentString, "$OUTPUT$", videoName)

	currentDir, err := os.Getwd()
	if err != nil {
		fmt.Println("Error getting current directory:", err)
		return err, ""
	}

	// Create the script file in the current directory
	scriptFilePath := filepath.Join(currentDir, "script.sh")
	scriptFile, err := os.Create(scriptFilePath)
	if err != nil {
		fmt.Println("Error creating script file:", err)
		return err, ""
	}

	// Write the bash script to the file
	if _, err := scriptFile.Write([]byte(contentString)); err != nil {
		fmt.Println("Error writing to script file:", err)
		return err, ""
	}

	// Make the script file executable
	if err := scriptFile.Chmod(0755); err != nil {
		fmt.Println("Error making file executable:", err)
		return err, ""
	}

	// Close the file
	if err := scriptFile.Close(); err != nil {
		fmt.Println("Error closing script file:", err)
		return err, ""
	}

	// Execute the bash script
	cmd := exec.Command("bash", scriptFilePath)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	if err := cmd.Run(); err != nil {
		fmt.Println("Error executing script:", err)
		return err, ""
	}

	return nil, videoName
}

func UploadVideo(video string, storage *storage_go.Client) (storage_go.FileUploadResponse, error) {
	fmt.Println(video)

	file, err := os.Open(video)
	if err != nil {
		log.Fatal("Upload image", "Open file", err, video)
		return storage_go.FileUploadResponse{}, err
	}

	defer file.Close()

	return storage.UploadFile("tiktok", "videos/"+video, file, storage_go.FileOptions{})
}

func RemoveFile(video string) {
	err := os.Remove(video)
	if err != nil {
		log.Println("Couldnt remove file", video)
		log.Fatal(err)
	}
}

func GenerateHandler(w http.ResponseWriter, r *http.Request, supabase_storage *storage_go.Client) {

	var video Video
	err := json.NewDecoder(r.Body).Decode(&video)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	fmt.Println("Generating video: ", video)

	err, videoName := RenderVideo(video)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	c, err := UploadVideo(videoName, supabase_storage)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)

	}

	fmt.Println(c)
	jsonResponse, jsonError := json.Marshal(c)

	if jsonError != nil {
		fmt.Println("Unable to encode JSON")
	}

	fmt.Println(string(jsonResponse))

	RemoveFile(videoName)

	url := supabase_storage.GetPublicUrl("tiktok", "videos/"+videoName)

	io.WriteString(w, url.SignedURL)
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	io.WriteString(w, "Image converter server")
}
func main() {
	godotenv.Load()
	SUPABASE_URL := os.Getenv("SUPABASE_DEVELOPMENT_URL")
	SUPABASE_ANON_KEY := os.Getenv("SUPABASE_DEVELOPMENT_ANON_KEY")

	storageClient := storage_go.NewClient(SUPABASE_URL+"/storage/v1", SUPABASE_ANON_KEY, nil)

	r := mux.NewRouter()
	r.HandleFunc("/", HomeHandler)
	r.HandleFunc("/generate", func(res http.ResponseWriter, req *http.Request) {
		GenerateHandler(res, req, storageClient)
	})

	port := os.Getenv("PORT")
	url := "0.0.0.0:" + port

	server := &http.Server{
		Addr:         url,
		Handler:      r,
		WriteTimeout: 30 * time.Second,
		ReadTimeout:  30 * time.Second,
	}

	fmt.Println("Server started on url: http://" + url)
	err := server.ListenAndServe()

	if err != nil {
		log.Fatal("Main", "Start server", err)
	}

}
