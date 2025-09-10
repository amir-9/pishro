"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import StepsDecorations from "@/components/home/stepsDecorations";
import { stepsData } from "@/public/data";

const StepsSection = () => {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const offsetY = [-50, -140, -370];

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const stepHeight = 500;
    const handleScroll = () => {
      const scrollTop = window.scrollY - node.offsetTop;
      const newIndex = Math.min(
        stepsData.length - 1,
        Math.max(0, Math.floor(scrollTop / stepHeight))
      );
      setIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ height: `calc(${stepsData.length * 501}px + 100vh)` }}
      className="relative w-full mt-20"
    >
      {/* Background Decorations */}

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen container-xl flex flex-col">
        <StepsDecorations />
        {/* ثابت: هدر بالا سمت راست */}
        <div className="flex flex-col justify-start py-6 px-4">
          <h2 className="text-5xl font-bold text-gray-800">
            مراحل یادگیری در پیشرو
          </h2>
          <p className="mt-8">تست تصویر متن لورم ایپسوم..</p>
        </div>

        {/* بخش اسلایدی */}
        <div className="flex-1 flex items-end ">
          <div className="flex gap-12 transition-all duration-700">
            {stepsData.map((step, i) => {
              return (
                <motion.div
                  key={step.id}
                  initial={{ y: offsetY[i] }}
                  animate={{ y: offsetY[i] }}
                  className="relative w-[30%] min-h-[300px] p-8"
                >
                  <div className="absolute top-0 right-8 bg-gray-50/50 rounded-full size-16 flex justify-center items-center">
                    {/* دایره اصلی */}
                    <div
                      className={clsx(
                        "size-8 rounded-full transition",
                        i <= index ? "bg-yellow-300" : "bg-gray-300"
                      )}
                    />

                    {/* افکت قطره‌ای/چشمک زن */}
                    {i <= index && (
                      <motion.div
                        className="absolute size-8 rounded-full bg-yellow-300"
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{
                      opacity: i <= index ? 1 : 0,
                      x: i <= index ? 0 : 100,
                    }}
                    transition={{ duration: 0.6 }}
                    className={clsx(
                      "relative size-full flex flex-col items-start justify-start pt-12"
                    )}
                  >
                    {/* متن */}
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{step.description}</p>

                    {/* عدد */}
                    <div className="absolute inset-0 flex items-center justify-end -z-10">
                      <p className="text-[140px] text-gray-300 -ml-12">
                        {step.id}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
