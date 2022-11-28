import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);
  useEffect(() => {
    fetch("https://vid.puffyan.us/api/v1/popular")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      });
  }, []);

  return (
    <>
      <section className="h-full min-h-screen overflow-hidden">
        <div className="grid w-full grid-cols-1 gap-4 px-6 justify-center items-center py-5 sm:grid-colos-2 md:grid-cols-3 lg:grid-cols-4">
          {videos &&
            videos.map((video, i) => (
              <Link to={`/watch?v=${video.videoId}`} key={i}>
                <div className="card card-compact h-80 bg-secondary shadow-xl">
                  <figure>
                    <img
                      src={
                        video.videoThumbnails
                          ? `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`
                          : ""
                      }
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
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
