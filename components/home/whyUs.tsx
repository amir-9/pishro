"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { whyUsData } from "@/public/data";
import { cn } from "@/lib/utils";
import LottieRemote from "@/components/utils/LottieAnimation"; // مطمئن شو مسیر درسته

const textVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 0 },
};

const animationVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 0 },
};

const WhyUs = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="my-48 container">
      <h2 className="text-4xl text-center">چرا پیشرو</h2>

      {/* لیست لیبل‌ها */}
      <div className="my-16 flex gap-28 justify-center text-xl text-[#717a86]">
        {whyUsData.map((item, idx) => (
          <h4
            key={idx}
            className={cn(
              "cursor-pointer relative pb-6 font-iransans font-bold",
              idx === index ? "text-[#172b3d]" : ""
            )}
            onClick={() => setIndex(idx)}
          >
            {item.label}
            {idx === index && (
              <motion.div
                layoutId="underline"
                className="absolute -bottom-1 left-0 right-0 h-1 bg-red-500 rounded"
              />
            )}
          </h4>
        ))}
      </div>

      {/* متن و انیمیشن در کنار هم */}
      <div className="flex flex-col md:flex-row items-center gap-16 justify-between">
        {/* متن */}
        <div className="max-w-[730px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-4xl leading-[56px] font-bold font-iransans text-[#172b3d] mb-4">
                {whyUsData[index].title}
              </h4>
              <p className="text-xl text-[#707177] leading-9 whitespace-pre-line">
                {whyUsData[index].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* انیمیشن */}
        <div className="w-[300px] h-[300px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="absolute inset-0"
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <LottieRemote
                key={whyUsData[index].animationPath}
                path={whyUsData[index].animationPath}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
