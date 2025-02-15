import ProfileBody from "./prifileBody";
import ProfileHeader from "./profileHeader";

const ProfilePageContent = () => {
  return (
    <div className="w-full bg-[#F5F8FA] py-10">
      {/* header */}
      <ProfileHeader />
      {/* body */}
      <ProfileBody />
    </div>
  );
};

export default ProfilePageContent;
