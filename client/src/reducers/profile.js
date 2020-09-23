import { CLEAR_PROFILE, ADD_LISTING, LISTING_FAIL } from "../actions/types";

const initialState = {
  loading: true,
  msg: "",
  alertType: "",
  success: false,
  error: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_LISTING:
      return {
        ...state,
        alertType: payload.alertType,
        msg: payload.msg,
        success: true,
      };
    case LISTING_FAIL:
      return {
        ...state,
        alertType: payload.alertType,
        msg: payload.msg,
        success: false,
        error: true,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        error: false,
        msg: '',
        success: false,

      };
    default:
      return state;
  }
};
