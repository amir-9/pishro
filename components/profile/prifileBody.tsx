import ProfileAside from "./profileAside";
import ProfileMain from "./profileMain";


const ProfileBody = () => {
  return (
    <div className="container-xl w-full flex gap-5 mt-4">
      <ProfileAside />
      <ProfileMain />
    </div>
  );
};

export default ProfileBody;
