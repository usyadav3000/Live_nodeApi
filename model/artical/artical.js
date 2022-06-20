const mongoose=require('mongoose');

const Schema=mongoose.Schema;

var articalModel=new Schema({
ArticleId:{type:Number},    
ArticalName:{type:String},
Price:{type:Number},
Quantity:{type:Number},
value:{type:Number}
},
{});

module.exports=mongoose.model('artical',articalModel);