"use client";
import { FaUserGraduate, FaUser, FaCrown } from "react-icons/fa";

const levels = [
  {
    icon: <FaUser size={36} className="text-[#214254]" />,
    title: "سطح مبتدی",
    desc: "برای افرادی که تازه وارد دنیای سرمایه‌گذاری شده‌اند و نیاز به آموزش پایه دارند.",
    color: "#214254",
  },
  {
    icon: <FaUserGraduate size={36} className="text-[#214254]" />,
    title: "سطح متوسط",
    desc: "برای کاربرانی که تجربه اولیه دارند و به دنبال بهبود تصمیم‌گیری‌های سرمایه‌گذاری خود هستند.",
    color: "#214254",
  },
  {
    icon: <FaCrown size={36} className="text-[#214254]" />,
    title: "سطح حرفه‌ای",
    desc: "برای سرمایه‌گذاران با تجربه که به دنبال تحلیل عمیق‌تر و ابزارهای تخصصی هستند.",
    color: "#214254",
  },
];

const UserLevelSection = () => {
  return (
    <section className="py-12 mt-12">
      <div className="container-xl text-center">
        {/* کارت‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center">
          {levels.map((level, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center justify-between bg-[#214254] text-white rounded-3xl h-[390px] w-full max-w-[390px] px-8 py-10 shadow-sm hover:shadow-lg transition-transform duration-300"
            >
              {/* دایره آیکن */}
              <div className="bg-white size-24 flex items-center justify-center rounded-full shadow-md">
                {level.icon}
              </div>

              {/* محتوا */}
              <div className=" flex flex-col items-center text-center space-y-3">
                <h3 className="text-2xl font-bold">{level.title}</h3>
                <p className="text-sm text-gray-200 leading-7">{level.desc}</p>
              </div>

              {/* دکمه */}
              <button className="mt-6 px-12 py-4 bg-[#fff] text-[#214254] font-bold rounded-full border border-white/50 hover:bg-[#fff]/10 hover:text-white transition-all">
                انتخاب سطح
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserLevelSection;
