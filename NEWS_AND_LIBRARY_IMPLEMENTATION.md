# پیاده‌سازی بخش اخبار و کتابخانه دیجیتال

این سند تغییرات و ساختار پیاده‌سازی شده برای بخش‌های اخبار و کتابخانه دیجیتال را توضیح می‌دهد.

## فهرست

1. [تغییرات دیتابیس](#تغییرات-دیتابیس)
2. [API Routes](#api-routes)
3. [Service Layer](#service-layer)
4. [React Query Hooks](#react-query-hooks)
5. [کامپوننت‌ها](#کامپوننت‌ها)
6. [صفحات](#صفحات)
7. [نحوه استفاده](#نحوه-استفاده)

---

## تغییرات دیتابیس

### مدل‌های جدید در `prisma/schema.prisma`:

#### 1. NewsArticle
```prisma
model NewsArticle {
  id          String        @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  slug        String        @unique
  excerpt     String
  content     String
  coverImage  String?
  author      String?
  category    String
  tags        String[]
  published   Boolean       @default(false)
  publishedAt DateTime?
  views       Int           @default(0)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  comments    NewsComment[] @relation("NewsArticleComments")
}
```

#### 2. NewsComment
```prisma
model NewsComment {
  id        String      @id @default(auto()) @map("_id") @db.ObjectId
  article   NewsArticle @relation(fields: [articleId], references: [id], onDelete: Cascade)
  articleId String      @db.ObjectId
  user      User?       @relation(fields: [userId], references: [id], onDelete: SetNull)
  userId    String?     @db.ObjectId
  content   String
  likes     String[]    @default([])
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
}
```

#### 3. DigitalBook
```prisma
model DigitalBook {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  slug        String   @unique
  author      String
  description String
  cover       String?
  publisher   String?
  year        Int
  pages       Int?
  isbn        String?
  language    String   @default("فارسی")
  rating      Float    @default(0)
  votes       Int      @default(0)
  views       Int      @default(0)
  downloads   Int      @default(0)
  category    String
  formats     String[]
  status      String[] @default([])
  tags        String[] @default([])
  readingTime String?
  isFeatured  Boolean  @default(false)
  price       Int?
  fileUrl     String?
  audioUrl    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### دستورات برای اعمال تغییرات:

```bash
npx prisma generate
npx prisma db push
```

---

## API Routes

### بخش اخبار (News)

#### GET `/api/news`
- **توضیحات**: دریافت لیست اخبار با قابلیت فیلترینگ و صفحه‌بندی
- **Query Parameters**:
  - `page`: شماره صفحه (پیش‌فرض: 1)
  - `limit`: تعداد آیتم‌ها در هر صفحه (پیش‌فرض: 12، حداکثر: 50)
  - `category`: فیلتر بر اساس دسته‌بندی
  - `search`: جستجو در عنوان، محتوا، و نویسنده
  - `published`: فیلتر بر اساس وضعیت انتشار (true/false)
- **Response**: PaginatedData<NewsArticle>

#### POST `/api/news`
- **توضیحات**: ایجاد مقاله جدید (نیاز به احراز هویت)
- **Body**: NewsArticle fields
- **Response**: NewsArticle

#### GET `/api/news/[id]`
- **توضیحات**: دریافت جزئیات یک مقاله + افزایش شمارنده بازدید
- **Response**: NewsArticle (شامل کامنت‌ها)

#### PUT `/api/news/[id]`
- **توضیحات**: به‌روزرسانی مقاله
- **Response**: NewsArticle

#### DELETE `/api/news/[id]`
- **توضیحات**: حذف مقاله

#### GET `/api/news/[id]/comments`
- **توضیحات**: دریافت کامنت‌های یک مقاله
- **Response**: NewsComment[]

#### POST `/api/news/[id]/comments`
- **توضیحات**: افزودن کامنت جدید (نیاز به احراز هویت)
- **Body**: { content: string }
- **Response**: NewsComment

### بخش کتابخانه (Library)

#### GET `/api/library`
- **توضیحات**: دریافت لیست کتاب‌ها با قابلیت فیلترینگ و صفحه‌بندی
- **Query Parameters**:
  - `page`: شماره صفحه
  - `limit`: تعداد آیتم‌ها
  - `category`: فیلتر بر اساس دسته‌بندی
  - `format`: فیلتر بر اساس فرمت (جلد سخت، الکترونیکی، صوتی، ...)
  - `search`: جستجو در عنوان، نویسنده، توضیحات
  - `sort`: مرتب‌سازی (newest, oldest, rating, popular, downloads)
  - `featured`: فیلتر کتاب‌های ویژه (true/false)
- **Response**: PaginatedData<DigitalBook>

#### POST `/api/library`
- **توضیحات**: افزودن کتاب جدید
- **Body**: DigitalBook fields
- **Response**: DigitalBook

#### GET `/api/library/[id]`
- **توضیحات**: دریافت جزئیات یک کتاب + افزایش بازدید
- **Response**: DigitalBook

#### PUT `/api/library/[id]`
- **توضیحات**: به‌روزرسانی کتاب
- **Response**: DigitalBook

#### DELETE `/api/library/[id]`
- **توضیحات**: حذف کتاب

---

## Service Layer

### `lib/services/news-service.ts`

```typescript
interface NewsListParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  published?: boolean;
}

// توابع:
getNews(params?: NewsListParams): Promise<PaginatedData<NewsArticle>>
getNewsById(id: string): Promise<NewsArticle>
createNewsArticle(articleData): Promise<NewsArticle>
```

### `lib/services/library-service.ts`

```typescript
interface BookListParams {
  page?: number;
  limit?: number;
  category?: string;
  format?: string;
  search?: string;
  sort?: "newest" | "oldest" | "rating" | "popular" | "downloads";
  featured?: boolean;
}

// توابع:
getBooks(params?: BookListParams): Promise<PaginatedData<DigitalBook>>
getBookById(id: string): Promise<DigitalBook>
createBook(bookData): Promise<DigitalBook>
```

---

## React Query Hooks

### `lib/hooks/useNews.ts`

```typescript
// Query Keys
newsKeys.all
newsKeys.list(params)
newsKeys.detail(id)

// Hooks
useNewsList(params?: NewsListParams)
useNewsDetail(id: string, enabled?: boolean)
```

**تنظیمات Cache:**
- staleTime: 5 دقیقه (لیست) / 10 دقیقه (جزئیات)
- gcTime: 30 دقیقه
- retry: 2

### `lib/hooks/useBooks.ts`

```typescript
// Query Keys
bookKeys.all
bookKeys.list(params)
bookKeys.detail(id)

// Hooks
useBooksList(params?: BookListParams)
useBookDetail(id: string, enabled?: boolean)
```

**تنظیمات Cache:**
- staleTime: 10 دقیقه
- gcTime: 30 دقیقه
- retry: 2

---

## کامپوننت‌ها

### بخش اخبار

#### `components/news/NewsList.tsx`
- **نوع**: Client Component
- **وابستگی‌ها**: `useNewsList` hook
- **ویژگی‌ها**:
  - نمایش لودینگ
  - مدیریت خطا
  - نمایش پیام برای داده خالی
  - Grid layout responsive

#### `components/news/NewsDetail.tsx`
- **نوع**: Client Component
- **Props**: `articleId: string`
- **ویژگی‌ها**:
  - نمایش تصویر کاور
  - Meta information (نویسنده، تاریخ، بازدید)
  - تگ‌ها و دسته‌بندی
  - محتوای HTML
  - بخش کامنت‌ها

### بخش کتابخانه

#### `components/library/libraryContent.tsx`
- **نوع**: Client Component (به‌روزرسانی شده)
- **تغییرات**: اتصال به `useBooksList` hook با fallback به mock data
- **ویژگی‌ها**: همه ویژگی‌های قبلی حفظ شده

#### `components/library/BookDetail.tsx`
- **نوع**: Client Component
- **Props**: `bookId: string`
- **ویژگی‌ها**:
  - تصویر جلد کتاب
  - اطلاعات کامل (ناشر، سال انتشار، صفحات، ISBN)
  - امتیاز و آمار (بازدید، دانلود)
  - فرمت‌های موجود
  - دکمه دانلود (اگر fileUrl موجود باشد)
  - دکمه نسخه صوتی (اگر audioUrl موجود باشد)

---

## صفحات

### `app/(routes)/news/[slug]/page.tsx`
- **نوع**: Server Component
- **عملکرد**:
  - جستجوی مقاله بر اساس slug
  - استفاده از Prisma برای Server-side lookup
  - Render کامپوننت NewsDetail با ID مقاله
  - نمایش 404 اگر slug یافت نشد

### `app/(routes)/library/[slug]/page.tsx`
- **نوع**: Server Component
- **عملکرد**:
  - جستجوی کتاب بر اساس slug
  - استفاده از Prisma برای Server-side lookup
  - Render کامپوننت BookDetail با ID کتاب
  - نمایش 404 اگر slug یافت نشد

---

## نحوه استفاده

### 1. افزودن خبر جدید

```typescript
// در یک admin panel یا form
import { createNewsArticle } from "@/lib/services/news-service";

const handleSubmit = async (data) => {
  const article = await createNewsArticle({
    title: "عنوان خبر",
    slug: "slug-khbar",
    excerpt: "خلاصه کوتاه",
    content: "<p>محتوای کامل HTML</p>",
    category: "تکنولوژی",
    tags: ["blockchain", "crypto"],
    published: true,
    author: "نام نویسنده",
    coverImage: "/images/cover.jpg"
  });
};
```

### 2. نمایش لیست اخبار با فیلتر

```typescript
import { useNewsList } from "@/lib/hooks/useNews";

function NewsPage() {
  const { data, isLoading } = useNewsList({
    page: 1,
    limit: 12,
    category: "تکنولوژی",
    search: "bitcoin"
  });

  return <div>{/* render news list */}</div>;
}
```

### 3. لینک به صفحه جزئیات

```typescript
import Link from "next/link";

<Link href={`/news/${article.slug}`}>
  {article.title}
</Link>

<Link href={`/library/${book.slug}`}>
  {book.title}
</Link>
```

### 4. افزودن کامنت

```typescript
const handleAddComment = async (articleId, content) => {
  await axios.post(`/api/news/${articleId}/comments`, {
    content
  });
};
```

---

## نکات مهم

### امنیت
- تمام route های POST/PUT/DELETE نیاز به احراز هویت دارند
- Validation ورودی‌ها انجام می‌شود
- از SQL Injection محافظت شده (استفاده از Prisma)
- XSS prevention در نمایش HTML محتوا

### Performance
- استفاده از React Query برای caching
- Server-side pagination
- Lazy loading برای تصاویر
- Optimized database queries

### SEO
- استفاده از slug برای URL های بهتر
- Server Components برای SEO بهتر
- Meta data در صفحات detail

### Extensibility
- راحت اضافه کردن فیلتر های جدید
- قابلیت افزودن فیلد های جدید به models
- Modular architecture

---

## فایل‌های ایجاد/تغییر یافته

### دیتابیس
- ✅ `prisma/schema.prisma` (افزودن 3 مدل جدید)

### API Routes
- ✅ `app/api/news/route.ts`
- ✅ `app/api/news/[id]/route.ts`
- ✅ `app/api/news/[id]/comments/route.ts`
- ✅ `app/api/library/route.ts`
- ✅ `app/api/library/[id]/route.ts`

### Services
- ✅ `lib/services/news-service.ts`
- ✅ `lib/services/library-service.ts`

### Hooks
- ✅ `lib/hooks/useNews.ts`
- ✅ `lib/hooks/useBooks.ts`

### Components
- ✅ `components/news/NewsList.tsx` (به‌روزرسانی)
- ✅ `components/news/NewsDetail.tsx` (جدید)
- ✅ `components/library/libraryContent.tsx` (به‌روزرسانی)
- ✅ `components/library/BookDetail.tsx` (جدید)

### Pages
- ✅ `app/(routes)/news/[slug]/page.tsx` (جدید)
- ✅ `app/(routes)/library/[slug]/page.tsx` (جدید)

---

## مراحل بعدی (اختیاری)

1. **Admin Dashboard**: ساخت پنل مدیریت برای CRUD اخبار و کتاب‌ها
2. **Search Enhancement**: پیاده‌سازی full-text search با ElasticSearch یا Algolia
3. **Image Upload**: اضافه کردن قابلیت آپلود تصویر
4. **Comments Management**: سیستم مدیریت کامنت‌ها (تایید، حذف، گزارش)
5. **Favorites/Bookmarks**: قابلیت ذخیره کتاب‌ها و اخبار مورد علاقه
6. **Rating System**: سیستم امتیازدهی برای کتاب‌ها
7. **Related Content**: نمایش محتوای مرتبط
8. **RSS Feed**: ایجاد RSS feed برای اخبار
9. **Social Sharing**: دکمه‌های اشتراک‌گذاری در شبکه‌های اجتماعی
10. **Analytics**: ردیابی بازدید و تحلیل رفتار کاربران

---

تاریخ: 2025-11-07
نسخه: 1.0.0
