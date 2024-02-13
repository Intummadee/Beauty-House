import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    // เราไม่ต้องคอยพิม localhostแล้ว เพราะมันเซ้ตbaseUrlแล้ว
})

// 1.มันเซ็ตbaseUrlให้
// 2.แนบBearer ${token}เข้าไปในAuthorizationให้เองอัติโนมัติ
instance.interceptors.request.use(
    // ทุกครั้งที่เรายิงreqไปbackend เราจะไปดึงlocalstorage แล้วเซ็ต Authorization
    function (config) {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance
