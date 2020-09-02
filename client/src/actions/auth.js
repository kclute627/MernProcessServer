import axios from "axios";
import { setAlert } from "./alert";
import { REGISTER_FAIL, REGISTER_SUCCESS, REGISTER_GOOGLE } from "./types";

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
      payload: res.data,
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

export const registerGoogle = () => async (dispatch) => {

  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  }
  
  
  try {
    const res = await axios.get("/api/users/google", config);

    const body = await res.profile

    console.log(body)


  } catch (error) {
    
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

    

  