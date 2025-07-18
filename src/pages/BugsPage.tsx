import { BugList } from "@/components/BugList";
import { Navigation } from "@/components/Navigation";

const BugsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation user={{ name: "Abebe Goben", points: 1420, rank: 47 }} />
      <div className="container mx-auto px-4 py-8">
        <BugList />
      </div>
    </div>
  );
};

export default BugsPage;