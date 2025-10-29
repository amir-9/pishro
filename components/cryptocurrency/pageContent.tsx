"use client";

import Landing3 from "@/components/utils/Landing3";
import AboutOtherPages from "@/components/utils/AboutOtherPages";
import UserLevelSection from "@/components/utils/UserLevelSelection";
import StepsSection from "@/components/utils/stepsSection";
import Courses from "@/components/utils/CoursesSec";
import CommentsSlider from "@/components/utils/CommentsSlider";
import TagsList from "@/components/utils/TagsList";
import {
  cryptoAboutData,
  cryptoLandingData,
  investmentTagsData,
} from "@/public/data";
import { useScrollToSteps } from "@/hooks/useScrollToSteps";
import { useStepsData } from "@/hooks/useStepsData";

const CryptocurrencyPageContent = () => {
  useScrollToSteps();
  const { stepsData } = useStepsData();

  return (
    <div>
      <Landing3 data={cryptoLandingData} />
      <AboutOtherPages data={cryptoAboutData} />
      <UserLevelSection />

      {/* Steps Section */}
      <div id="stepsSection">
        <StepsSection {...stepsData} />
      </div>

      <Courses />
      <CommentsSlider />
      <TagsList tags={investmentTagsData} title="کلید واژه های کریپتو" />
    </div>
  );
};

export default CryptocurrencyPageContent;
