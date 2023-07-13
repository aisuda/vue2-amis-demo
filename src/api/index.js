import axios from 'axios';

/**
 * AXIOS INTERCEPTOR
 * INTERCEPTORS.REQEUST.USE => BEFORE REQUEST
 * INTERCEPTORS.RESPONSE.USE => AFTER RESPONE
 */

const service = axios.create({
    baseURL: 'http://www.sample.com',
    withCredentials: true,
    timeout: 30000
})

service.interceptors.request.use((config) => {

}, (error) => {

})

service.interceptors.response.use((response) => {

}, (error) => {

})

export default service;