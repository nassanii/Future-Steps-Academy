import axios from 'axios';

const API_URL = 'http://localhost:5030/api/Salary';

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }
    return {};
};

export const getMonthlySalaries = async (month, year) => {
    try {
        const response = await axios.get(`${API_URL}/monthly`, {
            params: { month, year },
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching monthly salaries:', error);
        throw error;
    }
};

export const paySalary = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/pay`, data, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        console.error('Error paying salary:', error);
        throw error;
    }
};

export const getPaymentHistory = async (teacherId) => {
    try {
        const response = await axios.get(`${API_URL}/history/${teacherId}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        console.error('Error fetching payment history:', error);
        throw error;
    }
};

export const bulkPaySalaries = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/bulk-pay`, data, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        console.error('Error processing bulk payment:', error);
        throw error;
    }
};
