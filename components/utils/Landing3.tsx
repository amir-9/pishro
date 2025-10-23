"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
import { LuTarget, LuBookOpen, LuUsers } from "react-icons/lu";

const boxes = [
  {
    text: "محتوای کاربردی ",
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
    top: "85%",
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

const Landing3 = () => {
  return (
    <section className="h-screen relative overflow-hidden">
      <div className="container-xl flex items-center justify-between mt-28">
        {/* ✅ سمت راست */}
        <div className="w-1/2 space-y-6 z-10">
          <h4 className="text-6xl font-extrabold text-mySecondary leading-tight">
            مسیر یادگیریتو از همین امروز با{" "}
            <span className="text-myPrimary">پیشرو</span> شروع کن
          </h4>
          <p className="text-gray-600 text-lg leading-relaxed max-w-md">
            با آموزش‌های جامع و مسیر مشخص از پایه تا حرفه‌ای شدن، به جمع هزاران
            دانش‌آموز موفق ما بپیوند.
          </p>

          {/* دکمه‌ها */}
          <div className="flex gap-4 pt-4">
            <button className="px-6 py-3 bg-mySecondary text-white font-semibold rounded-xl shadow-md hover:bg-blue-950 transition">
              از کجا شروع کنم؟
            </button>
            <button className="px-6 py-3 border border-mySecondary text-mySecondary font-semibold rounded-xl hover:bg-[#DCFCE7] transition">
              توضیحات دوره‌ها
            </button>
          </div>

          {/* ویژگی‌ها */}
          <div className="flex gap-8 pt-8">
            {[
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
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                {item.icon}
                <p className="text-gray-700 font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ سمت چپ */}
        <div className="w-1/2 flex justify-end items-center relative">
          {/* دایره سبز */}
          <div className="size-[495px] rounded-full bg-emerald-500 flex items-center justify-center relative shadow-lg">
            <Image
              src="/images/utiles/student.svg"
              alt="دانش‌آموز"
              fill
              className="object-contain rounded-full"
            />

            {/* 🟩 مستطیل‌ها اطراف دایره */}
            {boxes.map((box, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.2, 1], // 🔁 بزرگ و کوچیک شدن
                  y: 0,
                }}
                transition={{
                  delay: 0.8 * i,
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "loop",
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
                {box.col ? (
                  <div className="flex items-center justify-center rounded-xl size-20">
                    <Image
                      src={box.imgSrc}
                      alt={box.text}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center bg-mySecondary rounded-xl p-2 size-12">
                    <Image
                      src={box.imgSrc}
                      alt={box.text}
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                )}
                <div className={box.col ? "text-center" : ""}>
                  <span className="text-mySecondary font-bold text-2xl text-left">
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
    </section>
  );
};

export default Landing3;
