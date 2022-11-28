import { useState, useEffect } from "react";

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);
  useEffect(() => {
    fetch("https://vid.puffyan.us/api/v1/popular")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      });
  }, []);

  console.log(videos);
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 px-6 justify-center items-center py-5 sm:grid-colos-2 md:grid-cols-3 lg:grid-cols-4">
        {videos &&
          videos.map((video, i) => (
            <>
              <div
                className="card card-compact h-80 bg-secondary shadow-xl"
                key={i}
              >
                <figure>
                  <img
                    src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                    alt="Video"
                    loading="lazy"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title truncate text-ellipsis overflow-hidden">
                    {video.title}
                  </h2>
                  <p>
                    <span>{video.author}</span>
                    <br />
                    <span>
                      {video.viewCount} views • {video.publishedText}
                    </span>
                  </p>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
}
