"use client";

import { useState } from "react";
import { LuPlayCircle } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DoctorExplanationVideoProps {
  videoUrl?: string;
}

export default function DoctorExplanationVideo({
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ", // Default video URL
}: DoctorExplanationVideoProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 px-6 py-3 border-2 border-myPrimary text-myPrimary hover:bg-myPrimary hover:text-white transition-all duration-300 rounded-full font-bold"
        >
          <LuPlayCircle size={20} />
          توضیحات خانم دکتر
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            توضیحات خانم دکتر
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            ویدیو توضیحات تکمیلی دوره
          </DialogDescription>
        </DialogHeader>
        <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <iframe
            src={videoUrl}
            title="توضیحات خانم دکتر"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
