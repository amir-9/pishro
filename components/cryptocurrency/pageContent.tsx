import LandingVideo from "@/components/utils/landingVideo";
import Courses from "@/components/utils/courses";
import Banner from "@/components/utils/Banner";
import Blog from "@/components/utils/blog";
import VideoSection from "../utils/videoSection";

const CryptocurrencyPageContent = () => {
  return (
    <div>
      <LandingVideo vidSrc="/videos/crypto.webm" />
      <div className="h-[600px]"></div>
      <VideoSection videoUrl="/videos/crypto.webm" label="معرفی کریپتوکارنسی" />
      <Courses />
      <Banner />
      <Blog />
    </div>
  );
};

export default CryptocurrencyPageContent;
