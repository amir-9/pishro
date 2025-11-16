import { getLessonById, getLessonsByCourse } from "@/lib/services/lesson-service";
import ClassPageContent from "@/components/class/pageContent";
import { notFound } from "next/navigation";

interface ClassPageProps {
  params: Promise<{
    classId: string;
  }>;
}

export default async function ClassPage({ params }: ClassPageProps) {
  const { classId } = await params;

  // دریافت اطلاعات کلاس
  const lessonData = await getLessonById(classId);

  if (!lessonData) {
    notFound();
  }

  // دریافت تمام کلاس‌های دوره مربوطه
  const courseLessons = await getLessonsByCourse(lessonData.courseId);

  return <ClassPageContent lessonData={lessonData} courseLessons={courseLessons} />;
}
