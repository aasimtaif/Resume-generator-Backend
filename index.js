const express = require('express');
const mongoose = require('mongoose');
const formModel = require('./models/data.model')
const bodyParser = require('body-parser');
const { signUp, login,authenticationToken } = require('./controllers/UserController')
const port = 2000
const app = express()
const cors = require("cors");
require("dotenv").config();
app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true, }));

const DB = process.env.MONGOBD_DATABASE

mongoose.connect(DB).then(() => {
    console.log("Connected to Database")
}).catch(err => console.log(err, "error on connection"))


app.get('/resume/user/:userId', authenticationToken, async (req, res) => {
    const { userId } = req.params
    const resume = await formModel.find({ "user._id": userId })
    // console.log(resume.length)
    res.send(resume)

})

app.get('/resume/:resumeId', authenticationToken, async (req, res) => {
    const { resumeId } = req.params
    const resume = await formModel.find({_id:resumeId})
    console.log(resume.length)
    res.send(resume)

})



app.post('/signup', signUp)
app.post('/login', login)


app.post('/form',authenticationToken, (req, res) => {

    formModel.create(req.body).then(() => {
        console.log("Saved")

    }).catch(err => console.log(err, "error"))

    console.log(req.body)
    res.send(req.body)
})




app.listen(port, () => {
    console.log("listening on port" + port)
})

//QFj20irUFeq9HkNV