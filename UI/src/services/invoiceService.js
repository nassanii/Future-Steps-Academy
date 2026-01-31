import axios from 'axios';

const BASE_URL = "http://localhost:5030/api";

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }
    return {};
};

// --- Invoices ---

export const getAllInvoices = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/Invoices`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getInvoiceById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/Invoices/${id}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createInvoice = async (invoiceData) => {
    try {
        const response = await axios.post(`${BASE_URL}/Invoices`, invoiceData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteInvoice = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/Invoices/${id}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// --- Payments ---

export const addPayment = async (paymentData) => {
    try {
        // paymentData should match CreatePayementDTO: { InvoiceId, Amount, PaymentDate, Description, PaymentType, Method }
        const response = await axios.post(`${BASE_URL}/Payment`, paymentData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
