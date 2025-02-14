import Image from "next/image";

const Result = () => {
  return (
    <main className="w-full min-h-[485px] flex flex-col justify-center items-center">
      <div className="relative w-[276px] h-[234px]">
        <Image
          src={"/images/checkout/success.png"}
          alt="success"
          fill
          className="object-cover"
        />
      </div>
      <p className="mt-16 text-[#3c9a4f] font-bold">
        از خریدتان متشکریم! سفارش شما ثبت شد
      </p>
    </main>
  );
};

export default Result;
