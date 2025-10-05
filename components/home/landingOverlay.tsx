"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState } from "react";

const LandingOverlay = () => {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // تغییر اپاسیتی اورلی
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.9],
    [0, 0.8, 1]
  );

  const aboutOpacity = useTransform(scrollYProgress, [0.15, 0.18], [0, 1]);
  const aboutY = useTransform(scrollYProgress, [0.15, 0.18], [40, 0]);

  const smoothOpacity = useSpring(aboutOpacity, {
    stiffness: 100,
    damping: 20,
  });
  const smoothY = useSpring(aboutY, { stiffness: 100, damping: 20 });

  // کنترل ویدیو براساس اپاسیتی اورلی
  useMotionValueEvent(overlayOpacity, "change", (latest) => {
    if (latest >= 0.99 && isVideoPlaying) {
      videoRef.current?.pause();
      setIsVideoPlaying(false);
    } else if (latest < 0.99 && !isVideoPlaying) {
      videoRef.current?.play();
      setIsVideoPlaying(true);
    }
  });

  return (
    <>
      {/* ویدیو ثابت در پس‌زمینه */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/video-poster.jpg"
        className="fixed inset-0 w-full h-full object-cover -z-20"
      >
        <source src="/videos/aboutUs.webm" type="video/webm" />
      </video>

      {/* اورلی سفید */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="fixed inset-0 bg-black -z-10"
      />

      {/* سکشن لندینگ فقط برای ارتفاع */}
      <section ref={ref} className="relative w-full h-screen" />

      {/* متن روی ویدیو */}
      <motion.div
        style={{ opacity: smoothOpacity, y: smoothY }}
        transition={{ duration: 0.2 }}
        className="relative z-10 -mt-[5vh] w-full pb-20"
      >
        <OverlayText />
      </motion.div>
    </>
  );
};

export default LandingOverlay;

// ------------ overlay text component -------------
const OverlayText = () => {
  return (
    <div className="w-full flex items-start justify-center h-screen">
      <div className="z-10 flex flex-col items-center justify-center text-center w-full">
        <div className="container space-y-12 px-4">
          <h4 className="text-2xl md:text-4xl lg:text-5xl lg:leading-[64px] font-medium text-white w-full max-w-5xl">
            پیشرو در مسیر سرمایه‌گذاری هوشمند
          </h4>
          <h4 className="text-2xl md:text-4xl lg:text-5xl lg:leading-[64px] font-medium text-white w-full max-w-5xl ">
            ما در <span className="font-medium">پیشرو</span> با ارائه آموزش‌های
            تخصصی بورس، بازارهای مالی و سرمایه‌گذاری، شما را در مسیر رشد مالی
            همراهی می‌کنیم.
          </h4>
          <h4 className="text-2xl md:text-4xl lg:text-5xl lg:leading-[64px] font-medium text-white w-full max-w-5xl ">
            از آموزش اصولی و گام‌به‌گام تا مشاوره‌های حرفه‌ای و همراهی در مسیر
            رشد سرمایه شما، همه و همه در{" "}
            <span className="font-medium">پیشرو</span> فراهم است.
          </h4>
          <h4 className="text-2xl md:text-4xl lg:text-5xl lg:leading-[64px] font-medium text-white w-full max-w-5xl ">
            پیشرو انتخابی مطمئن برای کسانی است که به دنبال امنیت مالی، رشد
            پایدار و آینده‌ای روشن هستند.
          </h4>
        </div>
      </div>
    </div>
  );
};
