import Courses from "@/components/utils/courses";
import Blog from "@/components/utils/blog";
import VideoSection from "../utils/videoSection";
import Landing2 from "../utils/Landing2";
import AboutIt from "@/components/utils/AboutIt";
import QuestionsSection from "../utils/QuestionsSection";
import { investmentTagsData } from "@/public/data";
import TagsList from "../utils/TagsList";

const CryptocurrencyPageContent = () => {
  return (
    <div>
      <Landing2
        imageUrl="/images/crypto/landing-img.png"
        title="کریپتوکارنسی"
        titleColor="#EC7063"
      />
      <AboutIt />
      <TagsList tags={investmentTagsData} />
      <QuestionsSection />
      <VideoSection videoUrl="/videos/crypto.webm" label="معرفی کریپتوکارنسی" />
      <Courses />
      <Blog />
    </div>
  );
};

export default CryptocurrencyPageContent;
