import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log("success");
  };

  return (
    <div className="login">
      <div className="login__container">
          <Avatar className="login__avatar">
              <LockOutlinedIcon/>
          </Avatar>
        <h1 className="login__header">Login</h1>
        <p className="login__text">Sign In to Your Account</p>
        <form onSubmit={(e) => onSubmit(e)} className="form">
          <div className="form-group">
            <TextField
              className="form__field"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              label="Email"
              variant="outlined"
            />
          </div>
          <div className="form-group">
            <TextField
                className='form__field'
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => onChange(e)}
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
          </div>
          <p className="form__text">Dont Have an Account? <Link to='/register'>Register</Link></p>

          <Button id="form__button" variant="contained" color="primary" type="submit" placeholder="submit" >Sign In</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
