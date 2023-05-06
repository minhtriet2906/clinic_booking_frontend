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

const editUserService = (inputData) => {
    return axios.put('/api/edit_user', inputData);
}

const getAllCodeService = (inputType) => {
    console.log('check input type ', inputType);
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorsService = (limit) => {
    return axios.get(`/api/top_doctor?limit=${limit}`)
}

const getAllDoctorsService = () => {
    return axios.get(`/api/get_all_doctors`);
}

const saveDoctorInfoService = (data) => {
    return axios.post('/api/save_doctor_info', data)
}

export {
    handleLogin,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorsService,
    getAllDoctorsService,
    saveDoctorInfoService
}