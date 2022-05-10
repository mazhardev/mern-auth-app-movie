const express = require('express');
const router = express.Router();

// NOTE: Add middleware to verify requests!
const { verify, checkRole } = require('../middlewares')

const { create, findOne, findAll, deleteById, update,findAllByUserId } = require('../controllers/movie.controller');

// Create a new movie
router.post('/movies', verify, checkRole(['user', 'admin']), (req, res) => { create(req, res) });

// Retrieve all movies
router.get('/movies', verify, checkRole(['user', 'admin']), (req, res) => { findAll(req, res) });


// Retrieve all movies by user id
router.get('/movies-by-user', verify, checkRole(['user', 'admin']), (req, res) => { findAllByUserId(req, res) });

// Retrieve a single movie with movieId
router.get('/movies/:movieId', verify, checkRole(['user', 'admin']), (req, res) => { findOne(req, res) });

// Update a movie with movieId
router.put('/movies/:movieId', verify, checkRole(['user', 'admin']), (req, res) => { update(req, res) });

// Delete a Movie with movieId
router.delete('/movies/:movieId', verify, checkRole(['user', 'admin']), (req, res) => { deleteById(req, res) });

module.exports = router;