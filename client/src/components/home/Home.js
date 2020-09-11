import React, { useState, useEffect, useRef} from "react";

import { connect } from "react-redux";

import NavBar from "../layout/Navbar";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SearchIcon from "@material-ui/icons/Search";
import Alerts from '../layout/Alert'
import Maps from './Maps';
import queryString from "query-string";

import { setAlert } from "../../actions/alert";
import {registerGoogle } from '../../actions/auth';


const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop) 

const Home = ({setAlert, registerGoogle}) => {
  // todo
  // only accept numbers in input
  // must be zip code - 5 numbers no spaces
  // show alert if user tries to click search if not a full zip code
  // once clicked go to map of process servers

  const [zip, zipHandler] = useState("");

  const myRef = useRef(null)
   const executeScroll = () => scrollToRef(myRef)


  

  

  const zipChangeHandler = (e) => {
    let char = e.target.value;
    let regex = /^[0-9\b]+$/;

    if (char === "" || (regex.test(char) && char.length <= 5)) {
      zipHandler(char);
    }
  };
  const formSubmit = async () => {
    
    
    if (zip.length !== 5) {
       return setAlert("Please Enter a Valid Zip Code", "error");
    } 
    executeScroll()
  };

  const keyDownHandler = (e) => {
    if (e.keyCode === 13) {
      formSubmit();
      
    }
  };

 
  

  return (
    <div className='home__container'>
      <div className='home__top'>
        <NavBar />

        <div className='home__header'>
          <div className='home__header-text'>Process Servers On Demand </div>

          <div className='home__form'>
            <div className='home__form-box'>
              <div className='home__header-text-2'>
                Find a Process Server Now
              </div>
              <input
                type='text'
                className='home__form-zip'
                placeholder='Zip Code'
                onChange={(e) => zipChangeHandler(e)}
                onKeyDown={(e) => keyDownHandler(e)}
                value={zip}
              />{" "}
             
              
              <SearchIcon
                style={{ fill: "rgb(3, 124, 88)" }}
                className='icon'
                fontSize='large'
                onClick={(e) => formSubmit(e)}
              />
              
            </div>
            <Alerts/>
          </div>
        </div>
        <div className='home__top-bottom'>
          <KeyboardArrowDownIcon
            style={{ fill: "white", height: "7rem", width: "5rem" }}
            onClick={executeScroll}
           
          />
        </div>
      </div>
      <Maps
      refProp={myRef}
      
      />
      <div id="maps"></div>
    </div>
  );
};

export default connect(null, { setAlert, registerGoogle })(Home);
