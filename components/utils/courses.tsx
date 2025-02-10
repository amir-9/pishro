import Link from "next/link";
import Heading from "@/components/utils/heading";
import { cryptoCursesData } from "@/public/data";
import CourseCard from "@/components/utils/courseCard";

const Courses = () => {
  return (
    <div className="container mt-8">
      <Heading className="mb-6">دوره‌های آموزشی</Heading>

      {/* استفاده از grid برای چیدمان کارت‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cryptoCursesData.map((data, idx) => (
          <CourseCard
            key={idx}
            img={data.img}
            link={"/courses"}
            title={data.title}
            description={data.description}
          />
        ))}
      </div>

      {/* دکمه مشاهده بیشتر */}
      <div className="flex justify-center mt-6">
        <Link
          href="/courses"
          className="flex justify-center items-center w-[244px] h-10 bg-[#f5f5f5] rounded-sm hover:bg-[#e5e5e5] hover:shadow-lg hover:scale-[105%] transition-all"
        >
          مشاهده بیشتر
        </Link>
      </div>
    </div>
  );
};

export default Courses;
