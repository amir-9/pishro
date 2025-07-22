import LandingVideo from "@/components/utils/landingVideo";
import Courses from "@/components/utils/courses";
import Blog from "@/components/utils/blog";
import VideoSection from "../utils/videoSection";
import SectionOne from "./sectionOne";

const NftPageContent = () => {
  return (
    <div>
      <LandingVideo vidSrc="/videos/nft.webm" />
      <SectionOne />
      <VideoSection videoUrl="/videos/nft.webm" label="معرفی NFT" />
      <Courses />
      <Blog />
    </div>
  );
};

export default NftPageContent;
