import Image from "next/image";

const StepsDecorations = () => {
  return (
    <>
      {/* line */}
      <div className="w-[75%] h-full absolute inset-0 right-0 -top-16 -z-40">
        <div className="relative size-full">
          <Image
            fill
            src={"/icons/steps-line.svg"}
            alt="خط"
            className="object-fill object-center scale-x-[-1] pl-16 py-20"
          />
        </div>
      </div>
      {/* circle */}
      <div className="size-[456px] absolute top-10 left-0 -z-50 bg-[#f1f3f5] rounded-full opacity-70" />
      {/* lamp */}
      <div className="w-[260px] aspect-[265/228] absolute left-20 top-[270px]">
        <div className="relative size-full z-10">
          <Image
            fill
            src={"/icons/lamp.svg"}
            alt="چراغ"
            className="object-contain object-center"
          />
        </div>
      </div>
    </>
  );
};

export default StepsDecorations;
