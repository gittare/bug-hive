import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Github, Upload, X, Plus } from "lucide-react";

interface BugSubmissionFormProps {
  onSubmit: (bugData: BugSubmissionData) => Promise<void>;
  onCancel?: () => void;
}

interface BugSubmissionData {
  title: string;
  description: string;
  stepsToReproduce: string;
  expectedBehavior: string;
  actualBehavior: string;
  priority: "low" | "medium" | "high" | "critical";
  githubRepo?: string;
  labels: string[];
  attachments: File[];
}

export function BugSubmissionForm({ onSubmit, onCancel }: BugSubmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BugSubmissionData>({
    title: "",
    description: "",
    stepsToReproduce: "",
    expectedBehavior: "",
    actualBehavior: "",
    priority: "medium",
    githubRepo: "",
    labels: [],
    attachments: []
  });
  const [newLabel, setNewLabel] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addLabel = () => {
    if (newLabel.trim() && !formData.labels.includes(newLabel.trim())) {
      setFormData(prev => ({
        ...prev,
        labels: [...prev.labels, newLabel.trim()]
      }));
      setNewLabel("");
    }
  };

  const removeLabel = (labelToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      labels: prev.labels.filter(label => label !== labelToRemove)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          🐛 Report a Bug
          <Badge variant="gaming" className="ml-auto">
            +50 pts
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-base font-medium">
                Bug Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Briefly describe the bug"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-base font-medium">
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Provide a detailed description of the bug"
                rows={4}
                required
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority" className="text-base font-medium">
                  Priority
                </Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: any) => setFormData(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="githubRepo" className="text-base font-medium flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  GitHub Repository
                </Label>
                <Input
                  id="githubRepo"
                  value={formData.githubRepo}
                  onChange={(e) => setFormData(prev => ({ ...prev, githubRepo: e.target.value }))}
                  placeholder="owner/repository"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Detailed Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bug Details</h3>
            
            <div>
              <Label htmlFor="stepsToReproduce" className="text-base font-medium">
                Steps to Reproduce *
              </Label>
              <Textarea
                id="stepsToReproduce"
                value={formData.stepsToReproduce}
                onChange={(e) => setFormData(prev => ({ ...prev, stepsToReproduce: e.target.value }))}
                placeholder="1. Go to...&#10;2. Click on...&#10;3. See error"
                rows={4}
                required
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expectedBehavior" className="text-base font-medium">
                  Expected Behavior *
                </Label>
                <Textarea
                  id="expectedBehavior"
                  value={formData.expectedBehavior}
                  onChange={(e) => setFormData(prev => ({ ...prev, expectedBehavior: e.target.value }))}
                  placeholder="What should happen?"
                  rows={3}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="actualBehavior" className="text-base font-medium">
                  Actual Behavior *
                </Label>
                <Textarea
                  id="actualBehavior"
                  value={formData.actualBehavior}
                  onChange={(e) => setFormData(prev => ({ ...prev, actualBehavior: e.target.value }))}
                  placeholder="What actually happens?"
                  rows={3}
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Labels */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Labels & Attachments</h3>
            
            <div>
              <Label className="text-base font-medium">Labels</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="Add a label"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLabel())}
                />
                <Button type="button" onClick={addLabel} variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {formData.labels.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.labels.map((label) => (
                    <Badge key={label} variant="outline" className="gap-1">
                      {label}
                      <button
                        type="button"
                        onClick={() => removeLabel(label)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="attachments" className="text-base font-medium">
                Attachments
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="attachments"
                  type="file"
                  multiple
                  accept="image/*,.txt,.log"
                  onChange={handleFileUpload}
                  className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-accent file:text-accent-foreground"
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
              
              {formData.attachments.length > 0 && (
                <div className="space-y-2 mt-2">
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-accent rounded">
                      <span className="text-sm truncate flex-1">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              variant="hero"
              disabled={isSubmitting || !formData.title || !formData.description}
              className="min-w-[120px]"
            >
              {isSubmitting ? "Submitting..." : "Submit Bug Report"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}