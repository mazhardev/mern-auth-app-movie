const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const rounds = 12

const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"


// login users
const login = (req, role, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) res.status(404).json({ errors: [{ msg: 'no user with that email found' }] })
            else {
                // We will check the role
                if (user.role !== role) {
                    return res.status(403).json({
                        errors: [
                            { msg: 'Please make sure you are logging in from the right portal.' }
                        ]
                    });
                }
                bcrypt.compare(req.body.password, user.password, (error, match) => {
                    if (error) res.status(500).json(error)
                    else if (match) res.status(200).json({ token: generateToken(user) })
                    else res.status(403).json({ errors: [{ msg: 'password do not match' }] })
                })
            }
        })
        .catch(error => {
            res.status(500).send('Server error ' + error);
        })
}


//signUp users
const signUp = async (req, role, res) => {
    // validate the email
    let emailNotRegistered = await validateEmail(req.body.email);
    if (!emailNotRegistered) {
        return res
            .status(400)
            .json({ errors: [{ msg: 'Email already registered' }] });
    }

    bcrypt.hash(req.body.password, rounds, (error, hash) => {
        if (error) res.status(500).json({ errors: [{ msg: error }] })
        else {
            const newUser = User({ email: req.body.email, password: hash, role: role, addressDetails: req.body.addressDetails })
            newUser.save()
                .then(user => {
                    res.status(200).json({ token: generateToken(user) })
                })
                .catch(error => {
                    res.status(500).json({ errors: [{ msg: error }] })
                })
        }
    })

}


const jwtTest = (req, res) => {
    res.status(200).json(req.user)
}

// delete user by id
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndRemove({
            _id: req.params._id
        });

        return res.status(200).json(deletedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: 'Server error ' + error }] });
    }
}

// update user by id
const editUser = async (req, res) => {
    const { password, addressDetails } = req.body;

    bcrypt.hash(password, rounds, async (error, hash) => {
        if (error) res.status(500).json({ errors: [{ msg: error }] })
        else {
            const newUser = {
                password: hash,
                addressDetails: addressDetails
            };
            await User.findOneAndUpdate(
                { _id: req.params._id },
                newUser,
                { runValidators: true, context: 'query' }
            );
            let updatedQuestion = await User.findOne({ _id: req.params._id });
            return res.json(updatedQuestion);
        }
    })


}
const serializeUser = async (req, res) => {
    // console.log(req.user)
    const user = await User.findById(req.user.user_id).select('-password');
    res.json(user);
};
const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

function generateToken(user) {
    return jwt.sign({
        user_id: user._id,
        role: user.role,
        email: user.email
    }, tokenSecret, { expiresIn: '24h' })
}


const validateEmail = async (email) => {
    let user = await User.findOne({ email });
    return user ? false : true;
};

module.exports = {
    login,
    signUp,
    jwtTest,
    deleteUser,
    editUser,
    serializeUser,
    getAllUsers
}