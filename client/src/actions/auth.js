import axios from "axios";

import { setAlert } from "./alert";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";

import setAuthToken from '../utils/setAuthToken'

// load User
export const loadUser = () => async dispatch => {

  if(localStorage.token){
    setAuthToken(localStorage.token)
  }

  try {

    const res = await axios.get('/api/auth')

    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
    
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    })
    
  }

}




// Register USER

export const register = ({ name, email, password }) => async (dispatch) => {
  // handle google?

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.token,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const registerGoogle = (token) => async (dispatch) => {
  console.log(token, "auth token");

  try {
    dispatch({
      type: REGISTER_SUCCESS,
      payload: token,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
