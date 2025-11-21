// @/app/api/admin/videos/upload-proxy/route.ts
import { auth } from "@/auth";
import { NextRequest } from "next/server";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  validationError,
  ErrorCodes,
} from "@/lib/api-response";
import {
  generateVideoId,
  generateUniqueFileName,
  getVideoStoragePath,
  uploadFileToStorage,
} from "@/lib/services/object-storage-service";

/**
 * POST /api/admin/videos/upload-proxy
 * آپلود ویدیو از طریق proxy (برای رفع مشکل CORS)
 * فایل را از مرورگر دریافت کرده و از سمت سرور به S3 آپلود می‌کند
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return unauthorizedResponse("دسترسی غیرمجاز - فقط ادمین");
    }

    // دریافت فایل از FormData
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string | null;

    // Validation
    if (!file) {
      return validationError({
        file: "فایل الزامی است",
      });
    }

    if (!title) {
      return validationError({
        title: "عنوان ویدیو الزامی است",
      });
    }

    // بررسی نوع فایل
    const allowedTypes = [
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
      "video/webm",
    ];
    if (!allowedTypes.includes(file.type)) {
      return validationError({
        file: "فرمت فایل پشتیبانی نمی‌شود. فقط MP4, MOV, AVI, MKV و WebM مجاز است",
      });
    }

    // بررسی حجم فایل (حداکثر 5GB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5GB
    if (file.size > MAX_FILE_SIZE) {
      return validationError({
        file: "حجم فایل نباید بیشتر از 5 گیگابایت باشد",
      });
    }

    // تولید videoId و نام فایل یکتا
    const videoId = generateVideoId();
    const fileExtension = file.name.split(".").pop() || "mp4";
    const uniqueFileName = generateUniqueFileName(videoId, file.name);

    // محاسبه مسیر فایل در storage
    const storagePath = getVideoStoragePath(videoId, uniqueFileName);

    // تبدیل فایل به Buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // آپلود فایل به S3 از سمت سرور
    await uploadFileToStorage(storagePath, fileBuffer, file.type);

    return successResponse(
      {
        videoId,
        storagePath,
        uniqueFileName,
        fileSize: file.size,
        fileFormat: fileExtension,
        metadata: {
          title,
          description: description || undefined,
        },
      },
      "فایل با موفقیت آپلود شد"
    );
  } catch (error) {
    console.error("[POST /api/admin/videos/upload-proxy] error:", error);
    return errorResponse(
      "خطایی در آپلود فایل رخ داد",
      ErrorCodes.INTERNAL_ERROR
    );
  }
}
