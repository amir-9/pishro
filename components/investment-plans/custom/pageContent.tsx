import VideoSection from "@/components/utils/videoSection";
import InvestmentCustomLanding from "./investmentCustomLanding";

const InvestmentCustomPageContent = () => {
  return (
    <div>
      <InvestmentCustomLanding />
      <VideoSection
        videoUrl="/videos/aboutUs.webm"
        label="سبد سرمایه گذاری شخصی"
      />
    </div>
  );
};

export default InvestmentCustomPageContent;
