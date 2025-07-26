import Courses from "@/components/utils/courses";
import Blog from "@/components/utils/blog";
import VideoSection from "../utils/videoSection";
import InvestmentLanding from "./investmentLanding";

const InvestmentPageContent = () => {
  return (
    <div>
      <InvestmentLanding />
      <VideoSection videoUrl="/videos/crypto.webm" label="سرمایه گذاری پیشرو" />
      <Courses />
      <Blog />
    </div>
  );
};

export default InvestmentPageContent;
