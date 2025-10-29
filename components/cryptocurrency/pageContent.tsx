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
  beginnerSteps,
  intermediateSteps,
  advancedSteps,
} from "@/public/data";
import { useUserLevelStore } from "@/stores/user-level-store";
import { useScrollToSteps } from "@/hooks/useScrollToSteps";

const CryptocurrencyPageContent = () => {
  const { level } = useUserLevelStore();

  useScrollToSteps();

  const stepsData =
    level === "حرفه‌ای"
      ? advancedSteps
      : level === "متوسط"
      ? intermediateSteps
      : beginnerSteps;

  return (
    <div>
      <Landing3 data={cryptoLandingData} />
      <AboutOtherPages data={cryptoAboutData} />
      <UserLevelSection />

      {/* بخش StepsSection با id برای اسکرول */}
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
