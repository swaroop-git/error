const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//create Admin Schema & model
const AdminSchema = new Schema({
    name: {
        type:String,
        required: [true,'name field is required']
    },
    email_address:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
    available:{
        type:Boolean,
        default:false
    }
     
});

const Admin = mongoose.model('admin', AdminSchema);

module.exports = Admin;