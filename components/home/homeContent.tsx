import Categories from "@/components/home/categories";
import Landing from "@/components/utils/landing";
import AboutUs from "@/components/home/aboutUs";
import Banner from "@/components/home/Banner";
import Courses from "@/components/home/courses";
import Blog from "@/components/home/blog";

const HomePageContent = () => {
  return (
    <div>
      <Landing />
      <Categories />
      <AboutUs />
      <Banner />
      <Courses />
      <Blog />
    </div>
  );
};

export default HomePageContent;
