import { CiCalendarDate } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";

const user = {
  name: "نام کاربر",
  phone: "09123456789",
};

const ProfileHeader = () => {
  const today = new Date().toLocaleDateString("fa-IR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  return (
    <div className="container-xl flex justify-between items-center mb-4">
      <p className="font-semibold text-base text-[#333]">
        صبح بخیر {user.name}
      </p>
      <div className="flex items-center gap-4">
        {/* date */}
        <div className="flex gap-4 items-center bg-white rounded-sm px-1 h-[26px]">
          <CiCalendarDate className="size-5 text-[#130F26]" />
          <span className="text-[#333}">{today}</span>
        </div>
        {/* notification */}
        <button className="flex justify-center items-center bg-white rounded-sm px-1 h-[26px] relative">
          <IoIosNotificationsOutline className="size-5 text-[#130F26]" />
          <div className="absolute top-1.5 left-1.5 size-1.5 bg-[#D52A16] rounded full z-10"></div>
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
