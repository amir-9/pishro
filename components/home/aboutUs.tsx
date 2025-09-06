import Image from "next/image";
import Link from "next/link";

const AboutUs: React.FC = () => {
  return (
    <div className="mt-20 py-20 container flex items-center justify-between gap-8">
      {/* Right section */}
      <div className="flex-1">
        <h3 className="text-3xl mb-4 mt-16">درباره شرکت پیشرو</h3>
        <p className="leading-relaxed text-gray-800">
          ما در &ldquo;پیشرو&rdquo; به شما کمک می‌کنیم تا در دنیای پیچیده و پر
          سرعت کریپتوکارنسی و ترید موفق شوید. با ارائه منابع آموزشی، مشاوره‌های
          حرفه‌ای و ابزارهای کارآمد، هدف ما ارتقاء دانش مالی شما و دستیابی به
          فرصت‌های سرمایه‌گذاری هوشمندانه است. به جمع پیشروها بپیوندید و گام‌های
          اول را به سوی موفقیت بردارید.
        </p>
        <div className="flex items-center justify-between mt-10 px-8">
          <div className="text-mySecondary flex flex-col items-center gap-8">
            <div className="font-bold text-5xl ltr">+300</div>
            <div className="bg-mySecondary h-2.5 w-16 rounded-full"></div>
            <div className="text-2xl font-medium">کلاینت</div>
          </div>
          <div className="text-mySecondary flex flex-col items-center gap-8">
            <div className="font-bold text-5xl ltr">+30</div>
            <div className="bg-mySecondary h-2.5 w-16 rounded-full"></div>
            <div className="text-2xl font-medium">کارمند</div>
          </div>{" "}
          <div className="text-mySecondary flex flex-col items-center gap-8">
            <div className="font-bold text-5xl ltr">+100</div>
            <div className="bg-mySecondary h-2.5 w-16 rounded-full"></div>
            <div className="text-2xl font-medium">پروژه</div>
          </div>
        </div>
        <button className="bg-mySecondary rounded-full py-3 px-24 text-white mt-12 hover:scale-105 transition-transform">
          <Link href={"/about-us"} className="size-full text-xl font-medium">
            بیشتر
          </Link>
        </button>
      </div>
      {/* Left section */}
      <div className="flex-1">
        <div className="relative w-full h-[620px]">
          <Image
            src={"/images/home/no-bg-person.png"}
            alt="آقای مومنی"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
