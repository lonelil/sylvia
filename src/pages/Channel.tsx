import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function Channel() {
  const { id } = useParams();
  const [channel, setChannel] = useState<any>([]);

  useEffect(() => {
    fetch(`https://pipedapi.kavin.rocks/channel/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setChannel(data);
      });
  }, []);

  return (
    <>
      <section className="h-full min-h-screen overflow-hidden">
        <img
          className="justify-center w-full h-64 object-cover"
          src={channel.bannerUrl ?? ""}
          alt="Banner"
          loading="lazy"
        ></img>
        <div className="flex items-center gap-3 p-6">
          <img
            className="w-12 h-12 rounded-full"
            src={channel.avatarUrl ?? ""}
            loading="lazy"
          ></img>
          <div className="flex flex-col">
            <strong className="text-slate-900 font-medium dark:text-slate-200">
              {channel.name ?? ""}
              {channel.verified && (
                <>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 inline-block"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              )}
            </strong>
            <span className="text-slate-500 font-medium dark:text-slate-400">
              {(channel.subscriberCount ?? "") + " Subscribers"}
            </span>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 px-6 justify-center items-center py-5 sm:grid-colos-4 md:grid-cols-5 lg:grid-cols-6">
          {channel.relatedStreams &&
            channel.relatedStreams.map((video: any, i: number) => (
              <Link to={video.url} key={i}>
                <div className="card card-compact h-50 bg-secondary shadow-xl">
                  <figure>
                    <img
                      src={video.thumbnail ?? ""}
                      alt="Video"
                      loading="lazy"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title truncate text-ellipsis overflow-hidden">
                      {video.title}
                    </h2>
                    <p>
                      <span>{video.uploaderName}</span>
                      <br />
                      <span>
                        {video.views} views ??? {video.uploadedDate}
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
