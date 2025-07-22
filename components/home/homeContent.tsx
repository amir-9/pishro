import Categories from "@/components/home/categories";
import WhyUs from "@/components/home/whyUs";
import BusinessConsulting from "@/components/home/businessConsulting";
import Courses from "@/components/home/courses";
import Blog from "@/components/utils/blog";
import Landing from "@/components/utils/landing";
import TransparentVideoPlayer from "@/components/utils/TransparentVideoPlayer";

const HomePageContent = () => {
  return (
    <div>
      <Landing size="normal" />
      <Categories />
      <WhyUs />
      <TransparentVideoPlayer src="/videos/landing-vid.webm" />
      <BusinessConsulting />
      <Courses />
      <Blog />
    </div>
  );
};

export default HomePageContent;
