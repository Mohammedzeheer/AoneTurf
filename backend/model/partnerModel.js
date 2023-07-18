const mongoose= require('mongoose')

const partnerSchema = new mongoose.Schema({
      email:{type:String,require: true},
      phonenumber:{type:Number,require: true},
      turfname:{type:String,required:true},
      username: {type:String,require: true},
      password :{type:String,required:true},
      status:{type:Boolean,default:true}
})

module.exports = mongoose.model ('partners', partnerSchema)