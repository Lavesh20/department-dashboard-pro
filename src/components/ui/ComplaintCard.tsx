
import React from "react";
import { Clock, ArrowRight, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Complaint, Priority } from "@/lib/types";

interface ComplaintCardProps {
  complaint: Complaint;
  className?: string;
  onAssign?: (complaint: Complaint) => void;
  onEscalate?: (complaint: Complaint) => void;
  onResolve?: (complaint: Complaint) => void;
}

export function ComplaintCard({ 
  complaint, 
  className,
  onAssign,
  onEscalate,
  onResolve
}: ComplaintCardProps) {
  const priorityClass: Record<Priority, string> = {
    "high": "priority-high",
    "medium": "priority-medium",
    "low": "priority-low"
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + 
           date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Get the complaint ID from either id or _id
  const complaintId = complaint.id || complaint._id;
  
  // Use reference number, or id/reference number as fallback
  const refNumber = complaint.referenceNumber || complaintId;
  
  // Use either description, content or summary
  const complaintText = complaint.description || 
                        complaint.content_platform_details?.content || 
                        complaint.summary || "";
  
  return (
    <Card className={cn("complaint-card group", className)}>
      <div className={cn(
        "self-stretch", 
        complaint.priority ? priorityClass[complaint.priority as Priority] : "priority-medium"
      )} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs text-muted-foreground">{refNumber}</span>
            <Badge 
              variant="outline" 
              className="text-xs bg-secondary/50 hover:bg-secondary"
            >
              {complaint.category || complaint.content_platform}
            </Badge>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1 inline" />
            <span>
              {complaint.submittedAt ? formatDate(complaint.submittedAt) : 
                complaint.content_platform_details?.date ? formatDate(complaint.content_platform_details.date) : "N/A"}
            </span>
          </div>
        </div>
        
        <p className="text-sm line-clamp-2 mb-3">{complaintText}</p>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2 justify-end">
          <TooltipProvider>
            {onAssign && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 px-2"
                    onClick={() => onAssign(complaint)}
                  >
                    Assign
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Assign to staff member</TooltipContent>
              </Tooltip>
            )}
            
            {onEscalate && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 px-2 text-[hsl(0,84%,60%)]"
                    onClick={() => onEscalate(complaint)}
                  >
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Escalate
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Escalate to higher priority</TooltipContent>
              </Tooltip>
            )}
            
            {onResolve && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="h-8 px-2"
                    onClick={() => onResolve(complaint)}
                  >
                    <ArrowRight className="h-3 w-3 mr-1" />
                    Resolve
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Mark as resolved</TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </div>
      </div>
    </Card>
  );
}
