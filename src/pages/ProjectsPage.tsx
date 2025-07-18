import { Navigation } from "@/components/Navigation";
import { ProjectManagement } from "@/components/ProjectManagement";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation user={{ name: "Abebe Goben", points: 1420, rank: 47 }} />
      <ProjectManagement />
    </div>
  );
};

export default ProjectsPage;