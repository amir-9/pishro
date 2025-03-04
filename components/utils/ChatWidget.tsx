"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // آیکون بستن از lucide-react
import { IoChatbubblesOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button"; // مسیر مناسب کامپوننت Button shadcn
import { Input } from "@/components/ui/input"; // مسیر مناسب کامپوننت Input shadcn

const topics = [
  "دوره های آموزشی",
  "طرح های سرمایه گذاری",
  "کریپتوکارنسی",
  "بورس",
  "متاورس",
  "NFT",
  "ایردراپ",
  "مشاوره کسب و کار",
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleBack = () => {
    setSelectedTopic(null);
  };

  return (
    <>
      {/* پنل چت با انیمیشن */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 left-4 w-80 h-[84%] bg-white shadow-lg rounded-lg flex flex-col z-50"
          >
            {/* سرآیند پنل */}
            <div className="flex items-center justify-between bg-[#173046] text-white p-4 py-2 rounded-t-lg">
              <span className="font-bold">پشتیبانی آنلاین</span>
              <Button
                variant="outline"
                className="bg-transparent hover:bg-transparent hover:scale-105 hover:text-white group"
                onClick={toggleChat}
              >
                <X className="size-5 group-hover:rotate-180 transition-all" />
              </Button>
            </div>

            {/* انتخاب موضوع یا چت */}
            <div className="flex-1 p-4 overflow-y-auto">
              {selectedTopic ? (
                <div className="h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b">
                    <p className="text-gray-600 mb-2">
                      موضوع انتخابی: {selectedTopic}
                    </p>
                    <Button
                      variant="outline"
                      className="mb-4 text-red-600 border-red-600 hover:bg-red-100"
                      size={"sm"}
                      onClick={handleBack}
                    >
                      برگشت
                    </Button>
                  </div>
                  <div>
                    <Input
                      placeholder={`پیام خود را درباره ${selectedTopic} بنویسید...`}
                      className="w-full"
                    />
                    <Button
                      className="mt-2 w-full bg-[#173046]"
                      onClick={() => {
                        /* منطق ارسال پیام */
                      }}
                    >
                      ارسال
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-gray-600 mb-4">سوال شما در چه موردیه؟</p>
                  {topics.map((topic, index) => (
                    <button
                      key={index}
                      className="rtl text-white bg-[#173046] hover:bg-[#173046]/95 py-1.5 px-4 text-sm font-normal rounded-md"
                      onClick={() => setSelectedTopic(topic)}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* دکمه چت آنلاین ثابت در گوشه پایین صفحه */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-4 left-4 bg-blue-600 text-white rounded-full size-16 p-4 shadow-lg hover:bg-blue-700 z-50 flex justify-center items-center"
      >
        <IoChatbubblesOutline style={{ width: "40px", height: "40px" }} />
      </Button>
    </>
  );
};

export default ChatWidget;
