import axios from 'axios';

const BASE_URL = "http://localhost:5030/api/Report";

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }
    return {};
};

export const generateReport = async (month, year) => {
    try {
        const response = await axios.post(`${BASE_URL}/generate-report?month=${month}&year=${year}`, {}, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getAllReports = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/all-reports`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
