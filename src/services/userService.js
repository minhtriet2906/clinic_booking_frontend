import axios from "../axios"

const handleLogin = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserService = (data) => {
    console.log('check data from service ', data);
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId,
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorsService = (limit) => {
    return axios.get(`/api/top-doctors?limit=${limit}`);
}

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`);
}

const saveDoctorInfoService = (data) => {
    return axios.post('/api/save-doctor-info', data);
}

const getDoctorDetailsService = (doctorId) => {
    return axios.get(`/api/get-doctor-details?id=${doctorId}`);
}

const saveBulkScheduleService = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
}

const getDoctorSchedulesByDateService = (doctorId, formattedDate) => {
    return axios.get(`/api/get-doctor-schedules-by-date?doctorId=${doctorId}&formattedDate=${formattedDate}`);

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
    saveDoctorInfoService,
    getDoctorDetailsService,
    saveBulkScheduleService,
    getDoctorSchedulesByDateService
}