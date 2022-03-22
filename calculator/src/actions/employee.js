import { setAlert } from './alert';
import {
    ADD_EMPLOYEE,
    DELETE_EMPLOYEE
  } from './types';

  // Add todo
export const addEmployee = (formData) => async (dispatch) => {
    dispatch({
        type: ADD_EMPLOYEE,
        payload: formData
    });
};

// Delete todo
export const deleteEmployee = (id) => async (dispatch) => {
    dispatch({
      type: DELETE_EMPLOYEE,
      payload: id
    });
}
