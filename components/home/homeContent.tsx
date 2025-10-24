"use client";

import LandingOverlay from "./landingOverlay";
import MobileScrollSection from "./mobileScrollSection";
import CalculatorSection from "./calculatorSection";
import BikeSection from "./bikeSection";
import Courses from "./courses";
import CommentsSlider from "@/components/utils/CommentsSlider";
import NewsClub from "./newsClub";
import SnapSingleSection from "@/components/utils/SnapSingleSection";
import ScrollStatus from "../debug/ScrollStatus";

const HomePageContent = () => {
  return (
    <div className="w-full">
      <LandingOverlay />

      <SnapSingleSection id="mobile-section">
        <MobileScrollSection />
      </SnapSingleSection>
      <SnapSingleSection id="calculator-section">
        <CalculatorSection />
      </SnapSingleSection>
      <SnapSingleSection id="bike-section">
        <BikeSection />
      </SnapSingleSection>
      <SnapSingleSection id="courses-section">
        <Courses />
      </SnapSingleSection>
      <SnapSingleSection id="comments-section">
        <CommentsSlider />
      </SnapSingleSection>
      <SnapSingleSection id="newsClub-section">
        <NewsClub />
      </SnapSingleSection>
      <ScrollStatus />
    </div>
  );
};

export default HomePageContent;
