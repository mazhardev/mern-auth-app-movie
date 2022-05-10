import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAllMovies, deleteMovie, getAllMoviesAdmin } from '../../actions/movie';

const MyMoviesList = ({
  getAllMovies,
  moviesList,
  deleteMovie,
  getAllMoviesAdmin,
  auth: { user }
}) => {

  {
    if (user.role == "admin") {
      useEffect(() => {
        getAllMoviesAdmin();
      }, [getAllMoviesAdmin]);
    }
    if (user.role == "user") {
      useEffect(() => {
        getAllMovies();
      }, [getAllMovies]);
    }
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Movies</h1>
      <table className="table" width={'100%'}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Cover Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {moviesList &&
            moviesList.movies.map((movie, i) => (
              <tr key={i}>
                <td> {movie.movieTitle}</td>
                <td> {movie.movieDescription}</td>
                <img src={movie.movieImageUrl} />
                <td>

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteMovie(movie._id)}
                  >
                    Delete
                  </button>


                  <Link
                    className="btn btn-primary"
                    to={`edit-movie/${movie._id}`}
                  >
                    Edit
                  </Link>




                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

MyMoviesList.propTypes = {
  getAllMovies: PropTypes.func.isRequired,
  getAllMoviesAdmin: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  moviesList: state.movies,
  auth: state.auth
});

export default connect(mapStateToProps, { getAllMovies, deleteMovie, getAllMoviesAdmin })(
  MyMoviesList
);
