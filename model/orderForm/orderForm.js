const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var orderModel= new Schema({
orderNo:{type:Number,required:true,index: { unique: true, sparse: true }},
Delivery_Date:{type:Date,default:Date.now},
OrderType:{type:String,required:true},
phoneNo:{type:String,required:true},
delivery_Address:{type:String},
totalValue:{type:Number},
articles:[{
    ArticleId:{type:Number},  
    ArticalName:{type:String},
    Price:{type:Number},
    Quantity:{type:Number},
    value:{type:Number} 
}
]
},
{colletion:'orderList'})

module.exports=mongoose.model('orderList',orderModel);
