"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { checkoutBank } from "@/public/data";

const data = [
  {
    title: "عنوان دوره",
    date: "1403/11/11",
    price: 4200000,
    off: 1400000,
    lastPrice: 1800000,
  },
  {
    title: "2 عنوان دوره",
    date: "1403/11/11",
    price: 5100000,
    off: 2400000,
    lastPrice: 1700000,
  },
];

const PayMain = () => {
  const [bank, setBank] = useState<"saman" | "melli" | "mellat">("saman");
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
              <div>
                <p
                  className={cn(
                    "text-xs text-[#879ca6] transition",
                    bank === item.name && "text-black font-bold"
                  )}
                >
                  {item.label}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* last info */}
      <div className="mt-9">
        <div className="p-4 border-b">
          <h6 className="text-[#131b22] font-medium text-sm">بررسی نهایی</h6>
        </div>
        <div className="mt-9 py-4 border">
          {/* table header */}
          <div className="grid grid-cols-5 gap-20 text-sm font-medium border-b pb-2 px-4">
            <div>عنوان دوره</div>
            <div>قیمت</div>
            <div>تاریخ</div>
            <div>سود شما از خرید</div>
            <div>قیمت نهایی</div>
          </div>
          {/* table body */}
          <div className="mt-4 flex flex-col gap-4 px-4">
            {data.map((item, idx) => (
              <div key={idx} className="grid grid-cols-5 gap-20 text-sm">
                <div>{item.title}</div>
                <div>{item.price.toLocaleString("fa-IR")}</div>
                <div className="font-irsans">{item.date}</div>
                <div>{item.off.toLocaleString("fa-IR")}</div>
                <div>{item.lastPrice.toLocaleString("fa-IR")}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PayMain;
