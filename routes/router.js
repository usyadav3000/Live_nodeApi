const express=require('express');
const router=express.Router();
let {errorHandeler}=require('../middleware/middleware');
const orderList=require('../model/orderForm/orderForm');
const counterNo=require('../model/counterCollection/counter');

router.get('/',(req,res,next) => {
  res.send("API running");
})

router.post('/',async(req,res)=>{
/* 
    let orderDetails= new orderList({
        orderNo: req.body.orderNo,
      OrderType: req.body.OrderType,
      phoneNo: req.body.phoneNo,
      delivery_Address: req.body.delivery_Address,
      totalValue: req.body.totalValue,
       "articles":[{
      ArticalName:req.body.articles[0].ArticalName,
      Price:req.body.articles[0].Price,
      Quantity:req.body.articles[0].Quantity,
      value:req.body.articles[0].value
      }
      ] 
    })
    console.log("hello ",req.body.articles)
     const details=await orderDetails.save();
  console.log(details); */

  let orderDetails=new orderList(req.body)
  const details=await orderDetails.save();
    res.send({
        "success": true,
        "message": "records return successfully",
        data: details,
        timestamp: new Date().getTime()
      });
})


router.get('/orderList', async (req, res, next) => {
  try {
    const userData2 = await orderList.aggregate([
      {
        $facet: {
          "data": [{
            $project: {
              _id: 0,
              orderNo: 1,
              OrderType: 1,
              phoneNo:1,
              delivery_Address:1,
              totalValue:1,
              articles:1,
              Delivery_Date: { $dateToString: { format: "%Y-%m-%d", date: "$Delivery_Date" } }
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
  

router.get('/orderList/:id',async(req,res,next)=>{
  try{
    const OrderNo1=req.params.id;
    console.log(OrderNo1);
    const order=Number(OrderNo1);
    //console.log(orderList.orderNo)
    const data = await orderList.aggregate([
    {$match:{orderNo:order}},
      {
        $project: {
          _id: 0,
          orderNo: 1,
          OrderType: 1,
          phoneNo: 1,
          delivery_Address: 1,
          totalValue: 1,
          articles:1,
          Delivery_Date: { $dateToString: { format: "%Y-%m-%d", date: "$Delivery_Date" } }
        }
      }
    ]);
    res.send({
      "success": true,
      "message": "records return successfully",
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

});

router.put('/orderList/:id',async(req,res,next)=>{
  try{
    //console.log(req.body);
    const id=Number(req.params.id);
    const delivery_Address1=req.body.delivery_Address;
    const phoneNo1=req.body.phoneNo;
    const totalValue1=req.body.totalValue;
    //const ArticalName1=req.body.articles[0].ArticalName;
    //console.log(ArticalName1);
    console.log(`id is=> ${id} and delivery add is=> ${delivery_Address1}`)
    var data=await orderList.updateOne({orderNo:id},{$set:
      {phoneNo:phoneNo1,totalValue:totalValue1,delivery_Address:delivery_Address1}
    });
    res.send({
      "success":true,
      "message":"records update successfully",
      data:data,
      timestamp:new Date().getTime()
    })
  }
  catch(err){
    //next(new errorHandler(400, "bad request", err));
    res.status(400).json({
      "success":false,
      "message":"bad request"
    })
  }
  });
  

router.delete('/orderList/:id',async(req,res,next)=>{
   try{
    const id=Number(req.params.id);
    console.log(id);
    const data= await orderList.deleteOne({orderNo:id});
    console.log("hello",data)
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
