import React, { useState } from "react";
import Link from "next/link";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarPopoverProps {
  item: {
    label: string;
    link: string;
    data: {
      label: string;
      link: string;
    }[];
  };
}

const NavbarPopover = ({ item }: NavbarPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="hover:text-gray-200 relative flex items-center gap-1">
          {item.label}
          <ChevronDown className="w-4 h-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={`
          flex flex-col gap-3
          bg-[#f3f4f6] text-gray-800
          py-5 pr-3 pl-7 mt-2 min-w-[80px] w-fit 
          shadow-lg rounded-lg z-50
          `}
      >
        {item.data.map((subItem, subIdx: number) => (
          <Link
            key={subIdx}
            href={subItem.link}
            className={cn(
              "block p-1 relative text-[#110a3b] hover:bg-gray-100 text-sm transition duration-300 group w-fit"
            )}
            onClick={() => setIsOpen(false)}
          >
            {subItem.label}
            <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-[rgba(26,10,59,0.4)] origin-bottom-right scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default NavbarPopover;
