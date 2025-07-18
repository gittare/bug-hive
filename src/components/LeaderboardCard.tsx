import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Crown } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  points: number;
  rank: number;
  badges: Badge[];
  weeklyPoints: number;
  contributions: {
    bugsReported: number;
    bugsVerified: number;
    votesGiven: number;
  };
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface LeaderboardCardProps {
  entries: LeaderboardEntry[];
  title: string;
  period: "weekly" | "all-time";
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="h-5 w-5 text-warning" />;
    case 2:
      return <Trophy className="h-5 w-5 text-muted-foreground" />;
    case 3:
      return <Medal className="h-5 w-5 text-warning/70" />;
    default:
      return <Award className="h-4 w-4 text-muted-foreground" />;
  }
};

const getRankBadgeVariant = (rank: number) => {
  switch (rank) {
    case 1:
      return "warning" as const;
    case 2:
      return "secondary" as const;
    case 3:
      return "badge" as const;
    default:
      return "outline" as const;
  }
};

const badgeRarityColors = {
  common: "bg-secondary",
  rare: "bg-accent-blue",
  epic: "bg-primary",
  legendary: "bg-gradient-primary"
};

export function LeaderboardCard({ entries, title, period }: LeaderboardCardProps) {
  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          {title}
          <Badge variant="outline" className="ml-auto">
            {period === "weekly" ? "This Week" : "All Time"}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-accent/50 ${
              entry.rank <= 3 ? 'bg-accent/30' : ''
            }`}
          >
            {/* Rank */}
            <div className="flex items-center gap-2 min-w-[60px]">
              {getRankIcon(entry.rank)}
              <Badge variant={getRankBadgeVariant(entry.rank)} className="font-bold">
                #{entry.rank}
              </Badge>
            </div>

            {/* Avatar & Name */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Avatar className="h-10 w-10 ring-2 ring-border">
                <AvatarImage src={entry.avatar} />
                <AvatarFallback>
                  {entry.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                  {entry.name}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{entry.contributions.bugsReported} bugs</span>
                  <span>{entry.contributions.bugsVerified} verified</span>
                  <span>{entry.contributions.votesGiven} votes</span>
                </div>
              </div>
            </div>

            {/* Points */}
            <div className="text-right min-w-[80px]">
              <p className="font-bold text-lg text-primary">
                {period === "weekly" ? entry.weeklyPoints : entry.points}
              </p>
              <p className="text-xs text-muted-foreground">
                {period === "weekly" ? "pts this week" : "total pts"}
              </p>
            </div>

            {/* Badges */}
            {entry.badges.length > 0 && (
              <div className="flex items-center gap-1">
                {entry.badges.slice(0, 3).map((badge) => (
                  <div
                    key={badge.id}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      badgeRarityColors[badge.rarity]
                    }`}
                    title={badge.name}
                  >
                    {badge.icon}
                  </div>
                ))}
                {entry.badges.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{entry.badges.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
        
        {entries.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No contributors yet this {period === "weekly" ? "week" : "period"}</p>
            <p className="text-sm">Be the first to earn points!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}