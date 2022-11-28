import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Plyr, { APITypes } from "plyr-react";
import "plyr-react/plyr.css";
import Hls from "hls.js";

export default function Watch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [video, setVideo] = useState<any>({});

  const plyrRef = useRef<APITypes>(null);

  useEffect(() => {
    fetch(`https://pipedapi.kavin.rocks/streams/${searchParams.get("v")}`)
      .then((res) => res.json())
      .then((data) => {
        setVideo(data);
        //@ts-ignore
        const video = plyrRef.current.plyr.media;
        const hls = new Hls();
        hls.loadSource(data.hls);
        hls.attachMedia(video);
        //@ts-ignore
        plyrRef.current.plyr.play();
      });
  }, [searchParams]);

  return (
    <>
      <section className="h-full min-h-screen overflow-hidden">
        <div className="container mx-auto px-2">
          <div className="-m-6 flex flex-wrap justify-between pt-14 pb-40">
            <div className="w-full lg:w-8/12">
              <div>
                {/*
                // @ts-ignore */}
                <Plyr ref={plyrRef} />
                <h1 className="text-2xl font-bold text-white mt-2">
                  {video.title ?? ""}
                </h1>

                <div className="flex items-center gap-3 mt-2">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={
                      video.uploaderAvatar?.replace(
                        "https://pipedproxy.kavin.rocks",
                        "https://yt3.ggpht.com"
                      ) ?? ""
                    }
                  ></img>
                  <div className="flex flex-col">
                    <Link to={video.uploaderUrl}>
                      <strong className="text-slate-900 font-medium dark:text-slate-200">
                        {video.uploader ?? ""}
                        {video.uploaderVerified && (
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
                    </Link>
                    <span className="text-slate-500 font-medium dark:text-slate-400">
                      {(video.uploaderSubscriberCount ?? "") + " Subscribers"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-4/12 pl-10 -mt-3">
              {video.relatedStreams &&
                video.relatedStreams.map((video: any, i: number) => (
                  <Link to={video.url} key={i}>
                    <div className="flex items-center gap-3 mt-3">
                      <img
                        className="w-[168px] h-[94px] rounded-md"
                        src={
                          video.thumbnail
                            ? `https://i.ytimg.com/vi/${video.url.replace(
                                "/watch?v=",
                                ""
                              )}/maxresdefault.jpg`
                            : ""
                        }
                        loading="lazy"
                      ></img>
                      <div className="flex flex-col">
                        <strong className="text-slate-900 font-medium dark:text-slate-200 ">
                          {video.title ?? ""}
                        </strong>
                        <span className="text-slate-500 font-medium dark:text-slate-400 inline-flex items-baseline">
                          <img
                            src={
                              video.uploaderAvatar?.replace(
                                "https://pipedproxy.kavin.rocks",
                                "https://yt3.ggpht.com"
                              ) ?? ""
                            }
                            alt=""
                            className="self-center w-5 h-5 rounded-full mr-1"
                          />
                          <span>{video.uploaderName ?? ""}</span>
                        </span>
                        <span className="text-slate-600 text-sm dark:text-slate-500">
                          {(video.views ?? "") +
                            " Views • " +
                            (video.uploadedDate ?? "")}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
