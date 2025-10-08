import React, { useState } from "react";
import Link from "next/link";
import { HiMiniArrowLeftEndOnRectangle } from "react-icons/hi2";
import { FaInstagram, FaXTwitter } from "react-icons/fa6"; // 👈 آیکون‌های شبکه‌ها
import { RiTelegram2Fill } from "react-icons/ri";
import NavbarPopover from "./navbarPopover";
import { BuyIcon } from "@/public/svgr-icons";

interface NavbarItemsProps {
  navbarData: (
    | {
        label: string;
        link: string;
        data?: undefined;
      }
    | {
        label: string;
        link: string;
        data: {
          label: string;
          link: string;
        }[];
      }
  )[];
  indicatorStyle: {
    left: number;
    width: number;
  };
  setIndicatorStyle: React.Dispatch<
    React.SetStateAction<{
      left: number;
      width: number;
    }>
  >;
}

const NavbarItems = ({
  navbarData,
  indicatorStyle,
  setIndicatorStyle,
}: NavbarItemsProps) => {
  const [isIndicatorActive, setIsIndicatorActive] = useState(true);

  return (
    <div
      className="absolute top-0 w-full z-[100] pt-8 pb-8 text-white text-xs px-[60px] flex justify-between items-center
  bg-gradient-to-b from-black/70 via-black/40 to-transparent backdrop-blur-[2px]"
      onMouseLeave={() => setIsIndicatorActive(false)}
    >
      <ul className="h-full flex items-center gap-5 relative">
        {navbarData.map((item, idx: number) => (
          <React.Fragment key={idx}>
            <li
              className="group relative h-full flex items-center pb-1"
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                setIndicatorStyle({
                  left: target.offsetLeft,
                  width: target.clientWidth,
                });
                setIsIndicatorActive(true);
              }}
            >
              {item.data ? (
                <NavbarPopover item={item} />
              ) : (
                <Link
                  href={item.link}
                  className="hover:text-gray-200 relative inline-block"
                >
                  {item.label}
                </Link>
              )}
            </li>

            {idx === 9 && <li className="border-l border-white h-6 mx-2"></li>}
          </React.Fragment>
        ))}

        {/* Animated Underline Indicator */}
        <div
          className={`absolute bottom-0 h-[2px] rounded transition-all duration-300 ${
            isIndicatorActive ? "bg-red-500" : "bg-red-500 opacity-0"
          }`}
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        ></div>
      </ul>

      <div className="flex items-center gap-10">
        <div className="flex items-center gap-4">
          <Link
            href={"/login"}
            className="border hover:bg-black/20 transition-colors pr-4 pl-5 py-1.5 rounded-lg"
          >
            <button className="flex items-center gap-1">
              <HiMiniArrowLeftEndOnRectangle className="size-5" />
              <span className="font-medium text-xs"> ورود | ثبت نام</span>
            </button>
          </Link>

          <Link href={"/checkout"} className="group">
            <button className="flex items-center gap-1">
              <BuyIcon className="text-white" width={20} height={20} />
            </button>
          </Link>
        </div>

        {/* 👇 بخش شبکه‌های اجتماعی */}
        <div className="flex items-center gap-2 text-white">
          <Link
            href="https://x.com/YourXAccount"
            target="_blank"
            className="hover:text-gray-300 transition-colors p-1"
          >
            <FaXTwitter className="size-5" />
          </Link>
          <Link
            href="https://instagram.com/YourInstagram"
            target="_blank"
            className="hover:text-[#E1306C] transition-colors p-1"
          >
            <FaInstagram className="size-5" />
          </Link>

          <Link
            href="https://t.me/YourTelegram"
            target="_blank"
            className="hover:text-[#229ED9] transition-colors p-1"
          >
            <RiTelegram2Fill className="size-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarItems;
