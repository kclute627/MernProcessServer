import React from "react";
import Button from "@material-ui/core/Button";

import g from '../../assets/SVG/G.svg';
import SVG from 'react-inlinesvg';

//redux 
import {connect} from 'react-redux'
import {registerGoogle } from '../../actions/auth';

const GoogleBtn = ({path, title, registerGoogle}) => {

  return (
    <div className='login__btn' >
      <Button
        className='login__google'
        color='primary'
        type='submit'
        variant='contained'
        onClick={()=>registerGoogle()}
       
      >
        <a href='http://localhost:5000/api/users/google' className='login__google-button'  >
          <SVG src={g} title=' ' className='svg' />
          <div className='login__google-text'>{title}</div>
        </a>
      </Button>
    </div>

  );
};

export default connect(null, {registerGoogle})(GoogleBtn);
