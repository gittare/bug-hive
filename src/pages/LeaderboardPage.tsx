import { Navigation } from "@/components/Navigation";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Award, Crown, TrendingUp, Calendar, Users } from "lucide-react";

// Extended mock data for full leaderboard
const weeklyLeaderboard = [
  {
    id: "1", name: "Abebe Goben", avatar: "", points: 2840, rank: 1, weeklyPoints: 380,
    badges: [
      { id: "1", name: "Bug Hunter", icon: "🐛", rarity: "epic" as const },
      { id: "2", name: "Community Champion", icon: "👑", rarity: "legendary" as const }
    ],
    contributions: { bugsReported: 15, bugsVerified: 28, votesGiven: 142 }
  },
  {
    id: "2", name: "Sarah Chen", avatar: "", points: 2650, rank: 2, weeklyPoints: 320,
    badges: [{ id: "3", name: "Top Voter", icon: "👍", rarity: "rare" as const }],
    contributions: { bugsReported: 12, bugsVerified: 22, votesGiven: 189 }
  },
  {
    id: "3", name: "Maria Gonzalez", avatar: "", points: 2450, rank: 3, weeklyPoints: 290,
    badges: [{ id: "4", name: "Bug Squasher", icon: "🔨", rarity: "common" as const }],
    contributions: { bugsReported: 18, bugsVerified: 16, votesGiven: 97 }
  },
  {
    id: "4", name: "David Park", avatar: "", points: 2200, rank: 4, weeklyPoints: 250,
    badges: [{ id: "5", name: "Verifier", icon: "✅", rarity: "rare" as const }],
    contributions: { bugsReported: 8, bugsVerified: 32, votesGiven: 156 }
  },
  {
    id: "5", name: "Lisa Wang", avatar: "", points: 1980, rank: 5, weeklyPoints: 210,
    badges: [{ id: "6", name: "Contributor", icon: "🌟", rarity: "common" as const }],
    contributions: { bugsReported: 14, bugsVerified: 12, votesGiven: 98 }
  }
];

const allTimeLeaderboard = weeklyLeaderboard.map(user => ({
  ...user,
  points: user.points + Math.floor(Math.random() * 1000),
  weeklyPoints: user.points
}));

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation user={{ name: "Abebe Goben", points: 1420, rank: 47 }} />
      
      <div className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Leaderboard
              </h1>
              <p className="text-muted-foreground">
                Top contributors in the BugHive community
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="gaming" className="gap-2">
                <Trophy className="h-4 w-4" />
                Season 1
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Top 3 Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {weeklyLeaderboard.slice(0, 3).map((user, index) => (
            <Card 
              key={user.id} 
              className={`relative overflow-hidden ${
                index === 0 
                  ? 'bg-gradient-primary text-white border-0 shadow-glow' 
                  : index === 1
                  ? 'bg-accent border-2 border-muted'
                  : 'bg-card border border-border'
              }`}
            >
              <CardContent className="p-6 text-center">
                <div className="absolute top-4 right-4">
                  {index === 0 && <Crown className="h-6 w-6 text-warning" />}
                  {index === 1 && <Trophy className="h-6 w-6 text-muted-foreground" />}
                  {index === 2 && <Medal className="h-6 w-6 text-warning/70" />}
                </div>
                
                <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-background">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="text-xl font-bold mb-1">{user.name}</h3>
                <Badge variant="outline" className={`mb-3 ${index === 0 ? 'border-white/20 text-white' : ''}`}>
                  Rank #{user.rank}
                </Badge>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-2xl font-bold">{user.weeklyPoints}</p>
                    <p className={`text-sm ${index === 0 ? 'text-white/80' : 'text-muted-foreground'}`}>
                      Points This Week
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="font-semibold">{user.contributions.bugsReported}</p>
                      <p className={index === 0 ? 'text-white/70' : 'text-muted-foreground'}>Bugs</p>
                    </div>
                    <div>
                      <p className="font-semibold">{user.contributions.bugsVerified}</p>
                      <p className={index === 0 ? 'text-white/70' : 'text-muted-foreground'}>Verified</p>
                    </div>
                    <div>
                      <p className="font-semibold">{user.contributions.votesGiven}</p>
                      <p className={index === 0 ? 'text-white/70' : 'text-muted-foreground'}>Votes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border border-border">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">1,247</p>
              <p className="text-sm text-muted-foreground">Active Contributors</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 mx-auto text-warning mb-2" />
              <p className="text-2xl font-bold text-foreground">8,943</p>
              <p className="text-sm text-muted-foreground">Points Awarded</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto text-success mb-2" />
              <p className="text-2xl font-bold text-foreground">342</p>
              <p className="text-sm text-muted-foreground">Bugs Resolved</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 mx-auto text-accent-blue mb-2" />
              <p className="text-2xl font-bold text-foreground">7</p>
              <p className="text-sm text-muted-foreground">Days Left</p>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="weekly" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="weekly">This Week</TabsTrigger>
              <TabsTrigger value="alltime">All Time</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" className="gap-2">
              <Award className="h-4 w-4" />
              View Badges
            </Button>
          </div>

          <TabsContent value="weekly">
            <LeaderboardCard
              entries={weeklyLeaderboard}
              title="Weekly Champions"
              period="weekly"
            />
          </TabsContent>

          <TabsContent value="alltime">
            <LeaderboardCard
              entries={allTimeLeaderboard}
              title="Hall of Fame"
              period="all-time"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LeaderboardPage;