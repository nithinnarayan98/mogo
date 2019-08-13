var express=require('express');
const app=express();
var emprouter=require("./routes/emprouter")
app.set("view engine","ejs")
app.set("views",'./src/views')
app.use("/emp",emprouter)

app.get("/",function(req,res){
    res.render("home")
})

app.listen(8080,function(req,res){
    console.log("server is starting")
})