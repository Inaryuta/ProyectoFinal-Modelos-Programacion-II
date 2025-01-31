import axios from 'axios';

// Replace with your actual API endpoint
const API_BASE_URL = 'http://localhost:3000/api';

export const fetchMatchData = async (matchId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/matches/${matchId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching match data:', error);
    throw error;
  }
};

export const fetchMatchStatistics = async (matchId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/matches/${matchId}/statistics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching match statistics:', error);
    throw error;
  }
};