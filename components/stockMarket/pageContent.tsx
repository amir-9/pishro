import Courses from "@/components/utils/courses";
import Blog from "@/components/utils/blog";
import VideoSection from "@/components/utils/videoSection";
import AboutIt from "@/components/utils/AboutIt";
import Landing from "@/components/utils/Landing2";
import QuestionsSection from "../utils/QuestionsSection";
import { investmentTagsData } from "@/public/data";
import TagsList from "../utils/TagsList";

const StockMarketPageContent = () => {
  return (
    <div>
      <Landing
        imageUrl="/images/stock/stock-landing.jpg"
        title="بورس"
        titleColor="#58D68D"
      />
      <AboutIt />
      <TagsList tags={investmentTagsData} />
      <QuestionsSection />
      <VideoSection videoUrl="/videos/stock.webm" label="معرفی بورس" />
      <Courses />
      <Blog />
    </div>
  );
};

export default StockMarketPageContent;
