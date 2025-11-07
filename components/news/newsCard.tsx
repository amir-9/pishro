import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  data: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string | null;
    author: string | null;
    category: string;
    tags: string[];
    published: boolean;
    publishedAt: Date | null;
    views: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

const NewsCard = ({ data }: NewsCardProps) => {
  return (
    <div className="min-h-[200px] flex justify-between border border-[#e1e1e1] rounded-[5px] overflow-hidden hover:shadow-md transition-all bg-white">
      {/* تصویر */}
      <div className="relative flex-shrink-0 w-[200px] xl:w-[230px] min-h-[200px]">
        <Image
          src={data.coverImage ?? "/images/default-news.jpg"}
          alt={data.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 230px"
          priority={false}
        />
      </div>

      {/* محتوا */}
      <div className="px-4 xl:px-6 py-5 flex flex-col justify-between flex-1">
        <div>
          <h5 className="font-bold text-sm text-[#131b22] mb-3 line-clamp-2 leading-7">
            {data.title}
          </h5>
          <p className="font-medium text-xs text-[#495157] line-clamp-3 leading-6 mb-3">
            {data.excerpt}
          </p>

          {data.author && (
            <p className="text-[11px] text-gray-500 mb-2">
              نویسنده: {data.author}
            </p>
          )}
        </div>

        {/* دکمه ادامه مطلب */}
        <Link
          href={`/news/${data.slug}`}
          className="text-[13px] font-medium text-myPrimary hover:underline transition-colors self-start"
        >
          ادامه مطلب →
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
