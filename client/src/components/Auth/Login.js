import React, {useState} from "react";
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
      <h1 className="register__header">Login</h1>
      <p className="register-text">Sign In to Your Account</p>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type="submit" placeholder="submit" />
      </form>
    </div>
  );
};

export default Login;
