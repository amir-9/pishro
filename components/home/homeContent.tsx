// homePageContent.tsx
import LandingOverlay from "./landingOverlay";
import BikeSection from "./bikeSection";
import MobileScrollSection from "./mobileScrollSection";
import Courses from "./courses";
import CommentsSlider from "@/components/utils/CommentsSlider";
import StepsSection from "./stepsSection";
import NewsClub from "./newsClub";
import { stepsData } from "@/public/data";
// import GradientDivider from "./gradientDivider";

const HomePageContent = () => {
  return (
    <div>
      <LandingOverlay />
      {/* <GradientDivider /> */}
      <div className="w-full bg-white">
        <BikeSection />
        <MobileScrollSection />
        <Courses />

        {/* Steps Section */}
        <StepsSection
          steps={stepsData}
          sectionQuote="مسیر یادگیری خود را با پیشرو آغاز کنید"
          sectionTitle="مراحل یادگیری در پیشرو"
          sectionSubtitle="با طی کردن این مراحل به صورت قدم‌به‌قدم، می‌توانید مسیر یادگیری خود را کامل کنید. صورت قدم‌به‌قدم، پیشرو باشید و می‌توانید مسیر یادگیری خود را کامل کنید"
          sectionCta="شروع مسیر یادگیری"
        />

        <CommentsSlider />
        <NewsClub />
      </div>
    </div>
  );
};

export default HomePageContent;
