import SectionOne from "@/components/metaverse/sectionOne";
import MetaverseBanner from "@/components/metaverse/banner";
import LandingVideo from "@/components/utils/landingVideo";
import Courses from "@/components/utils/courses";
import Blog from "@/components/utils/blog";

const MetaversePageContent = () => {
  return (
    <div>
      <LandingVideo vidSrc="/videos/metaverse.webm" />
      <SectionOne />
      <MetaverseBanner />
      <Courses />
      <Blog />
    </div>
  );
};

export default MetaversePageContent;
