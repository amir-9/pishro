import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  data: {
    title: string;
    description: string;
    image: string;
    date: string;
    type: string;
    category: string;
    link: string;
  };
}

const NewsCard = ({ data }: NewsCardProps) => {
  return (
    <div className="min-h-[200px] flex justify-between border-[#e1e1e1] border rounded-[5px] overflow-hidden hover:shadow-md transition-all bg-white">
      {/* تصویر */}
      <div className="relative flex-shrink-0 w-[200px] xl:w-[230px] min-h-[200px]">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover"
        />
      </div>

      {/* محتوا */}
      <div className="px-4 xl:px-6 py-5 flex flex-col justify-between flex-1">
        <div>
          <h5 className="font-bold text-sm text-[#131b22] mb-3 line-clamp-2 leading-7">
            {data.title}
          </h5>
          <p className="font-medium text-xs text-[#495157] line-clamp-3 leading-6 mb-2">
            {data.description}
          </p>
        </div>

        {/* دکمه ادامه مطلب */}
        <Link
          href={data.link}
          className="text-[13px] font-medium text-myPrimary hover:underline transition-colors self-start"
        >
          ادامه مطلب →
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
