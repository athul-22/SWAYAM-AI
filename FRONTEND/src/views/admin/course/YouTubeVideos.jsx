import React, { useState } from "react";
import axios from "axios";

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [playingVideoId, setPlayingVideoId] = useState(null); // To track which video is playing

  const API_KEY = "AIzaSyD04ZHLQfeVIe63de6Rm1Gk-B9phwKRfTU"; // Replace with your YouTube API key

  const fetchVideos = async () => {
    if (!query.trim()) {
      alert("Please enter a valid query!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: "snippet",
            maxResults: 10, // Fetch top 10 videos
            q: query,
            type: "video",
            key: API_KEY,
            order: "viewCount", // Sort videos by view count (most viewed)
          },
        }
      );

      setVideos(response.data.items);
      setPlayingVideoId(null); // Reset currently playing video
    } catch (error) {
      console.error("Error fetching videos:", error);
      alert("Failed to fetch videos. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">YouTube Video Search</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a topic..."
          className="border p-2 rounded-lg w-2/3"
        />
        <button
          onClick={fetchVideos}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isLoading ? "Loading..." : "Search"}
        </button>
      </div>

      {isLoading && <p>Loading videos...</p>}

      {/* Video List */}
      <div className="space-y-4">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="border p-4 rounded-lg hover:bg-gray-100 transition"
          >
            {/* Video Thumbnail and Title */}
            <div
              className="flex cursor-pointer"
              onClick={() => setPlayingVideoId(video.id.videoId)} // Set playing video ID
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-32 h-20 mr-4 rounded-lg"
              />
              <div>
                <h3 className="font-bold text-lg">{video.snippet.title}</h3>
                <p className="text-gray-600">{video.snippet.description}</p>
              </div>
            </div>

            {/* Inline Video Player */}
            {playingVideoId === video.id.videoId && (
              <div className="mt-4">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.snippet.title}
                  className="w-full h-64"
                ></iframe>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeVideos;
