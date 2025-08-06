import Courses from "@/components/utils/courses";
import Blog from "@/components/utils/blog";
import VideoSection from "../utils/videoSection";
import Landing2 from "../utils/Landing2";
import AboutIt from "@/components/utils/AboutIt";
import QuestionsSection from "../utils/QuestionsSection";
import { investmentTagsData } from "@/public/data";
import TagsList from "../utils/TagsList";

const NftPageContent = () => {
  return (
    <div>
      <Landing2
        imageUrl="/images/nft/landing-img.png"
        title="NFT"
        titleColor="#F4D03F"
      />
      <AboutIt />
      <TagsList tags={investmentTagsData} />
      <QuestionsSection />
      <VideoSection videoUrl="/videos/nft.webm" label="معرفی NFT" />
      <Courses />
      <Blog />
    </div>
  );
};

export default NftPageContent;
