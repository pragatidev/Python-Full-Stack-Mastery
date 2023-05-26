import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export function getPosts() {
    return axios.get(`${API_URL}/posts/`);
}

export function createPost(data) {
    return axios.post(`${API_URL}/posts/`, data);
}

export function updatePost(id, data) {
    return axios.put(`${API_URL}/posts/${id}/`, data);
}

export function deletePost(id) {
    return axios.delete(`${API_URL}/posts/${id}/`);
}

export function getPost(id) {
    return axios.get(`${API_URL}/posts/${id}/`);
}
