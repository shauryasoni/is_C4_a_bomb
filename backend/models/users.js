const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema(
    {
        name :{
            type : String,
            required : true
        },
        username : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true 
        },
        password : {
            type : String,
            required : true
        },
        wins : {
            type : Number,
            required : false,
            default : 0
        },
        losses : {
            type : Number,
            required : false,
            default : 0
        }
    });

UserSchema.plugin(uniqueValidator, {message : "Email already exists. Try signing in instead"});

const User = mongoose.model('User', UserSchema); //compiles the above model
module.exports = { User };


