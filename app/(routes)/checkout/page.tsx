import Link from "next/link";
import { Button } from "@/components/ui/button";

const tempData = {
  price: 19400000,
  off: 1400000,
  lastPrice: 18000000,
};

const CheckoutPage = () => {
  const price = tempData.price.toLocaleString("fa-IR");
  const off = tempData.off.toLocaleString("fa-IR");
  const lastPrice = tempData.lastPrice.toLocaleString("fa-IR");

  return (
    <div className="container-xl">
      {/* header */}
      <div className="flex justify-between shadow-sm pb-1 mt-12">
        <h4 className="font-iransans font-semibold text-lg text-[#333333]">
          سبد خرید
        </h4>
        <Link href="/">
          <Button className="px-16">بازگشت</Button>
        </Link>
      </div>
      {/* body */}
      <div className="flex justify-between gap-20 mt-8">
        <div className="w-full"></div>
        <div className="w-[306px] bg-[#fafafa] rounded-sm pt-4 pb-10">
          <div className="mb-3 border-b px-4">
            <p className="font-medium text-sm mb-5">دوره های منتخب شما</p>
          </div>
          <div className="px-4 flex flex-col gap-5 font-medium text-sm text-[#666666] pb-4 border-b">
            <div className="flex justify-between items-center">
              <span>قیمت دوره :</span>
              <span className="line-through">{price}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>سود شما از خرید :</span>
              <span>{off}</span>
            </div>
            <div className="flex justify-between items-center font-bold">
              <span>قیمت نهایی :</span>
              <span>{lastPrice}</span>
            </div>
          </div>
          <Button variant={"destructive"} className="mt-10 w-full mx-4">
            ادامه
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
