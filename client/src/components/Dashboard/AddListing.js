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
import Compress from "compress.js";
import Alerts from "../layout/Alert";
import { Redirect } from "react-router-dom";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
//REDUX
import { connect } from "react-redux";
import { addListing, clearProfile } from "../../actions/profile";
import { setAlert } from "../../actions/alert";

const AddListing = ({
  addListing,
  user,
  alert,
  profile,
  clearProfile,
  setAlert,
  loading,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
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
    lat: "",
    lng: "",
  });

  useEffect(() => {}, profile.error);

  const handleClick = (e) => {
    setFormData({
      ...formData,
      services: { ...services, [e.target.name]: e.target.checked },
    });
  };

  const handleFileUpload = async (e) => {
    let reader = new FileReader();
    const compress = new Compress();
    const file = [...e.target.files];
    const data = await compress.compress(file, {
      size: 4, // the max size in MB, defaults to 2MB
      quality: 0.75, // the quality of the image, max is 1,
      maxWidth: 1000, // the max width of the output image, defaults to 1920px
      maxHeight: 100, // the max height of the output image, defaults to 1920px
      resize: true, // defaults to true, set false if you do not want to resize the image width and height
    });

    console.log(data);

    setFormData({
      ...formData,
      logo: [...data],
    });
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);

    setAddress(value);
    setCoordinates({
      lat: latlng.lat,
      lng: latlng.lng,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { lat, lng } = coordinates;
    const { _id } = user;
    const author = _id;
    addListing({
      address,
      name,
      companyName,
      email,
      logo,
      services,
      lat,
      lng,
      author,
    });
  };

  const closePhoto = () => {
    setFormData({
      ...formData,
      logo: []
    })
  }

  const renderFunc = ({
    getInputProps,
    getSuggestionItemProps,
    suggestions,
    loading,
  }) => (
    <Fragment>
      <TextField
        autoComplete="false"
        {...getInputProps({
          placeholder: "Address",
          variant: "outlined",
          id: "form__field-1",
          autoComplete: "false",
        })}
      />
      <div>
        {loading ? <div>...loading</div> : null}
        {suggestions.map((cur, i) => {
          const style = {
            backgroundColor: cur.active ? "#1687a7" : "#EEEEEE",
          };
          return (
            <div
              key={i}
              {...getSuggestionItemProps(cur, { style, key: `${i}` })}
              // onClick={() => handleSelect(cur.description)}
            >
              {cur.description}
            </div>
          );
        })}
      </div>
    </Fragment>
  );

  const {
    name,
    email,
    companyName,
    lat,
    lng,

    logo,
    services,
  } = formData;

  if (profile.error) {
    setAlert(profile.msg, "error");
    clearProfile();
  }

  return (
    <div className="addlisting">
      <Navbar />
      <div className="addlisting__middle">
        {profile.success && <Redirect to="/dashboard" />}

        <form
          action=""
          className="addlisting__form"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="addlisting__middle-title">Add A Listing</div>
          <Alerts />
          <div className="form-group-1">
            <TextField
              id="form__field-1"
              type="text"
              placeholder="Your Name"
              name="name"
              value={name}
              required
              onChange={(e) => onChange(e)}
              label="Name"
              required
              variant="outlined"
            />
          </div>
          <div className="form-group-1">
            <TextField
              id="form__field-1"
              type="text"
              placeholder="Company Name"
              name="companyName"
              value={companyName}
              required
              onChange={(e) => onChange(e)}
              label="Company Name"
              variant="outlined"
            />
          </div>

          <div className="form-group-1">
            <TextField
              id="form__field-1"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              required
              onChange={(e) => onChange(e)}
              label="Email"
              required
              variant="outlined"
            />
          </div>

          <PlacesAutocomplete
            value={address ? address : ""}
            onChange={setAddress}
            onSelect={handleSelect}
            onClick={handleSelect}
          >
            {renderFunc}
          </PlacesAutocomplete>

          <div className="none">
            <TextField
              id="form__field-1"
              type="text"
              placeholder="Lat"
              name="lat"
              value={coordinates.lat}
              onChange={(e) => onChange(e)}
              label="Lat"
              variant="outlined"
            />
          </div>
          <div className="none">
            <TextField
              id="form__field-1"
              type="text"
              placeholder="Long"
              name="long"
              value={coordinates.lng}
              onChange={(e) => onChange(e)}
              label="Long"
              variant="outlined"
            />
          </div>

          <div className="form-group-1 center">
            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              onChange={(e) => handleFileUpload(e)}
            />
            <label htmlFor="contained-button-file" className="form__button">
              {logo.length === 0 ? 
              
            
           (
              <Button
                variant="contained"
                color="primary"
                component="span"
                id="form__button-1"
                
              >
                Upload Logo
              </Button>): 
              (
                <Button
                variant="contained"
                color="primary"
                component="span"
                id="form__button-1"
                disabled
                
              >
                Upload Logo
              </Button>)
              
}
            </label>
          </div>
          <div className="form-group-1 center-1">
            {logo && logo.length >= 1 ? (
              <div>
                {/* to do create x to delete */}
                <div className="image__container">
                  <div className="x" onClick={closePhoto}> <HighlightOffIcon color='primary' fontSize='large'/></div>
                  <img
                    src={`${logo[0].prefix}${logo[0].data}`}
                    height="200"
                    width="200"
                  />
                </div>
              </div>
            ) : null}
          </div>
          <div className="form-group-1">
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={services.processService}
                    onChange={handleClick}
                    name="processService"
                    color="primary"
                  />
                }
                label="Process Serving"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={services.document}
                    onChange={handleClick}
                    name="document"
                    color="primary"
                  />
                }
                label="Document Retrivial"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={services.skipTrace}
                    onChange={handleClick}
                    name="skipTrace"
                    color="primary"
                  />
                }
                label="Skip Trace"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={services.investigations}
                    onChange={handleClick}
                    name="investigations"
                    color="primary"
                  />
                }
                label="Investigations"
              />
            </FormGroup>
          </div>
          <div className="center">
            <Button
              id="form__button"
              type="submit"
              placeholder="submit"
              color="primary"
              type="submit"
              variant="contained"
              className="center"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  alert: state.alert,
  profile: state.profile,
});

export default connect(mapStateToProps, { addListing, clearProfile, setAlert })(
  AddListing
);
