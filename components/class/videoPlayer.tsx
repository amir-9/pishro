"use client";

import React, { useRef, useEffect, useState } from "react";
import "plyr/dist/plyr.css";

interface VideoPlayerProps {
  videoUrl: string | null;
  label: string;
  description?: string | null;
  duration?: string | null;
  views?: number;
  createdAt?: Date;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  label,
  description,
  duration,
  views,
  createdAt,
}) => {
  const [isClient, setIsClient] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    // Mark that the component is running on the client side
    setIsClient(true);

    // Dynamically import Plyr within useEffect to avoid SSR issues
    import("plyr").then((module) => {
      const Plyr = module.default;
      if (videoRef.current) {
        // Initialize Plyr on the video element
        playerRef.current = new Plyr(videoRef.current, {
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "captions",
            "settings",
            "fullscreen",
          ],
          // i18n settings for Persian labels
          i18n: {
            restart: "شروع مجدد",
            rewind: "بازپخش {seektime} ثانیه",
            play: "پخش",
            pause: "توقف",
            fastForward: "پیش‌برد {seektime} ثانیه",
            seek: "جستجو",
            played: "پخش شده",
            buffered: "بارگذاری شده",
            currentTime: "زمان فعلی",
            duration: "مدت زمان",
            volume: "صدا",
            mute: "بی‌صدا",
            unmute: "با صدا",
            enableCaptions: "فعال کردن زیرنویس",
            disableCaptions: "غیرفعال کردن زیرنویس",
            download: "دانلود",
            enterFullscreen: "تمام صفحه",
            exitFullscreen: "خروج از تمام صفحه",
            frameTitle: "پخش‌کننده برای {title}",
            captions: "زیرنویس",
            settings: "تنظیمات",
            menuCaptions: "زیرنویس",
            speed: "سرعت",
            normal: "معمولی",
            quality: "کیفیت",
          },
        });
      }
    });

    // Cleanup on unmount: destroy the Plyr instance if exists
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoUrl, isClient]);

  if (!isClient) return null;

  return (
    // تنظیم جهت نمایش به صورت راست به چپ
    <div className="py-8" dir="rtl">
      <div className="w-full max-w-4xl rounded-lg overflow-hidden">
        <video ref={videoRef} className="plyr__video-embed" controls>
          {videoUrl && <source src={videoUrl} type="video/mp4" />}
        </video>
      </div>
      <div className="w-full max-w-4xl">
        <p className="mt-8 text-2xl font-bold">{label}</p>
        <div className="flex justify-between gap-4 flex-wrap items-center mt-2">
          {duration && <p className="text-sm text-[#666]">مدت زمان: {duration}</p>}
          <div className="flex items-center gap-4 text-sm text-[#666] font-medium">
            {createdAt && (
              <p>
                {new Date(createdAt).toLocaleDateString("fa-IR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </p>
            )}
            {views !== undefined && <p>{views.toLocaleString("fa-IR")} مشاهده</p>}
          </div>
        </div>
        {description && (
          <div>
            <p className="text-sm text-[#666] font-medium mt-4">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
