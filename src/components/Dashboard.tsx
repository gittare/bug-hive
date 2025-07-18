import { Navigation } from "./Navigation";
import { AIAssistant } from "./AIAssistant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BugCard } from "./BugCard";
import { LeaderboardCard } from "./LeaderboardCard";
import { 
  Bug, 
  Trophy, 
  Users, 
  Star, 
  Plus, 
  Github,
  TrendingUp,
  Zap
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

// Mock data for demonstration
const mockBugs = [
  {
    id: "1",
    title: "Login button not responding on mobile devices",
    description: "When using the app on mobile browsers, the login button becomes unresponsive after entering credentials. This affects iOS Safari and Chrome mobile.",
    priority: "high" as const,
    status: "open" as const,
    votes: 24,
    comments: 8,
    author: {
      name: "Sarah Chen",
      avatar: ""
    },
    createdAt: "2 hours ago",
    githubIssue: "https://github.com/project/repo/issues/123",
    labels: ["mobile", "login", "ui"]
  },
  {
    id: "2", 
    title: "Memory leak in dashboard component",
    description: "The dashboard component appears to have a memory leak that causes performance degradation over time. Users report slowness after extended use.",
    priority: "critical" as const,
    status: "in-progress" as const,
    votes: 42,
    comments: 15,
    author: {
      name: "Abebe Goben",
      avatar: ""
    },
    createdAt: "4 hours ago",
    labels: ["performance", "memory", "dashboard"]
  },
  {
    id: "3",
    title: "Incorrect date formatting in reports",
    description: "Date values in generated reports show incorrect formatting for non-US locales. The date appears in MM/DD/YYYY format regardless of user locale settings.",
    priority: "medium" as const,
    status: "open" as const,
    votes: 12,
    comments: 3,
    author: {
      name: "Maria Gonzalez",
      avatar: ""
    },
    createdAt: "1 day ago",
    githubIssue: "https://github.com/project/repo/issues/124",
    labels: ["i18n", "reports", "formatting"]
  }
];

const mockLeaderboard = [
  {
    id: "1",
    name: "Abebe Goben",
    avatar: "",
    points: 2840,
    rank: 1,
    weeklyPoints: 380,
    badges: [
      { id: "1", name: "Bug Hunter", icon: "🐛", rarity: "epic" as const },
      { id: "2", name: "Verified Reporter", icon: "✅", rarity: "rare" as const }
    ],
    contributions: { bugsReported: 15, bugsVerified: 28, votesGiven: 142 }
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatar: "",
    points: 2650,
    rank: 2,
    weeklyPoints: 320,
    badges: [
      { id: "3", name: "Top Voter", icon: "👍", rarity: "rare" as const }
    ],
    contributions: { bugsReported: 12, bugsVerified: 22, votesGiven: 189 }
  },
  {
    id: "3",
    name: "Maria Gonzalez", 
    avatar: "",
    points: 2450,
    rank: 3,
    weeklyPoints: 290,
    badges: [
      { id: "4", name: "Bug Squasher", icon: "🔨", rarity: "common" as const }
    ],
    contributions: { bugsReported: 18, bugsVerified: 16, votesGiven: 97 }
  }
];

const stats = {
  totalBugs: 1247,
  activeBugs: 328,
  resolvedThisWeek: 45,
  topContributors: 156
};

export function Dashboard() {
  const [userVotes, setUserVotes] = useState<Record<string, "up" | "down">>({});

  const handleVote = async (bugId: string, type: "up" | "down") => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUserVotes(prev => ({
      ...prev,
      [bugId]: prev[bugId] === type ? undefined : type
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={{ name: "Abebe Goben", points: 1420, rank: 47 }} />
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                BugHive
              </h1>
              <p className="text-muted-foreground">
                Crowdsourced bug reporting with community-driven prioritization
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Github className="h-4 w-4" />
                Connect GitHub
              </Button>
              <NavLink to="/submit-bug">
                <Button variant="hero" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Report Bug
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Bug className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stats.totalBugs}</p>
                      <p className="text-sm text-muted-foreground">Total Bugs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Zap className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stats.activeBugs}</p>
                      <p className="text-sm text-muted-foreground">Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stats.resolvedThisWeek}</p>
                      <p className="text-sm text-muted-foreground">Resolved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent-blue/10 rounded-lg">
                      <Users className="h-5 w-5 text-accent-blue" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stats.topContributors}</p>
                      <p className="text-sm text-muted-foreground">Contributors</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bugs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">Recent Bug Reports</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">High Priority</Badge>
                  <Badge variant="outline">Needs Votes</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                {mockBugs.map(bug => (
                  <BugCard
                    key={bug.id}
                    bug={bug}
                    onVote={handleVote}
                    userVote={userVotes[bug.id]}
                  />
                ))}
              </div>

              <div className="text-center py-4">
                <NavLink to="/bugs">
                  <Button variant="outline" className="gap-2">
                    View All Bugs
                    <Bug className="h-4 w-4" />
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Leaderboard */}
            <LeaderboardCard
              entries={mockLeaderboard}
              title="Top Contributors"
              period="weekly"
            />

            {/* Quick Actions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <NavLink to="/submit-bug">
                  <Button variant="gaming" className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Report New Bug
                    <Badge variant="outline" className="ml-auto bg-white/10 text-white border-white/20">
                      +50 pts
                    </Badge>
                  </Button>
                </NavLink>
                
                <Button variant="vote" className="w-full gap-2">
                  <Star className="h-4 w-4" />
                  Verify Bug Reports
                  <Badge variant="outline" className="ml-auto">
                    +10 pts
                  </Badge>
                </Button>

                <Button variant="outline" className="w-full gap-2">
                  <Github className="h-4 w-4" />
                  Sync GitHub Issues
                </Button>
              </CardContent>
            </Card>

            {/* Your Stats */}
            <Card className="bg-gradient-primary text-white border-0">
              <CardContent className="p-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                    <Trophy className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">1,420</p>
                    <p className="text-white/80">Your Points</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <p className="font-semibold">8</p>
                      <p className="text-white/80">Bugs</p>
                    </div>
                    <div>
                      <p className="font-semibold">24</p>
                      <p className="text-white/80">Votes</p>
                    </div>
                    <div>
                      <p className="font-semibold">12</p>
                      <p className="text-white/80">Verified</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                    Rank #47
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}