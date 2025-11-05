"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import CheckoutSidebar from "./sidebar";
import ShoppingCartMain from "./shoppingCartMain";
import PayMain from "./payMain";
import Result from "./result";
import { useCartStore } from "@/stores/cart-store";

const CheckoutPageContent = () => {
  const [step, setStep] = useState<"shoppingCart" | "pay" | "result">(
    "shoppingCart"
  );

  // 🛒 گرفتن داده از استور
  const { items } = useCartStore();

  // 🧮 محاسبه قیمت‌ها
  const priceSummary = useMemo(() => {
    let totalFinalPrice = 0; // جمع قیمت‌های نهایی (بعد از تخفیف)
    let totalDiscountAmount = 0; // جمع مقدار تخفیف (تومان)

    items.forEach((item) => {
      const finalPrice = item.price;
      totalFinalPrice += finalPrice;

      if (item.discountPercent && item.discountPercent > 0) {
        // محاسبه قیمت اصلی
        const originalPrice = Math.round(
          finalPrice / (1 - item.discountPercent / 100)
        );
        const discountAmount = originalPrice - finalPrice;
        totalDiscountAmount += discountAmount;
      }
    });

    const totalOriginalPrice = totalFinalPrice + totalDiscountAmount;

    return {
      price: totalOriginalPrice, // قیمت قبل از هر تخفیف
      off: totalDiscountAmount, // مجموع تخفیف‌ها
      lastPrice: totalFinalPrice, // قیمت نهایی قابل پرداخت
    };
  }, [items]);

  return (
    <div className="container-xl pt-12">
      {/* header */}
      <div className="flex justify-between pb-1 mt-12">
        <h4 className="font-iransans font-semibold text-lg text-[#333333]">
          {step === "shoppingCart" && "سبد خرید"}
          {step === "pay" && "پرداخت"}
          {step === "result" && "تکمیل فرایند خرید"}
        </h4>

        {step === "shoppingCart" && (
          <Button
            onClick={() => setStep("pay")}
            className="px-16"
            disabled={items.length === 0}
          >
            ادامه
          </Button>
        )}
        {step === "pay" && (
          <Button onClick={() => setStep("shoppingCart")} className="px-16">
            بازگشت
          </Button>
        )}
      </div>

      {/* body */}
      <div className="flex justify-between gap-20 mt-8">
        {step === "shoppingCart" && <ShoppingCartMain data={items} />}
        {step === "pay" && <PayMain />}
        {step === "result" && <Result />}
        <CheckoutSidebar data={priceSummary} setStep={setStep} step={step} />
      </div>
    </div>
  );
};

export default CheckoutPageContent;
