import Heading from "@/components/utils/heading";
import { cryptoCursesData } from "@/public/data";
import CourseCard from "@/components/cryptocurrency/courseCard";

const Courses = () => {
  return (
    <div className="container mt-8">
      <Heading className="mb-6">دوره های آموزشی</Heading>
      <div className="flex flex-col gap-2">
        {cryptoCursesData.map((data, idx) => (
          <CourseCard
            img={data.img}
            link={"/courses"}
            title={data.title}
            description={data.description}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
