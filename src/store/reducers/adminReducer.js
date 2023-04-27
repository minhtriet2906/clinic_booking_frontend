import { flatMap } from 'lodash';
import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    positions: [],
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

        default:
            return state;
    }
}

export default adminReducer;