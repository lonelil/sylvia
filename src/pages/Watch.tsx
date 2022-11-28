import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  console.log(videoStreams);

  return (
    <>
      <section className="h-screen overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="-m-6 flex flex-wrap justify-between pt-28 pb-40">
            <div className="w-full lg:w-5/12 xl:w-1/2">
              <div className="">
                {videoStreams[0] ? (
                  <Plyr
                    source={{
                      type: "video",
                      sources: [
                        {
                          src: videoStreams.at(-1).url,
                          type: "video/mp4",
                        },
                      ],
                    }}
                  />
                ) : (
                  <h1>loading...</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
