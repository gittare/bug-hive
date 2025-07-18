import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Bot, 
  Send, 
  Sparkles, 
  Brain, 
  Target, 
  TrendingUp,
  FileText,
  Users,
  Github,
  Zap,
  Lightbulb,
  Shield
} from "lucide-react";

interface AIMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: AISuggestion[];
}

interface AISuggestion {
  type: "priority" | "label" | "assignment" | "duplicate" | "solution";
  title: string;
  description: string;
  confidence: number;
  action?: () => void;
}

interface AIAssistantProps {
  context?: {
    currentBug?: any;
    recentBugs?: any[];
    userProfile?: any;
  };
}

export function AIAssistant({ context }: AIAssistantProps) {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hi! I'm your AI Bug Assistant. I can help you analyze bugs, suggest priorities, find duplicates, and provide solutions. What would you like me to help you with?",
      timestamp: new Date(),
      suggestions: [
        {
          type: "priority",
          title: "Analyze Current Bugs",
          description: "Get AI-powered priority suggestions for open bugs",
          confidence: 95
        },
        {
          type: "duplicate",
          title: "Find Duplicates",
          description: "Scan for potential duplicate bug reports",
          confidence: 88
        },
        {
          type: "solution",
          title: "Suggest Solutions",
          description: "Get AI-generated solution recommendations",
          confidence: 92
        }
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, context);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string, context?: any): AIMessage => {
    const responses = [
      {
        content: "Based on the bug patterns I've analyzed, I recommend prioritizing the memory leak issue as 'Critical' due to its performance impact. The login button issue should be 'High' priority as it affects user authentication flow.",
        suggestions: [
          {
            type: "priority" as const,
            title: "Auto-prioritize Critical Bugs",
            description: "Apply AI-suggested priorities to 5 pending bugs",
            confidence: 94
          },
          {
            type: "assignment" as const,
            title: "Suggest Assignees",
            description: "Match bugs to developers based on expertise",
            confidence: 87
          }
        ]
      },
      {
        content: "I found 3 potential duplicate reports related to mobile UI issues. The 'Login button not responding' bug appears similar to issue #87 from last month. Would you like me to merge them?",
        suggestions: [
          {
            type: "duplicate" as const,
            title: "Merge Duplicates",
            description: "Combine 3 similar mobile UI bug reports",
            confidence: 91
          },
          {
            type: "label" as const,
            title: "Add Smart Labels",
            description: "Apply 'mobile-ui', 'login-flow' labels automatically",
            confidence: 96
          }
        ]
      },
      {
        content: "For the memory leak in the dashboard component, I suggest implementing useCallback and useMemo hooks, and adding cleanup functions for event listeners. This pattern has resolved similar issues in 89% of cases.",
        suggestions: [
          {
            type: "solution" as const,
            title: "Generate Code Fix",
            description: "Create a pull request with the suggested solution",
            confidence: 85
          },
          {
            type: "priority" as const,
            title: "Track Performance Impact",
            description: "Monitor memory usage after implementing fix",
            confidence: 93
          }
        ]
      }
    ];

    return {
      id: Date.now().toString(),
      type: "assistant",
      content: responses[Math.floor(Math.random() * responses.length)].content,
      timestamp: new Date(),
      suggestions: responses[Math.floor(Math.random() * responses.length)].suggestions
    };
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "priority": return <Target className="h-4 w-4" />;
      case "label": return <FileText className="h-4 w-4" />;
      case "assignment": return <Users className="h-4 w-4" />;
      case "duplicate": return <Github className="h-4 w-4" />;
      case "solution": return <Lightbulb className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  const getSuggestionVariant = (confidence: number) => {
    if (confidence >= 90) return "success";
    if (confidence >= 80) return "warning";
    return "badge";
  };

  return (
    <Card className="w-full h-[600px] flex flex-col bg-card border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          AI Bug Assistant
          <Badge variant="gaming" className="ml-auto gap-1">
            <Brain className="h-3 w-3" />
            GPT-4o
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4 gap-4">
        {/* Messages Area */}
        <ScrollArea className="flex-1 pr-2">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-3">
                <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === "user" 
                      ? "bg-primary text-primary-foreground ml-4" 
                      : "bg-accent text-accent-foreground mr-4"
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {/* AI Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="ml-2 space-y-2">
                    <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      AI Suggestions
                    </p>
                    {message.suggestions.map((suggestion, index) => (
                      <div key={index} className="bg-muted/50 rounded-lg p-3 border border-border/50">
                        <div className="flex items-start gap-2">
                          <div className="text-primary mt-0.5">
                            {getSuggestionIcon(suggestion.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm">{suggestion.title}</h4>
                              <Badge variant={getSuggestionVariant(suggestion.confidence)} className="text-xs">
                                {suggestion.confidence}% confident
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-2 h-7 text-xs"
                              onClick={suggestion.action}
                            >
                              Apply Suggestion
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mr-4">
                <div className="bg-accent text-accent-foreground p-3 rounded-lg max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <Separator />

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about bug analysis, priorities, duplicates..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputMessage.trim() || isTyping}
            variant="hero"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-7"
            onClick={() => setInputMessage("Analyze current high priority bugs")}
          >
            <TrendingUp className="h-3 w-3 mr-1" />
            Analyze Priorities
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-7"
            onClick={() => setInputMessage("Find potential duplicate bug reports")}
          >
            <Shield className="h-3 w-3 mr-1" />
            Find Duplicates
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-7"
            onClick={() => setInputMessage("Suggest solutions for memory leaks")}
          >
            <Zap className="h-3 w-3 mr-1" />
            Get Solutions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}