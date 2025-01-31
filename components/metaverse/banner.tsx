import Image from "next/image";

const MetaverseBanner = () => {
  return (
    <div>
      <div className="relative mt-[72px] h-[340px]">
        <div
          className="w-full h-[230px]"
          style={{
            background:
              "linear-gradient(90deg, #FF6DF0 0%, #FFA6F6 14.5%, #EB72F2 46%, #BF7DF8 73%, #7F8CFF 93.5%),linear-gradient(87.93deg, rgba(102, 44, 195, 0) 0%, rgba(102, 44, 195, 0.1) 11.98%, rgba(102, 44, 195, 0.15) 27.65%, rgba(102, 44, 195, 0.2) 61.45%)",
          }}
        ></div>
        <div className="relative w-full max-w-[980px] h-[264px] mx-auto -mt-[156px] rounded-[15px] overflow-hidden">
          <Image
            alt="banner"
            src={"/images/metaverse/banner.png"}
            width={980}
            height={264}
            className="-mt-[120px]"
          />
        </div>
      </div>
      <h3 className="font-bold text-[32px] text-[#222222] my-10 text-center">
        یادگیری متاورس را چگونه آغاز کنیم؟
      </h3>
    </div>
  );
};

export default MetaverseBanner;
