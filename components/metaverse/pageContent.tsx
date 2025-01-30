import SectionOne from "@/components/metaverse/sectionOne";
import LandingVideo from "@/components/utils/landingVideo";
import Courses from "@/components/utils/courses";
import Banner from "@/components/utils/Banner";
import Blog from "@/components/utils/blog";

const MetaversePageContent = () => {
  return (
    <div>
      <LandingVideo vidSrc="/videos/metaverse.mp4" />
      <SectionOne />
      <Courses />
      <Banner />
      <Blog />
    </div>
  );
};

export default MetaversePageContent;
