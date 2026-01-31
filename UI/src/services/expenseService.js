import axios from 'axios';

const BASE_URL = "http://localhost:5030/api";

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }
    return {};
};

// Expenses
export const getAllExpenses = async (teacherId, categoryId) => {
    const params = {};
    if (teacherId) params.TeacherId = teacherId; // Note: Check API mapping, often case insensitive but good to match
    if (categoryId) params.CategoryId = categoryId;
    try {
        const response = await axios.get(`${BASE_URL}/Expense`, {
            params,
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getExpenseById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/Expense/${id}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createExpense = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/Expense`, data, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateExpense = async (id, data) => {
    try {
        // Controller accepts ID in query: Update(int id, [FromBody]...)
        const response = await axios.put(`${BASE_URL}/Expense?id=${id}`, data, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteExpense = async (id) => {
    try {
        // Controller accepts ID in query: Delete(int id)
        const response = await axios.delete(`${BASE_URL}/Expense?id=${id}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Categories
export const getAllExpenseCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/ExpenseCategory`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createExpenseCategory = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/ExpenseCategory`, data, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateExpenseCategory = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/ExpenseCategory/${id}`, data, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteExpenseCategory = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/ExpenseCategory/${id}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
