const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    github: String,
    linkedIn: String,
    jobTitle: String,
    phoneNo: Number,
    email: String,
    user: {
        userName: String,
        email: String,
        password: String,
        _id: String

    },
    educationList: [{
        instituteName: String,
        degree: String,
        feild: String
    }],
    workExperience: [{
        jobTitle: String,
        companyName: String,
        fromDate: String,
        tillDate: String,
        description: String
    }],
    projects: [{
        projectName: String,
        techUsed: String,
        details: String,
        projectLink: String,
    },],
    skills:[{
        skillName: String,
        rating: Number,
    }]

})

const formModel = mongoose.model('Form', formSchema)
module.exports = formModel