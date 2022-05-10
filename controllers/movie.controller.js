const Movie = require('../models/movie.model');

// Create and Save a new Movie
const create = (req, res) => {
    // Validate request
    if (!req.body.movieTitle) {
        return res.status(400).send({ errors: [{ msg: 'movie title can not be empty' }] });
    }
    if (!req.body.movieDescription) {
        return res.status(400).send({ errors: [{ msg: 'movie description can not be empty' }] });
    }
    // console.log(req.user)
    // Create a Movie
    const movie = new Movie({
        movieTitle: req.body.movieTitle || "Untitled Movie",
        movieDescription: req.body.movieDescription,
        movieImageUrl: req.body.movieImageUrl || `https://robohash.org/435645?200*200`,
        user: req.user.user_id

    });

    // Save movie in the database
    movie.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                errors: [{ msg: 'Error creating movie' }]
            });
        });
};

// Retrieve and return all movies from the database.
const findAll = (req, res) => {
    Movie.find()
        .then(movies => {
            res.send(movies);
        }).catch(err => {
            res.status(500).send({
                errors: [{ msg: 'Error retrieving movies' }]
            });
        });
};

// Retrieve and return all movies by user id from the database.
const findAllByUserId = (req, res) => {
    Movie.find({ user: req.user.user_id }).populate()
        .then(movies => {
            res.send(movies);
        }).catch(err => {
            res.status(500).send({
                errors: [{ msg: 'Error retrieving movies' }]
            });
        });
};
// Find a single movie with a movieId
const findOne = (req, res) => {
    Movie.findById(req.params.movieId)
        .then(movie => {
            if (!movie) {
                return res.status(404).send({
                    errors: [{ msg: "Movie not found with id " + req.params.movieId }]
                });
            }
            if (movie.user == req.user.user_id) {
                res.send(movie);
            }
            else {
                res.send({});
            }

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    errors: [{ msg: "Movie not found with id " + req.params.movieId }]
                });
            }
            return res.status(500).send({
                errors: [{ msg: "Error retrieving movie with id " + req.params.movieId }]
            });
        });
};

// Update a movie identified by the movieId in the request
const update = (req, res) => {
    // Validate request
    if (!req.body.movieTitle) {
        return res.status(400).send({ errors: [{ msg: 'movie title can not be empty' }] });
    }
    if (!req.body.movieDescription) {
        return res.status(400).send({ errors: [{ msg: 'movie description can not be empty' }] });
    }
    // Find movie and update it with the request body
    Movie.findByIdAndUpdate(req.params.movieId, {
        movieTitle: req.body.movieTitle || "Untitled Movie",
        movieDescription: req.body.movieDescription,
        movieImageUrl: req.body.movieImageUrl || `https://robohash.org/${req.user.user_id}?200*200`,
        user: req.user.user_id
    }, { new: true })
        .then(movie => {
            if (!movie) {
                return res.status(404).send({
                    errors: [{ msg: "Movie not found with id " + req.params.movieId }]
                });
            }
            res.send(movie);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    errors: [{ msg: "Movie not found with id " + req.params.movieId }]
                });
            }
            return res.status(500).send({
                errors: [{ msg: "Error Updating movie with id " + req.params.movieId }]
            });
        });
};

// Delete a movie with the specified movieId in the request
const deleteById = (req, res) => {
    Movie.findByIdAndRemove(req.params.movieId)
        .then(movie => {
            if (!movie) {
                return res.status(404).send({
                    errors: [{ msg: "Movie not found with id " + req.params.movieId }]
                });
            }
            res.send({ errors: [{ msg: "Movie deleted successfully!" }] });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    errors: [{ msg: "Movie not found with id " + req.params.movieId }]
                });
            }
            return res.status(500).send({
                errors: [{ msg: "Could not delete note with id " + req.params.movieId }]
            });
        });
};
module.exports = {
    create,
    findAll,
    findOne,
    update,
    deleteById,
    findAllByUserId
}