import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BugCard } from "./BugCard";
import { 
  Search, 
  Filter, 
  SortDesc, 
  Bug, 
  Plus,
  Calendar,
  User,
  Tag
} from "lucide-react";

// Mock data - same bugs from Dashboard but with more
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
  },
  {
    id: "4",
    title: "API timeout errors during file upload",
    description: "Large file uploads consistently timeout after 30 seconds. This affects users trying to upload documents larger than 10MB.",
    priority: "high" as const,
    status: "open" as const,
    votes: 18,
    comments: 6,
    author: {
      name: "David Park",
      avatar: ""
    },
    createdAt: "2 days ago",
    labels: ["api", "upload", "timeout"]
  },
  {
    id: "5",
    title: "Dark mode toggle not persisting",
    description: "The dark mode setting resets to light mode after browser refresh. User preferences are not being saved properly.",
    priority: "low" as const,
    status: "resolved" as const,
    votes: 8,
    comments: 4,
    author: {
      name: "Lisa Wang",
      avatar: ""
    },
    createdAt: "3 days ago",
    labels: ["ui", "settings", "persistence"]
  },
  {
    id: "6",
    title: "Search functionality returns incorrect results",
    description: "The search feature sometimes returns unrelated results or fails to find exact matches. This appears to be an indexing issue.",
    priority: "medium" as const,
    status: "open" as const,
    votes: 15,
    comments: 9,
    author: {
      name: "John Smith",
      avatar: ""
    },
    createdAt: "4 days ago",
    labels: ["search", "indexing", "database"]
  }
];

interface BugListProps {
  showFilters?: boolean;
  limit?: number;
}

export function BugList({ showFilters = true, limit }: BugListProps) {
  const [bugs, setBugs] = useState(mockBugs);
  const [userVotes, setUserVotes] = useState<Record<string, "up" | "down">>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"votes" | "created" | "comments" | "priority">("votes");
  const [filterStatus, setFilterStatus] = useState<"all" | "open" | "in-progress" | "resolved" | "closed">("all");
  const [filterPriority, setFilterPriority] = useState<"all" | "low" | "medium" | "high" | "critical">("all");
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  const handleVote = async (bugId: string, type: "up" | "down") => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUserVotes(prev => ({
      ...prev,
      [bugId]: prev[bugId] === type ? undefined : type
    }));

    // Update bug votes
    setBugs(prev => prev.map(bug => {
      if (bug.id === bugId) {
        const currentVote = userVotes[bugId];
        let newVotes = bug.votes;
        
        // Remove previous vote effect
        if (currentVote === "up") newVotes--;
        if (currentVote === "down") newVotes++;
        
        // Apply new vote effect
        if (type === "up" && currentVote !== "up") newVotes++;
        if (type === "down" && currentVote !== "down") newVotes--;
        
        return { ...bug, votes: newVotes };
      }
      return bug;
    }));
  };

  const filteredBugs = bugs
    .filter(bug => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          bug.title.toLowerCase().includes(query) ||
          bug.description.toLowerCase().includes(query) ||
          bug.labels.some(label => label.toLowerCase().includes(query)) ||
          bug.author.name.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter(bug => {
      // Status filter
      if (filterStatus !== "all") {
        return bug.status === filterStatus;
      }
      return true;
    })
    .filter(bug => {
      // Priority filter
      if (filterPriority !== "all") {
        return bug.priority === filterPriority;
      }
      return true;
    })
    .sort((a, b) => {
      // Sorting
      switch (sortBy) {
        case "votes":
          return b.votes - a.votes;
        case "comments":
          return b.comments - a.comments;
        case "priority":
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "created":
          // This would use actual dates in a real app
          return a.id.localeCompare(b.id);
        default:
          return 0;
      }
    });

  const displayedBugs = limit ? filteredBugs.slice(0, limit) : filteredBugs;

  const getStatusCounts = () => {
    return {
      all: bugs.length,
      open: bugs.filter(b => b.status === "open").length,
      "in-progress": bugs.filter(b => b.status === "in-progress").length,
      resolved: bugs.filter(b => b.status === "resolved").length,
      closed: 0 // No closed bugs in current dataset
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {showFilters && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Bug Reports</h1>
              <p className="text-muted-foreground">
                {filteredBugs.length} bug{filteredBugs.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" />
              Report Bug
            </Button>
          </div>

          {/* Search and Quick Filters */}
          <Card className="bg-card border border-border">
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bugs by title, description, labels, or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* Quick Filters */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <SortDesc className="h-4 w-4 text-muted-foreground" />
                    <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="votes">Most Voted</SelectItem>
                        <SelectItem value="created">Newest</SelectItem>
                        <SelectItem value="comments">Most Discussed</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status ({statusCounts.all})</SelectItem>
                        <SelectItem value="open">Open ({statusCounts.open})</SelectItem>
                        <SelectItem value="in-progress">In Progress ({statusCounts["in-progress"]})</SelectItem>
                        <SelectItem value="resolved">Resolved ({statusCounts.resolved})</SelectItem>
                        <SelectItem value="closed">Closed ({statusCounts.closed})</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={filterPriority} onValueChange={(value: any) => setFilterPriority(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priority</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setFilterStatus("all");
                      setFilterPriority("all");
                      setSortBy("votes");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Summary */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(statusCounts).map(([status, count]) => (
              <Card 
                key={status}
                className={`cursor-pointer transition-all duration-200 border ${
                  filterStatus === status 
                    ? 'ring-2 ring-primary bg-accent/50' 
                    : 'hover:bg-accent/30'
                }`}
                onClick={() => setFilterStatus(status as any)}
              >
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{count}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {status === "in-progress" ? "In Progress" : status}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Bug List */}
      <div className="space-y-4">
        {displayedBugs.length === 0 ? (
          <Card className="bg-card border border-border">
            <CardContent className="p-12 text-center">
              <Bug className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No bugs found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || filterStatus !== "all" || filterPriority !== "all"
                  ? "Try adjusting your search or filters"
                  : "Be the first to report a bug!"}
              </p>
              <Button variant="hero" className="gap-2">
                <Plus className="h-4 w-4" />
                Report Your First Bug
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {displayedBugs.map(bug => (
              <BugCard
                key={bug.id}
                bug={bug}
                onVote={handleVote}
                userVote={userVotes[bug.id]}
              />
            ))}
            
            {limit && filteredBugs.length > limit && (
              <div className="text-center py-4">
                <Button variant="outline" className="gap-2">
                  View All {filteredBugs.length} Bugs
                  <Bug className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}