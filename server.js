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


/**
 * coding problem solve 
 * top 50 question
 */
/* 
// find longgest word from the sentances
 function longgestWord(str){
    var words=str.split(' ');
    console.log(words);
    var longgestWord="";
    for(let word of words){
        if(word.length>=longgestWord.length){
            longgestWord=word;
        }
    }
    return longgestWord;
 }
 
 console.log(longgestWord("hello my name is umash yadav")); */


//2nd problem

/* function findSequances(arr){
    var arith=new Set();
    var geo=new Set();
 for(let i=1;i<arr.length;i++){
  let number1=arr[i]-arr[i-1];
  arith.add(number1);
  let num2=arr[i]/arr[i-1];
  geo.add(num2);
 }
 
 if(arith.size==1){
    console.log("arithmatic series..");
 }
 else if(geo.size==1){
    console.log("geomatric  series..");
 }
 else{
    console.log("-1");
 }
}

findSequances([2,4,8,16]); */


//3 problem 
/* 
function CaptilizeFirstletter(str){
    var arr=[];
    var words=str.split(' ');
    for(let word of words){
      var p= word.charAt(0).toUpperCase()+word.slice(1);
      arr.push(p);
    }
    console.log(arr)
    return arr.join(" ")
 }
 
 console.log(CaptilizeFirstletter("hello my name is umash yadav")); */

 /*****************/



app.listen(port,()=>{
    console.log("port start on ",port)
})