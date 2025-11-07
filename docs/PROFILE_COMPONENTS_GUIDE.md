# راهنمای کامپوننت‌های Profile

این مستندات کامپوننت‌های profile که با API واقعی کار می‌کنند را توضیح می‌دهد.

## 📋 فهرست

- [سرویس‌های User](#سرویسهای-user)
- [کامپوننت‌های Profile](#کامپوننتهای-profile)
- [صفحات Profile](#صفحات-profile)
- [نحوه استفاده](#نحوه-استفاده)

---

## 🛠️ سرویس‌های User

فایل: [lib/services/user-service.ts](lib/services/user-service.ts)

### سرویس‌های موجود:

| Function | توضیحات | Response Type |
|----------|---------|---------------|
| `getCurrentUser()` | اطلاعات کامل کاربر | `UserData` |
| `getEnrolledCourses(page, limit)` | دوره‌های ثبت‌نام شده | `PaginatedData<EnrolledCourse>` |
| `getUserTransactions(page, limit, type?, status?)` | تراکنش‌های کاربر | `PaginatedData<Transaction>` |
| `getUserOrders(page, limit, status?)` | سفارشات کاربر | `PaginatedData<UserOrder>` |
| `updateEnrollmentProgress(id, progress, completed?)` | آپدیت پیشرفت دوره | `EnrolledCourse` |
| `updatePersonalInfo(data)` | آپدیت اطلاعات شخصی | `UserData` |
| `updatePayInfo(data)` | آپدیت اطلاعات پرداخت | `UserData` |
| `updateAvatar(url)` | آپدیت آواتار | `UserData` |

### Type Definitions:

```typescript
interface UserData {
  id: string;
  phone: string;
  phoneVerified: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  nationalCode?: string;
  birthDate?: string;
  avatarUrl?: string;
  cardNumber?: string;
  shebaNumber?: string;
  accountOwner?: string;
  createdAt: string;
  stats: UserStats;
}

interface UserStats {
  totalOrders: number;
  totalEnrollments: number;
  totalComments: number;
}

interface EnrolledCourse {
  id: string;
  enrolledAt: string;
  progress: number;
  completedAt?: string;
  lastAccessAt?: string;
  isCompleted: boolean;
  course: {
    id: string;
    subject: string;
    img?: string;
    price: number;
    discountPercent?: number;
    time?: string;
    rating?: number;
    videosCount?: number;
    description?: string;
  };
}

interface Transaction {
  id: string;
  amount: number;
  type: string; // "payment", "refund", "withdrawal"
  status: string; // "pending", "success", "failed"
  gateway?: string;
  refNumber?: string;
  description?: string;
  createdAt: string;
  order?: {
    id: string;
    total: number;
    status: string;
  };
}

interface UserOrder {
  id: string;
  total: number;
  status: string; // "pending", "paid", "failed"
  paymentRef?: string;
  createdAt: string;
  itemCount: number;
  items: {
    courseId: string;
    title: string;
    price: number;
    img?: string;
    discountPercent?: number;
  }[];
}
```

---

## 🧩 کامپوننت‌های Profile

### 1️⃣ ProfileHeader
**فایل:** [components/profile/profileHeader.tsx](components/profile/profileHeader.tsx)

**توضیحات:** هدر صفحه پروفایل که نام کاربر، تاریخ و نوتیفیکیشن نمایش می‌دهد

**ویژگی‌ها:**
- ✅ دریافت اطلاعات کاربر از API
- ✅ نمایش نام کامل یا شماره تلفن
- ✅ Loading state
- ✅ تاریخ شمسی

**استفاده:**
```tsx
import ProfileHeader from "@/components/profile/profileHeader";

<ProfileHeader />
```

---

### 2️⃣ OrdersTable
**فایل:** [components/profile/ordersTable.tsx](components/profile/ordersTable.tsx)

**توضیحات:** جدول سفارشات کاربر

**ویژگی‌ها:**
- ✅ دریافت سفارشات از API
- ✅ Pagination support
- ✅ Badge های وضعیت (پرداخت شده، در انتظار، ناموفق)
- ✅ لینک به جزئیات سفارش
- ✅ فرمت تاریخ شمسی
- ✅ Loading و Empty state

**استفاده:**
```tsx
import OrdersTable from "@/components/profile/ordersTable";

<OrdersTable />
```

**وضعیت‌های سفارش:**
- `paid` - پرداخت شده (سبز)
- `pending` - در انتظار پرداخت (زرد)
- `failed` - ناموفق (قرمز)

---

### 3️⃣ EnrolledCourses
**فایل:** [components/profile/enrolledCourses.tsx](components/profile/enrolledCourses.tsx)

**توضیحات:** نمایش دوره‌هایی که کاربر در آنها ثبت‌نام کرده

**ویژگی‌ها:**
- ✅ دریافت دوره‌های ثبت‌نام شده از API
- ✅ نمایش Progress Bar
- ✅ نشان تکمیل دوره
- ✅ تاریخ ثبت‌نام
- ✅ لینک به صفحه دوره
- ✅ Grid layout responsive
- ✅ Loading و Empty state

**استفاده:**
```tsx
import EnrolledCourses from "@/components/profile/enrolledCourses";

<EnrolledCourses />
```

**داده‌های نمایش داده شده:**
- تصویر دوره
- عنوان دوره
- درصد پیشرفت (Progress Bar)
- تاریخ ثبت‌نام
- وضعیت تکمیل

---

### 4️⃣ TransactionsTable
**فایل:** [components/profile/transactionsTable.tsx](components/profile/transactionsTable.tsx)

**توضیحات:** جدول تراکنش‌های مالی کاربر

**ویژگی‌ها:**
- ✅ دریافت تراکنش‌ها از API
- ✅ Pagination support
- ✅ نمایش نوع تراکنش (پرداخت، بازگشت وجه، برداشت)
- ✅ Badge های وضعیت
- ✅ شماره پیگیری
- ✅ تاریخ و ساعت
- ✅ توضیحات تراکنش
- ✅ Loading و Empty state

**استفاده:**
```tsx
import TransactionsTable from "@/components/profile/transactionsTable";

<TransactionsTable />
```

**انواع تراکنش:**
- `payment` - پرداخت
- `refund` - بازگشت وجه
- `withdrawal` - برداشت

**وضعیت‌های تراکنش:**
- `success` - موفق (سبز)
- `pending` - در انتظار (زرد)
- `failed` - ناموفق (قرمز)

---

### 5️⃣ PersonalInfoForm
**فایل:** [components/profile/personalInfoForm.tsx](components/profile/personalInfoForm.tsx)

**توضیحات:** فرم ویرایش اطلاعات شخصی

**ویژگی‌ها:**
- ✅ دریافت اطلاعات قبلی کاربر از API
- ✅ Validation با Zod
- ✅ React Hook Form
- ✅ تقویم شمسی برای تاریخ تولد
- ✅ Error handling
- ✅ Toast notifications
- ✅ Loading state

**فیلدها:**
- نام (الزامی)
- نام خانوادگی (الزامی)
- شماره تماس (الزامی)
- ایمیل (الزامی)
- کد ملی (اختیاری)
- تاریخ تولد (اختیاری)

**استفاده:**
```tsx
import PersonalInfoForm from "@/components/profile/personalInfoForm";

const formRef = useRef();

<PersonalInfoForm ref={formRef} />

// Submit from parent:
formRef.current.submit();
```

---

### 6️⃣ ProfileMain
**فایل:** [components/profile/profileMain.tsx](components/profile/profileMain.tsx)

**توضیحات:** صفحه اصلی پروفایل

**شامل:**
- ✅ دوره‌های ثبت‌نام شده
- ✅ آخرین سفارشات

**استفاده:**
```tsx
import ProfileMain from "@/components/profile/profileMain";

<ProfileMain />
```

---

## 📄 صفحات Profile

### 📍 `/profile/acc`
**فایل:** [app/(routes)/profile/acc/page.tsx](app/(routes)/profile/acc/page.tsx)

**توضیحات:** صفحه اصلی پروفایل

**نمایش:**
- دوره‌های ثبت‌نام شده
- آخرین سفارشات

---

### 📍 `/profile/orders`
**فایل:** [app/(routes)/profile/orders/page.tsx](app/(routes)/profile/orders/page.tsx)

**توضیحات:** لیست تمام سفارشات

**نمایش:**
- جدول سفارشات

---

### 📍 `/profile/settings`
**فایل:** [app/(routes)/profile/settings/page.tsx](app/(routes)/profile/settings/page.tsx)

**توضیحات:** تنظیمات حساب کاربری

**شامل:**
- فرم ویرایش اطلاعات شخصی
- فرم اطلاعات پرداخت
- آپلود آواتار

---

## 🔧 نحوه استفاده

### 1. دریافت اطلاعات کاربر

```tsx
"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, UserData } from "@/lib/services/user-service";

function MyComponent() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return <div>Welcome {user.firstName}!</div>;
}
```

---

### 2. دریافت سفارشات با Pagination

```tsx
"use client";

import { useEffect, useState } from "react";
import { getUserOrders, UserOrder } from "@/lib/services/user-service";

function OrdersList() {
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const fetchOrders = async () => {
    try {
      const response = await getUserOrders(page, 10);
      setOrders(response.data.items);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>{order.id}</div>
      ))}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
```

---

### 3. آپدیت پیشرفت دوره

```tsx
import { updateEnrollmentProgress } from "@/lib/services/user-service";

async function handleProgressUpdate(enrollmentId: string, progress: number) {
  try {
    const response = await updateEnrollmentProgress(
      enrollmentId,
      progress,
      progress === 100 // completed
    );
    console.log("Updated:", response.data);
  } catch (error) {
    console.error(error);
  }
}
```

---

## 🎨 ویژگی‌های UI

### Loading States
همه کامپوننت‌ها دارای loading state هستند:
```tsx
if (loading) {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );
}
```

### Empty States
همه کامپوننت‌ها دارای empty state هستند:
```tsx
if (items.length === 0) {
  return (
    <div className="p-8 text-center text-gray-500">
      هیچ آیتمی یافت نشد
    </div>
  );
}
```

### Error Handling
از `react-hot-toast` برای نمایش خطاها استفاده می‌شود:
```tsx
import toast from "react-hot-toast";

try {
  // ...
} catch (error) {
  toast.error("خطا در انجام عملیات");
}
```

---

## 📊 خلاصه تغییرات

✅ **user-service.ts آپدیت شد** - سرویس‌های جدید اضافه شدند
✅ **ordersTable.tsx** - از API واقعی استفاده می‌کند
✅ **profileHeader.tsx** - اطلاعات واقعی کاربر نمایش می‌دهد
✅ **enrolledCourses.tsx** - کامپوننت جدید برای دوره‌های ثبت‌نام شده
✅ **transactionsTable.tsx** - کامپوننت جدید برای تراکنش‌ها
✅ **personalInfoForm.tsx** - داده‌های قبلی را از API می‌گیرد
✅ **profileMain.tsx** - شامل دوره‌های ثبت‌نام شده

---

## 🚀 بهبودهای آینده (اختیاری)

- [ ] اضافه کردن فیلتر به جدول تراکنش‌ها
- [ ] اضافه کردن search به سفارشات
- [ ] اضافه کردن sort به دوره‌های ثبت‌نام شده
- [ ] Infinite scroll برای لیست‌ها
- [ ] Export سفارشات به PDF
- [ ] نمودار پیشرفت کلی دوره‌ها

---

**تاریخ آپدیت:** 2025-11-06
**نسخه:** 1.0.0
