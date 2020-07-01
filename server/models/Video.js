
/**
 * Video model
 * @author Chhanda Charan <deepak-padampur>
 *     @createdAt Jun 28 9:46:05
 *     @description Here mongoose.Schema is used so that we can import the whole users data
 *
 * */
const mongoose = require('mongoose');
const Schema=mongoose.Schema

const videoSchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title: {
        type:String,
        maxlength: 50,
    },
    description: {
        type: String
    },
    privacy: {
        type:Number
    },
    filePath : {
        type:String
    },
    category: String,
    views : {
        type: Number,
        default:0
    },
    duration :{
        type: String
    },
    thumbnail:{
        type:String
    },


},{
    timestamps:true  //it will automatically generate the created at and update at
  })


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }