import Courses from "@/components/utils/courses";
import Blog from "@/components/utils/blog";
import Landing2 from "../utils/Landing2";
import AboutIt from "@/components/utils/AboutIt";
import VideoSection from "../utils/videoSection";
import QuestionsSection from "../utils/QuestionsSection";
import { investmentTagsData } from "@/public/data";
import TagsList from "../utils/TagsList";

const MetaversePageContent = () => {
  return (
    <div>
      <Landing2
        imageUrl="/images/metaverse/banner.jpg"
        title="متاورس"
        titleColor="#AF7AC5"
      />
      <AboutIt />
      <TagsList tags={investmentTagsData} />
      <QuestionsSection />
      <VideoSection videoUrl="/videos/metaverse.webm" label="معرفی متاورس" />

      <Courses />
      <Blog />
    </div>
  );
};

export default MetaversePageContent;
