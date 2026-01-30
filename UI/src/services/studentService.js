import axios from 'axios';

const API_URL = "http://localhost:5030/api/Student";

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }
    return {};
};

export const getAllStudents = async () => {
    try {
        const response = await axios.get(API_URL, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getStudentById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createStudent = async (studentData) => {
    try {
        const response = await axios.post(API_URL, studentData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateStudent = async (id, studentData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, studentData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteStudent = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
