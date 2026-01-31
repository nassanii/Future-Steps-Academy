import axios from 'axios';

const API_URL = 'http://localhost:5030/api/Grades';

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
};

const getAllGrades = async () => {
    const response = await axios.get(API_URL, { headers: getAuthHeader() });
    return response.data;
};

const getGradeById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() });
    return response.data;
};

const createGrade = async (gradeData) => {
    const response = await axios.post(API_URL, gradeData, { headers: getAuthHeader() });
    return response.data;
};

const updateGrade = async (id, gradeData) => {
    const response = await axios.put(`${API_URL}/${id}`, gradeData, { headers: getAuthHeader() });
    return response.data;
};

const deleteGrade = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
    return response.data;
};

const getStudentGrades = async (studentId) => {
    const response = await axios.get(`${API_URL}/student/${studentId}`, { headers: getAuthHeader() });
    return response.data;
};

const gradesService = {
    getAllGrades,
    getGradeById,
    createGrade,
    updateGrade,
    deleteGrade,
    getStudentGrades
};

export default gradesService;
