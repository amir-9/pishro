# API Documentation - User Routes

این مستندات شامل تمام روت‌های مربوط به کاربران است که به تازگی به پروژه اضافه شده‌اند.

## 📋 فهرست مطالب
- [مدل‌های Prisma](#مدلهای-prisma)
- [روت‌های User](#روتهای-user)
- [Helper Functions](#helper-functions)

---

## 🗄️ مدل‌های Prisma

### Enrollment (ثبت‌نام در دوره)
```prisma
model Enrollment {
  id           String    @id @default(auto()) @map("_id") @db.ObjectId
  userId       String    @db.ObjectId
  courseId     String    @db.ObjectId
  enrolledAt   DateTime  @default(now())
  progress     Int       @default(0)      // 0-100
  completedAt  DateTime?
  lastAccessAt DateTime?

  @@unique([userId, courseId])
}
```

### Transaction (تراکنش‌ها)
```prisma
model Transaction {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  userId      String   @db.ObjectId
  orderId     String?  @db.ObjectId
  amount      Int
  type        String   // "payment", "refund", "withdrawal"
  status      String   // "pending", "success", "failed"
  gateway     String?  // "zarinpal", "mellat", etc
  refNumber   String?
  description String?
  createdAt   DateTime @default(now())
}
```

### OrderItem (آیتم‌های سفارش)
```prisma
model OrderItem {
  id              String  @id @default(auto()) @map("_id") @db.ObjectId
  orderId         String  @db.ObjectId
  courseId        String  @db.ObjectId
  price           Int
  discountPercent Int?
}
```

---

## 🔐 روت‌های User

همه این روت‌ها نیاز به Authentication دارند و باید token یوزر در header ارسال شود.

### 1️⃣ GET `/api/user/me`
دریافت اطلاعات کامل کاربر لاگین شده

**Response:**
```json
{
  "ok": true,
  "user": {
    "id": "...",
    "phone": "09123456789",
    "phoneVerified": true,
    "firstName": "علی",
    "lastName": "احمدی",
    "email": "ali@example.com",
    "nationalCode": "1234567890",
    "birthDate": "1990-01-01T00:00:00.000Z",
    "avatarUrl": "https://...",
    "cardNumber": "1234-5678-9012-3456",
    "shebaNumber": "IR123456789012345678901234",
    "accountOwner": "علی احمدی",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "stats": {
      "totalOrders": 5,
      "totalEnrollments": 3,
      "totalComments": 12
    }
  }
}
```

---

### 2️⃣ GET `/api/user/enrolled-courses`
دریافت لیست دوره‌هایی که کاربر ثبت‌نام کرده

**Query Parameters:**
- `page` (optional): شماره صفحه - پیش‌فرض: 1
- `limit` (optional): تعداد در هر صفحه - پیش‌فرض: 10

**Example Request:**
```
GET /api/user/enrolled-courses?page=1&limit=10
```

**Response:**
```json
{
  "ok": true,
  "enrollments": [
    {
      "id": "enrollment-id",
      "enrolledAt": "2024-01-01T00:00:00.000Z",
      "progress": 45,
      "completedAt": null,
      "lastAccessAt": "2024-01-15T10:30:00.000Z",
      "isCompleted": false,
      "course": {
        "id": "course-id",
        "subject": "دوره جامع کریپتو",
        "img": "https://...",
        "price": 1500000,
        "discountPercent": 20,
        "time": "12 ساعت",
        "rating": 4.5,
        "videosCount": 24,
        "description": "..."
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "totalPages": 1
  }
}
```

---

### 3️⃣ GET `/api/user/transactions`
دریافت لیست تراکنش‌های کاربر

**Query Parameters:**
- `page` (optional): شماره صفحه - پیش‌فرض: 1
- `limit` (optional): تعداد در هر صفحه - پیش‌فرض: 20
- `type` (optional): نوع تراکنش - `payment`, `refund`, `withdrawal`
- `status` (optional): وضعیت - `pending`, `success`, `failed`

**Example Request:**
```
GET /api/user/transactions?page=1&limit=20&type=payment&status=success
```

**Response:**
```json
{
  "ok": true,
  "transactions": [
    {
      "id": "transaction-id",
      "amount": 1500000,
      "type": "payment",
      "status": "success",
      "gateway": "zarinpal",
      "refNumber": "TEST-123456",
      "description": "پرداخت موفق سفارش",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "order": {
        "id": "order-id",
        "total": 1500000,
        "status": "paid"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 15,
    "totalPages": 1
  }
}
```

---

### 4️⃣ GET `/api/user/orders`
دریافت لیست تمام سفارشات کاربر

**Query Parameters:**
- `page` (optional): شماره صفحه - پیش‌فرض: 1
- `limit` (optional): تعداد در هر صفحه - پیش‌فرض: 10
- `status` (optional): وضعیت سفارش - `pending`, `paid`, `failed`

**Example Request:**
```
GET /api/user/orders?page=1&limit=10&status=paid
```

**Response:**
```json
{
  "ok": true,
  "orders": [
    {
      "id": "order-id",
      "total": 1500000,
      "status": "paid",
      "paymentRef": "TEST-123456",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "itemCount": 2,
      "items": [
        {
          "courseId": "course-id-1",
          "title": "دوره جامع کریپتو",
          "price": 1000000,
          "img": "https://...",
          "discountPercent": 20
        },
        {
          "courseId": "course-id-2",
          "title": "دوره بورس مقدماتی",
          "price": 500000,
          "img": "https://...",
          "discountPercent": 10
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "totalPages": 1
  }
}
```

---

### 5️⃣ PATCH `/api/user/enrollment`
بروزرسانی پیشرفت در یک دوره

**Request Body:**
```json
{
  "enrollmentId": "enrollment-id",
  "progress": 75,
  "completed": false
}
```

**Fields:**
- `enrollmentId` (required): شناسه ثبت‌نام
- `progress` (optional): درصد پیشرفت (0-100)
- `completed` (optional): آیا دوره تکمیل شده؟

**Response:**
```json
{
  "ok": true,
  "enrollment": {
    "id": "enrollment-id",
    "userId": "user-id",
    "courseId": "course-id",
    "enrolledAt": "2024-01-01T00:00:00.000Z",
    "progress": 75,
    "completedAt": null,
    "lastAccessAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 🛠️ Helper Functions

### `createTransaction()`
ایجاد یک تراکنش جدید

```typescript
import { createTransaction } from "@/lib/helpers/transaction";

await createTransaction({
  userId: "user-id",
  orderId: "order-id",
  amount: 1500000,
  type: "payment",
  status: "success",
  gateway: "zarinpal",
  refNumber: "123456",
  description: "پرداخت موفق"
});
```

### `updateTransactionStatus()`
بروزرسانی وضعیت تراکنش

```typescript
import { updateTransactionStatus } from "@/lib/helpers/transaction";

await updateTransactionStatus(
  "transaction-id",
  "success",
  "REF-123456"
);
```

### `createEnrollmentsFromOrder()`
ایجاد Enrollment برای تمام دوره‌های یک سفارش

```typescript
import { createEnrollmentsFromOrder } from "@/lib/helpers/transaction";

// بعد از پرداخت موفق
await createEnrollmentsFromOrder("user-id", "order-id");
```

---

## 🔄 جریان کامل خرید

1. کاربر سفارش ایجاد می‌کند → `POST /api/checkout`
2. به درگاه پرداخت منتقل می‌شود
3. پس از پرداخت → `GET /api/payment/verify`
   - اگر موفق:
     - وضعیت Order به `paid` تغییر می‌کند
     - یک Transaction با status=success ایجاد می‌شود
     - برای هر دوره یک Enrollment ایجاد می‌شود
   - اگر ناموفق:
     - وضعیت Order به `failed` تغییر می‌کند
     - یک Transaction با status=failed ایجاد می‌شود
4. کاربر می‌تواند دوره‌های خود را در `/api/user/enrolled-courses` ببیند
5. کاربر می‌تواند تراکنش‌ها را در `/api/user/transactions` ببیند

---

## 📊 تغییرات در روت‌های موجود

### `POST /api/checkout`
تغییری ندارد، همچنان سفارش ایجاد می‌کند.

### `GET /api/payment/verify`
**تغییرات:**
- ✅ پس از پرداخت موفق، Transaction ایجاد می‌کند
- ✅ پس از پرداخت موفق، Enrollment برای دوره‌ها ایجاد می‌کند
- ✅ پس از پرداخت ناموفق، Transaction با status=failed ایجاد می‌کند

---

## 🚀 نکات مهم

1. **همه روت‌های `/api/user/*` نیاز به authentication دارند**
2. **Pagination در تمام لیست‌ها پشتیبانی می‌شود**
3. **Transaction به صورت خودکار بعد از پرداخت ایجاد می‌شود**
4. **Enrollment به صورت خودکار بعد از پرداخت موفق ایجاد می‌شود**
5. **Progress در Enrollment قابل بروزرسانی است**
6. **هر یوزر فقط یکبار می‌تواند در یک دوره ثبت‌نام کند** (unique constraint)

---

## 📝 TODO: روت‌هایی که ممکنه بعداً لازم باشه

- `DELETE /api/user/enrollment/:id` - حذف ثبت‌نام (در صورت لزوم)
- `GET /api/user/stats` - آمار کلی کاربر
- `GET /api/user/certificates` - گواهی‌نامه‌های کاربر
- `POST /api/user/refund` - درخواست بازگشت وجه
- `GET /api/user/wishlist` - لیست علاقه‌مندی‌ها

---

**تاریخ آپدیت:** 2025-11-06
**نسخه:** 1.0.0
