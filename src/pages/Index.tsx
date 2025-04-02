
import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KPICard } from "@/components/ui/KPICard";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { ComplaintCard } from "@/components/ui/ComplaintCard";
import { StaffCard } from "@/components/ui/StaffCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  departments, 
  kpis, 
  departmentScores,
  staffMembers
} from "@/lib/mockData";
import { TimePeriod, Complaint } from "@/lib/types";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { fetchAllComplaints, fetchDepartmentComplaints } from "@/lib/api";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const [selectedDept, setSelectedDept] = useState(departments[0].id);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("week");

  // Fetch complaints from the backend
  const { data: complaints = [], isLoading, error } = useQuery({
    queryKey: ['complaints', selectedDept],
    queryFn: () => selectedDept === 'all' 
      ? fetchAllComplaints() 
      : fetchDepartmentComplaints(selectedDept),
  });

  const handleAssign = (complaint: Complaint) => {
    toast.success("Complaint assigned successfully", {
      description: `Complaint ${complaint.referenceNumber || complaint._id} has been assigned.`
    });
  };

  const handleEscalate = (complaint: Complaint) => {
    toast.info("Complaint escalated", {
      description: `Complaint ${complaint.referenceNumber || complaint._id} has been escalated to higher priority.`
    });
  };

  const handleResolve = (complaint: Complaint) => {
    toast.success("Complaint resolved", {
      description: `Complaint ${complaint.referenceNumber || complaint._id} has been marked as resolved.`
    });
  };

  // Filter complaints by status
  const getComplaintsByStatus = (status: string) => {
    return complaints.filter(c => (c.status || 'new') === status).slice(0, 3);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="space-y-6 animate-fade-in">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="h1">Department Overview</h1>
              <p className="text-muted-foreground mt-1">
                Loading data...
              </p>
            </div>
          </header>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center">
              <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
              <p>Loading data from backend...</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="space-y-6 animate-fade-in">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="h1">Department Overview</h1>
              <p className="text-muted-foreground mt-1">
                Error loading data
              </p>
            </div>
          </header>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center text-center max-w-md">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <h2 className="text-xl font-semibold mb-2">Failed to load complaints</h2>
              <p className="text-muted-foreground mb-4">
                There was an error connecting to the backend service. Please check your connection or try again later.
              </p>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="h1">Department Overview</h1>
            <p className="text-muted-foreground mt-1">
              Monitor performance and manage complaints efficiently
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Select value={selectedDept} onValueChange={setSelectedDept}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedPeriod} onValueChange={(value: TimePeriod) => setSelectedPeriod(value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis[selectedDept]?.map((kpi, index) => (
            <KPICard key={`${kpi.label}-${index}`} kpi={kpi} />
          ))}
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Complaint Queue</CardTitle>
                  <CardDescription>Recently submitted cases requiring attention</CardDescription>
                </div>
                <Badge variant="outline" className="px-2 py-1">
                  {complaints.filter(c => c.status !== "resolved").length} active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="new" className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="new">New</TabsTrigger>
                    <TabsTrigger value="assigned">Assigned</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="pending-input">Pending Input</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="new" className="mt-0 space-y-3">
                  {getComplaintsByStatus('new').length > 0 ? (
                    getComplaintsByStatus('new').map(complaint => (
                      <ComplaintCard 
                        key={complaint._id} 
                        complaint={complaint} 
                        onAssign={handleAssign}
                        onEscalate={handleEscalate}
                      />
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No new complaints
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="assigned" className="mt-0 space-y-3">
                  {getComplaintsByStatus('assigned').length > 0 ? (
                    getComplaintsByStatus('assigned').map(complaint => (
                      <ComplaintCard 
                        key={complaint._id} 
                        complaint={complaint} 
                        onEscalate={handleEscalate}
                      />
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No assigned complaints
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="in-progress" className="mt-0 space-y-3">
                  {getComplaintsByStatus('in-progress').length > 0 ? (
                    getComplaintsByStatus('in-progress').map(complaint => (
                      <ComplaintCard 
                        key={complaint._id} 
                        complaint={complaint} 
                        onResolve={handleResolve}
                      />
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No in-progress complaints
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="pending-input" className="mt-0 space-y-3">
                  {getComplaintsByStatus('pending-input').length > 0 ? (
                    getComplaintsByStatus('pending-input').map(complaint => (
                      <ComplaintCard 
                        key={complaint._id} 
                        complaint={complaint} 
                        onResolve={handleResolve}
                      />
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No pending-input complaints
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Performance Score</CardTitle>
                  <CardDescription>Overall department rating</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <CircularProgress 
                value={departmentScores[selectedDept] || 0} 
                size="lg" 
                color={
                  (departmentScores[selectedDept] || 0) >= 80 ? "success" : 
                  (departmentScores[selectedDept] || 0) >= 60 ? "warning" : "danger"
                }
                label="Performance"
              />
              
              <div className="mt-6 w-full">
                <h4 className="text-sm font-semibold mb-2">Available Staff</h4>
                <div className="space-y-2">
                  {staffMembers
                    .filter(s => s.status !== "offline")
                    .slice(0, 3)
                    .map(staff => (
                      <StaffCard key={staff.id} staff={staff} compact />
                    ))
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
