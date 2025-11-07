import HomePageContent from "@/components/home/homeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پیشرو | بزرگترین مؤسسه سرمایه‌گذاری در ایران",
  description: "آموزش تخصصی بورس، بازارهای مالی و سرمایه‌گذاری. از آموزش اصولی تا مشاوره حرفه‌ای",
};

export default function Home() {
  return <HomePageContent />;
}
