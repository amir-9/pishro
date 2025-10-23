import Landing3 from "../utils/Landing3";
import { investmentTagsData, stepsData } from "@/public/data";
import TagsList from "../utils/TagsList";
import Courses from "../utils/Courses2";
import CommentsSlider from "../utils/CommentsSlider";
import StepsSection from "../home/stepsSection";
import AboutOtherPages from "../utils/AboutOtherPages";
import UserLevelSection from "../utils/UserLevelSelection";

const CryptocurrencyPageContent = () => {
  return (
    <div>
      <Landing3 />
      <AboutOtherPages />
      <UserLevelSection />
      <StepsSection {...stepsData} />
      <Courses />
      <CommentsSlider />
      <TagsList tags={investmentTagsData} title="کلید واژه های کریپتو" />
    </div>
  );
};

export default CryptocurrencyPageContent;
