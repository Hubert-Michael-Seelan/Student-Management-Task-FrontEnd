import axios from 'axios';

const API_URL = 'http://localhost:4000/students'; 

export const getStudents = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createStudent = async (student) => {
    const response = await axios.post(`${API_URL}/add`, student);
    return response.data;
};

export const deleteStudent = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const updateStudent = async (student) => {
    const response = await axios.put(`${API_URL}/update/${student._id}`, student);
    return response.data;
};