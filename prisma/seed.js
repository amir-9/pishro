import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const coursesData = [
  {
    subject: "بورس",
    price: 2800000,
    img: "/images/courses/placeholder.png",
    rating: 4.5,
    description:
      "یاد بگیرید چگونه با تحلیل تکنیکال و مدیریت سرمایه در بازار بورس به شکل اصولی معامله کنید.",
    discountPercent: 15,
    time: "14:20",
    students: 1380,
    videosCount: 22,
  },
  {
    subject: "ارزهای دیجیتال",
    price: 3900000,
    img: "/images/courses/placeholder.png",
    rating: 4,
    description:
      "آموزش جامع رمزارزها؛ از شناخت بلاکچین تا ترید حرفه‌ای در صرافی‌های بین‌المللی.",
    discountPercent: 18,
    time: "20:10",
    students: 2570,
    videosCount: 30,
  },
  {
    subject: "بورس",
    price: 2200000,
    img: "/images/courses/placeholder.png",
    rating: 5,
    description:
      "تحلیل بنیادی و تابلوخوانی بورس ایران با مثال‌های واقعی و تمرین عملی در بازار.",
    discountPercent: 10,
    time: "10:45",
    students: 890,
    videosCount: 16,
  },
  {
    subject: "NFT",
    price: 1700000,
    img: "/images/courses/placeholder.png",
    rating: 4.5,
    description:
      "با مفاهیم NFT، نحوه ساخت و فروش آن‌ها در پلتفرم‌هایی مثل OpenSea و Rarible آشنا شوید.",
    discountPercent: 25,
    time: "8:10",
    students: 720,
    videosCount: 12,
  },
  {
    subject: "متاورس",
    price: 4300000,
    img: "/images/courses/placeholder.png",
    rating: 4,
    description:
      "درک عمیق از دنیای متاورس، واقعیت مجازی و فرصت‌های سرمایه‌گذاری در این جهان دیجیتال.",
    discountPercent: 20,
    time: "16:35",
    students: 1120,
    videosCount: 21,
  },
  {
    subject: "ارزهای دیجیتال",
    price: 3600000,
    img: "/images/courses/placeholder.png",
    rating: 5,
    description:
      "استراتژی‌های پیشرفته ترید در بازار کریپتو؛ مناسب تریدرهای میان‌مدت و حرفه‌ای.",
    discountPercent: 22,
    time: "24:00",
    students: 3010,
    videosCount: 38,
  },
];

async function main() {
  console.log("🌱 Seeding courses...");
  await prisma.course.deleteMany(); // Clear previous data (optional)
  await prisma.course.createMany({
    data: coursesData,
  });
  console.log("✅ Seeding completed!");
}

main()
  .catch((err) => {
    console.error("❌ Error seeding database:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
