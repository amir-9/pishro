import { DescriptionItem } from "@/types/data";
import { CheckCircle } from "lucide-react";

interface SectionCardProps {
  title: string;
  description: DescriptionItem[];
}

const SectionCard = ({ title, description }: SectionCardProps) => {
  return (
    <div className="w-full text-right bg-[#fafafa] p-5">
      <div className="flex items-center">
        <div className="block size-2 min-w-2 min-h-2 rounded-full bg-black mb-3 ml-2"></div>
        <h2 className="text-lg font-bold mb-4">{title}</h2>
      </div>
      {description.map((item, index) => (
        <div key={index} className="flex items-center gap-2 mb-3">
          {item.check && (
            <CheckCircle className="text-green-600 w-[18px] h-[18px]" />
          )}
          <p className="text-sm font-medium leading-7">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default SectionCard;
