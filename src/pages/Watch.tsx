import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

export default function Watch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [video, setVideo] = useState<any>({});
  const [videoStreams, setVideoStreams] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://vid.puffyan.us/api/v1/videos/${searchParams.get("v")}`)
      .then((res) => res.json())
      .then((data) => {
        setVideo(data);
        setVideoStreams(
          data.formatStreams.filter((stream: any) => stream.container === "mp4")
        );
      });
  }, [searchParams]);

  return (
    <>
      <section className="h-full min-h-screen overflow-hidden">
        <div className="container mx-auto px-2">
          <div className="-m-6 flex flex-wrap justify-between pt-14 pb-40">
            <div className="w-full lg:w-8/12">
              <div>
                <Plyr
                  source={{
                    type: "video",
                    sources: [
                      {
                        src: videoStreams[0]?.url ?? "",
                        type: "video/mp4",
                      },
                    ],
                  }}
                />
                <h1 className="text-2xl font-bold text-white mt-2">
                  {video.title ?? ""}
                </h1>

                <div className="flex items-center gap-3 mt-2">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={video.authorThumbnails?.at(-1).url ?? ""}
                  ></img>
                  <div className="flex flex-col">
                    <strong className="text-slate-900 font-medium dark:text-slate-200">
                      {video.author ?? ""}
                    </strong>
                    <span className="text-slate-500 font-medium dark:text-slate-400">
                      {(video.subCountText ?? "") + " Subscribers"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-4/12 pl-10 -mt-3">
              {video.recommendedVideos &&
                video.recommendedVideos.map((video: any, i: number) => (
                  <Link to={`/watch?v=${video.videoId}`} key={i}>
                    <div className="flex items-center gap-3 mt-3">
                      <img
                        className="w-[168px] h-[94px] rounded-md"
                        src={
                          video.videoThumbnails
                            ? `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`
                            : ""
                        }
                        loading="lazy"
                      ></img>
                      <div className="flex flex-col">
                        <strong className="text-slate-900 font-medium dark:text-slate-200">
                          {video.title ?? ""}
                        </strong>
                        <span className="text-slate-500 font-medium dark:text-slate-400">
                          {video.author ?? ""}
                        </span>
                        <span className="text-slate-600 text-sm dark:text-slate-500">
                          {(video.viewCountText ?? "") + " Views"}
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
