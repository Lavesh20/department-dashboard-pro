import { 
  Department, 
  KPI, 
  Complaint, 
  Staff, 
  SLACase, 
  PerformanceMetric, 
  CategoryPerformance 
} from './types';

export const departments: Department[] = [
  { id: "d1", name: "Public Works" },
  { id: "d2", name: "Health Services" },
  { id: "d3", name: "Transportation" },
  { id: "d4", name: "Environmental Protection" },
  { id: "d5", name: "Housing & Development" }
];

export const kpis: Record<string, KPI[]> = {
  "d1": [
    {
      label: "Active Complaints",
      value: 42,
      trend: {
        direction: "down",
        value: "8%"
      },
      icon: "clipboard-list"
    },
    {
      label: "Avg. Response Time",
      value: "3.2h",
      trend: {
        direction: "up",
        value: "12%"
      },
      icon: "clock"
    },
    {
      label: "Resolution Rate",
      value: "78%",
      trend: {
        direction: "up",
        value: "5%"
      },
      icon: "check-circle"
    },
    {
      label: "Overdue Cases",
      value: 7,
      trend: {
        direction: "down",
        value: "14%"
      },
      icon: "alert-circle"
    }
  ],
  "d2": [
    {
      label: "Active Complaints",
      value: 38,
      trend: {
        direction: "up",
        value: "4%"
      },
      icon: "clipboard-list"
    },
    {
      label: "Avg. Response Time",
      value: "2.8h",
      trend: {
        direction: "down",
        value: "9%"
      },
      icon: "clock"
    },
    {
      label: "Resolution Rate",
      value: "82%",
      trend: {
        direction: "up",
        value: "7%"
      },
      icon: "check-circle"
    },
    {
      label: "Overdue Cases",
      value: 5,
      trend: {
        direction: "down",
        value: "23%"
      },
      icon: "alert-circle"
    }
  ]
};

export const departmentScores: Record<string, number> = {
  "d1": 78,
  "d2": 82,
  "d3": 65,
  "d4": 73,
  "d5": 86
};

// Updated mock complaints to match the new Complaint type
export const complaints: Complaint[] = [
  {
    _id: "C1001",
    id: "C1001", // For backward compatibility
    referenceNumber: "C1001",
    content_platform: "Road Maintenance",
    content_platform_details: {
      post_id: "P123",
      date: "2023-05-10T09:30:00Z",
      content: "Pothole on Main Street causing traffic hazards",
      username: "citizen123",
      url: "http://example.com/post/123"
    },
    department: "d1",
    location: "Main Street",
    name: "John Doe",
    severity: "high",
    summary: "Pothole on Main Street causing traffic hazards",
    complaint_score: 87,
    status: "new",
    priority: "high",
    submittedAt: "2023-05-10T09:30:00Z",
    category: "Road Maintenance",
    priorityScore: 87,
    description: "Pothole on Main Street causing traffic hazards" // For backward compatibility
  },
  {
    _id: "C1002",
    id: "C1002", // For backward compatibility
    referenceNumber: "C1002",
    content_platform: "Waste Management",
    content_platform_details: {
      post_id: "P124",
      date: "2023-05-09T14:15:00Z",
      content: "Missed garbage collection for 2 weeks",
      username: "citizen456",
      url: "http://example.com/post/124"
    },
    department: "d1",
    location: "Oak Avenue",
    name: "Jane Smith",
    severity: "medium",
    summary: "Missed garbage collection for 2 weeks",
    complaint_score: 65,
    status: "assigned",
    priority: "medium",
    submittedAt: "2023-05-09T14:15:00Z",
    category: "Waste Management",
    priorityScore: 65,
    description: "Missed garbage collection for 2 weeks" // For backward compatibility
  },
  {
    _id: "C1003",
    id: "C1003", // For backward compatibility
    referenceNumber: "C1003",
    content_platform: "Street Lighting",
    content_platform_details: {
      post_id: "P125",
      date: "2023-05-08T16:45:00Z",
      content: "Broken street light at 5th and Park",
      username: "citizen789",
      url: "http://example.com/post/125"
    },
    department: "d1",
    location: "5th and Park",
    name: "David Johnson",
    severity: "low",
    summary: "Broken street light at 5th and Park",
    complaint_score: 42,
    status: "in-progress",
    priority: "low",
    submittedAt: "2023-05-08T16:45:00Z",
    category: "Street Lighting",
    priorityScore: 42,
    description: "Broken street light at 5th and Park" // For backward compatibility
  },
  {
    _id: "C1004",
    id: "C1004", // For backward compatibility
    referenceNumber: "C1004",
    content_platform: "Water Supply",
    content_platform_details: {
      post_id: "P126",
      date: "2023-05-10T08:20:00Z",
      content: "Brown water coming from taps in Cedar neighborhood",
      username: "citizen101",
      url: "http://example.com/post/126"
    },
    department: "d1",
    location: "Cedar neighborhood",
    name: "Linda Brown",
    severity: "high",
    summary: "Brown water coming from taps in Cedar neighborhood",
    complaint_score: 91,
    status: "pending-input",
    priority: "high",
    submittedAt: "2023-05-10T08:20:00Z",
    category: "Water Supply",
    priorityScore: 91,
    description: "Brown water coming from taps in Cedar neighborhood" // For backward compatibility
  },
  {
    _id: "C1005",
    id: "C1005", // For backward compatibility
    referenceNumber: "C1005",
    content_platform: "Sidewalk Repair",
    content_platform_details: {
      post_id: "P127",
      date: "2023-05-07T11:10:00Z",
      content: "Cracked sidewalk creating accessibility issues",
      username: "citizen202",
      url: "http://example.com/post/127"
    },
    department: "d1",
    location: "Elm Street",
    name: "Robert Green",
    severity: "medium",
    summary: "Cracked sidewalk creating accessibility issues",
    complaint_score: 67,
    status: "resolved",
    priority: "medium",
    submittedAt: "2023-05-07T11:10:00Z",
    category: "Sidewalk Repair",
    priorityScore: 67,
    description: "Cracked sidewalk creating accessibility issues" // For backward compatibility
  },
  {
    _id: "C1006",
    id: "C1006", // For backward compatibility
    referenceNumber: "C1006",
    content_platform: "Road Maintenance",
    content_platform_details: {
      post_id: "P128",
      date: "2023-05-10T07:45:00Z",
      content: "Large sinkhole forming on Elm Street",
      username: "citizen303",
      url: "http://example.com/post/128"
    },
    department: "d1",
    location: "Elm Street",
    name: "Susan White",
    severity: "high",
    summary: "Large sinkhole forming on Elm Street",
    complaint_score: 95,
    status: "new",
    priority: "high",
    submittedAt: "2023-05-10T07:45:00Z",
    category: "Road Maintenance",
    priorityScore: 95,
    description: "Large sinkhole forming on Elm Street" // For backward compatibility
  },
  {
    _id: "C1007",
    id: "C1007", // For backward compatibility
    referenceNumber: "C1007",
    content_platform: "Noise Complaint",
    content_platform_details: {
      post_id: "P129",
      date: "2023-05-09T19:30:00Z",
      content: "Construction noise outside permitted hours",
      username: "citizen404",
      url: "http://example.com/post/129"
    },
    department: "d1",
    location: "Pine Avenue",
    name: "Michael Black",
    severity: "medium",
    summary: "Construction noise outside permitted hours",
    complaint_score: 63,
    status: "assigned",
    priority: "medium",
    submittedAt: "2023-05-09T19:30:00Z",
    category: "Noise Complaint",
    priorityScore: 63,
    description: "Construction noise outside permitted hours" // For backward compatibility
  },
  {
    _id: "C1008",
    id: "C1008", // For backward compatibility
    referenceNumber: "C1008",
    content_platform: "Traffic Signal",
    content_platform_details: {
      post_id: "P130",
      date: "2023-05-10T06:25:00Z",
      content: "Traffic light stuck on red at 12th Avenue intersection",
      username: "citizen505",
      url: "http://example.com/post/130"
    },
    department: "d1",
    location: "12th Avenue intersection",
    name: "Karen Blue",
    severity: "high",
    summary: "Traffic light stuck on red at 12th Avenue intersection",
    complaint_score: 89,
    status: "in-progress",
    priority: "high",
    submittedAt: "2023-05-10T06:25:00Z",
    category: "Traffic Signal",
    priorityScore: 89,
    description: "Traffic light stuck on red at 12th Avenue intersection" // For backward compatibility
  },
  {
    _id: "C1009",
    id: "C1009", // For backward compatibility
    referenceNumber: "C1009",
    content_platform: "Public Parks",
    content_platform_details: {
      post_id: "P131",
      date: "2023-05-08T15:40:00Z",
      content: "Playground equipment damaged and unsafe",
      username: "citizen606",
      url: "http://example.com/post/131"
    },
    department: "d1",
    location: "Central Park",
    name: "Thomas Gray",
    severity: "medium",
    summary: "Playground equipment damaged and unsafe",
    complaint_score: 72,
    status: "pending-input",
    priority: "medium",
    submittedAt: "2023-05-08T15:40:00Z",
    category: "Public Parks",
    priorityScore: 72,
    description: "Playground equipment damaged and unsafe" // For backward compatibility
  },
  {
    _id: "C1010",
    id: "C1010", // For backward compatibility
    referenceNumber: "C1010",
    content_platform: "Drainage",
    content_platform_details: {
      post_id: "P132",
      date: "2023-05-09T13:15:00Z",
      content: "Flooding on Oak Street after light rain",
      username: "citizen707",
      url: "http://example.com/post/132"
    },
    department: "d1",
    location: "Oak Street",
    name: "Jennifer Silver",
    severity: "high",
    summary: "Flooding on Oak Street after light rain",
    complaint_score: 84,
    status: "new",
    priority: "high",
    submittedAt: "2023-05-09T13:15:00Z",
    category: "Drainage",
    priorityScore: 84,
    description: "Flooding on Oak Street after light rain" // For backward compatibility
  }
];

export const staffMembers: Staff[] = [
  {
    id: "s1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg",
    status: "online",
    workload: 75,
    casesResolved: 147,
    averageHandlingTime: 2.3,
    assignedCases: []
  },
  {
    id: "s2",
    name: "Morgan Lee",
    avatar: "/placeholder.svg",
    status: "busy",
    workload: 90,
    casesResolved: 132,
    averageHandlingTime: 2.5,
    assignedCases: []
  },
  {
    id: "s3",
    name: "Taylor Smith",
    avatar: "/placeholder.svg",
    status: "online",
    workload: 60,
    casesResolved: 156,
    averageHandlingTime: 1.9,
    assignedCases: []
  },
  {
    id: "s4",
    name: "Jordan Chen",
    avatar: "/placeholder.svg",
    status: "offline",
    workload: 0,
    casesResolved: 118,
    averageHandlingTime: 2.8,
    assignedCases: []
  },
  {
    id: "s5",
    name: "Sam Rivera",
    avatar: "/placeholder.svg",
    status: "online",
    workload: 40,
    casesResolved: 125,
    averageHandlingTime: 2.4,
    assignedCases: []
  }
];

export const slaCases: SLACase[] = [
  {
    complaintId: "C1001",
    deadline: "2023-05-12T09:30:00Z",
    status: "on-track"
  },
  {
    complaintId: "C1002",
    deadline: "2023-05-11T14:15:00Z",
    status: "at-risk"
  },
  {
    complaintId: "C1004",
    deadline: "2023-05-12T08:20:00Z",
    status: "at-risk"
  },
  {
    complaintId: "C1006",
    deadline: "2023-05-12T07:45:00Z",
    status: "on-track"
  },
  {
    complaintId: "C1007",
    deadline: "2023-05-11T19:30:00Z",
    status: "breached"
  },
  {
    complaintId: "C1008",
    deadline: "2023-05-12T06:25:00Z",
    status: "on-track"
  },
  {
    complaintId: "C1010",
    deadline: "2023-05-11T13:15:00Z",
    status: "breached"
  }
];

export const historicalSLA = [
  { date: "May 1", compliance: 86 },
  { date: "May 2", compliance: 88 },
  { date: "May 3", compliance: 84 },
  { date: "May 4", compliance: 87 },
  { date: "May 5", compliance: 82 },
  { date: "May 6", compliance: 79 },
  { date: "May 7", compliance: 81 },
  { date: "May 8", compliance: 83 },
  { date: "May 9", compliance: 85 },
  { date: "May 10", compliance: 78 }
];

export const dailySLAPerformance = 83; // percentage

export const staffPerformance: PerformanceMetric[] = [
  {
    staffId: "s1",
    staffName: "Alex Johnson",
    casesResolved: 28,
    averageHandlingTime: 2.3,
    customerSatisfaction: 4.7
  },
  {
    staffId: "s2",
    staffName: "Morgan Lee",
    casesResolved: 25,
    averageHandlingTime: 2.5,
    customerSatisfaction: 4.5
  },
  {
    staffId: "s3",
    staffName: "Taylor Smith",
    casesResolved: 32,
    averageHandlingTime: 1.9,
    customerSatisfaction: 4.8
  },
  {
    staffId: "s4",
    staffName: "Jordan Chen",
    casesResolved: 22,
    averageHandlingTime: 2.8,
    customerSatisfaction: 4.3
  },
  {
    staffId: "s5",
    staffName: "Sam Rivera",
    casesResolved: 24,
    averageHandlingTime: 2.4,
    customerSatisfaction: 4.6
  }
];

export const categoryPerformance: CategoryPerformance[] = [
  {
    category: "Road Maintenance",
    averageResolutionTime: 3.2,
    volumePercentage: 28
  },
  {
    category: "Waste Management",
    averageResolutionTime: 2.1,
    volumePercentage: 15
  },
  {
    category: "Street Lighting",
    averageResolutionTime: 1.5,
    volumePercentage: 12
  },
  {
    category: "Water Supply",
    averageResolutionTime: 3.8,
    volumePercentage: 22
  },
  {
    category: "Sidewalk Repair",
    averageResolutionTime: 4.2,
    volumePercentage: 18
  },
  {
    category: "Others",
    averageResolutionTime: 2.5,
    volumePercentage: 5
  }
];

export const systemAverages = {
  responseTime: 2.7, // hours
  resolutionRate: 74, // percentage
  customerSatisfaction: 4.4 // out of 5
};
