"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import clsx from "clsx";
import { LuTarget, LuBookOpen, LuUsers } from "react-icons/lu";

// ✅ Load CountUp dynamically (no SSR)
const CountUp = dynamic(() => import("react-countup"), { ssr: false });

// 🟩 Box Data
const boxes = [
  {
    text: "محتوای کاربردی",
    number: "1K+",
    imgSrc: "/images/utiles/ring.svg",
    top: "5%",
    left: "-2%",
    align: "center",
    col: true,
  },
  {
    text: "ویدئوهای آموزشی",
    number: "250+",
    imgSrc: "/images/utiles/icon1.svg",
    top: "80%",
    left: "9%",
    align: "right",
    col: false,
  },
  {
    text: "دانشجویان راضی",
    number: "3K+",
    imgSrc: "/images/utiles/icon2.svg",
    top: "30%",
    left: "78%",
    align: "right",
    col: false,
  },
];

// 🟦 Stats Data
const stats = [
  { number: 1000, suffix: "+", label: "دانشجو" },
  { number: 250, suffix: "+", label: "دوره آموزشی" },
  { number: 95, suffix: "%", label: "رضایت کاربران" },
  { number: 5, suffix: "سال", label: "تجربه آموزشی" },
];

const features = [
  {
    icon: <LuTarget className="text-myPrimary text-3xl" />,
    text: "نقشه راه کامل از صفر",
  },
  {
    icon: <LuBookOpen className="text-myPrimary text-3xl" />,
    text: "کامل‌ترین محتوا",
  },
  {
    icon: <LuUsers className="text-myPrimary text-3xl" />,
    text: "اجتماع بزرگ دانش‌آموزان",
  },
];

const Landing3 = () => {
  const [isClient, setIsClient] = useState(false);

  // ✅ Prevent hydration mismatch (CountUp only runs after mount)
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="h-screen relative overflow-hidden flex flex-col justify-between">
      {/* 🔹 Top Section */}
      <div className="container-xl flex items-center justify-between mt-28">
        {/* 🟢 Right Side */}
        <div className="w-1/2 space-y-6 z-10">
          <h4 className="text-6xl font-extrabold text-mySecondary leading-tight">
            مسیر یادگیریتو از همین امروز با{" "}
            <span className="text-myPrimary">پیشرو</span> شروع کن
          </h4>
          <p className="text-gray-600 text-lg leading-relaxed max-w-md">
            با آموزش‌های جامع و مسیر مشخص از پایه تا حرفه‌ای شدن، به جمع هزاران
            دانش‌آموز موفق ما بپیوند.
          </p>

          {/* 🔘 Buttons */}
          <div className="flex gap-4 pt-4">
            <button className="px-6 py-3 bg-mySecondary text-white font-semibold rounded-xl shadow-md hover:bg-blue-950 transition">
              از کجا شروع کنم؟
            </button>
            <button className="px-6 py-3 border border-mySecondary text-mySecondary font-semibold rounded-xl hover:bg-[#DCFCE7] transition">
              توضیحات دوره‌ها
            </button>
          </div>

          {/* 🌟 Features */}
          <div className="flex gap-8 pt-8">
            {features.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                {item.icon}
                <p className="text-gray-700 font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 🟣 Left Side */}
        <div className="w-1/2 flex justify-end items-center relative">
          <div className="size-[495px] rounded-full bg-emerald-500 flex items-center justify-center relative shadow-lg">
            <Image
              src="/images/utiles/student.svg"
              alt="دانش‌آموز"
              fill
              className="object-contain rounded-full"
            />

            {/* 🟩 Floating Boxes */}
            {boxes.map((box, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.95, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: [1, 1.15, 1], y: 0 }}
                transition={{
                  delay: 0.8 * i,
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className={clsx(
                  "absolute bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-xl border border-gray-100 flex items-center gap-2 cursor-default transition-transform duration-300",
                  box.align === "left" && "!items-end text-left",
                  box.align === "right" && "!items-start text-right",
                  box.col ? "flex-col justify-center" : "flex-row"
                )}
                style={{
                  top: box.top,
                  left: box.left,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className={clsx(
                    "flex items-center justify-center rounded-xl",
                    box.col ? "size-20" : "bg-mySecondary p-2 size-12"
                  )}
                >
                  <Image
                    src={box.imgSrc}
                    alt={box.text}
                    width={box.col ? 80 : 30}
                    height={box.col ? 80 : 30}
                    className="object-contain"
                  />
                </div>
                <div className={clsx(box.col && "text-center")}>
                  <span className="text-mySecondary font-bold text-2xl">
                    {box.number}
                  </span>
                  <p className="text-gray-800 font-medium whitespace-nowrap text-sm">
                    {box.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔻 Bottom Stats */}
      <div className="container-xl flex justify-around items-center py-8 border-t border-gray-100">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-5xl font-extrabold text-mySecondary">
              {isClient ? (
                <CountUp start={0} end={item.number} duration={2.5} />
              ) : (
                0
              )}
              {item.suffix}
            </span>
            <p className="text-gray-600 mt-2 font-medium text-lg">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Landing3;
