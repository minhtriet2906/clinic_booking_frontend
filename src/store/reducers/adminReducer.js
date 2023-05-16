import { flatMap } from 'lodash';
import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    doctors: [],
    timeSlots: [],
    bookingPrices: [],
    paymentMethods: [],
    provinces: [],
}

const adminReducer = (state = initialState, action) => {
    let copyState = { ...state };
    switch (action.type) {
        //GENDER
        case actionTypes.FETCH_GENDER_START:
            copyState.isLoading = true;

            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            copyState.genders = action.data;
            copyState.isLoading = false;

            return {
                ...copyState,
            }

        case actionTypes.FETCH_GENDER_FAIL:
            copyState.isLoading = false;
            copyState.genders = [];

            return {
                ...state,
            }

        //ROLE
        case actionTypes.FETCH_ROLE_START:
            copyState.isLoading = true;
            return {
                ...copyState,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            copyState.roles = action.data;
            copyState.isLoading = false;
            return {
                ...copyState,
            }

        case actionTypes.FETCH_ROLE_FAIL:
            copyState.isLoading = false;

            return {
                ...copyState,
            }

        //POSITION
        case actionTypes.FETCH_POSITION_START:
            copyState.isLoading = true;

            return {
                ...copyState,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            copyState.positions = action.data;
            copyState.isLoading = false;

            return {
                ...copyState,
            }

        case actionTypes.FETCH_POSITION_FAIL:
            copyState.isLoading = false;

            return {
                ...copyState,
            }

        //FETCH ALL USERS
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            copyState.users = action.users;

            return {
                ...copyState,
            }

        case actionTypes.FETCH_ALL_USERS_FAIL:
            copyState.users = [];

            return {
                ...copyState,
            }

        //FETCH DOCTORS
        case actionTypes.FETCH_DOCTORS_SUCCESS:
            copyState.doctors = action.doctors;

            return {
                ...copyState,
            }

        case actionTypes.FETCH_DOCTORS_FAIL:
            copyState.doctors = [];

            return {
                ...copyState,
            }

        //SCHEDULE TIME
        case actionTypes.FETCH_SCHEDULE_TIME_SUCCESS:
            copyState.timeSlots = action.timeSlots;

            return {
                ...copyState,
            }

        case actionTypes.FETCH_SCHEDULE_TIME_FAIL:
            copyState.timeSlots = [];

            return {
                ...copyState,
            }

        //BOOKING_PRICE
        case actionTypes.FETCH_BOOKING_PRICE_SUCCESS:
            copyState.bookingPrices = action.bookingPrices;
            return {
                ...copyState,
            }

        case actionTypes.FETCH_BOOKING_PRICE_FAIL:
            copyState.bookingPrices = [];

            return {
                ...copyState,
            }


        //PAYMENT_METHOD
        case actionTypes.FETCH_PAYMENT_METHOD_SUCCESS:
            copyState.paymentMethods = action.paymentMethods;

            return {
                ...copyState,
            }

        case actionTypes.FETCH_PAYMENT_METHOD_FAIL:
            copyState.paymentMethods = [];

            return {
                ...copyState,
            }

        //PROVINCES
        case actionTypes.FETCH_PROVINCES_SUCCESS:
            copyState.provinces = action.provinces;

            return {
                ...copyState,
            }

        case actionTypes.FETCH_PROVINCES_FAIL:
            copyState.provinces = [];

            return {
                ...copyState,
            }

        default:
            return state;
    }
}

export default adminReducer;