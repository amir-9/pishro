import LandingOverlay from "./landingOverlay";
import MobileScrollSection from "./mobileScrollSection";
import Courses from "@/components/home/courses";
import CommentsSlider from "@/components/utils/CommentsSlider";
import StepsSection from "./stepsSection";
import NewsClub from "./newsClub";

const HomePageContent = () => {
  return (
    <div>
      <LandingOverlay />
      <MobileScrollSection />
      <Courses />
      <StepsSection />
      <CommentsSlider />
      <NewsClub />
    </div>
  );
};

export default HomePageContent;
