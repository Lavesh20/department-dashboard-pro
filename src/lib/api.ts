
import axios from 'axios';
import { Complaint } from './types';

const API_URL = 'http://localhost:5000/api';

// Transform backend data to match our frontend structure
const transformComplaintData = (complaint: any): Complaint => {
  // Map severity to our Priority type
  const mapSeverityToPriority = (severity: string): "high" | "medium" | "low" => {
    switch (severity.toLowerCase()) {
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
    ...complaint, // Keep all original fields
    id: complaint._id, // For compatibility with existing UI components
    priority: mapSeverityToPriority(complaint.severity),
    status,
    submittedAt: complaint.content_platform_details?.date || new Date().toISOString(),
    category: complaint.content_platform || 'General',
    priorityScore: complaint.complaint_score || 0,
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
  try {
    const response = await axios.get(`${API_URL}/complaints/department/${department}`);
    return response.data.map(transformComplaintData);
  } catch (error) {
    console.error(`Error fetching complaints for department ${department}:`, error);
    throw error;
  }
};
