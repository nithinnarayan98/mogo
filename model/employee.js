var mongoose=require('mongoose');
var schema=mongoose.Schema;
var empschema=new schema({
    eid:String,
    name:{type:String,required:true},
    salary:Number
})
var empmodel=mongoose.model("employee",empschema);
module.exports=empmodel;