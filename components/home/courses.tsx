import { ArrowCircleLeftIcon } from "@/public/svgr-icons";
import Heading from "@/components/heading";
import { coursesData } from "@/public/data";
import CourseCard from "./courseCard";

const Courses = () => {
  return (
    <div className="container mt-20">
      <Heading
        link={<ArrowCircleLeftIcon width={24} height={24} />}
        href="/courses"
      >
        دوره های آموزشی
      </Heading>
      <div className="mt-8 flex flex-wrap gap-5 justify-between">
        {coursesData.map((data, idx) => (
          <CourseCard
            key={idx}
            title={data.title}
            price={data.price}
            img={data.img}
            link="/courses"
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
