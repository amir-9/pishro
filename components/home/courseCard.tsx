"use client";

import Image from "next/image";
import Link from "next/link"; // برای لینک کردن کامپوننت
import { useState } from "react";
import Price from "../utils/price";

interface CourseCardProps {
  title: string;
  price: number;
  img: string;
  link: string; // لینک به صفحه مربوطه
}

const CourseCard = ({ title, price, img, link }: CourseCardProps) => {
  const [imageError, setImageError] = useState(false); // مدیریت خطای تصویر

  return (
    <Link href={link} className="block w-full max-w-[250px]">
      <div>
        {imageError ? (
          // نمایش کنتینر جایگزین در صورت بروز خطا
          <div className="w-[254px] h-[148px] bg-[#e5e5e5] flex items-center justify-center">
            <span className="text-gray-400">تصویر در دسترس نیست</span>
          </div>
        ) : (
          // تصویر اصلی
          <Image
            src={img}
            alt={title}
            width={254}
            height={148}
            onError={() => setImageError(true)} // تنظیم خطای تصویر
          />
        )}
      </div>
      <div className="mt-6 p-4 bg-white">
        <h4 className="text-sm font-bold mb-4">{title}</h4>
        <Price price={price} monthly />
      </div>
    </Link>
  );
};

export default CourseCard;
