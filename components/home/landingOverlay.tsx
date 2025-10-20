"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Swiper as SwiperType } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
const images = [
  "/images/home/c/metaverse.webp",
  "/images/home/c/airdrop.jpg",
  "/images/home/c/nft.jpg",
];

const LandingOverlay = () => {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [hideMainText, setHideMainText] = useState(false);

  // مقدار اسکرول نسبت به سکشن اصلی
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // اورلی: وقتی ۲۰٪ از متن وارد شد، پس‌زمینه شروع به تاریک شدن می‌کنه
  // تا زمانی که حدود ۶۰٪ صفحه پر شد، کاملاً سیاه میشه
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.2, 0.55, 0.7],
    [0, 0.7, 0.9, 1]
  );

  const TextOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.15],
    [0, 0.8, 1]
  );
  const BgColor = useTransform(
    scrollYProgress,
    [0, 0.7, 0.71],
    ["transparent", "transparent", "black"]
  );

  return (
    <>
      <section ref={ref} className="relative w-full">
        {/* بخش چسبیده به بالای صفحه */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* ویدیو پس‌زمینه */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover -z-50"
          >
            <source src="/videos/aboutUs.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-black/25 transition-none" />
          {/* اورلی سیاه که با اسکرول تاریک‌تر میشه */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black transition-none"
          />
        </div>
        {/* محتوای متن */}
        <AnimatePresence mode="wait">
          {!hideMainText && (
            <motion.div
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute top-0 z-10"
            >
              <OverlayMainText />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="relative z-10 flex flex-col justify-start items-center">
          {/* وقتی اسکرول می‌کنی، متن بالا می‌ره طبیعی */}
          <motion.div
            style={{ opacity: TextOpacity, backgroundColor: BgColor }}
            className="flex items-center justify-center w-full"
          >
            <OverlayText onEnter={(bol: boolean) => setHideMainText(bol)} />
          </motion.div>
        </div>
      </section>
      <ImageZoomSliderSection parentRef={ref} />
    </>
  );
};

export default LandingOverlay;

// ------------ متن روی ویدیو -------------
const OverlayText = ({ onEnter }: { onEnter: (bol: boolean) => void }) => {
  const texts = [
    "پیشرو در مسیر سرمایه‌گذاری هوشمند",
    "ما در پیشرو با ارائه آموزش‌های تخصصی بورس، بازارهای مالی و سرمایه‌گذاری، شما را در مسیر رشد مالی همراهی می‌کنیم.",
    "از آموزش اصولی و گام‌به‌گام تا مشاوره‌های حرفه‌ای و همراهی در مسیر رشد سرمایه شما، همه و همه در پیشرو فراهم است.",
    "پیشرو انتخابی مطمئن برای کسانی است که به دنبال امنیت مالی، رشد پایدار و آینده‌ای روشن هستند.",
  ];

  return (
    <div className="w-full flex items-start justify-center pb-40">
      <div className="z-10 flex flex-col items-center justify-center text-right w-full">
        <div className="container space-y-12 px-4">
          {texts.map((text, i) => (
            <motion.h4
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1, // دونه‌دونه ظاهر می‌شن
                ease: "easeOut",
              }}
              exit={{
                opacity: 0,
                y: i % 2 === 0 ? -50 : 50, // خروج متناسب با جهت ورود
                transition: { duration: 0.6, ease: "easeInOut" },
              }}
              viewport={{
                once: false,
                amount: 0.1,
              }}
              onViewportEnter={i === 0 ? () => onEnter(true) : undefined}
              onViewportLeave={i === 0 ? () => onEnter(false) : undefined}
              className="text-2xl md:text-4xl lg:text-5xl lg:leading-[64px] font-bold text-white w-full max-w-5xl"
            >
              {text.includes("پیشرو") ? (
                <>
                  {text.split("پیشرو")[0]}
                  <span className="font-bold">پیشرو</span>
                  {text.split("پیشرو")[1]}
                </>
              ) : (
                text
              )}
            </motion.h4>
          ))}
        </div>
      </div>
    </div>
  );
};

const OverlayMainText = () => {
  return (
    <div className="h-screen container-xl pt-32 flex flex-col items-start justify-start space-y-8">
      <div>
        <h4 className="text-white text-6xl md:text-[88px] font-extrabold !leading-tight max-w-4xl">
          پیشرو بزرگترین مؤسسه سرمایه‌گذاری در ایران
        </h4>
        {/* <p className="text-white text-2xl md:text-3xl font-semibold mt-4 max-w-2xl leading-relaxed"> */}
        {/* </p> */}
      </div>

      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-black font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:bg-white/90 transition-all"
        href="/investment-consulting"
      >
        شروع مسیر موفقیت
      </motion.a>
    </div>
  );
};

const ImageZoomSliderSection = ({
  parentRef,
}: {
  parentRef: React.RefObject<HTMLElement | null>;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  // 🔹 انیمیشن زوم در حین خروج متن‌ها
  const { scrollYProgress } = useScroll({
    target: parentRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.2, 0.66]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const revealSlides = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0, 1]);
  const slides = [...images, ...images];

  return (
    <motion.div style={{ opacity }} className="relative h-[210vh] -mt-[100vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black">
        {/* زمینه‌ی محو */}
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 bg-black/30 z-0"
        />

        {/* تصویر و اسلایدر */}
        <motion.div
          style={{
            scale,
            opacity,
          }}
          className="relative w-full flex items-center justify-center"
        >
          {/* اسلایدر */}
          <motion.div style={{ opacity: revealSlides }} className="w-full">
            <Swiper
              id="landing-image-zoom-slider"
              modules={[Autoplay]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              slidesPerView={1.5} // ✅ بازگشت به مقدار عددی
              centeredSlides
              loop={slides.length >= 4} // ✅ شرطی
              allowTouchMove={false}
              spaceBetween={30}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              autoplay={{
                delay: 10000,
                disableOnInteraction: false,
              }}
              className="w-full flex items-center justify-center"
            >
              {slides.map((src, index) => (
                <SwiperSlide key={`slide-${index}`}>
                  <motion.div
                    animate={{
                      opacity: activeIndex === index ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <Image
                      src={src}
                      alt={`slide-${index}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* دکمه‌های ناوبری */}
            <div className="absolute inset-0 flex items-center justify-between px-[5vw]">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="pointer-events-auto text-white/80 hover:text-white transition-colors z-50"
              >
                <HiChevronRight size={60} />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="pointer-events-auto text-white/80 hover:text-white transition-colors z-50"
              >
                <HiChevronLeft size={60} />
              </button>
            </div>
          </motion.div>

          {/* تصویر اولیه در پس‌زمینه قبل از ورود اسلایدر */}
          <motion.img
            src={images[activeIndex]}
            alt="Zoom Background"
            style={{
              scale: bgScale,
              opacity: useTransform(scrollYProgress, [0, 0.99, 1], [1, 1, 0]),
              position: "absolute",
            }}
            className="w-full aspect-[16/9] object-cover rounded-3xl will-change-transform"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
