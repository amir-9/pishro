import Landing from "@/components/utils/landing";
// import Slider from "@/components/utils/slider";
// import SectionOne from "@/components/stockMarket/sectionOne";
import Courses from "@/components/utils/courses";
import Banner from "@/components/utils/Banner";
import Blog from "@/components/utils/blog";

// import { stockMarketSliderData } from "@/public/data";

const StockMarketPageContent = () => {
  return (
    <div>
      <Landing />
      {/* <Slider items={stockMarketSliderData} />
      <SectionOne /> */}
      <Courses />
      <Banner />
      <Blog />
    </div>
  );
};

export default StockMarketPageContent;
