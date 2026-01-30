import axios from 'axios';

const API_URL = "http://localhost:5030/api/Teacher";

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }
    return {};
};

export const getAllTeachers = async () => {
    try {
        const response = await axios.get(API_URL, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getTeacherById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createTeacher = async (teacherData) => {
    try {
        const response = await axios.post(API_URL, teacherData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateTeacher = async (id, teacherData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, teacherData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteTeacher = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
