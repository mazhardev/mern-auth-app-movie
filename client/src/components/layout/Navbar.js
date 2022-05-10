import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, user, guestLinks }, logout }) => {
  const _authLinks = (
    <ul>
      <li>
        {user && user.role == 'admin' && (
          <Link to="/users">Registered users</Link>
        )}
      </li>
    
      <li>

        <Link to="/add-movie">Add Movie</Link>

      </li>
      <li>
        <Link to="/list">Movies List</Link>
      </li>

      <li>
        <a onClick={logout} href="#!">
          {/* <i className="fas fa-sign-out-alt" />{' '} */}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const _guestLinks = (
    <ul>
      {guestLinks && (
        <li>
          <Link to="/login-user">Login</Link>
        </li>
      )}
      {guestLinks && (
        <li>
          <Link to="/register">Register</Link>
        </li>
      )}
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/login-user">
          <i className="fas" /> Favorite Movies
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? _authLinks : _guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
