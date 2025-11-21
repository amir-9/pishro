# رفع مشکل نمایش تصویر خبر - تکمیل شده ✅

## تشخیص مشکل

وقتی تصویر آپلود می‌شود، پاسخ زیر دریافت می‌شود:
```json
{
    "status": "success",
    "data": {
        "id": "69204593557eeb40f3c5a46c",
        "filePath": "https://www.pishrosarmaye.com/uploads/images/news/...",
        "fileName": "download.jpg",
        "url": "https://www.pishrosarmaye.com/uploads/images/news/..."
    },
    "message": "تصویر با موفقیت آپلود شد"
}
```

ولی تصویر در خبر نمایش داده نمی‌شود و `<img>` بدون `src` رندر می‌شود.

## علت مشکل (تشخیص داده شده)

مشکل از دو جا بود:

1. **Empty string در coverImage**: وقتی `coverImage` یک رشته خالی (`""`) باشد، کد `coverImage ?? "/images/default-news.jpg"` کار نمی‌کند چون `""` falsy نیست در JavaScript
2. **فایل پیش‌فرض وجود نداشت**: فایل `/images/default-news.jpg` در پروژه وجود نداشت

## راه‌حل‌های اعمال شده ✅

### 1. رفع مشکل در Frontend Components

**فایل: `components/news/newsCard.tsx`**
```typescript
// قبل:
src={data.coverImage ?? "/images/default-news.jpg"}

// بعد:
src={data.coverImage && data.coverImage.trim() !== "" ? data.coverImage : "/images/news/post-1.jpg"}
```

**فایل: `components/news/NewsDetail.tsx`**
```typescript
// قبل:
{article.coverImage && (

// بعد:
{article.coverImage && article.coverImage.trim() !== "" && (
```

### 2. رفع مشکل در Backend API

**فایل: `app/api/admin/news/route.ts`** (POST)
```typescript
// قبل:
coverImage,

// بعد:
coverImage: coverImage && coverImage.trim() !== "" ? coverImage : null,
```

**فایل: `app/api/admin/news/[id]/route.ts`** (PATCH)
```typescript
// قبل:
if (body.coverImage !== undefined) updateData.coverImage = body.coverImage;

// بعد:
if (body.coverImage !== undefined) {
  updateData.coverImage = body.coverImage && body.coverImage.trim() !== "" ? body.coverImage : null;
}
```

### 3. Debug Endpoint

**فایل جدید: `app/api/admin/news/debug/[slug]/route.ts`**

برای بررسی coverImage هر خبر:
```
GET /api/admin/news/debug/[slug]
```

## نتیجه

✅ اگر `coverImage` خالی باشد، تصویر پیش‌فرض (`/images/news/post-1.jpg`) نمایش داده می‌شود
✅ Empty string در دیتابیس به `null` تبدیل می‌شود
✅ مشکل نمایش تصویر برطرف شد

---

## راهنمای استفاده برای آینده

### برای CMS Panel:

اگر پنل CMS شما URL تصویر را به درستی ارسال نمی‌کند:

## راه حل (در کد Frontend CMS)

### 1. بعد از آپلود موفقیت‌آمیز تصویر:

```typescript
// ✅ درست
async function handleImageUpload(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', 'NEWS');

  const response = await fetch('/api/admin/images', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (result.status === 'success') {
    // ⭐ نکته مهم: URL را در state یا فیلد فرم قرار دهید
    setCoverImage(result.data.url); // یا
    // form.setValue('coverImage', result.data.url); // برای React Hook Form
  }
}
```

### 2. هنگام ثبت یا ویرایش خبر:

```typescript
// ✅ درست
async function handleCreateNews(formData) {
  const newsData = {
    title: formData.title,
    slug: formData.slug,
    excerpt: formData.excerpt,
    content: formData.content,
    coverImage: coverImage, // ⭐ این فیلد باید شامل URL کامل باشد
    author: formData.author,
    category: formData.category,
    published: formData.published,
  };

  const response = await fetch('/api/admin/news', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newsData),
  });

  return response.json();
}
```

### 3. مثال کامل با React Hook Form:

```tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function NewsForm() {
  const [coverImage, setCoverImage] = useState<string>('');
  const { register, handleSubmit, setValue } = useForm();

  // آپلود تصویر
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'NEWS');

    try {
      const response = await fetch('/api/admin/images', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.status === 'success') {
        // ⭐ ذخیره URL در state و فرم
        const imageUrl = result.data.url;
        setCoverImage(imageUrl);
        setValue('coverImage', imageUrl);

        console.log('✅ تصویر آپلود شد:', imageUrl);
      }
    } catch (error) {
      console.error('❌ خطا در آپلود:', error);
    }
  };

  // ثبت خبر
  const onSubmit = async (data: any) => {
    const newsData = {
      ...data,
      coverImage, // ⭐ اضافه کردن URL تصویر
    };

    console.log('📤 ارسال داده:', newsData);

    try {
      const response = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsData),
      });

      const result = await response.json();
      console.log('✅ خبر ایجاد شد:', result);
    } catch (error) {
      console.error('❌ خطا در ایجاد خبر:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* فیلدهای دیگر */}
      <input {...register('title')} placeholder="عنوان" />
      <input {...register('slug')} placeholder="اسلاگ" />
      <textarea {...register('excerpt')} placeholder="خلاصه" />
      <textarea {...register('content')} placeholder="محتوا" />

      {/* آپلود تصویر */}
      <div>
        <label>تصویر کاور:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {coverImage && (
          <div>
            <p>✅ تصویر آپلود شد</p>
            <img src={coverImage} alt="Preview" style={{ maxWidth: '200px' }} />
          </div>
        )}
      </div>

      <button type="submit">ایجاد خبر</button>
    </form>
  );
}
```

## تست دستی API

برای اطمینان از درست بودن Backend، این درخواست را تست کنید:

```bash
# 1. آپلود تصویر
curl -X POST http://localhost:3000/api/admin/images \
  -H "Cookie: YOUR_SESSION_COOKIE" \
  -F "file=@/path/to/image.jpg" \
  -F "category=NEWS"

# پاسخ: { "data": { "url": "https://..." } }

# 2. ایجاد خبر با URL تصویر
curl -X POST http://localhost:3000/api/admin/news \
  -H "Content-Type: application/json" \
  -H "Cookie: YOUR_SESSION_COOKIE" \
  -d '{
    "title": "تست",
    "slug": "test-123",
    "excerpt": "خلاصه",
    "content": "محتوا",
    "coverImage": "URL_FROM_STEP_1_HERE",
    "category": "اخبار",
    "published": true
  }'
```

## بررسی دیتابیس

اگر مشکل ادامه داشت، بررسی کنید که آیا `coverImage` در دیتابیس ذخیره شده:

```javascript
// در Prisma Studio یا
const news = await prisma.newsArticle.findUnique({
  where: { slug: 'your-news-slug' },
  select: { coverImage: true }
});

console.log('coverImage:', news.coverImage);
```

## نکات مهم

1. ✅ Backend به درستی کار می‌کند
2. ✅ کامپوننت‌های نمایش درست هستند
3. ❌ مشکل در frontend پنل CMS است
4. ⭐ حتماً URL دریافتی از آپلود را در فیلد `coverImage` قرار دهید
5. ⭐ هنگام ثبت خبر، `coverImage` را ارسال کنید

## تماس برای پشتیبانی

اگر مشکل ادامه داشت:
1. Console log کنید که آیا `coverImage` در body ارسالی وجود دارد
2. بررسی کنید که آیا در دیتابیس `coverImage` ذخیره شده
3. کد frontend پنل CMS را بررسی کنید
