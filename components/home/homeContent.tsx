// @/components/home/homeContent.tsx
"use client";

import LandingOverlay from "./landingOverlay";
import MobileScrollSection from "./mobileScrollSection";
import CalculatorSection from "./calculatorSection";
import Courses from "@/components/utils/CoursesSec.server";
import CommentsSlider from "@/components/utils/CommentsSlider";
import NewsClub from "./newsClub";
import { useFeaturedComments } from "@/lib/hooks";

const HomePageContent = () => {
  // استفاده از هوک برای دریافت comments
  const { data: commentsData, isLoading } = useFeaturedComments(10);

  // Transform comments for CommentsSlider
  const comments = commentsData
    ? commentsData.map((c) => ({
        id: c.id,
        userName: c.userName || `${c.user?.firstName || ""} ${c.user?.lastName || ""}`.trim() || "کاربر",
        userAvatar: c.userAvatar || c.user?.avatarUrl || "/images/default-avatar.png",
        userRole: c.userRole || "کاربر",
        rating: c.rating || 5,
        content: c.text,
        date: c.createdAt,
        verified: c.verified,
        likes: c.likes.length,
      }))
    : [];

  return (
    <div className="w-full">
      <LandingOverlay />
      <MobileScrollSection />
      <CalculatorSection />
      <Courses />
      {isLoading ? (
        <div className="h-64 animate-pulse bg-white my-8" />
      ) : (
        comments.length > 0 && (
          <CommentsSlider comments={comments} title="نظرات دوره آموزان" />
        )
      )}
      <NewsClub />
    </div>
  );
};

export default HomePageContent;
