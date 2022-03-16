const crypto = require('crypto')
const jwt = require("jsonwebtoken");

const User = require('../models/User')

module.exports = {
    login: async(req, res) => {
        var { email, password } = req.body;
        email = email.toLowerCase()

        console.log('llego a la api')

        if (!email || !password) {
            return res.status(404).json({
                status: 'error',
                errors: 'incomplete_fields',
            });
        }

        return User.findOne({ email }).exec()
            .then(user => {
                if (!user) {
                    return res.send({ 'status': 'error', 'error': 'Email inexistente.' })
                }
                return crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
                    const encryptedPass = key.toString('base64')
                    if (user.password != encryptedPass) {
                        return res.send({ 'status': 'error', 'msg': 'password_error' })
                    }

                    return signToken(user)
                        .then(token => {
                            return res.header("auth-token", token)
                                .json({
                                    status: 'ok',
                                    token,
                                });
                        })
                })
            })
    },

    register: async(req, res) => {
        try {
            const { email, password } = req.body;
            var created;

            console.log('llego a la api register')


            if (!email || !password) {
                return res.status(404).json({
                    status: 'error',
                    errors: 'incomplete_fields',
                });
            }

            return registerUser(email, password, (created) => {
                if (!created) {
                    return res.status(404).json({
                        status: 'error',
                        errors: 'user_not_created',
                    });
                }

                return res.json({
                    status: 'ok'
                });
            })

        } catch (error) {
            console.log(`%c ${error}`, "background: #222; color: #bada55");
            return res.status(404).json({
                status: 'error',
                errors: 'internal_error',
            });
        }
    },
};

async function registerUser(email, password, callback) {
    email = email.toLowerCase()

    return crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64')
        return crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
            const encryptedPass = key.toString('base64')
            return User.findOne({ email })
                .exec()
                .then(user => {
                    if (user) {
                        return callback(false)
                    }
                    return createUser({ email, password: encryptedPass, salt: newSalt })
                        .then(
                            created => {
                                return callback(created)
                            }
                        )
                        .catch(err => {
                            return callback(false)
                        })
                })
                .catch(err => {
                    return false
                })
        })
    })
}

async function createUser(user) {
    try {
        let newUser = new User(user)
        let userSaved = await newUser.save()
        return true
    } catch {
        return false
    }
}

async function signToken(user) {
    var token;
    token = await jwt.sign({ user: user.email, id: user._id }, process.env.TOKEN_SECRET)
    return token
}