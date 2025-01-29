import Landing from "@/components/utils/landing";
import SectionOne from "@/components/stockMarket/sectionOne";
import Courses from "@/components/stockMarket/courses";
import Slider from "@/components/stockMarket/slider";

const StockMarketPageContent = () => {
  return (
    <div>
      <Landing />
      <Slider />
      <SectionOne />
      <Courses />
    </div>
  );
};

export default StockMarketPageContent;
