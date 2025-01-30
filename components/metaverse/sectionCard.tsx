interface SectionCardProps {
  title: string;
  description: string;
}

const SectionCard = ({ title, description }: SectionCardProps) => {
  return (
    <div className="w-full text-right bg-[#fafafa] p-5">
      <div className="flex items-center">
        <span className="block size-2 rounded-full bg-black mb-3 ml-2"></span>
        <h2 className="text-sm font-bold mb-2">{title}</h2>
      </div>
      <p className="text-xs font-medium leading-7">{description}</p>
    </div>
  );
};

export default SectionCard;
