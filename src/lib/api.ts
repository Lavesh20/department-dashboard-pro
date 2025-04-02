
import axios from 'axios';
import { Complaint, ComplaintStatus, Priority } from './types';

const API_URL = 'http://localhost:5000/api';

// Transform backend data to match our frontend structure
const transformComplaintData = (complaint: any): Complaint => {
  // Map severity to our Priority type
  const mapSeverityToPriority = (severity: string): Priority => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return 'high';
      case 'medium':
        return 'medium';
      default:
        return 'low';
    }
  };

  // Assuming all complaints start as new unless specified
  const status: ComplaintStatus = complaint.status || 'new';

  return {
    _id: complaint._id,
    referenceNumber: complaint.referenceNumber || complaint._id.substring(0, 8),
    content_platform: complaint.content_platform || 'General',
    content_platform_details: complaint.content_platform_details || {
      post_id: '',
      date: new Date().toISOString(),
      content: complaint.summary || '',
      username: complaint.name || 'Anonymous',
      url: '',
    },
    department: complaint.department || 'General',
    location: complaint.location || '',
    name: complaint.name || 'Anonymous',
    severity: complaint.severity || 'low',
    summary: complaint.summary || '',
    complaint_score: complaint.complaint_score || 0,
    
    // Fields needed for UI functionality
    id: complaint._id, // For backward compatibility
    status,
    priority: mapSeverityToPriority(complaint.severity),
    submittedAt: complaint.content_platform_details?.date || new Date().toISOString(),
    category: complaint.content_platform || 'General',
    priorityScore: complaint.complaint_score || 0,
    description: complaint.content_platform_details?.content || complaint.summary || '', // For backward compatibility
  };
};

export const fetchAllComplaints = async (): Promise<Complaint[]> => {
  try {
    const response = await axios.get(`${API_URL}/complaints`);
    return response.data.map(transformComplaintData);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    throw error;
  }
};

export const fetchDepartmentComplaints = async (department: string): Promise<Complaint[]> => {
  if (department === 'all') {
    return fetchAllComplaints();
  }
  
  try {
    const response = await axios.get(`${API_URL}/complaints/department/${department}`);
    return response.data.map(transformComplaintData);
  } catch (error) {
    console.error(`Error fetching complaints for department ${department}:`, error);
    throw error;
  }
};
