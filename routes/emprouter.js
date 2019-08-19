var express=require('express')
var mongoose=require('mongoose')
var bodyparser=require("body-parser")


var url="mongodb://localhost/sdb"
mongoose.connect(url,function(err){
    if (err) throw err
    else{
     console.log("data connected")
            
        
    }
})
var emp=require('../model/employee')

const router=express.Router();


router.use(bodyparser.urlencoded({extended:true}));
router.get("/",function(req,res){
    res.render('new');
})
router.get("/new",function(req,res){
    res.render('new')
})
router.post("/add",function(req,res){
    var e1=new emp();
    e1.eid=req.body.eid;
    e1.name=req.body.ename;
    e1.salary=req.body.esal;
    e1.save(function(err){
        if(err) throw err
       
           res.send("data added...")
        
    })
})
router.get("/view",function(req,res){
   emp.find({},function(err,result){
       if(err) throw err
       else{
console.log(result)
        res.render('view',{empdata:result})
       }
   })
  
})

router.get("/edit/:id",function(req,res){
    var id = req.params.id;
  
    emp.find({"eid":req.params.id},function(err,result){
        if(err) throw err
        else{
        console.log(result);
         res.render('edit',{empdata:result});
        }
    }
    )
})
router.post('/up',function(req,res){
    emp.update({eid:req.body.eid},{$set:{name:req.body.ename,salary:req.body.esal}},function(err,result){
        if(err) throw err
        else{
            emp.find({},function(err,result)
            {
                if(err)
                throw err
                else{
                    console.log(result)
                    res.render('view',{empdata:result})
                }
            })
 
        }  
    })
})
router.get("/delete/:id",function(req,res){
    emp.deleteOne({eid:req.params.id},(err)=>{
        if(err) throw err;
        else{
            console.log("deleted");
            res.redirect("/emp/view");
        }
    })
})



module.exports=router;