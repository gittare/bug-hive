import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp, ArrowDown, MessageCircle, Github, Clock } from "lucide-react";
import { useState } from "react";

interface Bug {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "open" | "in-progress" | "resolved" | "closed";
  votes: number;
  comments: number;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  githubIssue?: string;
  labels: string[];
}

interface BugCardProps {
  bug: Bug;
  onVote: (bugId: string, type: "up" | "down") => void;
  userVote?: "up" | "down" | null;
}

const priorityConfig = {
  low: { variant: "secondary" as const, label: "Low Priority" },
  medium: { variant: "badge" as const, label: "Medium Priority" },
  high: { variant: "warning" as const, label: "High Priority" },
  critical: { variant: "danger" as const, label: "Critical" }
};

const statusConfig = {
  open: { variant: "outline" as const, label: "Open" },
  "in-progress": { variant: "default" as const, label: "In Progress" },
  resolved: { variant: "success" as const, label: "Resolved" },
  closed: { variant: "secondary" as const, label: "Closed" }
};

export function BugCard({ bug, onVote, userVote }: BugCardProps) {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (type: "up" | "down") => {
    if (isVoting) return;
    setIsVoting(true);
    await onVote(bug.id, type);
    setIsVoting(false);
  };

  const priorityStyle = priorityConfig[bug.priority];
  const statusStyle = statusConfig[bug.status];

  return (
    <Card className="group hover:shadow-card transition-all duration-200 hover:scale-[1.02] bg-card border border-border">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight text-foreground group-hover:text-primary transition-colors">
              {bug.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {bug.description}
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-1 min-w-[60px]">
            <Button
              variant={userVote === "up" ? "vote" : "ghost"}
              size="icon-sm"
              onClick={() => handleVote("up")}
              disabled={isVoting}
              className={userVote === "up" ? "animate-vote-pulse" : ""}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            
            <span className="font-bold text-lg text-foreground min-w-[2ch] text-center">
              {bug.votes}
            </span>
            
            <Button
              variant={userVote === "down" ? "vote" : "ghost"}
              size="icon-sm"
              onClick={() => handleVote("down")}
              disabled={isVoting}
              className={userVote === "down" ? "animate-vote-pulse" : ""}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant={priorityStyle.variant}>
              {priorityStyle.label}
            </Badge>
            <Badge variant={statusStyle.variant}>
              {statusStyle.label}
            </Badge>
            {bug.githubIssue && (
              <Badge variant="outline" className="gap-1">
                <Github className="h-3 w-3" />
                Synced
              </Badge>
            )}
          </div>
        </div>

        {bug.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {bug.labels.map((label) => (
              <Badge key={label} variant="outline" className="text-xs">
                {label}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src={bug.author.avatar} />
                <AvatarFallback className="text-xs">
                  {bug.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span>by {bug.author.name}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{bug.comments}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{bug.createdAt}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}