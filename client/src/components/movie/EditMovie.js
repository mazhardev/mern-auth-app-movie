import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMovieById, editMovieById } from '../../actions/movie';

const EditMovie = ({ getMovieById, match, movies: { movie, loading }, editMovieById }) => {

  const [movieText, setMovieText] = useState({
    movieTitle: '',
    movieDescription: '',
    movieImageUrl: '',
  });

  useEffect(() => {
    getMovieById(match.params._id);
  }, [getMovieById]);

  useEffect(() => {
    setMovieText({
      movieTitle: movie.movieTitle,
      movieDescription: movie.movieDescription,
      movieImageUrl: movie.movieImageUrl,
    });
  }, [movie]);

  const { movieTitle, movieDescription, movieImageUrl } = movieText;

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      movieTitle: movieTitle,
      movieDescription: movieDescription,
      movieImageUrl: movieImageUrl,
    };
    // console.log(obj)
    editMovieById(match.params._id, obj);
    // getMovieById(match.params._id);
  };
  const onChange = (e) =>
  setMovieText({ ...movieText, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <div style={{ padding: '10px' }}>
        <h3>Edit Movie</h3>
        <form className="form" onSubmit={handleSubmit}>
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
              required
            />
          </div>
          <br />
          <input type="submit" value="Update" className="btn btn-primary" />
        </form>
      </div>
    </Fragment>
  );
};

EditMovie.propTypes = {
  getMovieById: PropTypes.func.isRequired,
  editMovieById: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  movies: state.movies
});

export default connect(mapStateToProps, { getMovieById, editMovieById })(
  EditMovie
);
