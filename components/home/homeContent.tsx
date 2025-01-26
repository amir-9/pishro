import Categories from "@/components/home/categories";
import Landing from "@/components/home/landing";
import AboutUs from "@/components/home/aboutUs";
import Banner from "@/components/home/Banner";
import Courses from "@/components/home/courses";

const HomePageContent = () => {
  return (
    <div>
      <Landing />
      <Categories />
      <AboutUs />
      <Banner />
      <Courses />
    </div>
  );
};

export default HomePageContent;
