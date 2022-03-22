import {
    ADD_EMPLOYEE,
    DELETE_EMPLOYEE
} from '../actions/types';
// import update from 'react-addons-update';
import update from 'immutability-helper';

const initialState = {
    employees: [],
    employee: null
};

function employeeReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_EMPLOYEE:
            return {
                ...state,
                employees: [payload, ...state.employees]
            };
        case DELETE_EMPLOYEE:
            return {
                ...state,
                employees: state.employees.filter((employee) => employee.id !== payload)
            };
        default:
            return state;
  }
}

export default employeeReducer;