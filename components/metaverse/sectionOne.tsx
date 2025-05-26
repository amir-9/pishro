import Image from "next/image";
import {
  metaverseFirstSectionData,
  metaverseSecondSectionData,
} from "@/public/data";
import SectionCard from "@/components/metaverse/sectionCard";

const SectionOne = () => {
  return (
    <div className="container mt-32">
      <div className="flex gap-[60px] justify-between mb-[90px]">
        <div className="flex-1 flex flex-col gap-10">
          {metaverseFirstSectionData.map((item, index) => (
            <SectionCard
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
        <div className="flex-1 flex gap-[72px]">
          <div
            className="w-full h-[460px] rounded-t-full"
            style={{
              background:
                "linear-gradient(167.09deg, #7F8CFF 5.16%, #B0DBFF 47.61%, #BFF4FF 68.17%)",
            }}
          >
            <div className="relative w-full h-[460px] scale-150 -mt-[116px]">
              <Image
                src="/images/metaverse/boy.png"
                alt="boy"
                width={342}
                height={342}
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
              />
            </div>
          </div>
          <div
            className="w-full h-[460px] rounded-t-full"
            style={{
              background: "linear-gradient(180deg, #FF6DF0 0%, #FFC8FD 44.5%)",
            }}
          >
            <div className="relative w-full h-[460px] scale-125 -mt-[59px] mr-[27px]">
              <Image
                src="/images/metaverse/girl.png"
                alt="girl"
                width={342}
                height={342}
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[60px] justify-between mb-[90px]">
        <div className="flex-1 flex ">
          <div
            className="relative bg-no-repeat bg-center w-[398px] h-[508px] -mt-[50px]"
            style={{
              backgroundImage: "url('/images/metaverse/women-with-bg.png')",
            }}
          ></div>
        </div>
        <div className="flex-1 flex flex-col gap-10">
          {metaverseSecondSectionData.map((item, index) => (
            <SectionCard
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
