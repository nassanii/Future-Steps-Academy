import axios from 'axios';

const API_URL = "http://localhost:5030/api/Course";

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }
    return {};
};

export const getAllCourses = async () => {
    try {
        const response = await axios.get(API_URL, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getCourseById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createCourse = async (courseData) => {
    try {
        const response = await axios.post(API_URL, courseData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateCourse = async (id, courseData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, courseData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteCourse = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
