import axios from 'axios';

const API_URL = "http://localhost:5030/api/Department";

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }
    return {};
};

export const getAllDepartments = async () => {
    try {
        const response = await axios.get(API_URL, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getDepartmentById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createDepartment = async (departmentData) => {
    try {
        const response = await axios.post(API_URL, departmentData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateDepartment = async (id, departmentData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, departmentData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteDepartment = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
