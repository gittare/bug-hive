import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationBadge, NotificationCenter } from "./NotificationCenter";
import { 
  Home, 
  Bug, 
  Trophy, 
  User, 
  GitBranch, 
  Plus, 
  Search,
  Bot,
  Settings,
  Github,
  Menu,
  X
} from "lucide-react";

interface NavigationProps {
  user?: {
    name: string;
    avatar?: string;
    points: number;
    rank: number;
  };
}

export function Navigation({ user }: NavigationProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/bugs", label: "Bugs", icon: Bug },
    { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { path: "/projects", label: "Projects", icon: GitBranch },
    { path: "/profile", label: "Profile", icon: User }
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const getNavLinkClass = (path: string) => {
    const base = "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200";
    if (isActive(path)) {
      return `${base} bg-primary text-primary-foreground shadow-sm`;
    }
    return `${base} text-muted-foreground hover:text-foreground hover:bg-accent`;
  };

  return (
    <>
      <nav className="border-b border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/80 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <NavLink to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  BugHive
                </span>
              </NavLink>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={getNavLinkClass(item.path)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-5 w-5" />
              </Button>

              {/* AI Assistant */}
              <NavLink to="/ai">
                <Button variant="ghost" size="icon" className="relative">
                  <Bot className="h-5 w-5" />
                  <Badge variant="gaming" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center">
                    AI
                  </Badge>
                </Button>
              </NavLink>

              {/* Notifications */}
              <NotificationBadge onClick={() => setShowNotifications(true)} />

              {/* Quick Actions */}
              <div className="hidden md:flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Github className="h-4 w-4" />
                  Connect GitHub
                </Button>
                <NavLink to="/submit-bug">
                  <Button variant="hero" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Report Bug
                  </Button>
                </NavLink>
              </div>

              {/* User Profile */}
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{user.points} pts</span>
                      <span>•</span>
                      <span>Rank #{user.rank}</span>
                    </div>
                  </div>
                  
                  <NavLink to="/profile">
                    <Avatar className="h-8 w-8 ring-2 ring-border hover:ring-primary transition-all cursor-pointer">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </NavLink>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                  <Button variant="hero" size="sm">
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border animate-fade-in">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={getNavLinkClass(item.path)}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                ))}
                
                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full gap-2 justify-start">
                    <Github className="h-4 w-4" />
                    Connect GitHub
                  </Button>
                  <NavLink to="/submit-bug" className="w-full">
                    <Button variant="hero" className="w-full gap-2 justify-start">
                      <Plus className="h-4 w-4" />
                      Report Bug
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Notification Center */}
      <NotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </>
  );
}