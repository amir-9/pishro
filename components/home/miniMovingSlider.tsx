"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import { Swiper as SwiperType } from "swiper/types";

// ثابت‌ها
const MINI_SLIDES = [
  "/images/home/c/metaverse.webp",
  "/images/home/c/airdrop.jpg",
  "/images/home/c/nft.jpg",
  "/images/home/c/metaverse.webp",
  "/images/home/c/airdrop.jpg",
] as const;

const BASE_SPEED = 8000; // سرعت اصلی (در میلی‌ثانیه)
// const HOVER_SPEED = BASE_SPEED * 2; // سرعت هنگام هاور (نصف سرعت اصلی)

interface MiniMovingSliderProps {
  isVisible: boolean;
}

const MiniMovingSlider = ({ isVisible }: MiniMovingSliderProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isHovered, setIsHovered] = useState<number | null>(null); // نگه‌داری اندیس اسلاید هاور شده

  // مدیریت سرعت هنگام هاور
  const handleMouseEnter = (index: number) => {
    setIsHovered(index);
    // if (swiperRef.current) {
    //   const swiper = swiperRef.current;

    //   // متوقف کردن autoplay
    //   swiper.autoplay.stop();

    //   // تغییر سرعت
    //   swiper.params.speed = HOVER_SPEED;

    //   // شروع مجدد با سرعت جدید
    //   swiper.autoplay.start();
    // }
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
    // if (swiperRef.current) {
    //   const swiper = swiperRef.current;

    //   swiper.autoplay.stop();
    //   swiper.params.speed = BASE_SPEED;
    //   swiper.autoplay.start();
    // }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 100,
      }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      className="relative w-full h-[212px] flex items-center justify-center overflow-hidden"
    >
      <Swiper
        modules={[Autoplay]}
        slidesPerView={3.8}
        loop={true}
        allowTouchMove={false}
        spaceBetween={20}
        centeredSlides={false}
        speed={BASE_SPEED} // سرعت اولیه
        autoplay={{
          delay: 0, // بدون تأخیر برای حرکت پیوسته
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // ذخیره رفرنس Swiper
        className="w-full h-full"
        wrapperClass="swiper-wrapper !ease-linear" // اطمینان از حرکت خطی
      >
        {[...MINI_SLIDES, ...MINI_SLIDES].map((src, i) => (
          <SwiperSlide key={i} className="relative w-full h-full">
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={src}
                alt={`mini-slide-${i}`}
                fill
                className="object-cover"
                priority
              />
              {/* لایه تیره شدن هنگام هاور */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.3)", // رنگ تیره با شفافیت
                  opacity: isHovered === i ? 1 : 0, // فقط برای اسلاید هاور شده
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default MiniMovingSlider;
