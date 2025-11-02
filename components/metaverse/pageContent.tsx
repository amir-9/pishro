"use client";

import Landing3 from "@/components/utils/Landing3";
import AboutOtherPages from "@/components/utils/AboutOtherPages";
import UserLevelSection from "@/components/utils/UserLevelSelection";
import StepsSection from "@/components/utils/steps/stepsSection";
import Courses from "@/components/utils/CoursesSec";
import CommentsSlider from "@/components/utils/CommentsSlider";
import TagsList from "@/components/utils/TagsList";
import {
  metaverseAboutData,
  metaverseLandingData,
  investmentTagsData,
} from "@/public/data";
import { useScrollToSteps } from "@/hooks/useScrollToSteps";
import { useStepsData } from "@/hooks/useStepsData";

const MetaversePageContent = () => {
  useScrollToSteps();
  const { stepsData } = useStepsData();

  return (
    <main className="w-full">
      <Landing3 data={metaverseLandingData} />

      <section
        className="w-full mt-8 sm:mt-12 md:mt-16 lg:mt-20"
        aria-label="درباره متاورس"
      >
        <AboutOtherPages data={metaverseAboutData} />
      </section>

      <section
        className="w-full mt-8 sm:mt-12 md:mt-16"
        aria-label="انتخاب سطح کاربری"
      >
        <UserLevelSection />
      </section>

      <section
        id="stepsSection"
        className="w-full mt-8 sm:mt-12 md:mt-16 lg:mt-20"
        aria-label="مراحل یادگیری"
      >
        <StepsSection {...stepsData} />
      </section>

      <section
        className="w-full mt-8 sm:mt-12 md:mt-16 lg:mt-20"
        aria-label="دوره‌های آموزشی"
      >
        <Courses />
      </section>

      <section
        className="w-full mt-12 sm:mt-16 md:mt-20 lg:mt-24"
        aria-label="نظرات کاربران"
      >
        <CommentsSlider />
      </section>

      <section
        className="w-full mt-12 sm:mt-16 md:mt-20 lg:mt-24 pb-8 sm:pb-12 md:pb-16 lg:pb-20"
        aria-label="کلید واژه‌های متاورس"
      >
        <TagsList tags={investmentTagsData} title="کلید واژه های متاورس" />
      </section>
    </main>
  );
};

export default MetaversePageContent;
