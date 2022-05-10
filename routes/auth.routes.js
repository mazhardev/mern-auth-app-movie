const express = require('express')
const router = express.Router()

const { verify, checkRole } = require('../middlewares')
const { login, signUp, jwtTest, deleteUser, editUser, serializeUser,getAllUsers } = require('../controllers/auth.controller');


router.post('/login-user', (req, res) => { login(req, "user", res) });
router.post('/signup-user', (req, res) => { signUp(req, "user", res) });


router.post('/login-admin', (req, res) => { login(req, "admin", res) });
router.post('/signup-admin', (req, res) => { signUp(req, "admin", res) });

router.delete('/delete-user/:_id', verify, checkRole(['admin']), (req, res) => { deleteUser(req, res) });

router.get('/get-all-users', verify, checkRole(['admin']), (req, res) => { getAllUsers(req, res) });

router.put('/edit-user/:_id', verify, checkRole(['user']), (req, res) => { editUser(req, res) });


router.get('/jwt-test', verify, (req, res) => { jwtTest(req, res) })

router.get('/user', verify, (req, res) => { serializeUser(req, res) });

module.exports = router


