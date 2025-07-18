import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy,
  Star,
  Award,
  Crown,
  Target,
  Zap,
  Shield,
  Flame,
  Users,
  GitBranch,
  Bug,
  CheckCircle,
  TrendingUp,
  Calendar,
  Clock,
  Edit,
  Github,
  Mail,
  MapPin
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  location?: string;
  bio: string;
  joinDate: string;
  githubUsername?: string;
  
  stats: {
    totalPoints: number;
    rank: number;
    bugsReported: number;
    bugsVerified: number;
    bugsResolved: number;
    votesGiven: number;
    votesReceived: number;
    streakDays: number;
    contributionStreak: number;
  };
  
  badges: UserBadge[];
  achievements: Achievement[];
  recentActivity: Activity[];
  contributions: {
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
  };
}

interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlockedAt: string;
  progress?: {
    current: number;
    total: number;
  };
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  type: "milestone" | "streak" | "quality" | "community";
  icon: string;
  points: number;
  unlockedAt: string;
  rarity: "bronze" | "silver" | "gold" | "platinum";
}

interface Activity {
  id: string;
  type: "bug_reported" | "bug_verified" | "bug_resolved" | "vote_cast" | "badge_earned";
  description: string;
  timestamp: string;
  points: number;
  relatedBug?: string;
}

const mockProfile: UserProfile = {
  id: "1",
  name: "Abebe Goben",
  username: "abebegoben",
  email: "abebe@example.com",
  avatar: "",
  location: "San Francisco, CA",
  bio: "Full-stack developer passionate about open source and bug hunting. Love helping projects improve their quality!",
  joinDate: "2023-08-15",
  githubUsername: "alexkumar-dev",
  
  stats: {
    totalPoints: 2840,
    rank: 1,
    bugsReported: 42,
    bugsVerified: 156,
    bugsResolved: 89,
    votesGiven: 234,
    votesReceived: 421,
    streakDays: 28,
    contributionStreak: 7
  },
  
  badges: [
    {
      id: "1",
      name: "Bug Hunter",
      description: "Reported 25+ verified bugs",
      icon: "🐛",
      rarity: "epic",
      unlockedAt: "2024-01-10"
    },
    {
      id: "2", 
      name: "Community Champion",
      description: "Helped verify 100+ bug reports",
      icon: "👑",
      rarity: "legendary",
      unlockedAt: "2024-01-05"
    },
    {
      id: "3",
      name: "Streak Master",
      description: "30-day contribution streak",
      icon: "🔥",
      rarity: "epic",
      unlockedAt: "2024-01-12",
      progress: { current: 28, total: 30 }
    },
    {
      id: "4",
      name: "Code Detective",
      description: "Found 10 critical bugs",
      icon: "🕵️",
      rarity: "rare",
      unlockedAt: "2023-12-20"
    }
  ],
  
  achievements: [
    {
      id: "1",
      title: "First Bug Report",
      description: "Successfully reported your first bug",
      type: "milestone",
      icon: "🎯",
      points: 50,
      unlockedAt: "2023-08-16",
      rarity: "bronze"
    },
    {
      id: "2",
      title: "Quality Assurance",
      description: "All your last 10 bug reports were verified",
      type: "quality",
      icon: "✅",
      points: 200,
      unlockedAt: "2024-01-08",
      rarity: "gold"
    },
    {
      id: "3",
      title: "Community Leader",
      description: "Top 10 contributor this month",
      type: "community",
      icon: "🏆",
      points: 500,
      unlockedAt: "2024-01-12",
      rarity: "platinum"
    }
  ],
  
  recentActivity: [
    {
      id: "1",
      type: "badge_earned",
      description: "Earned 'Streak Master' badge",
      timestamp: "2 hours ago",
      points: 100
    },
    {
      id: "2",
      type: "bug_verified",
      description: "Verified bug report #234",
      timestamp: "4 hours ago",
      points: 10,
      relatedBug: "Memory leak in dashboard component"
    },
    {
      id: "3",
      type: "bug_reported",
      description: "Reported new bug #245",
      timestamp: "1 day ago",
      points: 50,
      relatedBug: "Login button not responding on mobile"
    }
  ],
  
  contributions: {
    thisWeek: 180,
    thisMonth: 720,
    thisYear: 2840
  }
};

export function UserProfile() {
  const [profile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-secondary text-secondary-foreground";
      case "rare": return "bg-accent-blue text-white";
      case "epic": return "bg-primary text-white";
      case "legendary": return "bg-gradient-primary text-white";
      default: return "bg-muted";
    }
  };

  const getAchievementColor = (rarity: string) => {
    switch (rarity) {
      case "bronze": return "bg-amber-100 text-amber-800 border-amber-300";
      case "silver": return "bg-gray-100 text-gray-800 border-gray-300";
      case "gold": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "platinum": return "bg-purple-100 text-purple-800 border-purple-300";
      default: return "bg-muted";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "bug_reported": return <Bug className="h-4 w-4 text-primary" />;
      case "bug_verified": return <CheckCircle className="h-4 w-4 text-success" />;
      case "bug_resolved": return <Target className="h-4 w-4 text-success" />;
      case "vote_cast": return <TrendingUp className="h-4 w-4 text-accent-blue" />;
      case "badge_earned": return <Award className="h-4 w-4 text-warning" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="gap-2">
              <Edit className="h-4 w-4" />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Basic Info */}
            <Card className="bg-gradient-primary text-white border-0">
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-white/20">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="text-2xl bg-white/20 text-white">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                <p className="text-white/80 mb-2">@{profile.username}</p>
                
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{profile.stats.totalPoints}</p>
                    <p className="text-xs text-white/80">Total Points</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">#{profile.stats.rank}</p>
                    <p className="text-xs text-white/80">Global Rank</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm">
                  <Flame className="h-4 w-4" />
                  <span>{profile.stats.streakDays} day streak</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.email}</span>
                </div>
                {profile.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.githubUsername && (
                  <div className="flex items-center gap-2 text-sm">
                    <Github className="h-4 w-4 text-muted-foreground" />
                    <span>@{profile.githubUsername}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Bio */}
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="text-lg">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {profile.bio}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-card border border-border">
                <CardContent className="p-4 text-center">
                  <Bug className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold text-foreground">{profile.stats.bugsReported}</p>
                  <p className="text-sm text-muted-foreground">Bugs Reported</p>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto text-success mb-2" />
                  <p className="text-2xl font-bold text-foreground">{profile.stats.bugsVerified}</p>
                  <p className="text-sm text-muted-foreground">Bugs Verified</p>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border">
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 mx-auto text-success mb-2" />
                  <p className="text-2xl font-bold text-foreground">{profile.stats.bugsResolved}</p>
                  <p className="text-sm text-muted-foreground">Bugs Resolved</p>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto text-accent-blue mb-2" />
                  <p className="text-2xl font-bold text-foreground">{profile.stats.votesGiven}</p>
                  <p className="text-sm text-muted-foreground">Votes Cast</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="badges" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="badges">Badges</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="contributions">Contributions</TabsTrigger>
              </TabsList>

              <TabsContent value="badges" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.badges.map((badge) => (
                    <Card key={badge.id} className={`border ${getRarityColor(badge.rarity)}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="text-3xl">{badge.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{badge.name}</h3>
                            <p className="text-sm opacity-90 mb-2">{badge.description}</p>
                            
                            {badge.progress && (
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Progress</span>
                                  <span>{badge.progress.current}/{badge.progress.total}</span>
                                </div>
                                <Progress 
                                  value={(badge.progress.current / badge.progress.total) * 100} 
                                  className="h-2 bg-white/20"
                                />
                              </div>
                            )}
                            
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs border-current">
                                {badge.rarity}
                              </Badge>
                              <span className="text-xs opacity-75">
                                Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4">
                <div className="space-y-3">
                  {profile.achievements.map((achievement) => (
                    <Card key={achievement.id} className="bg-card border border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{achievement.title}</h3>
                              <Badge variant="gaming" className="text-xs">
                                +{achievement.points} pts
                              </Badge>
                              <Badge variant="outline" className={`text-xs ${getAchievementColor(achievement.rarity)}`}>
                                {achievement.rarity}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {achievement.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <div className="space-y-3">
                  {profile.recentActivity.map((activity) => (
                    <Card key={activity.id} className="bg-card border border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          {getActivityIcon(activity.type)}
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.description}</p>
                            {activity.relatedBug && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Related: {activity.relatedBug}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <Badge variant="gaming" className="text-xs">
                              +{activity.points}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {activity.timestamp}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="contributions">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-card border border-border">
                    <CardContent className="p-6 text-center">
                      <Zap className="h-12 w-12 mx-auto text-primary mb-3" />
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        {profile.contributions.thisWeek}
                      </h3>
                      <p className="text-sm text-muted-foreground">Points This Week</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border border-border">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-12 w-12 mx-auto text-accent-blue mb-3" />
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        {profile.contributions.thisMonth}
                      </h3>
                      <p className="text-sm text-muted-foreground">Points This Month</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border border-border">
                    <CardContent className="p-6 text-center">
                      <Trophy className="h-12 w-12 mx-auto text-warning mb-3" />
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        {profile.contributions.thisYear}
                      </h3>
                      <p className="text-sm text-muted-foreground">Points This Year</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}