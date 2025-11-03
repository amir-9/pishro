"use client";

import Landing3 from "@/components/utils/Landing3";
import AboutOtherPages from "@/components/utils/AboutOtherPages";
import UserLevelSection from "@/components/utils/UserLevelSelection";
import StepsSection from "@/components/utils/steps/stepsSection";
import Courses from "@/components/utils/CoursesSec";
import CommentsSlider from "@/components/utils/CommentsSlider";
import TagsList from "@/components/utils/TagsList";
import {
  nftAboutData,
  nftLandingData,
  investmentTagsData,
} from "@/public/data";
import { useScrollToSteps } from "@/hooks/useScrollToSteps";
import { useStepsData } from "@/hooks/useStepsData";

const NftPageContent = () => {
  useScrollToSteps();
  const { stepsData } = useStepsData();

  return (
    <main className="w-full">
      <Landing3 data={nftLandingData} />

      <section
        className="w-full mt-8 sm:mt-12 md:mt-16 lg:mt-20"
        aria-label="درباره NFT"
      >
        <AboutOtherPages data={nftAboutData} />
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
        {/* <StepsSection {...stepsData} /> */}
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
        aria-label="کلید واژه‌های NFT"
      >
        <TagsList tags={investmentTagsData} title="کلید واژه های NFT" />
      </section>
    </main>
  );
};

export default NftPageContent;
