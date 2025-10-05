import LandingOverlay from "./landingOverlay";
import BikeSection from "./bikeSection";
import MobileScrollSection from "./mobileScrollSection";
import Courses from "./courses";
import CommentsSlider from "@/components/utils/CommentsSlider";
import StepsSection from "./stepsSection";
import NewsClub from "./newsClub";
import { stepsData } from "@/public/data";

const HomePageContent = () => {
  return (
    <div>
      <LandingOverlay />
      <div className="w-full bg-white">
        <BikeSection />
        <MobileScrollSection />
        <Courses />
        <StepsSection {...stepsData} />
        <CommentsSlider />
        <NewsClub />
      </div>
    </div>
  );
};

export default HomePageContent;
