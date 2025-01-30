import SectionOne from "@/components/nft/sectionOne";
import LandingVideo from "@/components/utils/landingVideo";
import Courses from "@/components/utils/courses";
import Banner from "@/components/utils/Banner";
import Blog from "@/components/utils/blog";

const NftPageContent = () => {
  return (
    <div>
      <LandingVideo vidSrc="/videos/nft.mp4" />
      <SectionOne />
      <Courses />
      <Banner />
      <Blog />
    </div>
  );
};

export default NftPageContent;
