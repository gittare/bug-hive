import { Navigation } from "@/components/Navigation";
import { AIAssistant } from "@/components/AIAssistant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, Target, Users, TrendingUp, Zap } from "lucide-react";

const AIPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation user={{ name: "Abebe Goben", points: 1420, rank: 47 }} />
      
      <div className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                AI Assistant
              </h1>
              <p className="text-muted-foreground">
                Get intelligent insights and automation for bug management
              </p>
            </div>
            
            <Badge variant="gaming" className="gap-2">
              <Brain className="h-4 w-4" />
              GPT-4o Powered
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Assistant */}
          <div className="lg:col-span-2">
            <AIAssistant />
          </div>
          
          {/* AI Features Sidebar */}
          <div className="space-y-6">
            {/* AI Capabilities */}
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Smart Prioritization</h4>
                      <p className="text-xs text-muted-foreground">
                        AI analyzes bug severity and impact to suggest priorities
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-accent-blue mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Duplicate Detection</h4>
                      <p className="text-xs text-muted-foreground">
                        Automatically finds and suggests similar bug reports
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Pattern Analysis</h4>
                      <p className="text-xs text-muted-foreground">
                        Identifies trends and patterns in bug reports
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-danger mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Solution Suggestions</h4>
                      <p className="text-xs text-muted-foreground">
                        Provides code fixes and resolution recommendations
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button variant="hero" className="w-full" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="text-lg">Quick AI Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full gap-2 justify-start text-sm">
                  <Target className="h-4 w-4" />
                  Analyze Open Bugs
                </Button>
                
                <Button variant="outline" className="w-full gap-2 justify-start text-sm">
                  <Users className="h-4 w-4" />
                  Find Duplicates
                </Button>
                
                <Button variant="outline" className="w-full gap-2 justify-start text-sm">
                  <TrendingUp className="h-4 w-4" />
                  Generate Report
                </Button>
                
                <Button variant="outline" className="w-full gap-2 justify-start text-sm">
                  <Zap className="h-4 w-4" />
                  Suggest Fixes
                </Button>
              </CardContent>
            </Card>

            {/* AI Stats */}
            <Card className="bg-gradient-primary text-white border-0">
              <CardContent className="p-6 text-center">
                <Brain className="h-12 w-12 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">AI Impact</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-2xl font-bold">94%</p>
                    <p className="text-white/80">Accuracy</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-white/80">Bugs Analyzed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">23</p>
                    <p className="text-white/80">Duplicates Found</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">67</p>
                    <p className="text-white/80">Solutions Provided</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPage;