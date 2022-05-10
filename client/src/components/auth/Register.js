import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser, setGuestLinksForUser } from '../../actions/auth';

const RegisterUser = ({registerUser,setGuestLinksForUser,isAuthenticated,auth: { user }}) => {
  const [formData, setFormData] = useState({
    email: '',
    street: '',
    state: '',
    city: '',
    zip: '',
  });
  useEffect(() => {
    setGuestLinksForUser();
  }, []);
  const { email, password, street, city, state, zip } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    let formDataFrSubmit = {
      email: email,
      password: password,
      addressDetails:
      {
        street: street,
        city: city,
        state: state,
        zip: zip
      }
    }
    registerUser(formDataFrSubmit);
    setFormData({
      email: '',
      city: '',
      state: '',
      zip: '',
      street: '',
      password:''
    });
  };

  if (isAuthenticated && user && user.role == 'admin') {
    return <Redirect to="/dashboard" />;
  }
  if (isAuthenticated && user && user.role == 'user') {
    return <Redirect to="/list" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Registration For User</h1>

      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="street"
            name="street"
            value={street}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="city"
            name="city"
            value={city}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="state"
            name="state"
            value={state}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="zip"
            name="zip"
            value={zip}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      {/* <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p> */}
    </Fragment>
  );
};

RegisterUser.propTypes = {
  registerUser: PropTypes.func.isRequired,
  setGuestLinksForUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(mapStateToProps, { registerUser, setGuestLinksForUser })(
  RegisterUser
);
