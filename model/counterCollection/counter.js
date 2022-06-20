const mongoose=require('mongoose');

const Schema=mongoose.Schema;
var counterSchema=new Schema({
 artical_id:{type:Number}
},{
    collection:'counterCollection1'
});

module.exports=mongoose.model('counterCollection1',counterSchema);