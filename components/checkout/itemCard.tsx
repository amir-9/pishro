"use client";
import { useState } from "react";
import Image from "next/image";
import { Course } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";

interface ItemCardProps {
  data: Course;
}

const ItemCard = ({ data }: ItemCardProps) => {
  const [imageError, setImageError] = useState(false);
  const { removeFromCart } = useCartStore();

  const handleRemove = () => {
    removeFromCart(data.id);
  };

  // محاسبه قیمت اصلی بر اساس درصد تخفیف
  const hasDiscount = data.discountPercent && data.discountPercent > 0;
  const originalPrice = hasDiscount
    ? Math.round(data.price / (1 - data.discountPercent! / 100))
    : data.price;

  return (
    <div className="w-full h-fit max-w-[410px] bg-[#fafafa] shadow-sm rounded-xl overflow-hidden">
      {/* header with title and delete icon */}
      <div className="p-4 border-b flex items-center justify-between">
        <h6 className="font-semibold text-lg pr-2">{data.subject}</h6>
        <button
          onClick={handleRemove}
          className="p-2 text-red-500 hover:text-red-600 rounded-lg bg-red-100 hover:bg-red-200 transition-colors duration-200"
          aria-label="حذف از سبد خرید"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* image */}
      <div className="w-full aspect-[16/9] p-4 border-b">
        <div className="relative size-full rounded-lg overflow-hidden bg-gray-100">
          {imageError ? (
            <div className="size-full bg-[#e5e5e5] flex items-center justify-center">
              <span className="text-gray-400 text-sm">تصویر در دسترس نیست</span>
            </div>
          ) : (
            <Image
              src={data.img || ""}
              alt={data.subject}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      </div>

      {/* price section with discount */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-base text-[#546f7d] font-medium">قیمت کل:</p>
          <div className="text-right flex gap-2 items-center">
            {/* قیمت نهایی */}

            {/* قیمت اصلی (خط خورده) */}
            {hasDiscount && originalPrice && (
              <p className="text-sm text-gray-400 line-through">
                {originalPrice.toLocaleString("fa-IR")} تومان
              </p>
            )}
            <p
              className={`font-bold ${
                hasDiscount ? "text-gray-900" : "text-gray-900"
              }`}
            >
              {data.price.toLocaleString("fa-IR")} تومان
            </p>
          </div>
        </div>

        {/* بج تخفیف */}
        {hasDiscount && (
          <div className="flex justify-end">
            <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
              {data.discountPercent}%
            </span>
          </div>
        )}
      </div>

      {/* description - limited to 2 lines */}
      <p className="px-4 pb-4 text-sm text-gray-500 line-clamp-2">
        {data.description || "بدون توضیحات"}
      </p>
    </div>
  );
};

export default ItemCard;
