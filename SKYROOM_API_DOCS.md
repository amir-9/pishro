# 📚 SkyRoom Classes Admin API Documentation

## Base URL
```
/api/admin/skyroom-classes
```

## Authentication
همه endpointها نیاز به احراز هویت با role `ADMIN` دارند.

---

## 1️⃣ دریافت تمام کلاس‌ها

### Request
```http
GET /api/admin/skyroom-classes
Authorization: Bearer <admin-token>
```

### Response (200 OK)
```json
{
  "success": true,
  "message": "کلاس‌های اسکای‌روم با موفقیت دریافت شدند",
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "کلاس معاملات پیشرفته",
      "description": "آموزش جامع معاملات در بازار ارز دیجیتال",
      "instructor": "استاد احمدی",
      "startDate": "2025-11-20T10:00:00.000Z",
      "endDate": "2025-11-20T12:00:00.000Z",
      "meetingLink": "https://skyroom.com/room/123456",
      "thumbnail": "/images/skyroom/class-1.jpg",
      "duration": "2 ساعت",
      "capacity": 50,
      "level": "پیشرفته",
      "order": 1,
      "published": true,
      "createdAt": "2025-11-16T08:00:00.000Z",
      "updatedAt": "2025-11-16T08:00:00.000Z"
    }
  ]
}
```

### Error Response (401 Unauthorized)
```json
{
  "success": false,
  "message": "دسترسی غیرمجاز",
  "code": "UNAUTHORIZED"
}
```

---

## 2️⃣ ایجاد کلاس جدید

### Request
```http
POST /api/admin/skyroom-classes
Content-Type: application/json
Authorization: Bearer <admin-token>

{
  "title": "کلاس معاملات مبتدی",
  "description": "شروع آموزش از صفر",
  "instructor": "استاد رضایی",
  "startDate": "2025-11-25T14:00:00.000Z",
  "endDate": "2025-11-25T16:00:00.000Z",
  "meetingLink": "https://skyroom.com/room/789012",
  "thumbnail": "/images/skyroom/class-2.jpg",
  "duration": "2 ساعت",
  "capacity": 100,
  "level": "مبتدی",
  "order": 2,
  "published": true
}
```

### Response (200 OK)
```json
{
  "success": true,
  "message": "کلاس اسکای‌روم با موفقیت ایجاد شد",
  "data": {
    "id": "507f1f77bcf86cd799439022",
    "title": "کلاس معاملات مبتدی",
    "description": "شروع آموزش از صفر",
    "instructor": "استاد رضایی",
    "startDate": "2025-11-25T14:00:00.000Z",
    "endDate": "2025-11-25T16:00:00.000Z",
    "meetingLink": "https://skyroom.com/room/789012",
    "thumbnail": "/images/skyroom/class-2.jpg",
    "duration": "2 ساعت",
    "capacity": 100,
    "level": "مبتدی",
    "order": 2,
    "published": true,
    "createdAt": "2025-11-16T09:00:00.000Z",
    "updatedAt": "2025-11-16T09:00:00.000Z"
  }
}
```

### Error Response (400 Bad Request)
```json
{
  "success": false,
  "message": "عنوان و لینک کلاس الزامی است",
  "code": "VALIDATION_ERROR"
}
```

---

## 3️⃣ دریافت یک کلاس

### Request
```http
GET /api/admin/skyroom-classes/507f1f77bcf86cd799439011
Authorization: Bearer <admin-token>
```

### Response (200 OK)
```json
{
  "success": true,
  "message": "کلاس اسکای‌روم با موفقیت دریافت شد",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "title": "کلاس معاملات پیشرفته",
    "description": "آموزش جامع معاملات در بازار ارز دیجیتال",
    "instructor": "استاد احمدی",
    "startDate": "2025-11-20T10:00:00.000Z",
    "endDate": "2025-11-20T12:00:00.000Z",
    "meetingLink": "https://skyroom.com/room/123456",
    "thumbnail": "/images/skyroom/class-1.jpg",
    "duration": "2 ساعت",
    "capacity": 50,
    "level": "پیشرفته",
    "order": 1,
    "published": true,
    "createdAt": "2025-11-16T08:00:00.000Z",
    "updatedAt": "2025-11-16T08:00:00.000Z"
  }
}
```

### Error Response (404 Not Found)
```json
{
  "success": false,
  "message": "کلاس مورد نظر یافت نشد",
  "code": "NOT_FOUND"
}
```

---

## 4️⃣ به‌روزرسانی کلاس

### Request
```http
PATCH /api/admin/skyroom-classes/507f1f77bcf86cd799439011
Content-Type: application/json
Authorization: Bearer <admin-token>

{
  "title": "کلاس معاملات پیشرفته - ویرایش شده",
  "capacity": 75,
  "published": false
}
```

### Response (200 OK)
```json
{
  "success": true,
  "message": "کلاس اسکای‌روم با موفقیت به‌روزرسانی شد",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "title": "کلاس معاملات پیشرفته - ویرایش شده",
    "description": "آموزش جامع معاملات در بازار ارز دیجیتال",
    "instructor": "استاد احمدی",
    "startDate": "2025-11-20T10:00:00.000Z",
    "endDate": "2025-11-20T12:00:00.000Z",
    "meetingLink": "https://skyroom.com/room/123456",
    "thumbnail": "/images/skyroom/class-1.jpg",
    "duration": "2 ساعت",
    "capacity": 75,
    "level": "پیشرفته",
    "order": 1,
    "published": false,
    "createdAt": "2025-11-16T08:00:00.000Z",
    "updatedAt": "2025-11-16T10:00:00.000Z"
  }
}
```

---

## 5️⃣ حذف کلاس

### Request
```http
DELETE /api/admin/skyroom-classes/507f1f77bcf86cd799439011
Authorization: Bearer <admin-token>
```

### Response (200 OK)
```json
{
  "success": true,
  "message": "کلاس اسکای‌روم با موفقیت حذف شد",
  "data": null
}
```

### Error Response (404 Not Found)
```json
{
  "success": false,
  "message": "کلاس مورد نظر یافت نشد",
  "code": "NOT_FOUND"
}
```

---

## 🔒 Security Notes

1. تمام endpointها نیاز به authentication دارند
2. فقط کاربران با role `ADMIN` دسترسی دارند
3. Validation داده‌های ورودی الزامی است
4. از HTTPS در production استفاده شود

## ⚠️ Validation Rules

### POST/PATCH:
- `title`: الزامی (حداقل 3 کاراکتر)
- `meetingLink`: الزامی و باید URL معتبر باشد
- `capacity`: اگر وجود داشت باید عدد مثبت باشد (> 0)
- `startDate` و `endDate`: اگر هر دو وجود داشتند، endDate باید بعد از startDate باشد
- `order`: باید عدد باشد

## 📌 Error Codes

- `UNAUTHORIZED`: کاربر احراز هویت نشده یا Admin نیست
- `VALIDATION_ERROR`: داده‌های ورودی نامعتبر
- `NOT_FOUND`: رکورد مورد نظر یافت نشد
- `DATABASE_ERROR`: خطای دیتابیس

---

## 🧪 Test با cURL

### دریافت تمام کلاس‌ها
```bash
curl -X GET http://localhost:3000/api/admin/skyroom-classes \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### ایجاد کلاس جدید
```bash
curl -X POST http://localhost:3000/api/admin/skyroom-classes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "title": "کلاس تست",
    "meetingLink": "https://skyroom.com/test",
    "instructor": "مدرس تست",
    "duration": "1 ساعت",
    "published": true
  }'
```

### به‌روزرسانی کلاس
```bash
curl -X PATCH http://localhost:3000/api/admin/skyroom-classes/CLASS_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "title": "کلاس تست - ویرایش شده",
    "capacity": 50
  }'
```

### حذف کلاس
```bash
curl -X DELETE http://localhost:3000/api/admin/skyroom-classes/CLASS_ID \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```
