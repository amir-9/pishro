/**
 * Prisma Seed Script - Category Migration
 * Migrates hardcoded data from public/data.tsx to database
 *
 * Run: npx tsx prisma/seed-categories.ts
 */

import { PrismaClient, Prisma, FAQCategory } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log("🌱 Starting category seed...\n");

  // ============================================
  // 1. SEED CATEGORIES
  // ============================================
  console.log("📦 Creating categories...");

  const airdrop = await prisma.category.upsert({
    where: { slug: "airdrop" },
    update: {},
    create: {
      slug: "airdrop",
      title: "آموزش ایردراپ",
      description:
        "دوره‌های جامع آموزش ایردراپ از مبتدی تا پیشرفته. یاد بگیرید چگونه از فرصت‌های ایردراپ بهره‌برداری کنید و توکن‌های رایگان دریافت کنید.",
      icon: "/icons/airdrop.svg",
      coverImage: "/images/categories/airdrop-cover.jpg",
      color: "#3B82F6",
      metaTitle: "دوره‌های آموزش ایردراپ | پیشرو",
      metaDescription:
        "آموزش کامل ایردراپ از صفر تا صد. دریافت رایگان توکن‌های کریپتو از پروژه‌های معتبر بلاکچین.",
      metaKeywords: [
        "ایردراپ",
        " airdrop",
        " توکن رایگان",
        " کریپتو رایگان",
        " آموزش ایردراپ",
      ],
      published: true,
      featured: true,
      order: 1,
    },
  });

  const nft = await prisma.category.upsert({
    where: { slug: "nft" },
    update: {},
    create: {
      slug: "nft",
      title: "آموزش NFT",
      description:
        "همه چیز درباره توکن‌های غیرقابل تعویض (NFT). از خرید و فروش تا ساخت و عرضه NFT.",
      icon: "/icons/nft.svg",
      coverImage: "/images/categories/nft-cover.jpg",
      color: "#8B5CF6",
      metaTitle: "دوره‌های آموزش NFT | پیشرو",
      metaDescription:
        "آموزش جامع NFT از مبتدی تا حرفه‌ای. ساخت، خرید و فروش توکن‌های غیرقابل تعویض.",
      metaKeywords: [
        "NFT",
        " توکن غیرقابل تعویض",
        " آموزش NFT",
        " OpenSea",
        " راینوس",
      ],
      published: true,
      featured: true,
      order: 2,
    },
  });

  const cryptocurrency = await prisma.category.upsert({
    where: { slug: "cryptocurrency" },
    update: {},
    create: {
      slug: "cryptocurrency",
      title: "آموزش ارز دیجیتال",
      description:
        "دوره‌های آموزشی ارز دیجیتال، بیتکوین، اتریوم و آلت کوین‌ها. معامله، سرمایه‌گذاری و تحلیل تکنیکال.",
      icon: "/icons/crypto.svg",
      coverImage: "/images/categories/crypto-cover.jpg",
      color: "#F59E0B",
      metaTitle: "دوره‌های آموزش ارز دیجیتال | پیشرو",
      metaDescription:
        "آموزش کامل ارز دیجیتال، بیتکوین، معامله و سرمایه‌گذاری در بازار کریپتو.",
      metaKeywords: [
        "ارز دیجیتال",
        " بیتکوین",
        " اتریوم",
        " معامله ارز دیجیتال",
        " سرمایه‌گذاری کریپتو",
      ],
      published: true,
      featured: true,
      order: 3,
    },
  });

  // Stock Market category - currently not used in connections
  await prisma.category.upsert({
    where: { slug: "stock-market" },
    update: {},
    create: {
      slug: "stock-market",
      title: "آموزش بورس",
      description:
        "آموزش کامل بورس ایران از صفر تا صد. تحلیل تکنیکال، بنیادی و استراتژی‌های معاملاتی.",
      icon: "/icons/stock.svg",
      coverImage: "/images/categories/stock-cover.jpg",
      color: "#10B981",
      metaTitle: "دوره‌های آموزش بورس | پیشرو",
      metaDescription:
        "آموزش جامع بورس ایران، تحلیل تکنیکال و بنیادی، استراتژی‌های سرمایه‌گذاری موفق.",
      metaKeywords: [
        "آموزش بورس",
        " بورس ایران",
        " تحلیل تکنیکال",
        " سرمایه‌گذاری در بورس",
      ],
      published: true,
      featured: true,
      order: 4,
    },
  });

  // Metaverse category - currently not used in connections
  await prisma.category.upsert({
    where: { slug: "metaverse" },
    update: {},
    create: {
      slug: "metaverse",
      title: "آموزش متاورس",
      description:
        "دنیای متاورس و واقعیت مجازی. از املاک دیجیتال تا بازی‌های Play-to-Earn.",
      icon: "/icons/metaverse.svg",
      coverImage: "/images/categories/metaverse-cover.jpg",
      color: "#EC4899",
      metaTitle: "دوره‌های آموزش متاورس | پیشرو",
      metaDescription:
        "آموزش متاورس، املاک دیجیتال، بازی‌های Play-to-Earn و فرصت‌های سرمایه‌گذاری.",
      metaKeywords: [
        "متاورس",
        " metaverse",
        " املاک دیجیتال",
        " Play-to-Earn",
        " واقعیت مجازی",
      ],
      published: true,
      featured: true,
      order: 5,
    },
  });

  console.log("✅ Categories created\n");

  console.log("✅ About content created\n");

  // ============================================
  // 4. SEED TAGS
  // ============================================
  console.log("🏷️  Creating tags...");

  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: "airdrop-beginner" },
      update: {},
      create: {
        slug: "airdrop-beginner",
        title: "ایردراپ مبتدی",
        description: "مناسب برای افراد تازه‌کار",
        color: "#10B981",
        icon: "🌱",
        published: true,
        usageCount: 0,
      },
    }),
    prisma.tag.upsert({
      where: { slug: "crypto-wallet" },
      update: {},
      create: {
        slug: "crypto-wallet",
        title: "کیف پول دیجیتال",
        description: "آموزش کیف پول‌های مختلف",
        color: "#F59E0B",
        icon: "👛",
        published: true,
        usageCount: 0,
      },
    }),
    prisma.tag.upsert({
      where: { slug: "testnet" },
      update: {},
      create: {
        slug: "testnet",
        title: "تست‌نت",
        description: "کار با شبکه‌های آزمایشی",
        color: "#6366F1",
        icon: "🧪",
        published: true,
        usageCount: 0,
      },
    }),
    prisma.tag.upsert({
      where: { slug: "defi" },
      update: {},
      create: {
        slug: "defi",
        title: "دیفای",
        description: "امور مالی غیرمتمرکز",
        color: "#8B5CF6",
        icon: "🏦",
        published: true,
        usageCount: 0,
      },
    }),
    prisma.tag.upsert({
      where: { slug: "nft-marketplace" },
      update: {},
      create: {
        slug: "nft-marketplace",
        title: "بازار NFT",
        description: "آشنایی با مارکت‌پلیس‌های NFT",
        color: "#EC4899",
        icon: "🖼️",
        published: true,
        usageCount: 0,
      },
    }),
  ]);

  console.log("✅ Tags created\n");

  // ============================================
  // 5. CONNECT TAGS TO CATEGORIES
  // ============================================
  console.log("🔗 Connecting tags to categories...");

  await prisma.category.update({
    where: { id: airdrop.id },
    data: {
      tags: {
        connect: [
          { id: tags[0].id }, // airdrop-beginner
          { id: tags[1].id }, // crypto-wallet
          { id: tags[2].id }, // testnet
        ],
      },
    },
  });

  await prisma.category.update({
    where: { id: nft.id },
    data: {
      tags: {
        connect: [
          { id: tags[1].id }, // crypto-wallet
          { id: tags[4].id }, // nft-marketplace
        ],
      },
    },
  });

  await prisma.category.update({
    where: { id: cryptocurrency.id },
    data: {
      tags: {
        connect: [
          { id: tags[1].id }, // crypto-wallet
          { id: tags[3].id }, // defi
        ],
      },
    },
  });

  console.log("✅ Tags connected\n");

  // ============================================
  // 6. SEED FAQs
  // ============================================
  console.log("❓ Creating FAQs...");

  await prisma.fAQ.createMany({
    data: [
      {
        question: "ایردراپ چیست؟",
        answer:
          "<p>ایردراپ به معنای توزیع رایگان توکن‌های کریپتو توسط پروژه‌های بلاکچین است. پروژه‌ها برای افزایش آگاهی و جذب کاربران جدید، توکن‌های خود را به صورت رایگان توزیع می‌کنند.</p><p>شما می‌توانید با شرکت در ایردراپ‌ها، توکن‌های رایگان دریافت کنید و از آن‌ها درآمد کسب کنید.</p>",
        categoryId: airdrop.id,
        faqCategory: "GENERAL" as FAQCategory,
        published: true,
        featured: true,
        order: 1,
        views: 0,
        helpful: 0,
        notHelpful: 0,
      },
      {
        question: "برای شرکت در ایردراپ به چه چیزی نیاز دارم؟",
        answer:
          "<p>برای شرکت در ایردراپ، نیاز به موارد زیر دارید:</p><ul><li>یک کیف پول دیجیتال (مانند MetaMask)</li><li>آدرس ایمیل</li><li>گاهی اوقات حساب توییتر یا دیسکورد</li><li>کمی ETH برای پرداخت هزینه گس (در برخی موارد)</li></ul>",
        categoryId: airdrop.id,
        faqCategory: "COURSES" as FAQCategory,
        published: true,
        featured: true,
        order: 2,
        views: 0,
        helpful: 0,
        notHelpful: 0,
      },
      {
        question: "آیا ایردراپ‌ها امن هستند؟",
        answer:
          "<p>بیشتر ایردراپ‌های معتبر امن هستند، اما باید مراقب کلاهبرداری‌ها باشید:</p><ul><li>هیچ‌وقت کلمات بازیابی کیف پول خود را به کسی ندهید</li><li>از ایردراپ‌های پروژه‌های معتبر شرکت کنید</li><li>هزینه‌های مشکوک نپردازید</li><li>از منابع رسمی پیروی کنید</li></ul>",
        categoryId: airdrop.id,
        faqCategory: "GENERAL" as FAQCategory,
        published: true,
        featured: true,
        order: 3,
        views: 0,
        helpful: 0,
        notHelpful: 0,
      },
      {
        question: "NFT چیست؟",
        answer:
          "<p>NFT یا توکن غیرقابل تعویض (Non-Fungible Token) یک دارایی دیجیتال منحصربه‌فرد است که روی بلاکچین ذخیره می‌شود. هر NFT یک اثر هنری، عکس، ویدیو، موسیقی یا هر نوع محتوای دیجیتال دیگری را نمایندگی می‌کند.</p>",
        categoryId: nft.id,
        faqCategory: "GENERAL" as FAQCategory,
        published: true,
        featured: true,
        order: 1,
        views: 0,
        helpful: 0,
        notHelpful: 0,
      },
    ],
  });

  console.log("✅ FAQs created\n");

  // ============================================
  // 7. SEED COMMENTS (Testimonials)
  // ============================================
  console.log("💬 Creating comments...");

  await prisma.comment.createMany({
    data: [
      {
        categoryId: airdrop.id,
        userName: "علی محمدی",
        userAvatar: "/images/avatars/user1.jpg",
        userRole: "STUDENT",
        userCompany: null,
        rating: 5,
        text:
          "دوره عالی! من تونستم از چند ایردراپ درآمد خوبی کسب کنم. پشتیبانی هم عالی بود.",
        published: true,
        verified: true,
        featured: true,
        likes: [],
        dislikes: [],
        views: 150,
      },
      {
        categoryId: airdrop.id,
        userName: "سارا احمدی",
        userAvatar: "/images/avatars/user2.jpg",
        userRole: "INVESTOR",
        userCompany: "استارتاپ بلاکچین",
        rating: 5,
        text:
          "بهترین دوره ایردراپ که تا حالا دیدم. همه چیز خیلی ساده و عملی توضیح داده شده.",
        published: true,
        verified: true,
        featured: true,
        likes: [],
        dislikes: [],
        views: 98,
      },
      {
        categoryId: nft.id,
        userName: "رضا کریمی",
        userAvatar: "/images/avatars/user3.jpg",
        userRole: "PROFESSIONAL_TRADER",
        userCompany: null,
        rating: 5,
        text:
          "بعد از این دوره، اولین NFT خودم رو ساختم و فروختم. واقعاً عالی بود!",
        published: true,
        verified: true,
        featured: true,
        likes: [],
        dislikes: [],
        views: 210,
      },
    ],
  });

  console.log("✅ Comments created\n");

  console.log("🎉 Seed completed successfully!\n");

  // ============================================
  // SUMMARY
  // ============================================
  const categoriesCount = await prisma.category.count();
  const contentCount = await prisma.pageContent.count();
  const tagsCount = await prisma.tag.count();
  const faqsCount = await prisma.fAQ.count();
  const commentsCount = await prisma.comment.count();

  console.log("📊 Database Summary:");
  console.log(`   Categories: ${categoriesCount}`);
  console.log(`   Page Content: ${contentCount}`);
  console.log(`   Tags: ${tagsCount}`);
  console.log(`   FAQs: ${faqsCount}`);
  console.log(`   Comments: ${commentsCount}`);
  console.log("\n✨ Ready to build dynamic pages!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
