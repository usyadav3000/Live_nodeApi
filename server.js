const express=require('express');
const app=express();
const port=process.env.PORT||5001;
const bodyParser=require('body-parser');
require('./model/db/db')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const orderRouter=require('./routes/router');
const articalRouter=require('./routes/artical_order');
app.use('/order',orderRouter);
app.use('/artical',articalRouter);


app.listen(port,()=>{
    console.log("port start on ",port)
})