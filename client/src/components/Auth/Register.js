import React, { Fragment, useState } from "react";
import {connect} from 'react-redux';
import Navbar from '../layout/Navbar';
import GoogleBtn from '../Auth/GoogleBtn';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Alerts from '../layout/Alert'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Link } from "react-router-dom";
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';


const Register = ({setAlert, register}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
 

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      // to do fire Flash Error
      setAlert("Passwords Do Not Match", "error")
    } else {
      register({name, email, password})
    }
  };

  return (
    <div className='register'>
      <Navbar/>
      <div className='register__container'>
      <Avatar id="reg__avatar">
          <VpnKeyIcon fontSize="large"/>
        </Avatar>
        <h1 className='register__header'>Sign Up</h1>
        <p className='register-text'>Create Your Account</p>
        <form onSubmit={(e) => onSubmit(e)} className='form'>
          <div className='form-group'>
            <TextField
              id='form__field'
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              required
              onChange={(e) => onChange(e)}
              label='Name'
              required
              variant='outlined'
            />
          </div>
          <div className='form-group'>
            <TextField
              id='form__field'
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
              label='Email'
              required
              variant='outlined'
            />
          </div>
          <div className='form-group'>
            <TextField
              id='form__field'
              type='password'
              placeholder='Password'
              name='password'
              minLength='6'
              value={password}
              onChange={(e) => onChange(e)}
              label='Password'
              required
              variant='outlined'
            />
          </div>
          <div className='form-group'>
            <TextField
              id='form__field'
              type='password'
              placeholder='Confirm Password'
              name='password2'
              minLength='6'
              value={password2}
              onChange={(e) => onChange(e)}
              label='Confirm Password'
              required
              variant='outlined'
            />
            <Alerts/>
          </div>
          <p className='form__text'>
            Have an Account? <Link to='/Login'>Login</Link>
          </p>
          <Button
            id='form__button'
            type='submit'
            placeholder='submit'
            color='primary'
            type='submit'
            variant='contained'
          >
            Sign Up
          </Button>
        </form>
        <div className='login__break'>
          <div className='login__break-1'></div>
          <div className='login__break-2'>OR</div>
          <div className='login__break-1'></div>
        </div>
        <GoogleBtn title="Sign Up With Google" path="register" />
      </div>
    </div>
  );
};

export default connect(null, { setAlert, register})(Register);
