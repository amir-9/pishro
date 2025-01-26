import { ArrowCircleLeftIcon } from "@/public/svgr-icons";
import Heading from "../heading";

const Courses = () => {
  return (
    <div className="container mt-20">
      <Heading
        link={<ArrowCircleLeftIcon width={24} height={24} />}
        href="/courses"
      >
        دوره های آموزشی
      </Heading>
      <div className="mt-8 flex gap-4 justify-between">{}</div>
    </div>
  );
};

export default Courses;
