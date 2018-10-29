/*
  서버와 통신하는 코드
*/
import axios from 'axios';
import queryString from 'query-string';

export const writePost = ({title, body, userid, username, tags}) => axios.post('/api/posts', {title, body, userid, username, tags});
export const getPost = (id) => axios.get(`/api/posts/${id}`);
export const getPostList = ({tag, page}) => axios.get(`/api/posts/?${queryString.stringify({tag, page})}`);
export const editPost = ({id, title, body, tags}) => axios.patch(`/api/posts/${id}`, {title, body, tags});
export const removePost = (id) => axios.delete(`/api/posts/${id}`);

//login
export const login = (userid, password) => axios.post('/api/auth/login', {userid, password});
export const joinus = (userid, password, username, email) => axios.post('/api/auth/joinus', {userid, password, username, email});
export const checkLogin = () => axios.get('/api/auth/check');
export const logout = () => axios.post('/api/auth/logout');