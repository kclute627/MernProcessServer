import React, {useEffect} from "react";
import Button from "@material-ui/core/Button";
import queryString from "query-string";

import g from '../../assets/SVG/G.svg';
import SVG from 'react-inlinesvg';
import {registerGoogle } from '../../actions/auth';

//redux 
import {connect} from 'react-redux'




const GoogleBtn =  ({path, title, registerGoogle}) => {

  useEffect((props )=>{
    let query = queryString.parse(window.location.search);
   
    if(query.token){
      
   
      // todo with react router route to where I want to go 
      
      props.history.push("/dashboard")
    }  
  
  }, [])

  return (
    <div className='login__btn' >
      <Button
        className='login__google'
        color='primary'
        type='submit'
        variant='contained'
        
       
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
