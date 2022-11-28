import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function Channel() {
  const { id } = useParams();
  const [channel, setChannel] = useState<any>([]);
  const [latestVideos, setLatestVideos] = useState<any[]>([]);
  useEffect(() => {
    fetch(`https://vid.puffyan.us/api/v1/channels/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setChannel(data);
        setLatestVideos(data.latestVideos);
      });
  }, []);

  return (
    <>
      <section className="h-full min-h-screen overflow-hidden">
        <div className="flex items-center gap-3 p-6">
          <img
            className="w-12 h-12 rounded-full"
            src={channel.authorThumbnails?.at(-1).url ?? ""}
          ></img>
          <div className="flex flex-col">
            <strong className="text-slate-900 font-medium dark:text-slate-200">
              {channel.author ?? ""}
            </strong>
            <span className="text-slate-500 font-medium dark:text-slate-400">
              {(channel.subCount ?? "") + " Subscribers"}
            </span>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 px-6 justify-center items-center py-5 sm:grid-colos-2 md:grid-cols-3 lg:grid-cols-4">
          {latestVideos &&
            latestVideos.map((video, i) => (
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
