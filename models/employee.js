const mongoose = require("mongoose");

const Employeeschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'please add your name']
    },
    title:{
        type:String,
        required:[true, 'please add the title']
    },
    status:{
        type:String,
        default:'intern'
    }
})

module.exports = mongoose.model("Employee", Employeeschema);