interface SectionCardProps {
  title: string;
  description: string;
}

const SectionCard = ({ title, description }: SectionCardProps) => {
  return (
    <div className="w-full text-right bg-[#fafafa] p-5">
      <div className="flex items-center">
        <span className="block size-2 rounded-full bg-black mb-3 ml-2"></span>
        <h2 className="text-base font-bold mb-2">{title}</h2>
      </div>
      {description.split("\n").map((line, index) => (
        <p key={index} className="text-sm font-medium leading-7">
          {line}
          <br />
        </p>
      ))}
    </div>
  );
};

export default SectionCard;
