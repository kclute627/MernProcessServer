import React, { useState, createRef, useEffect, Fragment } from "react";
import Navbar from "../layout/Navbar";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  
} from "react-places-autocomplete";

const AddListing = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    lat: "",
    long: "",
    logo: [],
    services: {
      processService: false,
      investigations: false,
      document: false,
      skipTrace: false,
    },
  });

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  })

  const handleClick = (e) => {
    setFormData({
      ...formData,
      services: { ...services, [e.target.name]: e.target.checked },
    });
  };

  const handleFileUpload = (e) => {
    let reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setFormData({
        ...formData,
        logo: [reader.result],
      });
    };

    reader.readAsDataURL(file);
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = async (value) => {
      const results =  await geocodeByAddress(value);
      const latlng = await getLatLng(results[0])

      console.log(latlng)

  };
  const renderFunc = ({
    getInputProps,
    getSuggestionItemProps,
    suggestions,
    loading,
  }) => (
    <Fragment>
      <p>Latitude: {coordinates.lat}</p>
      <p>Longitude: {coordinates.lng}</p>


      <TextField autoComplete= 'false' {...getInputProps({placeholder: 'Address', variant: 'outlined', id: 'form__field', autoComplete: 'false' })}  />
      <div>
        {loading ? <div>...loading</div> : null}
        {suggestions.map((cur,i) => {
          const style ={
            backgroundColor: cur.active ? '#1687a7' : '#EEEEEE'
          }
          return <div key={i}  {...getSuggestionItemProps(cur, {style, key: `${i}`},)}>{cur.description}</div>;
        })}
      </div>
        </Fragment>
  );

  const {
    name,
    email,
    companyName,
    lat,
    long,

    logo,
    services,
  } = formData;
  return (
    <div className='addlisting'>
      <Navbar />
      <div className='addlisting__middle'>
        <div className='addlisting__middle-title'>Add A Listing</div>
        <form action='' className='addlisting__form'  >
          <div className='form-group'>
            <TextField
              id='form__field'
              type='text'
              placeholder='Your Name'
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
              type='text'
              placeholder='Company Name'
              name='companyName'
              value={companyName}
              required
              onChange={(e) => onChange(e)}
              label='Company Name'
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
              required
              onChange={(e) => onChange(e)}
              label='Email'
              required
              variant='outlined'
             
            />
          </div>

          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {renderFunc}
          </PlacesAutocomplete>

          <div className='form-group'>
            <TextField
              id='form__field'
              type='text'
              placeholder='Lat'
              name='lat'
              value={lat}
              onChange={(e) => onChange(e)}
              label='Lat'
              variant='outlined'
            />
          </div>
          <div className='form-group'>
            <TextField
              id='form__field'
              type='text'
              placeholder='Long'
              name='long'
              value={long}
              onChange={(e) => onChange(e)}
              label='Long'
              variant='outlined'
            />
          </div>

          <div className='form-group'>
            <input
              accept='image/*'
              id='contained-button-file'
              multiple
              type='file'
              onChange={(e) => handleFileUpload(e)}
            />
            <label htmlFor='contained-button-file'>
              <Button variant='contained' color='primary' component='span'>
                Upload Logo
              </Button>
            </label>
            {logo && logo.length >= 1 ? (
              <div>
                {/* to do create x to delete */}
                <img src={logo[0]} height='100' width='100' />
              </div>
            ) : null}
          </div>
          <div className='form-group'>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={services.processService}
                    onChange={handleClick}
                    name='processService'
                    color='primary'
                  />
                }
                label='Process Serving'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={services.document}
                    onChange={handleClick}
                    name='document'
                    color='primary'
                  />
                }
                label='Document Retrivial'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={services.skipTrace}
                    onChange={handleClick}
                    name='skipTrace'
                    color='primary'
                  />
                }
                label='Skip Trace'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={services.investigations}
                    onChange={handleClick}
                    name='investigations'
                    color='primary'
                  />
                }
                label='Investigations'
              />
            </FormGroup>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
