import CommentsSlider from "@/components/utils/CommentsSlider";
import Courses from "@/components/home/courses";
import NewsClub from "./newsClub";
import LandingOverlay from "./landingOverlay";
import MobileScrollSection from "./mobileScrollSection";

const HomePageContent = () => {
  return (
    <div>
      <LandingOverlay />
      <MobileScrollSection />
      <Courses />
      <CommentsSlider />
      <NewsClub />
    </div>
  );
};

export default HomePageContent;
