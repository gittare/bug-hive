import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bell, X, Check, Star, Bug, Trophy, AlertCircle, Info } from "lucide-react";

interface Notification {
  id: string;
  type: "bug_update" | "badge_earned" | "rank_change" | "comment" | "verification" | "achievement";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: "low" | "medium" | "high";
  actionUrl?: string;
  metadata?: {
    bugId?: string;
    badgeName?: string;
    points?: number;
    oldRank?: number;
    newRank?: number;
  };
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "badge_earned",
    title: "New Badge Unlocked!",
    message: "Congratulations! You've earned the 'Streak Master' badge for maintaining a 30-day contribution streak.",
    timestamp: "2 minutes ago",
    isRead: false,
    priority: "high",
    metadata: { badgeName: "Streak Master", points: 100 }
  },
  {
    id: "2",
    type: "bug_update",
    title: "Bug Status Updated",
    message: "Bug #234 'Memory leak in dashboard' has been marked as resolved. You earned 25 bonus points for accurate reporting!",
    timestamp: "1 hour ago",
    isRead: false,
    priority: "medium",
    actionUrl: "/bugs/234",
    metadata: { bugId: "234", points: 25 }
  },
  {
    id: "3",
    type: "rank_change",
    title: "Rank Promotion!",
    message: "Amazing work! You've climbed from rank #3 to rank #1 on the global leaderboard.",
    timestamp: "3 hours ago",
    isRead: false,
    priority: "high",
    metadata: { oldRank: 3, newRank: 1, points: 50 }
  },
  {
    id: "4",
    type: "verification",
    title: "Bug Verified",
    message: "Your bug report 'Login button not responding on mobile' has been verified by the community. +15 points!",
    timestamp: "5 hours ago",
    isRead: true,
    priority: "medium",
    metadata: { points: 15 }
  },
  {
    id: "5",
    type: "comment",
    title: "New Comment on Your Bug",
    message: "Sarah Chen commented on your bug report #245: 'I can reproduce this issue on iOS Safari as well.'",
    timestamp: "1 day ago",
    isRead: true,
    priority: "low",
    actionUrl: "/bugs/245"
  },
  {
    id: "6",
    type: "achievement",
    title: "Achievement Unlocked!",
    message: "You've unlocked the 'Quality Assurance' achievement! Your last 10 bug reports were all verified.",
    timestamp: "2 days ago",
    isRead: true,
    priority: "medium",
    metadata: { points: 200 }
  }
];

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const filteredNotifications = filter === "all" ? notifications : notifications.filter(n => !n.isRead);

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = priority === "high" ? "text-danger" : priority === "medium" ? "text-warning" : "text-muted-foreground";
    
    switch (type) {
      case "badge_earned":
        return <Star className={`h-5 w-5 ${iconClass}`} />;
      case "bug_update":
        return <Bug className={`h-5 w-5 ${iconClass}`} />;
      case "rank_change":
        return <Trophy className={`h-5 w-5 ${iconClass}`} />;
      case "verification":
        return <Check className={`h-5 w-5 ${iconClass}`} />;
      case "comment":
        return <Info className={`h-5 w-5 ${iconClass}`} />;
      case "achievement":
        return <Trophy className={`h-5 w-5 ${iconClass}`} />;
      default:
        return <Bell className={`h-5 w-5 ${iconClass}`} />;
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "high": return "danger";
      case "medium": return "warning";
      case "low": return "badge";
      default: return "outline";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-16">
      <Card className="w-full max-w-2xl mx-4 bg-card border border-border shadow-2xl animate-scale-in">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="danger" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant={filter === "all" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter("all")}
                  className="h-7 text-xs"
                >
                  All
                </Button>
                <Button
                  variant={filter === "unread" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter("unread")}
                  className="h-7 text-xs"
                >
                  Unread ({unreadCount})
                </Button>
              </div>
              
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark All Read
              </Button>
              
              <Button variant="ghost" size="icon-sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="max-h-[70vh] overflow-y-auto">
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-semibold mb-1">All caught up!</h3>
                <p className="text-muted-foreground">
                  {filter === "unread" ? "No unread notifications" : "No notifications to show"}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`transition-all duration-200 cursor-pointer border ${
                    notification.isRead 
                      ? 'bg-card hover:bg-accent/30' 
                      : 'bg-accent/20 border-primary/20 hover:bg-accent/40'
                  }`}
                  onClick={() => !notification.isRead && markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type, notification.priority)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className={`font-medium ${notification.isRead ? 'text-foreground' : 'text-foreground font-semibold'}`}>
                            {notification.title}
                          </h4>
                          
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge variant={getPriorityBadgeVariant(notification.priority) as any} className="text-xs">
                              {notification.priority}
                            </Badge>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                        </div>
                        
                        <p className={`text-sm leading-relaxed ${
                          notification.isRead ? 'text-muted-foreground' : 'text-foreground'
                        }`}>
                          {notification.message}
                        </p>
                        
                        {notification.metadata && (
                          <div className="flex items-center gap-2 mt-2">
                            {notification.metadata.points && (
                              <Badge variant="gaming" className="text-xs">
                                +{notification.metadata.points} pts
                              </Badge>
                            )}
                            {notification.metadata.badgeName && (
                              <Badge variant="success" className="text-xs">
                                {notification.metadata.badgeName}
                              </Badge>
                            )}
                            {notification.metadata.newRank && notification.metadata.oldRank && (
                              <Badge variant="warning" className="text-xs">
                                #{notification.metadata.oldRank} → #{notification.metadata.newRank}
                              </Badge>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-muted-foreground">
                            {notification.timestamp}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            {notification.actionUrl && (
                              <Button variant="outline" size="sm" className="h-7 text-xs">
                                View Details
                              </Button>
                            )}
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                              >
                                Mark as Read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="h-7 w-7"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Notification Badge Component for Header
interface NotificationBadgeProps {
  onClick: () => void;
}

export function NotificationBadge({ onClick }: NotificationBadgeProps) {
  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={onClick}
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <Badge 
          variant="danger" 
          className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center animate-glow-pulse"
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </Badge>
      )}
    </Button>
  );
}