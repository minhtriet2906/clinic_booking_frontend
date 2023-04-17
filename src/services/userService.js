import axios from "../axios"

const handleLogin = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get_all_users?id=${inputId}`);
}

const createNewUserService = (data) => {
    console.log('check data from service ', data);
    return axios.post('/api/create_new_user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete_user', {
        data: {
            id: userId,
        }
    });
}
export { handleLogin, getAllUsers, createNewUserService, deleteUserService }