import { Navigation } from "@/components/Navigation";
import { UserProfile } from "@/components/UserProfile";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation user={{ name: "Abebe Goben", points: 1420, rank: 47 }} />
      <UserProfile />
    </div>
  );
};

export default ProfilePage;