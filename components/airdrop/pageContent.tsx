import Landing from "@/components/utils/landing";
import Courses from "@/components/utils/courses";
import Banner from "@/components/utils/Banner";
import Blog from "@/components/utils/blog";
import VideoSection from "../utils/videoSection";

const AirdropPageContent = () => {
  return (
    <div>
      <Landing />
      <div className="h-[600px]"></div>
      <VideoSection videoUrl="/videos/crypto.webm" label="معرفی ایردراپ" />
      <Courses />
      <Banner />
      <Blog />
    </div>
  );
};

export default AirdropPageContent;
