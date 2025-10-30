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
    <section className="py-12 mt-12">
      <div className="container-xl text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center">
          {levels.map((levelItem, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center justify-between bg-mySecondary text-white rounded-3xl h-[390px] w-full max-w-[390px] px-8 py-10 shadow-sm hover:shadow-lg transition-transform duration-300"
            >
              <div className="bg-white size-24 flex items-center justify-center rounded-full shadow-md">
                {levelItem.icon}
              </div>
              <h3 className="text-2xl font-bold mt-6">{levelItem.title}</h3>
              <p className="text-sm text-gray-200 leading-7">
                برای ارزیابی سطح خود، آزمون زیر را انجام دهید.
              </p>
              <button
                onClick={() => {
                  setOpen(true);
                  setQuizFinished(false);
                  setAnswers([]);
                }}
                className="mt-6 px-12 py-4 bg-white text-mySecondary text-lg font-semibold rounded-full hover:bg-white/10 hover:text-white transition-all"
              >
                آزمون تعیین سطح
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🧠 مدال آزمون */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="rtl">
              آزمون تعیین سطح سرمایه‌گذاری
            </DialogTitle>
          </DialogHeader>

          {quizFinished ? (
            <div className="text-center py-8">
              <p className="text-lg font-semibold">سطح شما: {level}</p>
              <Button onClick={() => setOpen(false)} className="mt-4">
                بستن
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-6 max-h-[60vh] overflow-y-auto">
                {quizQuestions.map((q, i) => (
                  <div key={i}>
                    <p className="font-semibold mb-3">
                      {i + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, j) => (
                        <label
                          key={j}
                          className={`flex items-center gap-2 border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
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
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <DialogFooter className="mt-4 !justify-center">
                <Button
                  onClick={handleSubmit}
                  size={"lg"}
                  className="bg-mySecondary"
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
