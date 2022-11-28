import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function Results() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [videos, setVideos] = useState<any[]>([]);
  useEffect(() => {
    fetch(
      `https://vid.puffyan.us/api/v1/search?q=${searchParams.get(
        "search_query"
      )}&type=all`
    )
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      });
  }, [searchParams]);

  return (
    <>
      <section className="h-full min-h-screen overflow-hidden">
        <div className="grid w-full grid-cols-1 gap-4 px-6 justify-center items-center py-5 sm:grid-colos-2 md:grid-cols-3 lg:grid-cols-4">
          {videos &&
            videos.map((video, i) => (
              <>
                {video.type === "video" ? (
                  <Link to={`/watch?v=${video.videoId}`} key={i}>
                    <div className="card card-compact h-80 bg-secondary shadow-xl">
                      <figure>
                        <img
                          src={video.videoThumbnails ?? ""}
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
                ) : video.type === "channel" ? (
                  <Link to={`/channel/${video.authorId}`} key={i}>
                    <div className="card card-compact bg-secondary shadow-xl">
                      <div className="card-body">
                        <div className="flex items-center gap-3">
                          <img
                            className="w-12 h-12 rounded-full"
                            src={video.authorThumbnails?.at(-1).url ?? ""}
                          ></img>
                          <div className="flex flex-col">
                            <strong className="text-slate-900 font-medium dark:text-slate-200">
                              {video.author ?? ""}
                            </strong>
                            <span className="text-slate-500 font-medium dark:text-slate-400">
                              {(video.subCount ?? "") + " Subscribers"}
                            </span>
                          </div>
                        </div>
                        <p className="truncate text-ellipsis overflow-hidden">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ) : null}
              </>
            ))}
        </div>
      </section>
    </>
  );
}
