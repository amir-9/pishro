"use client";

import { useEffect, useRef } from "react";
import lottie from "lottie-web";

interface LottieProps {
  animationData: unknown;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

const LottieAnimation = ({
  animationData,
  loop = true,
  autoplay = true,
  className,
}: LottieProps) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      const instance = lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop,
        autoplay,
        animationData,
      });

      return () => instance.destroy();
    }
  }, [animationData, loop, autoplay]);

  return <div ref={container} className={className} />;
};

export default LottieAnimation;
