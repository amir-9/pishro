import Image from "next/image";

const Logo = () => {
  return (
    <div className="h-10 w-[100px] flex items-center">
      <Image src={"/icons/Logo.png"} alt="logo" width={90} height={32} />
    </div>
  );
};

export default Logo;
