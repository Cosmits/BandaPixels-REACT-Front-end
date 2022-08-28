import axios from "axios";

export const BASE_URL = 'http://localhost:5000'

export const myAxiosConfig = {
    baseURL: BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
}

const instanceAxios = axios.create(myAxiosConfig)


// Add a request interceptor
instanceAxios.interceptors.request.use(function (config) {

    if (localStorage.getItem('AccessToken')) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('AccessToken')}`;
        config.headers.Authorization = `Bearer ${localStorage.getItem("AccessToken")}`
     }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instanceAxios.interceptors.response.use(function (response) {

    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instanceAxios
