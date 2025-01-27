const Landing = () => {
  return (
    <div
      className="relative h-[454px] bg-no-repeat bg-cover bg-center flex justify-center text-white"
      style={{ backgroundImage: "url('/images/landing.jpg')" }}
    >
      <div className="mt-[140px] w-full mx-[90px]">
        <h1 className="text-2xl md:text-[32px] font-bold mb-6">
          مونت در مسیر موفقیت مالی
        </h1>

        <p className="text-sm md:text-base font-semibold">
          یادگیری ترید، سرمایه‌گذاری هوشمندانه و کشف فرصت‌های کریپتوکارنسی، همه
          در کنار شما با مونت.
        </p>
      </div>
    </div>
  );
};

export default Landing;
