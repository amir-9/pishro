// import Categories from "@/components/home/categories";
// import WhyUs from "@/components/home/whyUs";
// import BusinessConsulting from "@/components/home/businessConsulting";
import Courses from "@/components/home/courses";
// import Blog from "@/components/utils/blog";
import HomeLanding from "@/components/utils/homeLanding";
// import TransparentVideoPlayer from "@/components/utils/TransparentVideoPlayer";
import CommentsSlider from "@/components/utils/CommentsSlider";
import AboutUs from "./aboutUs";

const HomePageContent = () => {
  return (
    <div>
      <HomeLanding size="normal" />
      {/* <Categories /> */}
      {/* <WhyUs /> */}
      {/* <TransparentVideoPlayer src="/videos/landing-vid.webm" /> */}
      {/* <BusinessConsulting /> */}
      <AboutUs />
      <Courses />
      <CommentsSlider />
      {/* <Blog /> */}
    </div>
  );
};

export default HomePageContent;
