import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAdmin, setGuestLinks } from '../../actions/auth';

const Login = ({
  loginAdmin,
  setGuestLinks,
  isAuthenticated,
  auth: { user }
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  useEffect(() => {
    setGuestLinks();
  }, []);
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    loginAdmin(email, password);
  };

  if (isAuthenticated && user && user.role == 'admin') {
    return <Redirect to="/users" />;
  }
  if (isAuthenticated && user && user.role == 'user') {
    return <Redirect to="/list" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In For Admin</h1>
      {/* <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p> */}
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
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>

    </Fragment>
  );
};

Login.propTypes = {
  loginAdmin: PropTypes.func.isRequired,
  setGuestLinks: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(mapStateToProps, { loginAdmin, setGuestLinks })(Login);
