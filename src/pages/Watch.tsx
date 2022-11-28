import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Plyr, { APITypes } from "plyr-react";
import "plyr-react/plyr.css";
import Hls from "hls.js";

export default function Watch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [video, setVideo] = useState<any>({});
  const [comments, setComments] = useState<any[]>([]);
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

  useEffect(() => {
    fetch(`https://pipedapi.kavin.rocks/comments/${searchParams.get("v")}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
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
                <h1 className="text-2xl font-bold text-white mt-2 mx-9 sm:mx-0">
                  {video.title ?? ""}
                </h1>

                <div className="flex items-center gap-3 my-2 mx-9 sm:mx-0">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={video.uploaderAvatar ?? ""}
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
                    <span className="text-slate-500 font-light dark:text-slate-400">
                      {(video.uploaderSubscriberCount ?? "") + " Subscribers"}
                    </span>
                  </div>
                  <div className="ml-auto">
                    <div className="tabs tabs-boxed">
                      <a className="tab">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                          />
                        </svg>
                        &nbsp;
                        {video.likes ?? ""}
                      </a>
                      <a className="tab">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                          />
                        </svg>
                        &nbsp;
                        {video.dislikes ?? ""}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="flex flex-col w-auto lg:flex-row mx-9 sm:mx-0 mb-2">
                  <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center p-3 overflow-scroll">
                    <span className="font-bold">
                      {(video.views ?? "") +
                        " Views • " +
                        (video.uploadDate ?? "")}
                    </span>
                    {video.description ?? ""}
                  </div>
                </div>
                <div className="divider"></div>
                <div className="mx-9 sm:mx-0">
                  {comments?.map((comment: any) => (
                    <div className="flex items-center gap-3 p-3">
                      <img
                        className="w-12 h-12 rounded-full"
                        src={comment.thumbnail}
                        loading="lazy"
                      ></img>
                      <div className="flex flex-col">
                        <strong className="text-slate-900 font-medium dark:text-slate-200">
                          {comment.author}
                          <span className="text-gray-600 font-light">
                            {" "}
                            {comment.commentedTime}
                          </span>
                        </strong>
                        <span className="text-slate-500 font-medium dark:text-slate-400">
                          {comment.commentText}
                        </span>
                        <div className="tabs">
                          <a className="tab">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                              />
                            </svg>
                            &nbsp;
                            {comment.likeCount ?? ""}
                          </a>
                          <a className="tab">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                              />
                            </svg>
                            &nbsp;
                            {comment.replyCount ?? ""}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
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
                        src={video.thumbnail ?? ""}
                        loading="lazy"
                      ></img>
                      <div className="flex flex-col">
                        <strong className="text-slate-900 font-medium dark:text-slate-200 ">
                          {video.title ?? ""}
                        </strong>
                        <span className="text-slate-500 font-medium dark:text-slate-400 inline-flex items-baseline">
                          <img
                            src={video.uploaderAvatar ?? ""}
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
