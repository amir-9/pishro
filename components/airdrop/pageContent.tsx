import Courses from "@/components/utils/courses";
import Blog from "@/components/utils/blog";
import VideoSection from "../utils/videoSection";
import Landing2 from "../utils/Landing2";
import AboutIt from "@/components/utils/AboutIt";
import QuestionsSection from "../utils/QuestionsSection";
import TagsList from "../utils/TagsList";
import { investmentTagsData } from "@/public/data";

const AirdropPageContent = () => {
  return (
    <div>
      <Landing2
        imageUrl="/images/airdrop/landing-img.jpg"
        title="ایردراپ"
        titleColor="#5DADE2"
      />
      <AboutIt />
      <TagsList tags={investmentTagsData} />
      <QuestionsSection />
      <VideoSection videoUrl="/videos/crypto.webm" label="معرفی ایردراپ" />
      <Courses />
      <Blog />
    </div>
  );
};

export default AirdropPageContent;
