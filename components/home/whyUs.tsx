"use client";

import { useState } from "react";

import { whyUsData } from "@/public/data";
import { cn } from "@/lib/utils";

const WhyUs = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="my-20 container">
      <h2 className="text-4xl text-center">چرا پیشرو</h2>
      <div>
        <div className="my-16 flex gap-6 justify-center text-xl text-[#717a86]">
          {whyUsData.map((item, idx) => (
            <h4
              key={idx}
              className={cn(
                "cursor-pointer",
                idx === index ? "text-[#172b3d]" : ""
              )}
              onClick={() => setIndex(idx)}
            >
              {item.label}
            </h4>
          ))}
        </div>
        <div className="max-w-[730px]">
          <h4 className="text-4xl text-[#172b3d] mb-4">
            {whyUsData[index].title}
          </h4>
          <p className="text-xl text-[#707177] leading-9">
            {whyUsData[index].text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
