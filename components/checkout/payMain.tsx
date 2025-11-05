"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { checkoutBank } from "@/public/data";
import { useCartStore } from "@/stores/cart-store";

const PayMain = () => {
  const [bank, setBank] = useState<"saman" | "melli" | "mellat">("saman");
  const { items } = useCartStore(); // ✅ Get real cart data from Zustand

  // ✅ Calculate discount and total dynamically
  const cartSummary = useMemo(() => {
    return items.map((course) => {
      const price = course.price || 0;
      const discountPercent = course.discountPercent || 0;
      const off = Math.round((price * discountPercent) / 100);
      const lastPrice = price - off;

      return {
        title: course.subject,
        price,
        off,
        lastPrice,
        date: new Date(course.createdAt).toLocaleDateString("fa-IR"),
      };
    });
  }, [items]);

  const totalPrice = cartSummary.reduce((sum, item) => sum + item.lastPrice, 0);

  return (
    <main className="w-full">
      {/* header */}
      <div className="border-b border-[#e1e1e1] pb-4">
        <h6 className="text-[#333] font-medium text-sm">انتخاب شیوه پرداخت</h6>
      </div>

      {/* choose bank */}
      <div className="mt-9 bg-[#fafafa]">
        <div className="p-4 border-b">
          <h6 className="text-[#131b22] font-medium text-sm">
            پرداخت اینترنتی
          </h6>
        </div>
        <div className="py-6 px-14 flex flex-wrap gap-10">
          {checkoutBank.map((item, idx) => (
            <button
              key={idx}
              className="flex flex-col items-center"
              onClick={() => setBank(item.name as "saman" | "melli" | "mellat")}
            >
              <div
                className={cn(
                  "flex justify-center items-center overflow-hidden rounded-full bg-black size-12 mb-4",
                  bank === item.name && "bg-[#D52A16]"
                )}
              >
                <div className="relative size-7">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    className="object-cover filter brightness-0 invert"
                  />
                </div>
              </div>
              <p
                className={cn(
                  "text-xs text-[#879ca6] transition",
                  bank === item.name && "text-black font-bold"
                )}
              >
                {item.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* summary table */}
      <div className="mt-9">
        <div className="p-4 border-b">
          <h6 className="text-[#131b22] font-medium text-sm">بررسی نهایی</h6>
        </div>

        <div className="mt-9 py-4 border rounded-md">
          {/* table header */}
          <div className="grid grid-cols-5 gap-20 text-sm font-medium border-b pb-2 px-4">
            <div>عنوان دوره</div>
            <div>قیمت</div>
            <div>تاریخ</div>
            <div>تخفیف</div>
            <div>قیمت نهایی</div>
          </div>

          {/* table body */}
          {cartSummary.length > 0 ? (
            <div className="mt-4 flex flex-col gap-4 px-4">
              {cartSummary.map((item, idx) => (
                <div key={idx} className="grid grid-cols-5 gap-20 text-sm">
                  <div>{item.title}</div>
                  <div className="text-gray-700">
                    {item.price.toLocaleString("fa-IR")}
                  </div>
                  <div className="text-gray-700">{item.date}</div>
                  <div className="text-green-600">
                    {item.off.toLocaleString("fa-IR")}
                  </div>
                  <div className="font-semibold">
                    {item.lastPrice.toLocaleString("fa-IR")}
                  </div>
                </div>
              ))}

              {/* total */}
              <div className="border-t pt-4 mt-2 grid grid-cols-5 gap-20 text-sm font-semibold">
                <div className="col-span-4 text-right">مبلغ قابل پرداخت :</div>
                <div>{totalPrice.toLocaleString("fa-IR")} تومان</div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8 text-sm">
              سبد خرید شما خالی است.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default PayMain;
