/**
 * Debug endpoint to check news coverImage
 * GET /api/admin/news/debug/[slug]
 */

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  forbiddenResponse,
} from "@/lib/api-response";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Auth check
    const session = await auth();
    if (!session?.user) {
      return unauthorizedResponse("لطفا وارد شوید");
    }
    if (session.user.role !== "ADMIN") {
      return forbiddenResponse("دسترسی محدود به ادمین");
    }

    const { slug } = params;

    // Fetch news article
    const article = await prisma.newsArticle.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        coverImage: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!article) {
      return errorResponse("خبر یافت نشد");
    }

    // Debug info
    const debugInfo = {
      article,
      hasCoverImage: !!article.coverImage,
      coverImageType: typeof article.coverImage,
      coverImageLength: article.coverImage?.length || 0,
      coverImageValue: article.coverImage,
      isNull: article.coverImage === null,
      isEmpty: article.coverImage === "",
    };

    return successResponse(debugInfo);
  } catch (error) {
    console.error("Error in debug endpoint:", error);
    return errorResponse("خطا در دریافت اطلاعات");
  }
}
