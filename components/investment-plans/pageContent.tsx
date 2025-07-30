import VideoSection from "@/components/utils/videoSection";
import InvestmentPlansLanding from "./investmentPlansLanding";
import PlansList from "./plansList";

const InvestmentPlansPageContent = () => {
  return (
    <div>
      <InvestmentPlansLanding />
      <PlansList />
      <VideoSection
        videoUrl="/videos/aboutUs.webm"
        label="برنامه های سرمایه گذاری پیشرو"
      />
    </div>
  );
};

export default InvestmentPlansPageContent;
