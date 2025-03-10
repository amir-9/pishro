"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import VideoPlayer from "./videoPlayer";
import { videoList } from "@/public/data";
import Link from "next/link";

interface Video {
  id: string;
  label: string;
  date: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
}

interface ClassPageContentProps {
  classData?: Video;
}

const ClassPageContent: React.FC<ClassPageContentProps> = ({ classData }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(
    classData || videoList[0] || null
  );

  useEffect(() => {
    if (classData) {
      setSelectedVideo(classData);
    }
  }, [classData]);

  return (
    <div className="container">
      <div className="flex gap-6">
        {/* ویدیو پلیر */}
        <div className="flex-1 min-w-3xl">
          {selectedVideo ? (
            <VideoPlayer
              label={selectedVideo.label}
              videoUrl={selectedVideo.videoUrl}
            />
          ) : (
            <p className="text-center text-gray-500">
              ویدیویی برای نمایش وجود ندارد
            </p>
          )}
        </div>

        {/* سایدبار لیست ویدیوها */}
        <div className="w-96 bg-[#fafafa] dark:bg-gray-900 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">ویدیو سایر جلسات</h3>
          <ul className="space-y-4 max-h-[500px] overflow-y-auto">
            {videoList.map((video) => (
              <li
                key={video.id}
                className={`cursor-pointer rounded-md transition-all duration-200 ${"hover:bg-gray-200 dark:hover:bg-gray-800"}`}
                onClick={() => setSelectedVideo(video)}
              >
                <Link
                  href={`/class/${video.id}`}
                  className="flex items-center gap-3 p-3 w-full"
                >
                  {/* تصویر بندانگشتی */}
                  <div className="relative w-20 h-16 rounded-full">
                    <Image
                      src={video.thumbnail}
                      alt={video.label}
                      fill
                      className=" rounded-full object-cover"
                    />
                  </div>

                  {/* اطلاعات ویدیو */}
                  <div className="flex flex-col">
                    <span className="text-xs text-[#666]">{video.date}</span>
                    <span className="font-semibold text-[#495157] text-xs">
                      {video.label}
                    </span>
                    <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClassPageContent;
