import LandingVideo from "@/components/utils/landingVideo";
import Courses from "@/components/utils/courses";
import Banner from "@/components/utils/Banner";
import Blog from "@/components/utils/blog";
import VideoSection from "../utils/videoSection";

const NftPageContent = () => {
  return (
    <div>
      <LandingVideo vidSrc="/videos/nft.webm" />
      <div className="h-[600px]"></div>
      <VideoSection videoUrl="/videos/nft.webm" label="معرفی NFT" />
      <Courses />
      <Banner />
      <Blog />
    </div>
  );
};

export default NftPageContent;
