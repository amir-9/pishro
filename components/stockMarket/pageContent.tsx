import LandingVideo from "@/components/utils/landingVideo";
import Courses from "@/components/utils/courses";
import Banner from "@/components/utils/Banner";
import Blog from "@/components/utils/blog";
import VideoSection from "../utils/videoSection";
import SectionOne from "./sectionOne";

const StockMarketPageContent = () => {
  return (
    <div>
      <LandingVideo vidSrc="/videos/stock.webm" />
      <SectionOne />
      <VideoSection videoUrl="/videos/stock.webm" label="معرفی بورس" />
      <Courses />
      <Banner />
      <Blog />
    </div>
  );
};

export default StockMarketPageContent;
