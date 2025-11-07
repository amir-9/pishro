# 📚 راهنمای کامل معماری دیتابیس و SSR

## 🎯 خلاصه تغییرات

Schema پایگاه داده به‌روزرسانی شد تا از یک **سیستم CMS دینامیک** پشتیبانی کند که امکان مدیریت محتوای صفحات مختلف (Airdrop, NFT, Crypto, Stock Market, Metaverse) را از طریق دیتابیس فراهم می‌کند.

### ✅ مدل‌های جدید اضافه شده:

1. **Category** - دسته‌بندی‌های اصلی سایت
2. **Tag** - تگ‌های قابل استفاده مجدد در تمام محتوا
3. **PageContent** - محتوای دینامیک بخش‌های مختلف صفحات
4. **FAQ** - سوالات متداول
5. **Testimonial** - نظرات و بازخوردهای کاربران

### ✅ مدل‌های بروزرسانی شده:

- **Course** - اضافه شدن ارتباط با Category و Tag
- **NewsArticle** - اضافه شدن ارتباط با Category و Tag
- **DigitalBook** - اضافه شدن ارتباط با Tag

---

## 🔄 Backward Compatibility (سازگاری با کد قبلی)

### ✅ تضمین عدم شکستن کد موجود:

1. **تمام فیلدهای قدیمی نگه‌داری شدند**:
   - `Course.subject`, `Course.price`, `Course.rating` → بدون تغییر
   - `NewsArticle.category` (String) → همچنان موجود
   - `DigitalBook.tags` (String[]) → همچنان موجود

2. **فیلدهای جدید اختیاری (optional) هستند**:
   ```prisma
   categoryId  String? @db.ObjectId  // ❓ اختیاری
   slug        String? @unique        // ❓ اختیاری
   ```

3. **روابط جدید با نام متفاوت**:
   - به جای `tags: String[]` → حالا `relatedTags: Tag[]`
   - به جای `category: String` → حالا `relatedCategory: Category?`

### 📝 استراتژی Migration:

```typescript
// ✅ مرحله 1: کد قدیمی همچنان کار می‌کند
const course = await prisma.course.findMany({
  select: {
    subject: true,
    price: true,
    rating: true
  }
});

// ✅ مرحله 2: به تدریج از روابط جدید استفاده کنید
const courseWithCategory = await prisma.course.findMany({
  include: {
    category: true,      // 🆕 جدید
    relatedTags: true    // 🆕 جدید
  }
});
```

---

## 🏗️ ساختار دیتابیس و روابط

### 1️⃣ مدل Category (دسته‌بندی‌های اصلی)

```prisma
model Category {
  slug        String   @unique // "airdrop", "nft", "crypto"
  title       String   // "ایردراپ", "NFT", "کریپتو"
  description String?
  icon        String?
  coverImage  String?
  color       String?  // "#214554"

  // روابط
  tags         Tag[]         // تگ‌های این دسته‌بندی
  courses      Course[]      // دوره‌های این دسته‌بندی
  content      PageContent[] // محتوای صفحه
  news         NewsArticle[] // اخبار مرتبط
  faqs         FAQ[]         // سوالات متداول
  testimonials Testimonial[] // نظرات کاربران
}
```

**مثال داده:**
```json
{
  "slug": "airdrop",
  "title": "ایردراپ",
  "description": "آموزش کامل ایردراپ از صفر تا صد",
  "icon": "/icons/airdrop.svg",
  "coverImage": "/images/airdrop-hero.jpg",
  "color": "#214554",
  "published": true,
  "featured": true
}
```

---

### 2️⃣ مدل Tag (تگ‌های قابل استفاده مجدد)

```prisma
model Tag {
  slug  String @unique // "technical-analysis"
  title String         // "تحلیل تکنیکال"

  // روابط many-to-many
  categories Category[]    // در کدام دسته‌بندی‌ها استفاده شده
  courses    Course[]      // در کدام دوره‌ها استفاده شده
  news       NewsArticle[] // در کدام اخبار استفاده شده
  books      DigitalBook[] // در کدام کتاب‌ها استفاده شده
}
```

**نمودار رابطه:**
```
Category ←→ Tag (many-to-many)
Course ←→ Tag (many-to-many)
NewsArticle ←→ Tag (many-to-many)
DigitalBook ←→ Tag (many-to-many)
```

---

### 3️⃣ مدل PageContent (محتوای دینامیک صفحات)

```prisma
model PageContent {
  categoryId String   // مربوط به کدام Category
  type       String   // "landing", "about", "features"
  content    Json     // محتوای واقعی (ساختار flexible)
  order      Int      // ترتیب نمایش
  published  Boolean
}
```

**ساختار JSON برای type="landing":**
```json
{
  "type": "landing",
  "content": {
    "title": "آموزش ایردراپ از صفر تا صد",
    "subtitle": "با ما وارد دنیای درآمد رایگان شوید",
    "ctaText": "شروع یادگیری",
    "ctaLink": "/courses?category=airdrop",
    "backgroundImage": "/images/airdrop-hero.jpg",
    "features": [
      "آموزش گام به گام",
      "پروژه‌های عملی",
      "پشتیبانی ۲۴ ساعته"
    ]
  }
}
```

**ساختار JSON برای type="about":**
```json
{
  "type": "about",
  "content": {
    "title": "ایردراپ چیست؟",
    "description": "ایردراپ یک روش توزیع رایگان توکن‌های کریپتو است...",
    "image": "/images/airdrop-about.jpg",
    "highlights": [
      {
        "icon": "gift",
        "title": "دریافت رایگان",
        "text": "توکن‌های رایگان دریافت کنید"
      },
      {
        "icon": "trending-up",
        "title": "سود بالقوه",
        "text": "امکان کسب سود از ایردراپ‌ها"
      }
    ]
  }
}
```

---

## 🎨 نحوه پیاده‌سازی SSR در Next.js 15 (App Router)

### 📂 ساختار پیشنهادی:

```
app/
├── [categorySlug]/
│   └── page.tsx              # صفحه دینامیک SSR
├── api/
│   └── categories/
│       ├── [slug]/
│       │   └── route.ts      # API دریافت Category
│       └── route.ts          # API لیست Categories
lib/
├── services/
│   └── category-service.ts   # منطق دیتابیس
└── hooks/
    └── use-category.ts       # React Query Hook
```

---

### 1️⃣ سرویس دیتابیس (lib/services/category-service.ts)

```typescript
import { prisma } from "@/lib/db";
import { cache } from "react";

/**
 * دریافت تمام اطلاعات یک Category با تمام روابط
 * این تابع با استفاده از React cache برای SSR بهینه شده
 */
export const getCategoryBySlug = cache(async (slug: string) => {
  return await prisma.category.findUnique({
    where: { slug, published: true },
    include: {
      // دریافت تگ‌های این دسته‌بندی
      tags: {
        orderBy: { usageCount: "desc" },
        take: 30, // حداکثر 30 تگ
      },

      // دریافت محتوای صفحه (به ترتیب order)
      content: {
        where: { published: true },
        orderBy: { order: "asc" },
      },

      // دریافت دوره‌های مرتبط
      courses: {
        where: { published: true },
        include: {
          relatedTags: true,
        },
        orderBy: { createdAt: "desc" },
        take: 12, // حداکثر 12 دوره
      },

      // دریافت اخبار مرتبط
      news: {
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        take: 6,
      },

      // دریافت سوالات متداول
      faqs: {
        where: { published: true },
        orderBy: { order: "asc" },
      },

      // دریافت نظرات کاربران
      testimonials: {
        where: { published: true, verified: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });
});

/**
 * دریافت لیست تمام Categories برای generateStaticParams
 */
export const getAllCategorySlugs = cache(async () => {
  const categories = await prisma.category.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return categories.map((cat) => cat.slug);
});

/**
 * دریافت آمار Category (تعداد دوره‌ها، اخبار و...)
 */
export const getCategoryStats = cache(async (categoryId: string) => {
  const [coursesCount, newsCount, faqsCount] = await Promise.all([
    prisma.course.count({
      where: { categoryId, published: true },
    }),
    prisma.newsArticle.count({
      where: { categoryId, published: true },
    }),
    prisma.faq.count({
      where: { categoryId, published: true },
    }),
  ]);

  return { coursesCount, newsCount, faqsCount };
});
```

---

### 2️⃣ صفحه دینامیک SSR (app/[categorySlug]/page.tsx)

```typescript
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCategoryBySlug, getAllCategorySlugs } from "@/lib/services/category-service";
import Landing3 from "@/components/utils/Landing3";
import AboutOtherPages from "@/components/utils/AboutOtherPages";
import TagsList from "@/components/utils/TagsList";
import Courses from "@/components/utils/CoursesSec.server";
import FAQSection from "@/components/utils/FAQSection";
import TestimonialsSection from "@/components/utils/TestimonialsSection";

// ✅ تولید صفحات استاتیک در build time
export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();

  return slugs.map((slug) => ({
    categorySlug: slug,
  }));
}

// ✅ تولید متادیتای SEO به صورت دینامیک
export async function generateMetadata({
  params,
}: {
  params: { categorySlug: string };
}): Promise<Metadata> {
  const category = await getCategoryBySlug(params.categorySlug);

  if (!category) {
    return {
      title: "صفحه پیدا نشد",
    };
  }

  return {
    title: category.metaTitle || category.title,
    description: category.metaDescription || category.description,
    keywords: category.metaKeywords,
    openGraph: {
      title: category.title,
      description: category.description || "",
      images: category.coverImage ? [category.coverImage] : [],
    },
  };
}

// ✅ کامپوننت اصلی صفحه (SSR)
export default async function CategoryPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  // دریافت داده از دیتابیس (Server-side)
  const category = await getCategoryBySlug(params.categorySlug);

  // اگر Category پیدا نشد → 404
  if (!category) {
    notFound();
  }

  // استخراج محتوای مختلف از content
  const landingContent = category.content.find((c) => c.type === "landing");
  const aboutContent = category.content.find((c) => c.type === "about");

  return (
    <main className="w-full">
      {/* بخش Hero/Landing */}
      {landingContent && (
        <Landing3 data={landingContent.content} />
      )}

      {/* بخش درباره */}
      {aboutContent && (
        <section className="w-full mt-8 sm:mt-12 md:mt-16 lg:mt-20">
          <AboutOtherPages data={aboutContent.content} />
        </section>
      )}

      {/* بخش دوره‌های آموزشی */}
      <section className="w-full mt-8 sm:mt-12 md:mt-16 lg:mt-20">
        <h2 className="text-center text-3xl font-bold mb-8">
          دوره‌های {category.title}
        </h2>
        <Courses courses={category.courses} />
      </section>

      {/* بخش سوالات متداول */}
      {category.faqs.length > 0 && (
        <section className="w-full mt-12 sm:mt-16 md:mt-20">
          <FAQSection faqs={category.faqs} />
        </section>
      )}

      {/* بخش نظرات کاربران */}
      {category.testimonials.length > 0 && (
        <section className="w-full mt-12 sm:mt-16 md:mt-20">
          <TestimonialsSection testimonials={category.testimonials} />
        </section>
      )}

      {/* بخش تگ‌ها */}
      <section className="w-full mt-12 sm:mt-16 md:mt-20 pb-8 sm:pb-12">
        <TagsList
          tags={category.tags.map((tag) => tag.title)}
          title={`کلید واژه‌های ${category.title}`}
        />
      </section>
    </main>
  );
}

// ✅ ISR: revalidate هر 1 ساعت (3600 ثانیه)
export const revalidate = 3600;
```

---

### 3️⃣ API Route (app/api/categories/[slug]/route.ts)

```typescript
import { NextRequest } from "next/server";
import { getCategoryBySlug } from "@/lib/services/category-service";
import { successResponse, notFoundResponse, errorResponse } from "@/lib/utils/api-response";

/**
 * GET /api/categories/[slug]
 * دریافت اطلاعات یک Category
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const category = await getCategoryBySlug(params.slug);

    if (!category) {
      return notFoundResponse("دسته‌بندی پیدا نشد");
    }

    return successResponse(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return errorResponse("خطا در دریافت اطلاعات", "DATABASE_ERROR");
  }
}
```

---

### 4️⃣ React Query Hook (lib/hooks/use-category.ts)

```typescript
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Hook برای دریافت Category در Client-side
 * (اگر نیاز به تعامل کاربر باشد)
 */
export function useCategory(slug: string) {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: async () => {
      const { data } = await axios.get(`/api/categories/${slug}`);
      return data.data;
    },
    staleTime: 5 * 60 * 1000, // 5 دقیقه
    gcTime: 10 * 60 * 1000, // 10 دقیقه
  });
}

/**
 * Hook برای دریافت لیست تمام Categories
 */
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get("/api/categories");
      return data.data;
    },
    staleTime: 10 * 60 * 1000,
  });
}
```

---

## 🔄 چگونگی عملکرد SSR و Auto-Update

### 1️⃣ **Static Site Generation (SSG) با ISR**

```typescript
// در page.tsx:
export const revalidate = 3600; // هر 1 ساعت
```

**مراحل:**
1. در **build time** تمام صفحات category از طریق `generateStaticParams()` تولید می‌شوند
2. داده‌ها از دیتابیس خوانده می‌شوند و صفحات HTML استاتیک تولید می‌شوند
3. صفحات به مدت 1 ساعت **cache** می‌شوند
4. پس از 1 ساعت، اولین درخواست باعث **regenerate** صفحه می‌شود
5. صفحه جدید با داده‌های به‌روز از دیتابیس تولید می‌شود

**مزایا:**
- ✅ سرعت بارگذاری بسیار بالا (صفحات HTML آماده)
- ✅ SEO عالی (محتوا در HTML)
- ✅ به‌روزرسانی خودکار بدون نیاز به deploy مجدد

---

### 2️⃣ **On-Demand Revalidation**

برای به‌روزرسانی فوری پس از ویرایش توسط ادمین:

```typescript
// app/api/admin/revalidate/route.ts
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { successResponse, unauthorizedResponse } from "@/lib/utils/api-response";

export async function POST(req: Request) {
  const session = await auth();

  // فقط ادمین
  if (!session?.user || session.user.role !== "admin") {
    return unauthorizedResponse("دسترسی محدود");
  }

  const { categorySlug } = await req.json();

  try {
    // پاک کردن cache این صفحه
    revalidatePath(`/${categorySlug}`);

    return successResponse({ message: "صفحه با موفقیت به‌روز شد" });
  } catch (error) {
    return errorResponse("خطا در به‌روزرسانی");
  }
}
```

**فلوی کار:**
1. ادمین محتوای Category را در پنل ادمین ویرایش می‌کند
2. پس از ذخیره، API `/api/admin/revalidate` فراخوانی می‌شود
3. `revalidatePath()` cache صفحه را پاک می‌کند
4. درخواست بعدی صفحه را با داده‌های جدید تولید می‌کند

---

### 3️⃣ **React Cache برای Deduplication**

```typescript
import { cache } from "react";

export const getCategoryBySlug = cache(async (slug: string) => {
  // این query در یک request فقط یکبار اجرا می‌شود
  return await prisma.category.findUnique({ ... });
});
```

**چرا مهم است؟**
- اگر در یک صفحه چندین کامپوننت `getCategoryBySlug()` را فراخوانی کنند، فقط **یک query** به دیتابیس زده می‌شود
- باقی کامپوننت‌ها از **cache** استفاده می‌کنند

---

## 📊 مثال کامل: صفحه Airdrop

### وضعیت قبل (Static Data):

```typescript
// public/data.tsx
export const airdropLandingData = { ... }; // هاردکد
export const airdropAboutData = { ... };    // هاردکد
export const investmentTagsData = [ ... ];  // هاردکد
```

### وضعیت بعد (Dynamic از Database):

```typescript
// app/airdrop/page.tsx
export default async function AirdropPage() {
  const category = await getCategoryBySlug("airdrop");

  // تمام داده‌ها از دیتابیس می‌آیند:
  // - category.content (landing, about)
  // - category.tags
  // - category.courses
  // - category.faqs
  // - category.testimonials
}
```

---

## 🚀 مراحل Migration از Static به Dynamic

### مرحله 1: Seed کردن دیتابیس

```typescript
// prisma/seed-categories.ts
import { PrismaClient } from "@prisma/client";
import {
  airdropLandingData,
  airdropAboutData,
  investmentTagsData,
} from "@/public/data";

const prisma = new PrismaClient();

async function seedAirdrop() {
  // 1. ایجاد تگ‌ها
  const tags = await Promise.all(
    investmentTagsData.map((tagTitle) =>
      prisma.tag.upsert({
        where: { slug: slugify(tagTitle) },
        create: {
          slug: slugify(tagTitle),
          title: tagTitle,
        },
        update: {},
      })
    )
  );

  // 2. ایجاد Category
  const airdropCategory = await prisma.category.upsert({
    where: { slug: "airdrop" },
    create: {
      slug: "airdrop",
      title: "ایردراپ",
      description: "آموزش کامل ایردراپ",
      icon: "/icons/airdrop.svg",
      coverImage: "/images/airdrop-hero.jpg",
      color: "#214554",
      published: true,
      tagIds: tags.map((t) => t.id),
    },
    update: {},
  });

  // 3. ایجاد PageContent برای Landing
  await prisma.pageContent.create({
    data: {
      categoryId: airdropCategory.id,
      type: "landing",
      title: "صفحه اصلی ایردراپ",
      content: airdropLandingData, // داده قبلی
      order: 1,
      published: true,
    },
  });

  // 4. ایجاد PageContent برای About
  await prisma.pageContent.create({
    data: {
      categoryId: airdropCategory.id,
      type: "about",
      title: "درباره ایردراپ",
      content: airdropAboutData, // داده قبلی
      order: 2,
      published: true,
    },
  });

  console.log("✅ Seed completed for Airdrop");
}

seedAirdrop();
```

**اجرا:**
```bash
npx tsx prisma/seed-categories.ts
```

---

### مرحله 2: بروزرسانی کامپوننت‌ها

```typescript
// components/airdrop/pageContent.tsx (قبل)
import { airdropLandingData, investmentTagsData } from "@/public/data";

const AirdropPageContent = () => {
  return (
    <main>
      <Landing3 data={airdropLandingData} />
      <TagsList tags={investmentTagsData} title="کلید واژه های ایردراپ" />
    </main>
  );
};
```

```typescript
// app/airdrop/page.tsx (بعد)
import { getCategoryBySlug } from "@/lib/services/category-service";

export default async function AirdropPage() {
  const category = await getCategoryBySlug("airdrop");

  const landingContent = category.content.find((c) => c.type === "landing");

  return (
    <main>
      <Landing3 data={landingContent.content} />
      <TagsList
        tags={category.tags.map((t) => t.title)}
        title={`کلید واژه های ${category.title}`}
      />
    </main>
  );
}

export const revalidate = 3600; // ISR
```

---

### مرحله 3: ساخت پنل ادمین

```typescript
// app/admin/categories/[slug]/edit/page.tsx
"use client";

import { useCategory } from "@/lib/hooks/use-category";
import { useState } from "react";
import axios from "axios";

export default function EditCategoryPage({ params }) {
  const { data: category, isLoading } = useCategory(params.slug);
  const [title, setTitle] = useState(category?.title || "");

  const handleSave = async () => {
    await axios.put(`/api/admin/categories/${params.slug}`, {
      title,
      // سایر فیلدها...
    });

    // به‌روزرسانی فوری صفحه
    await axios.post("/api/admin/revalidate", {
      categorySlug: params.slug,
    });

    alert("تغییرات ذخیره شد!");
  };

  if (isLoading) return <div>در حال بارگذاری...</div>;

  return (
    <div>
      <h1>ویرایش دسته‌بندی: {category.title}</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="عنوان دسته‌بندی"
      />

      <button onClick={handleSave}>ذخیره تغییرات</button>
    </div>
  );
}
```

---

## 📈 مزایای این معماری

### 1️⃣ **مدیریت محتوا بدون نیاز به توسعه‌دهنده**
- ادمین می‌تواند محتوای صفحات را از پنل تغییر دهد
- نیازی به ویرایش فایل‌های `data.tsx` نیست

### 2️⃣ **SEO بهینه**
- تمام محتوا در HTML صفحه (SSR/SSG)
- متادیتای دینامیک برای هر صفحه
- URL‌های SEO-friendly

### 3️⃣ **عملکرد عالی**
- ISR: صفحات استاتیک با به‌روزرسانی خودکار
- React Cache: جلوگیری از query‌های تکراری
- Incremental loading: بارگذاری بخش‌های صفحه به صورت جداگانه

### 4️⃣ **مقیاس‌پذیری**
- افزودن دسته‌بندی جدید بدون تغییر کد
- سیستم تگ‌گذاری یکپارچه در تمام بخش‌ها
- ساختار modular برای توسعه آینده

### 5️⃣ **تجربه کاربری بهتر**
- بارگذاری سریع صفحات (SSG)
- به‌روزرسانی محتوا بدون refresh
- جستجو و فیلتر بر اساس تگ

---

## 🎯 نتیجه‌گیری

با این معماری:

✅ **صفحات دینامیک هستند** اما **عملکرد static** دارند
✅ **محتوا در دیتابیس** اما **SEO عالی** دارند
✅ **به‌روزرسانی فوری** بدون نیاز به **deploy مجدد**
✅ **سازگار با کد قبلی** و بدون **breaking changes**

این سیستم آماده برای رشد و توسعه پروژه شماست! 🚀
