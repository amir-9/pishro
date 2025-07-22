import LandingVideo from "@/components/utils/landingVideo";
import Courses from "@/components/utils/courses";
import Blog from "@/components/utils/blog";
import VideoSection from "../utils/videoSection";
import SectionOne from "./sectionOne";

const CryptocurrencyPageContent = () => {
  return (
    <div>
      <LandingVideo vidSrc="/videos/crypto.webm" />
      <SectionOne />
      <VideoSection videoUrl="/videos/crypto.webm" label="معرفی کریپتوکارنسی" />
      <Courses />
      <Blog />
    </div>
  );
};

export default CryptocurrencyPageContent;
