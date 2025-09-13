// stepsSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import StepsDecorations from "@/components/home/stepsDecorations";

// Types for steps
interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepsSectionProps {
  steps: Step[];
  sectionTitle: string;
  sectionSubtitle: string;
  stepHeight?: number;
  offsets?: number[];
}

const StepItem = ({
  step,
  index,
  activeIndex,
  offsetY,
}: {
  step: Step;
  index: number;
  activeIndex: number;
  offsetY: number;
}) => {
  const isActive = index <= activeIndex;

  return (
    <motion.div
      key={step.id}
      initial={{ y: offsetY }}
      animate={{ y: offsetY }}
      className="relative w-[30%] min-h-[300px] p-8"
    >
      {/* Circle + pulse animation */}
      <div className="absolute top-0 right-8 bg-gray-50/50 rounded-full size-16 flex justify-center items-center">
        <div
          className={clsx(
            "size-8 rounded-full transition",
            isActive ? "bg-yellow-300" : "bg-gray-300"
          )}
        />

        {isActive && (
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

      {/* Text & number */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{
          opacity: isActive ? 1 : 0,
          x: isActive ? 0 : 100,
        }}
        transition={{ duration: 0.6 }}
        className="relative size-full flex flex-col items-start justify-start pt-12"
      >
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          {step.title}
        </h3>
        <p className="text-gray-600 mb-6">{step.description}</p>

        <div className="absolute inset-0 flex items-center justify-end -z-10">
          <p className="text-[140px] text-gray-300 -ml-12">{step.id}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const StepsSection = ({
  steps,
  sectionTitle,
  sectionSubtitle,
  stepHeight = 500,
  offsets = [-50, -145, -370],
}: StepsSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY - node.offsetTop;
      const newIndex = Math.min(
        steps.length - 1,
        Math.max(0, Math.floor(scrollTop / stepHeight))
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [steps.length, stepHeight]);

  return (
    <section
      ref={sectionRef}
      style={{ height: `calc(${steps.length * (stepHeight + 1)}px + 100vh)` }}
      className="relative w-full mt-20"
    >
      {/* Background Decorations */}
      <div className="sticky top-0 h-screen container-xl flex flex-col">
        <StepsDecorations />

        {/* Header */}
        <div className="flex flex-col justify-start py-6 px-4">
          <h2 className="text-5xl font-bold text-gray-800">{sectionTitle}</h2>
          <p className="mt-8">{sectionSubtitle}</p>
        </div>

        {/* Steps */}
        <div className="flex-1 flex items-end">
          <div className="flex gap-12 transition-all duration-700">
            {steps.map((step, i) => (
              <StepItem
                key={step.id}
                step={step}
                index={i}
                activeIndex={activeIndex}
                offsetY={offsets[i] ?? 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
