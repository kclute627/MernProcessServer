import axios from "axios";

import { setAlert } from "./alert";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from "./types";
import setAuthToken from '../utils/setAuthToken';

// load User
export const loadUser = () => async (dispatch) => {

  if (localStorage.token) {
    console.log('LOCAL STORAGE HIT')
    setAuthToken(localStorage.token);
     
  }
  try {
    const res = await axios.get("/api/auth");

   
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
   
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

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
    // dispatch(loadUser());
   
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
    
   await dispatch({
      type: REGISTER_SUCCESS,
      payload: token,
    });
    dispatch(loadUser());
   
    
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// login user

export const login = (email, password) => async (dispatch) => {
  // handle google?

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = { email, password };

  try {
    const res = await axios.post("/api/auth", body, config);
    
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    });
    // dispatch(loadUser());
   
    
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};


// logout // clear user

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  })
  
  
}



