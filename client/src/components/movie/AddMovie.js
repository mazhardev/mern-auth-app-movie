import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMovie } from '../../actions/movie';

const AddMovies = ({ addMovie }) => {
  const [formData, setFormData] = useState({
    movieTitle: '',
    movieDescription: '',
    movieImageUrl: '',
  });

  const { movieTitle, movieDescription, movieImageUrl } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      movieTitle: movieTitle,
      movieDescription: movieDescription,
      movieImageUrl: movieImageUrl,
    };
    addMovie(obj);
    setFormData({
      movieTitle: '',
      movieDescription: '',
      movieImageUrl: '',
    });
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add Movie</h1>

      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="movieTitle"
            name="movieTitle"
            value={movieTitle}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="movieDescription"
            name="movieDescription"
            value={movieDescription}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="movieImageUrl"
            name="movieImageUrl"
            value={movieImageUrl}
            onChange={onChange}
          />
        </div>
      

        <input type="submit" className="btn btn-primary" value="Add Movie" />
      </form>
    </Fragment>
  );
};

AddMovies.propTypes = {
  addMovie: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addMovie })(AddMovies);
