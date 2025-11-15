// @/components/home/homeContent.tsx

import LandingOverlay from "./landingOverlay";
import MobileScrollSection from "./mobileScrollSection";
import CalculatorSection from "./calculatorSection";
import CoursesSec from "@/components/utils/CoursesSec.server";
import HomeComments from "./homeComments";
import NewsClub from "./newsClub";
import FloatingNotificationManager from "@/components/utils/floatingNotificationManager";
import { HomeLanding } from "@prisma/client";

interface HomePageContentProps {
  homeLandingData: HomeLanding;
}

export default function HomePageContent({
  homeLandingData,
}: HomePageContentProps) {
  return (
    <div className="w-full">
      <LandingOverlay homeLandingData={homeLandingData} />
      <MobileScrollSection />
      <CalculatorSection />
      <CoursesSec />
      <HomeComments />
      <NewsClub />
      <FloatingNotificationManager />
    </div>
  );
}
