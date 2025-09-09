"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { mobileScrollerSteps } from "@/public/data";

export default function MobileScrollSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down"); // scroll direction
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let lastScrollTop = window.scrollY;

    const handleScroll = () => {
      const scrollTop = window.scrollY - node.offsetTop; // how much user scrolled inside section
      const stepHeight = 500;

      const newIndex = Math.min(
        mobileScrollerSteps.length - 1,
        Math.max(0, Math.floor(scrollTop / stepHeight))
      );

      // detect scroll direction
      setDirection(window.scrollY > lastScrollTop ? "down" : "up");
      lastScrollTop = window.scrollY;

      setIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // dynamic variants based on scroll direction
  const variants = {
    enter: (dir: "up" | "down") => ({
      opacity: 0,
      y: dir === "down" ? -80 : 80, // down → from top , up → from bottom
    }),
    center: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.4 } }, // only fade
  };

  return (
    <section
      ref={sectionRef}
      style={{ height: `calc(${mobileScrollerSteps.length * 505}px + 100vh)` }}
      className="relative w-full"
    >
      {/* Sticky content */}
      <div className="sticky top-0 h-screen flex items-center justify-center container-xl pt-8">
        <div className="w-full h-full bg-mySecondary/5 rounded-t-[40px] rounded-b-xl px-12">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={mobileScrollerSteps[index].id}
              variants={variants}
              custom={direction} // pass direction to variants
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full flex items-center justify-center gap-8 overflow-hidden"
            >
              {/* Text and content */}
              <div className="flex-1 flex flex-col justify-between h-full pt-40 pb-20">
                <div>
                  <h2 className="text-5xl font-extrabold text-gray-900 mb-8">
                    {mobileScrollerSteps[index].header ?? "عنوان اصلی"}
                  </h2>
                  <ul className="space-y-3">
                    {mobileScrollerSteps[index].items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="size-1.5 mt-2.5 rounded-full bg-myPrimary/90" />
                        <span className="text-lg text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-10">
                    <button className="px-10 py-3 bg-mySecondary/95 text-white rounded-full shadow-md hover:bg-mySecondary transition">
                      شروع کنید
                    </button>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="flex-1 flex justify-center">
                <div className="relative h-[980px] w-[500px] -mb-[500px]">
                  <Image
                    src={"/images/home/mobile-scroll/mobile.webp"}
                    alt="mobile screen"
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
