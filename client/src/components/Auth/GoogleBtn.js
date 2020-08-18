import React from "react";
import Button from "@material-ui/core/Button";
import g from '../../assets/SVG/G.svg';
import SVG from 'react-inlinesvg';

const GoogleBtn = ({path, title}) => {

  return (
    <div className='login__btn'>
      <Button
        className='login__google'
        color='primary'
        type='submit'
        variant='contained'
      >
        <a href='' className='login__google-button'>
          <SVG src={g} title=' ' className='svg' />
          <div className='login__google-text'>{title}</div>
        </a>
      </Button>
    </div>

  );
};

export default GoogleBtn;
