"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaUserGraduate, FaUser, FaCrown } from "react-icons/fa";
import { useUserLevelStore } from "@/stores/user-level-store"; // ✅ اضافه شده

const quizQuestions = [
  {
    question: "در سرمایه‌گذاری بلندمدت، کدام گزینه مناسب‌تر است؟",
    options: [
      "سهام پرنوسان",
      "اوراق قرضه",
      "خرید و فروش روزانه",
      "ارز دیجیتال",
    ],
    correct: 1,
  },
  {
    question: "تنوع در سبد سرمایه‌گذاری به چه معناست؟",
    options: [
      "خرید از یک نوع دارایی",
      "پخش سرمایه در دارایی‌های مختلف",
      "سرمایه‌گذاری در یک شرکت",
      "خرید دارایی با بیشترین سود گذشته",
    ],
    correct: 1,
  },
  {
    question: "کدام مورد ریسک بیشتری دارد؟",
    options: ["سپرده بانکی", "اوراق دولتی", "ارز دیجیتال", "طلا"],
    correct: 2,
  },
  {
    question: "هدف اصلی تحلیل بنیادی چیست؟",
    options: [
      "پیش‌بینی تغییرات کوتاه‌مدت",
      "تحلیل وضعیت مالی شرکت",
      "محاسبه احساسات بازار",
      "بررسی نوسانات روزانه",
    ],
    correct: 1,
  },
  {
    question: "کدام عامل بیشترین تأثیر را بر بازده سرمایه‌گذاری دارد؟",
    options: ["مدیریت ریسک", "شانس", "تعداد معاملات", "تبلیغات"],
    correct: 0,
  },
];

const levels = [
  {
    icon: <FaUser size={36} className="text-mySecondary" />,
    title: "سطح مبتدی",
  },
  {
    icon: <FaUserGraduate size={36} className="text-mySecondary" />,
    title: "سطح متوسط",
  },
  {
    icon: <FaCrown size={36} className="text-mySecondary" />,
    title: "سطح حرفه‌ای",
  },
];

const UserLevelSection = () => {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const { level, setLevel, setHasScrolled } = useUserLevelStore(); // ✅ از Zustand

  const handleAnswer = (index: number, value: number) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    const score = answers.reduce(
      (acc, curr, i) => acc + (curr === quizQuestions[i].correct ? 1 : 0),
      0
    );
    let userLevel = "مبتدی";
    if (score >= 4) userLevel = "حرفه‌ای";
    else if (score >= 2) userLevel = "متوسط";
    setHasScrolled(false);
    setLevel(userLevel); // ✅ ذخیره در Zustand

    setQuizFinished(true);
  };

  return (
    <section className="py-8 sm:py-10 md:py-12 mt-8 sm:mt-10 md:mt-12">
      <div className="container-xl text-center px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 place-items-center max-w-7xl mx-auto">
          {levels.map((levelItem, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center justify-between bg-mySecondary text-white rounded-2xl sm:rounded-3xl h-auto min-h-[320px] sm:min-h-[350px] md:h-[390px] w-full max-w-[320px] sm:max-w-[350px] md:max-w-[390px] px-6 sm:px-7 md:px-8 py-8 sm:py-9 md:py-10 shadow-sm hover:shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="bg-white size-20 sm:size-[88px] md:size-24 flex items-center justify-center rounded-full shadow-md">
                <div className="text-2xl sm:text-3xl md:text-4xl">
                  {levelItem.icon}
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mt-4 sm:mt-5 md:mt-6">
                {levelItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 leading-6 sm:leading-7 px-2">
                برای ارزیابی سطح خود، آزمون زیر را انجام دهید.
              </p>
              <button
                onClick={() => {
                  setOpen(true);
                  setQuizFinished(false);
                  setAnswers([]);
                }}
                className="mt-4 sm:mt-5 md:mt-6 px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 bg-white text-mySecondary text-sm sm:text-base md:text-lg font-semibold rounded-full hover:scale-105 transition-all w-full sm:w-auto"
                aria-label={`شروع آزمون ${levelItem.title}`}
              >
                آزمون تعیین سطح
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🧠 مدال آزمون */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-full sm:max-w-2xl md:max-w-3xl mx-4">
          <DialogHeader>
            <DialogTitle className="rtl text-lg sm:text-xl md:text-2xl">
              آزمون تعیین سطح سرمایه‌گذاری
            </DialogTitle>
          </DialogHeader>

          {quizFinished ? (
            <div className="text-center py-6 sm:py-8">
              <p className="text-base sm:text-lg md:text-xl font-semibold mb-4">
                سطح شما: {level}
              </p>
              <Button
                onClick={() => setOpen(false)}
                className="mt-4 px-6 sm:px-8 py-2 sm:py-3"
                aria-label="بستن"
              >
                بستن
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 sm:space-y-5 md:space-y-6 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto px-1">
                {quizQuestions.map((q, i) => (
                  <div key={i}>
                    <p className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">
                      {i + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {q.options.map((opt, j) => (
                        <label
                          key={j}
                          className={`flex items-center gap-2 border rounded-lg p-2.5 sm:p-3 cursor-pointer transition-all duration-200 text-sm sm:text-base ${
                            answers[i] === j
                              ? "bg-mySecondary text-white border-mySecondary"
                              : "bg-gray-50 hover:bg-gray-100"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q${i}`}
                            value={j}
                            checked={answers[i] === j}
                            onChange={() => handleAnswer(i, j)}
                            className="hidden"
                            aria-label={`گزینه ${j + 1}: ${opt}`}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <DialogFooter className="mt-4 sm:mt-6 !justify-center">
                <Button
                  onClick={handleSubmit}
                  size={"lg"}
                  className="bg-mySecondary px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
                  aria-label="تعیین سطح"
                >
                  تعیین سطح
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default UserLevelSection;
