import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService, getTopDoctorsService } from '../../services/userService';
import { toast } from 'react-toastify';


// fetch genders
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await getAllCodeService('GENDER');
            if (res && res.errorCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }
            else {
                dispatch(fetchGenderFail());
            }
        } catch (error) {
            dispatch(fetchGenderFail());
            console.log(error);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})


// fetch roles
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROLE');
            if (res && res.errorCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }
            else {
                dispatch(fetchRoleFail());
            }
        } catch (error) {
            dispatch(fetchRoleFail());
            console.log(error);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

//fetch positions
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('POSITION');
            if (res && res.errorCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }
            else {
                dispatch(fetchPositionFail());
            }
        } catch (error) {
            dispatch(fetchPositionFail());
            console.log(error);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

// create user
export const createNewUser = (userData) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(userData);
            if (res && res.errorCode === 0) {
                dispatch(createUserSuccess());
                toast.success('New User Created');
                //reload users list
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error('Error!');
                dispatch(createUserFail());
            }
        } catch (error) {
            toast.error('Error!');
            dispatch(createUserFail());
            console.log(error);
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL,
})


//delete user
export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errorCode === 0) {
                dispatch(deleteUserSuccess());
                toast.success('User Deleted');
                //reload users list
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error('Error!');
                dispatch(deleteUserFail());
            }
        } catch (error) {
            toast.error('Error!');
            dispatch(deleteUserFail());
            console.log(error);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL,
})


//edit user 
export const editUser = (userData) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(userData);
            console.log('error ', res);
            if (res && res.errorCode === 0) {
                dispatch(editUserSuccess());
                toast.success('Edit User Success');
                //reload users list
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error('Error!');
                dispatch(editUserFail());
            }
        } catch (error) {
            toast.error('Error!');
            dispatch(editUserFail());
            console.log(error);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL,
})

//fetch all users
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            if (res && res.errorCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users));
            }
            else {
                dispatch(fetchAllUsersFail());
            }
        } catch (error) {
            dispatch(fetchAllUsersFail());
            console.log(error);
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIL,
})


// fetch doctors
export const fetchDoctorsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorsService(10);
            if (res && res.errorCode === 0) {
                dispatch(fetchDoctorsSuccess(res.doctors));
            }
            else {
                dispatch(fetchDoctorsFail());
            }
        } catch (error) {
            dispatch(fetchDoctorsFail());
            console.log(error);
        }
    }
}

export const fetchDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTORS_SUCCESS,
    doctors: data
})

export const fetchDoctorsFail = () => ({
    type: actionTypes.FETCH_DOCTORS_FAIL,
})



