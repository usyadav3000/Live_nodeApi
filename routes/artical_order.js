const express=require('express');
const router=express.Router();
let {errorHandeler}=require('../middleware/middleware');
const orderList=require('../model/orderForm/orderForm');
const articalList=require('../model/artical/artical');
const counterC=require('../model/counterCollection/counter');
const { application } = require('express');

router.post('/',async(req,res,next)=>{
    console.log(req.body);
/* var orderNo2=await orderList.find({orderNo:'22'}); */
  const userData2 = await counterC.aggregate([
    {
      $facet: {
        "data": [{
          $project: {
            _id: 0,
            artical_id: 1,
          }
        }]
      }
    }
  ]);

let counter=userData2[0].data[0].artical_id
console.log("ee ",counter)
const p=await counterC.updateOne({artical_id:counter},{$set:{artical_id:(counter+1)}});
console.log(p);
    let articalDetails=new articalList({
        ArticleId:counter,
        ArticalName: req.body.ArticalName,
        Price: req.body.Price,
        Quantity: req.body.Quantity,
        value: req.body.value,
    })
    articalDetails.save();

    res.send({
        "success": true,
        "message": "records return successfully",
        data: articalDetails,
        timestamp: new Date().getTime()
      });
})


router.get('/articalList',async(req,res)=>{
  try {
    const userData2 = await articalList.aggregate([
      {
        $facet: {
          "data": [{
            $project: {
              _id: 0,
              ArticleId: 1,
              ArticalName: 1,
              Price:1,
              Quantity:1,
              value:1,
            }
          }],
          "count": [{ $count: "count" }]
        }

      }

    ]);
    const count=userData2[0].count.length ? userData2[0].count[0].count :0;
    //console.log("h",userData2[0].count.length);
    res.send({
      "success": true,
      "message": "records return successfully",
      data: userData2[0].data,
      timestamp: new Date().getTime(),
      "totalCount":count
    })
  }
  catch (err) {
    //next(new errorHandler(400, "bad request", err));
    res.status(400).json({
      "success":false,
      "message":"bad request"
    })
  }
});
  
router.put('/articalList/:id',async(req,res,next)=>{
  try{
    const id=req.params.id;
  const Artical_Name=req.body.ArticalName;
  const price=req.body.Price;
  const quantity=req.body.Quantity;
  const Value=req.body.value;
  console.log(id);
  //console.log(Artical_Name+" "+price+"  "+quantity)
  const data =await articalList.updateMany({ArticleId:id},{$set:{ArticalName:Artical_Name,Price:price,Quantity:quantity,value:Value}});
  res.send({
    "success": true,
    "message": "records upadated successfully",
    data:data,
    timestamp: new Date().getTime(),
  })
  }
  catch(err){
    res.status(400).json({
      "success":false,
      "message":"bad request"
    })
  }
})

router.delete('/articalList/:id',async(req,res,next)=>{
  try{
    const id=req.params.id;
  console.log(id);
  const data=await articalList.deleteOne({ArticleId:id});
  res.send({
    "success": true,
    "message": "records deleted successfully",
    data:data,
    timestamp: new Date().getTime(),
  })
  }
  catch(err){
    res.status(400).json({
      "success":false,
      "message":"bad request"
    })
  }
})

module.exports=router;