# API Response Structure - استاندارد پاسخ‌های API

این مستندات ساختار استاندارد پاسخ‌های API در پروژه را توضیح می‌دهد. تمام API route‌های پروژه از این استاندارد پیروی می‌کنند.

## 📋 فهرست

- [ساختار پاسخ‌ها](#ساختار-پاسخها)
- [HTTP Status Codes](#http-status-codes)
- [Helper Functions](#helper-functions)
- [Error Codes](#error-codes)
- [مثال‌های واقعی](#مثالهای-واقعی)

---

## 📦 ساختار پاسخ‌ها

این پروژه از **JSend Specification** برای ساختار پاسخ‌های API استفاده می‌کند.

### ✅ Success Response

برای عملیات موفق (2xx status codes):

```typescript
{
  "status": "success",
  "data": { /* داده‌های پاسخ */ },
  "message": "پیام اختیاری" // optional
}
```

**مثال:**
```json
{
  "status": "success",
  "data": {
    "id": "123",
    "firstName": "علی",
    "lastName": "احمدی"
  },
  "message": "اطلاعات با موفقیت بروزرسانی شد"
}
```

---

### ❌ Fail Response

برای خطاهای سمت کاربر (4xx status codes) - validation errors, missing fields, etc:

```typescript
{
  "status": "fail",
  "data": {
    "field1": "error message",
    "field2": "error message"
  },
  "message": "پیام کلی خطا" // optional
}
```

**مثال:**
```json
{
  "status": "fail",
  "data": {
    "phone": "شماره تلفن الزامی است",
    "password": "رمز عبور باید حداقل 8 کاراکتر باشد"
  },
  "message": "اطلاعات ناقص است"
}
```

---

### 🔥 Error Response

برای خطاهای سرور (5xx status codes):

```typescript
{
  "status": "error",
  "message": "پیام خطا",
  "code": "ERROR_CODE", // optional
  "details": { /* جزئیات بیشتر */ } // optional
}
```

**مثال:**
```json
{
  "status": "error",
  "message": "خطایی در پایگاه داده رخ داد",
  "code": "DATABASE_ERROR"
}
```

---

### 📄 Paginated Response

برای لیست‌هایی که pagination دارند:

```typescript
{
  "status": "success",
  "data": {
    "items": [ /* آیتم‌ها */ ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

**مثال:**
```json
{
  "status": "success",
  "data": {
    "items": [
      { "id": "1", "subject": "دوره کریپتو" },
      { "id": "2", "subject": "دوره بورس" }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

## 🔢 HTTP Status Codes

| Code | معنی | استفاده |
|------|------|---------|
| 200 | OK | درخواست موفق |
| 201 | Created | ایجاد موفق منبع جدید |
| 204 | No Content | موفق اما بدون محتوا |
| 400 | Bad Request | خطای کلی سمت کاربر |
| 401 | Unauthorized | نیاز به احراز هویت |
| 403 | Forbidden | دسترسی ممنوع |
| 404 | Not Found | منبع یافت نشد |
| 409 | Conflict | تداخل (مثلاً شماره تکراری) |
| 422 | Unprocessable Entity | خطاهای اعتبارسنجی |
| 500 | Internal Server Error | خطای سرور |

---

## 🛠️ Helper Functions

تمام این helper function‌ها در `lib/api-response.ts` تعریف شده‌اند:

### 1️⃣ `successResponse(data, message?, statusCode?)`

برای پاسخ‌های موفق:

```typescript
import { successResponse } from "@/lib/api-response";

return successResponse(
  { userId: "123", name: "علی" },
  "کاربر با موفقیت ایجاد شد"
);
```

---

### 2️⃣ `failResponse(data, message?, statusCode?)`

برای خطاهای validation:

```typescript
import { failResponse } from "@/lib/api-response";

return failResponse(
  { phone: "شماره تلفن نامعتبر است" },
  "اطلاعات ناقص است"
);
```

---

### 3️⃣ `errorResponse(message, code?, details?, statusCode?)`

برای خطاهای سرور:

```typescript
import { errorResponse, ErrorCodes } from "@/lib/api-response";

return errorResponse(
  "خطایی در پایگاه داده رخ داد",
  ErrorCodes.DATABASE_ERROR
);
```

---

### 4️⃣ `validationError(fields, message?)`

shorthand برای validation errors (422):

```typescript
import { validationError } from "@/lib/api-response";

return validationError(
  {
    email: "ایمیل معتبر نیست",
    password: "رمز عبور باید حداقل 8 کاراکتر باشد"
  },
  "اطلاعات وارد شده نامعتبر است"
);
```

---

### 5️⃣ `unauthorizedResponse(message?)`

shorthand برای خطاهای احراز هویت (401):

```typescript
import { unauthorizedResponse } from "@/lib/api-response";

return unauthorizedResponse("لطفاً وارد حساب کاربری خود شوید");
```

---

### 6️⃣ `notFoundResponse(resource, message?)`

shorthand برای منابع یافت نشده (404):

```typescript
import { notFoundResponse } from "@/lib/api-response";

return notFoundResponse("User", "کاربر یافت نشد");
```

---

### 7️⃣ `forbiddenResponse(message?)`

shorthand برای دسترسی ممنوع (403):

```typescript
import { forbiddenResponse } from "@/lib/api-response";

return forbiddenResponse("شما مجاز به انجام این عملیات نیستید");
```

---

### 8️⃣ `conflictResponse(resource, message?)`

shorthand برای تداخل منابع (409):

```typescript
import { conflictResponse } from "@/lib/api-response";

return conflictResponse("User", "این شماره قبلاً ثبت شده است");
```

---

### 9️⃣ `paginatedResponse(items, page, limit, total, message?)`

برای پاسخ‌های صفحه‌بندی شده:

```typescript
import { paginatedResponse } from "@/lib/api-response";

return paginatedResponse(
  courses,  // آرایه آیتم‌ها
  1,        // شماره صفحه
  10,       // تعداد در هر صفحه
  100       // تعداد کل
);
```

---

### 🔟 `createdResponse(data, message?)`

برای ایجاد موفق منبع (201):

```typescript
import { createdResponse } from "@/lib/api-response";

return createdResponse(
  newUser,
  "کاربر با موفقیت ایجاد شد"
);
```

---

### 1️⃣1️⃣ `noContentResponse()`

برای پاسخ بدون محتوا (204):

```typescript
import { noContentResponse } from "@/lib/api-response";

return noContentResponse();
```

---

## 🏷️ Error Codes

کدهای خطای استاندارد در `ErrorCodes`:

### Authentication & Authorization
- `UNAUTHORIZED` - عدم احراز هویت
- `TOKEN_EXPIRED` - توکن منقضی شده
- `TOKEN_INVALID` - توکن نامعتبر
- `FORBIDDEN` - دسترسی ممنوع

### Validation
- `VALIDATION_ERROR` - خطای اعتبارسنجی
- `INVALID_INPUT` - ورودی نامعتبر
- `MISSING_FIELD` - فیلد الزامی وجود ندارد

### Resources
- `NOT_FOUND` - منبع یافت نشد
- `ALREADY_EXISTS` - منبع قبلاً وجود دارد
- `CONFLICT` - تداخل

### Business Logic
- `INSUFFICIENT_BALANCE` - موجودی ناکافی
- `ALREADY_ENROLLED` - قبلاً ثبت‌نام شده
- `ORDER_ALREADY_PAID` - سفارش قبلاً پرداخت شده
- `PAYMENT_FAILED` - پرداخت ناموفق

### System
- `INTERNAL_ERROR` - خطای داخلی
- `DATABASE_ERROR` - خطای پایگاه داده
- `EXTERNAL_SERVICE_ERROR` - خطای سرویس خارجی
- `SMS_SEND_FAILED` - ارسال پیامک ناموفق

### OTP
- `OTP_EXPIRED` - کد تایید منقضی شده
- `OTP_INVALID` - کد تایید نامعتبر
- `OTP_SEND_FAILED` - ارسال کد تایید ناموفق

**استفاده:**
```typescript
import { ErrorCodes } from "@/lib/api-response";

return errorResponse(
  "خطایی رخ داد",
  ErrorCodes.DATABASE_ERROR
);
```

---

## 📝 مثال‌های واقعی از روت‌ها

### مثال 1: GET /api/user/me

**Success:**
```json
{
  "status": "success",
  "data": {
    "id": "abc123",
    "phone": "09123456789",
    "firstName": "علی",
    "lastName": "احمدی",
    "stats": {
      "totalOrders": 5,
      "totalEnrollments": 3,
      "totalComments": 12
    }
  }
}
```

**Unauthorized:**
```json
{
  "status": "fail",
  "data": {
    "auth": "لطفاً وارد حساب کاربری خود شوید"
  },
  "message": "لطفاً وارد حساب کاربری خود شوید"
}
```

---

### مثال 2: GET /api/user/enrolled-courses?page=1&limit=10

**Success:**
```json
{
  "status": "success",
  "data": {
    "items": [
      {
        "id": "enrollment-1",
        "progress": 45,
        "enrolledAt": "2024-01-01T00:00:00.000Z",
        "course": {
          "id": "course-1",
          "subject": "دوره جامع کریپتو",
          "price": 1500000
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 3,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}
```

---

### مثال 3: PATCH /api/user/enrollment

**Request:**
```json
{
  "enrollmentId": "abc123",
  "progress": 75
}
```

**Success:**
```json
{
  "status": "success",
  "data": {
    "id": "abc123",
    "progress": 75,
    "lastAccessAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "پیشرفت دوره با موفقیت بروزرسانی شد"
}
```

**Validation Error:**
```json
{
  "status": "fail",
  "data": {
    "enrollmentId": "شناسه ثبت‌نام الزامی است"
  },
  "message": "اطلاعات ناقص است"
}
```

**Forbidden:**
```json
{
  "status": "fail",
  "data": {
    "permission": "شما مجاز به ویرایش این ثبت‌نام نیستید"
  },
  "message": "شما مجاز به ویرایش این ثبت‌نام نیستید"
}
```

---

### مثال 4: POST /api/auth/signup

**Request:**
```json
{
  "phone": "09123456789",
  "password": "mypassword123"
}
```

**Success:**
```json
{
  "status": "success",
  "data": {
    "sent": true
  },
  "message": "کد تایید ارسال شد"
}
```

**Conflict (User Exists):**
```json
{
  "status": "fail",
  "data": {
    "user": "این شماره قبلاً ثبت شده است"
  },
  "message": "این شماره قبلاً ثبت شده است"
}
```

**Validation Error:**
```json
{
  "status": "fail",
  "data": {
    "phone": "شماره تلفن الزامی است",
    "password": "رمز عبور الزامی است"
  },
  "message": "اطلاعات ناقص است"
}
```

---

### مثال 5: POST /api/checkout

**Request:**
```json
{
  "userId": "user123",
  "items": [
    { "courseId": "course1" },
    { "courseId": "course2" }
  ]
}
```

**Success:**
```json
{
  "status": "success",
  "data": {
    "orderId": "order123",
    "payUrl": "https://payment-gateway.com/...",
    "total": 2500000
  },
  "message": "سفارش با موفقیت ایجاد شد"
}
```

**Validation Error:**
```json
{
  "status": "fail",
  "data": {
    "items": "آیتم‌های سفارش الزامی است"
  },
  "message": "اطلاعات ارسالی ناقص است"
}
```

---

## 🎯 Best Practices

### 1. همیشه از helper function‌ها استفاده کنید
```typescript
// ❌ Bad
return NextResponse.json({ error: "something" }, { status: 400 });

// ✅ Good
return validationError({ field: "something" });
```

### 2. پیام‌های خطا را به فارسی بنویسید
```typescript
// ✅ Good
return validationError(
  { phone: "شماره تلفن نامعتبر است" },
  "اطلاعات ناقص است"
);
```

### 3. همیشه ErrorCode مناسب را استفاده کنید
```typescript
// ✅ Good
return errorResponse(
  "خطایی رخ داد",
  ErrorCodes.DATABASE_ERROR
);
```

### 4. در pagination از helper استفاده کنید
```typescript
// ✅ Good
return paginatedResponse(items, page, limit, total);
```

### 5. برای ایجاد منابع از createdResponse استفاده کنید
```typescript
// ✅ Good - status 201
return createdResponse(newUser, "کاربر ایجاد شد");

// ❌ Bad - status 200
return successResponse(newUser);
```

---

## 📊 خلاصه تغییرات

تمام روت‌های زیر به استاندارد جدید تبدیل شدند:

✅ `/api/user/me` - GET
✅ `/api/user/enrolled-courses` - GET
✅ `/api/user/transactions` - GET
✅ `/api/user/orders` - GET
✅ `/api/user/enrollment` - PATCH
✅ `/api/user/personal` - PUT
✅ `/api/user/pay` - PUT
✅ `/api/courses` - GET
✅ `/api/checkout` - POST
✅ `/api/orders/[id]` - GET
✅ `/api/auth/signup` - POST
✅ `/api/otp/send` - POST
✅ `/api/otp/verify` - POST
✅ `/api/newsletter/subscribe` - POST

---

**تاریخ آپدیت:** 2025-11-06
**نسخه:** 2.0.0
