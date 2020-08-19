import React, { useState, useEffect } from "react";
import NavBar from "../layout/Navbar";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchIcon from "@material-ui/icons/Search";


const Home = (props) => {
  // todo
  // only accept numbers in input
  // must be zip code - 5 numbers no spaces
  // show alert if user tries to click search if not a full zip code
  // once clicked go to map of process servers

  const [zip, zipHandler] = useState("");

  
    const zipChangeHandler = (e) => {
      let char = e.target.value 
      let regex = /^[0-9\b]+$/

      if (char === '' || regex.test(char) && char.length <=5 ){
        zipHandler(char)
      }
     

      
      
  
    };

 

  return (
    <div className='home__container'>
      <div className='home__top'>
        <NavBar />

        <div className='home__header'>
          <div className='home__header-text'>Find a Process Server </div>
          {/* <div className="home__header-text">Anyware..Any Place...Any Time</div> */}
          <div className='home__form'>
            <div className='home__form-box'>
              <input
                type='text'
                className='home__form-zip'
                placeholder='Zip'
                onChange={(e) => zipChangeHandler(e)}
                value={zip}
              />{" "}
              <SearchIcon
                style={{ fill: "rgb(3, 124, 88)" }}
                className='icon'
                fontSize='large'
              />
            </div>
          </div>
        </div>
        <div className="home__top-bottom">
          <KeyboardArrowDownIcon style={{fill: 'white', height: '7rem', width: '5rem'}} />
        </div>
      </div>
    </div>
  );
};

export default Home;
