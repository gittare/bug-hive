import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  GitBranch, 
  Star, 
  Users, 
  Activity, 
  Settings, 
  Plus,
  Github,
  BarChart3,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  Bug,
  Zap
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  githubRepo: string;
  status: "active" | "archived" | "planning";
  memberCount: number;
  bugCount: {
    total: number;
    open: number;
    inProgress: number;
    resolved: number;
  };
  priority: "low" | "medium" | "high";
  lastActivity: string;
  maintainers: string[];
  syncStatus: "synced" | "pending" | "error";
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "React Dashboard",
    description: "Modern admin dashboard built with React and TypeScript",
    githubRepo: "company/react-dashboard",
    status: "active",
    memberCount: 12,
    bugCount: { total: 89, open: 23, inProgress: 8, resolved: 58 },
    priority: "high",
    lastActivity: "2 minutes ago",
    maintainers: ["Sarah Chen", "Abebe Goben"],
    syncStatus: "synced"
  },
  {
    id: "2",
    name: "Mobile App Backend",
    description: "Node.js API for mobile application with PostgreSQL",
    githubRepo: "company/mobile-backend",
    status: "active",
    memberCount: 8,
    bugCount: { total: 156, open: 45, inProgress: 12, resolved: 99 },
    priority: "high",
    lastActivity: "15 minutes ago",
    maintainers: ["Maria Gonzalez", "David Park"],
    syncStatus: "synced"
  },
  {
    id: "3",
    name: "Documentation Site",
    description: "Static site generator for project documentation",
    githubRepo: "company/docs-site",
    status: "active",
    memberCount: 5,
    bugCount: { total: 34, open: 7, inProgress: 2, resolved: 25 },
    priority: "medium",
    lastActivity: "1 hour ago",
    maintainers: ["Lisa Wang"],
    syncStatus: "pending"
  },
  {
    id: "4",
    name: "Legacy Migration Tool",
    description: "Data migration utilities for legacy system upgrade",
    githubRepo: "company/legacy-migration",
    status: "archived",
    memberCount: 3,
    bugCount: { total: 67, open: 2, inProgress: 0, resolved: 65 },
    priority: "low",
    lastActivity: "2 weeks ago",
    maintainers: ["John Smith"],
    syncStatus: "error"
  }
];

export function ProjectManagement() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(mockProjects[0]);
  const [filter, setFilter] = useState<"all" | "active" | "archived">("all");

  const filteredProjects = mockProjects.filter(project => 
    filter === "all" || project.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "archived": return "secondary";
      case "planning": return "warning";
      default: return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "danger";
      case "medium": return "warning";
      case "low": return "badge";
      default: return "outline";
    }
  };

  const getSyncStatusColor = (status: string) => {
    switch (status) {
      case "synced": return "success";
      case "pending": return "warning";
      case "error": return "danger";
      default: return "outline";
    }
  };

  const getSyncStatusIcon = (status: string) => {
    switch (status) {
      case "synced": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "error": return <AlertTriangle className="h-4 w-4" />;
      default: return <Github className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Project Management</h1>
              <p className="text-muted-foreground">Manage your connected repositories and bug tracking</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="hero" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Your Projects</h2>
            
            <div className="space-y-3">
              {filteredProjects.map((project) => (
                <Card 
                  key={project.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-card ${
                    selectedProject?.id === project.id 
                      ? 'ring-2 ring-primary bg-accent/50' 
                      : 'hover:bg-accent/30'
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate">{project.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {project.description}
                          </p>
                        </div>
                        <Badge variant={getStatusColor(project.status) as any} className="ml-2">
                          {project.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Github className="h-4 w-4" />
                        <span className="truncate">{project.githubRepo}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Bug className="h-4 w-4 text-muted-foreground" />
                            <span>{project.bugCount.open}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{project.memberCount}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          {getSyncStatusIcon(project.syncStatus)}
                          <Badge variant={getSyncStatusColor(project.syncStatus) as any} className="text-xs">
                            {project.syncStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="lg:col-span-2">
            {selectedProject ? (
              <div className="space-y-6">
                {/* Project Header */}
                <Card className="bg-card border border-border">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-bold text-foreground">{selectedProject.name}</h2>
                          <Badge variant={getStatusColor(selectedProject.status) as any}>
                            {selectedProject.status}
                          </Badge>
                          <Badge variant={getPriorityColor(selectedProject.priority) as any}>
                            {selectedProject.priority} priority
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{selectedProject.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Github className="h-4 w-4" />
                          <span>{selectedProject.githubRepo}</span>
                          <span>•</span>
                          <span>Last activity {selectedProject.lastActivity}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <GitBranch className="h-4 w-4" />
                          Sync GitHub
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-card border border-border">
                    <CardContent className="p-4">
                      <div className="text-center space-y-2">
                        <Bug className="h-8 w-8 mx-auto text-primary" />
                        <div>
                          <p className="text-2xl font-bold text-foreground">{selectedProject.bugCount.open}</p>
                          <p className="text-sm text-muted-foreground">Open Bugs</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border border-border">
                    <CardContent className="p-4">
                      <div className="text-center space-y-2">
                        <Zap className="h-8 w-8 mx-auto text-warning" />
                        <div>
                          <p className="text-2xl font-bold text-foreground">{selectedProject.bugCount.inProgress}</p>
                          <p className="text-sm text-muted-foreground">In Progress</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border border-border">
                    <CardContent className="p-4">
                      <div className="text-center space-y-2">
                        <CheckCircle className="h-8 w-8 mx-auto text-success" />
                        <div>
                          <p className="text-2xl font-bold text-foreground">{selectedProject.bugCount.resolved}</p>
                          <p className="text-sm text-muted-foreground">Resolved</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border border-border">
                    <CardContent className="p-4">
                      <div className="text-center space-y-2">
                        <Users className="h-8 w-8 mx-auto text-accent-blue" />
                        <div>
                          <p className="text-2xl font-bold text-foreground">{selectedProject.memberCount}</p>
                          <p className="text-sm text-muted-foreground">Contributors</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Project Tabs */}
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="bugs">Bugs</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-card border border-border">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            Bug Resolution Progress
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Resolved</span>
                                <span>{Math.round((selectedProject.bugCount.resolved / selectedProject.bugCount.total) * 100)}%</span>
                              </div>
                              <Progress 
                                value={(selectedProject.bugCount.resolved / selectedProject.bugCount.total) * 100} 
                                className="h-2"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>In Progress</span>
                                <span>{Math.round((selectedProject.bugCount.inProgress / selectedProject.bugCount.total) * 100)}%</span>
                              </div>
                              <Progress 
                                value={(selectedProject.bugCount.inProgress / selectedProject.bugCount.total) * 100} 
                                className="h-2"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-card border border-border">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            Priority Distribution
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Critical Priority</span>
                              <Badge variant="danger">8 bugs</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">High Priority</span>
                              <Badge variant="warning">15 bugs</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Medium Priority</span>
                              <Badge variant="badge">12 bugs</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Low Priority</span>
                              <Badge variant="secondary">5 bugs</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="bg-card border border-border">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-primary" />
                          Recent Activity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-success" />
                            <div>
                              <p className="text-sm font-medium">Bug #234 resolved by Sarah Chen</p>
                              <p className="text-xs text-muted-foreground">2 minutes ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                            <Bug className="h-5 w-5 text-warning" />
                            <div>
                              <p className="text-sm font-medium">New bug reported: "Memory leak in dashboard"</p>
                              <p className="text-xs text-muted-foreground">15 minutes ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                            <Star className="h-5 w-5 text-accent-blue" />
                            <div>
                              <p className="text-sm font-medium">Abebe Goben gained "Bug Hunter" badge</p>
                              <p className="text-xs text-muted-foreground">1 hour ago</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="bugs">
                    <Card className="bg-card border border-border">
                      <CardContent className="p-6">
                        <div className="text-center py-8">
                          <Bug className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                          <h3 className="text-lg font-semibold mb-2">Bug Management</h3>
                          <p className="text-muted-foreground mb-4">
                            View and manage all bugs for {selectedProject.name}
                          </p>
                          <Button variant="hero">View All Bugs</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="analytics">
                    <Card className="bg-card border border-border">
                      <CardContent className="p-6">
                        <div className="text-center py-8">
                          <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                          <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
                          <p className="text-muted-foreground mb-4">
                            Coming soon: Detailed insights and metrics for bug patterns
                          </p>
                          <Badge variant="gaming">Pro Feature</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="settings">
                    <Card className="bg-card border border-border">
                      <CardContent className="p-6">
                        <div className="text-center py-8">
                          <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                          <h3 className="text-lg font-semibold mb-2">Project Settings</h3>
                          <p className="text-muted-foreground mb-4">
                            Configure GitHub sync, notifications, and permissions
                          </p>
                          <Button variant="outline">Configure</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <Card className="bg-card border border-border">
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <GitBranch className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Select a Project</h3>
                    <p className="text-muted-foreground">
                      Choose a project from the list to view its details and manage bugs
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}