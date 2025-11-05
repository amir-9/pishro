// app/components/utils/CoursesSec.server.tsx
import CoursesGridClient from "./CoursesGrid.client";
import { getCourses } from "@/lib/services/course-service";
import { Course } from "@prisma/client";

export default async function CoursesSec() {
  const courses: Course[] = await getCourses(); // fetch server-side
  return <CoursesGridClient courses={courses} />;
}
