import { Navigation } from "@/components/Navigation";
import { BugSubmissionForm } from "@/components/BugSubmissionForm";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

interface BugSubmissionData {
  title: string;
  description: string;
  stepsToReproduce: string;
  expectedBehavior: string;
  actualBehavior: string;
  priority: "low" | "medium" | "high" | "critical";
  githubRepo?: string;
  labels: string[];
  attachments: File[];
}

const SubmitBugPage = () => {
  const handleSubmit = async (bugData: BugSubmissionData) => {
    // Simulate API submission
    console.log("Submitting bug:", bugData);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would redirect to the bug detail page
    alert("Bug report submitted successfully! You earned 50 points.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={{ name: "Abebe Goben", points: 1420, rank: 47 }} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <NavLink to="/bugs">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </NavLink>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Submit Bug Report</h1>
              <p className="text-muted-foreground">Help improve projects by reporting bugs</p>
            </div>
          </div>

          {/* Tips Card */}
          <Card className="bg-accent/30 border-accent-blue/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-accent-blue mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Tips for Great Bug Reports</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Be specific and descriptive in your title</li>
                    <li>• Include clear steps to reproduce the issue</li>
                    <li>• Attach screenshots or logs when helpful</li>
                    <li>• Use appropriate labels to categorize the bug</li>
                    <li>• Link to the GitHub repository if available</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bug Submission Form */}
          <BugSubmissionForm 
            onSubmit={handleSubmit}
            onCancel={() => window.history.back()}
          />
        </div>
      </div>
    </div>
  );
};

export default SubmitBugPage;