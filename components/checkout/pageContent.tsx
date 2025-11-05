"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import CheckoutSidebar from "./sidebar";
import ShoppingCartMain from "./shoppingCartMain";
import PayMain from "./payMain";
import { useCartStore } from "@/stores/cart-store";
import { checkoutService } from "@/lib/services/checkout-service";

const CheckoutPageContent = () => {
  const [step, setStep] = useState<"shoppingCart" | "pay" | "result">(
    "shoppingCart"
  );
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { items, clearCart } = useCartStore();

  // 🔹 اگر پارامتر result در URL باشد، مستقیماً مرحله نتیجه را نمایش بده

  // 🧮 محاسبه مجموع قیمت‌ها
  const priceSummary = useMemo(() => {
    let totalFinalPrice = 0;
    let totalDiscountAmount = 0;

    items.forEach((item) => {
      const finalPrice = item.price;
      totalFinalPrice += finalPrice;

      if (item.discountPercent && item.discountPercent > 0) {
        const originalPrice = Math.round(
          finalPrice / (1 - item.discountPercent / 100)
        );
        totalDiscountAmount += originalPrice - finalPrice;
      }
    });

    return {
      price: totalFinalPrice + totalDiscountAmount,
      off: totalDiscountAmount,
      lastPrice: totalFinalPrice,
    };
  }, [items]);

  // 💳 هندل پرداخت
  const handlePayment = async () => {
    if (items.length === 0) return;
    if (!userId) {
      toast.error("برای ادامه ابتدا وارد حساب خود شوید");
      return;
    }

    setLoading(true);

    const formattedItems = items.map((item) => ({
      courseId: item.id,
    }));

    const res = await checkoutService.createCheckoutSession({
      userId,
      items: formattedItems,
    });

    setLoading(false);

    if (res.error) {
      toast.error(res.error);
      return;
    }

    if (res.payUrl) {
      toast.success("در حال انتقال به صفحه پرداخت...");
      clearCart();
      window.location.href = res.payUrl;
    }
  };

  return (
    <div className="container-xl pt-12">
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
          <div className="flex gap-3">
            <Button onClick={() => setStep("shoppingCart")} variant="outline">
              بازگشت
            </Button>
            <Button
              onClick={handlePayment}
              className="px-12"
              disabled={loading}
            >
              {loading ? "در حال اتصال..." : "پرداخت"}
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-between gap-20 mt-8">
        {step === "shoppingCart" && <ShoppingCartMain data={items} />}
        {step === "pay" && <PayMain />}

        <CheckoutSidebar
          data={priceSummary}
          step={step}
          setStep={setStep}
          handlePayment={handlePayment}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CheckoutPageContent;
