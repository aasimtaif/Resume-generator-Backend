const userModel = require('../models/User.model')
const bcrypt = require('bcrypt');
require("dotenv").config({path: "./vars/.env"});
// require("dotenv").config();
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY


const signUp = async (req, res) => {
    const { userName, email, password } = req.body
    try {
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 11)

        // console.log(hashedPassword)
        const result = await userModel.create({
            userName: userName,
            email: email,
            password: hashedPassword
        })
        const token = jwt.sign({ email: result.email, password: result.password }, SECRET_KEY)
        res.status(200).json({ user: result, token: token })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: "something went Wrong" })
    }

}
const login = async (req, res) => {
    const { email, password } = req.body
    try {

        const existingUser = await userModel.findOne({ email: email })
        if (!existingUser) {
            return res.status(400).json({ messsage: "email not registered" })
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchPassword) {
            return res.status(400).json({ message: "invalid password" })
        }
        const token = jwt.sign({ email: existingUser.email, password: existingUser.password }, SECRET_KEY)
        // console.log(token)
        res.status(200).json({ user: existingUser, token: token })

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: "something went Wrong" })
    }

}

const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    // console.log(token)
    if (token == null) return res.status(401).json({ message: "Invalid authorization" })
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({ message: "token is not correct" })
        req.user = user
        next()
    })
}

module.exports = { signUp, login, authenticationToken }
