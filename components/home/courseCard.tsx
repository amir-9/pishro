"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Video } from "lucide-react";
import Price from "../utils/price";
import { FormatTime } from "../utils/FormatTime";
import RatingStars from "../utils/RatingStars";

interface CourseCardProps {
  data: {
    subject: string;
    price: number;
    img: string;
    rating: number;
    description: string;
    discountPercent: number;
    time: string;
    students: number;
    videosCount: number;
  };
  link: string;
}

const CourseCard = ({ data, link }: CourseCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={link}
      className="
        group w-full 
        h-[40vh] sm:h-[38vh] md:h-[100%]
        shadow-md transition-shadow rounded-xl
        p-3 bg-white flex flex-col overflow-hidden relative
        hover:shadow-lg
      "
    >
      {/* Image section */}
      <motion.div
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full h-full overflow-hidden rounded-lg"
      >
        {imageError ? (
          <div className="w-full h-full bg-[#e5e5e5] flex items-center justify-center">
            <span className="text-gray-400 text-sm">تصویر در دسترس نیست</span>
          </div>
        ) : (
          <Image
            src={data.img}
            alt={data.subject}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex-1 flex flex-col justify-between mt-2"
      >
        <div className="flex justify-between items-center border-b border-dashed border-[#acacac] pb-1.5">
          <h4 className="text-xs sm:text-sm text-[#ACACAC] font-bold">
            {data.subject}
          </h4>
          <RatingStars rating={data.rating} />
        </div>

        <div className="mt-1 flex flex-col">
          <p className="font-bold text-sm sm:text-sm line-clamp-2">
            {data.description}
          </p>
          <div className="flex justify-end mt-0">
            <Price price={data.price} discount={data.discountPercent} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 1 }}
          className="mt-1 flex justify-between text-[#ACACAC] font-bold text-xs sm:text-sm"
        >
          <span className="flex items-center gap-1">
            <Users size={16} className="text-gray-900" />
            {data.students} دانشجو
          </span>
          <span className="flex items-center gap-1">
            <Video size={16} className="text-gray-900" />
            {data.videosCount} ویدئو
          </span>
          <FormatTime time={data.time} />
        </motion.div>
      </motion.div>

      {/* به جای دکمه absolute پایین کارت */}
      <div className="mt-2">
        <button
          className="
      w-full bg-mySecondary text-white font-bold text-sm sm:text-base
      py-2 rounded-full shadow-md hover:opacity-90 transition
    "
        >
          خرید دوره
        </button>
      </div>
    </Link>
  );
};

export default CourseCard;
