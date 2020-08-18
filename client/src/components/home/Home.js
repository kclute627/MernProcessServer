import React from "react";
import NavBar from "../layout/Navbar";
import TextField from "@material-ui/core/TextField";
import background from "../../assets/Noted.mp4";

const Home = (props) => {
  
  return (
    <div className='home__container'>
     
      <div className='home__top'>
        <NavBar />

        <div className='home__header'>
          <div className='home__header-text'>
            Find a Process Server{" "}
          </div>
          {/* <div className="home__header-text">Anyware..Any Place...Any Time</div> */}
          <div className='home__form'>
            <TextField
              id='home__form'
              type='text'
              placeholder='Zipcode'
              name='zipcode'
              placeholder='Zipcode'
              label='Zip'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
