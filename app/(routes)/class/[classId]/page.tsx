import { videoList } from "@/public/data";
import ClassPageContent from "@/components/class/pageContent";

interface classPageProps {
  params: Promise<{
    classId: string; // اگر پوشه به صورت [classId] تعریف شده است، params.classId یک رشته است.
  }>;
}

export default async function classPage({ params }: classPageProps) {
  // await کردن params برای رفع خطا
  const { classId } = await params;

  // جستجو در داده‌های محلی بر اساس payId
  const classData = videoList.find((vid) => vid.id === classId);

  return <ClassPageContent classData={classData} />;
}
