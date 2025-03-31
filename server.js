const { log } = require("console");
var express=require("express");


var app=express();

app.listen(2002,function(){
    console.log("Server is running on port 2002");
})
app.use(express.static("public"));

app.get("/",function(req,resp){
     var dirname=__dirname+"/public/index.html";
     resp.sendFile(dirname);
})
app.get("/volm",function(req,resp){
    var dirname=__dirname+"/public/vol-manager.html";
    resp.sendFile(dirname);
})
app.get("/voldash",function(req,resp){
    var dirname=__dirname+"/public/vol-dashboard.html";
    resp.sendFile(dirname);
})
app.get("/jobmanager",function(req,resp){
    var dirname=__dirname+"/public/job-manager.html";
    resp.sendFile(dirname);
})
app.get("/admindash",function(req,resp){
    var dirname=__dirname+"/public/admin-dash.html";
    resp.sendFile(dirname);
})
app.get("/clim",function(req,resp){
    var dirname=__dirname+"/public/client-manager.html";
    resp.sendFile(dirname);
})
app.get("/findwork",function(req,resp){
    var dirname=__dirname+"/public/find-work.html";
    resp.sendFile(dirname);
})
app.get("/vkyc",function(req,resp){
    var dirname=__dirname+"/public/vol-KYC.html";
    resp.sendFile(dirname);
})
app.get("/pjob",function(req,resp){
    var dirname=__dirname+"/public/post-job.html";
    resp.sendFile(dirname);
})
app.get("/clprof",function(req,resp){
    var dirname=__dirname+"/public/client-profile.html";
    resp.sendFile(dirname);
})
app.get("/users",function(req,resp){
    var dirname=__dirname+"/public/user-controller.html";
    resp.sendFile(dirname);
})
 app.get("/login",function(req,resp){
    resp.write();
    resp.end();
    
})
app.get("/signup",function(req,resp){
    resp.write();
    resp.end();
})
// cloudinary-------------------------
var cloudinary=require("cloudinary").v2;
var fileUploader=require("express-fileupload");

app.use(express.urlencoded(true)); //convert POST data to JSON object
        app.use(fileUploader());//to recv. and upload pic on server from client

        cloudinary.config({ 
            cloud_name: 'dvn2ftocc', 
            api_key: '427544545312716', 
            api_secret: 'gU5AQUPcSSGjV7SXJtO0lEUiOR0' // Click 'View API Keys' above to copy your API secret
        });


// connectionnnn tooo databaseeeeee
var mysql2=require("mysql2");
let dbConfig="mysql://avnadmin:AVNS_0pRVPwtj-5030Le5Q1O@mysql-bce-manvindersheenh-c5f5.i.aivencloud.com:17093/nexthope";

let mySqlServer=mysql2.createConnection(dbConfig);

mySqlServer.connect(function(err){
    if(err!=null)
    {
        console.log(err.message);
    }
    else
        console.log("Connected to DB")
    
})


app.get("/do-signup-email",function(req,resp){

    var email =req.query.txtemail;
    var pwd =req.query.txtpwd;
    var utype =req.query.txttype;
    
   mySqlServer.query("insert into users value(?,?,?,current_date(),?)",[email,pwd,utype,1],function(err,jsonArray){
        if(err==null)
        {
            resp.send("signup successfully");

        }
        else
        {
            resp.send(err.message);
        }
    })
   
})


app.get("/do-login-email",function(req,resp){

    var email =req.query.txtemail1;
    var pwd =req.query.txtpwd1;    


    mySqlServer.query("select * from users where emailid=? and pwd=?",[email,pwd],function(err,jsonArray){
        if(jsonArray.length==1)
        {
            resp.send(jsonArray[0]["utype"]);
        }
        else
        {
            resp.send("invalid user");
        }
    })
   
})


app.post("/vol-register",async function(req,resp){
    let fileName="";
    if(req.files!=null)
    {
        fileName=req.files.profpic.name;
        let locationToSave=__dirname+"/public/uploads/"+fileName;//full ile path
        req.files.profpic.mv(locationToSave);//saving file in uploads folder

         //saving ur file/pic on cloudinary server
         await cloudinary.uploader.upload(locationToSave).then(function(picUrlResult){
            fileName=picUrlResult.url;   //will give u the url of ur pic on cloudinary server
            console.log(fileName);
      });
    }
    else
    fileName="nopic.jpg";


    let fileName1;
    if(req.files!=null)
    {
        fileName1=req.files.idPic.name;
        let locationToSave=__dirname+"/public/uploads/"+fileName1;//full ile path
        req.files.idPic.mv(locationToSave);//saving file in uploads folder

         //saving ur file/pic on cloudinary server
         await cloudinary.uploader.upload(locationToSave).then(function(picUrlResult){
            fileName1=picUrlResult.url;   //will give u the url of ur pic on cloudinary server
            console.log(fileName1);
      });
    }
    else
    fileName="nopic.jpg";

    req.body.picpath=fileName;
    req.body.idpath=fileName1;
    
    
    mySqlServer.query("insert into volkyc value(?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.emailform,req.body.nameform,req.body.contform,req.body.addform,req.body.cityform,req.body.genderform,req.body.dobform,req.body.qualiform,req.body.occuform,req.body.otherform,req.body.picpath,req.body.idpath],function(err,jsonArray){
        if(err==null )         
            {
                resp.send("register successfully");
    
            }
            else
            {
                resp.send(err.message);
            }
    })

})


// -----------------updateeeeee------------------
app.post("/vol-update-list",async function (req,resp) {

    let fileName="";
    if(req.files!=null)
    {
        fileName=req.files.profpic.name;
        let locationToSave=__dirname+"/public/uploads/"+fileName;//full ile path
        req.files.profpic.mv(locationToSave);//saving file in uploads folder

         //saving ur file/pic on cloudinary server
         await cloudinary.uploader.upload(locationToSave).then(function(picUrlResult){
            fileName=picUrlResult.url;   //will give u the url of ur pic on cloudinary server
            console.log(fileName);
      });
    }
    else
    fileName="nopic.jpg";


    let fileName1;
    if(req.files!=null)
    {
        fileName1=req.files.idPic.name;
        let locationToSave=__dirname+"/public/uploads/"+fileName1;//full ile path
        req.files.idPic.mv(locationToSave);//saving file in uploads folder

         //saving ur file/pic on cloudinary server
         await cloudinary.uploader.upload(locationToSave).then(function(picUrlResult){
            fileName1=picUrlResult.url;   //will give u the url of ur pic on cloudinary server
            console.log(fileName1);
      });
    }
    else
    fileName="nopic.jpg";

    req.body.picpath=fileName;
    req.body.idpath=fileName1;
    
    
    mySqlServer.query("update  volkyc set name=?,contact=?,address=?,city=?,gender=?,dob=?,quali=?,occu=?,info=?,picpath=?,idpath=? where emailid=?",[req.body.nameform,req.body.contform,req.body.addform,req.body.cityform,req.body.genderform,req.body.dobform,req.body.qualiform,req.body.occuform,req.body.otherform,req.body.picpath,req.body.idpath,req.body.emailform],function(err,jsonArray){
        if(err==null )         
            {
                resp.send("update successfully");
    
            }
            else
            {
                resp.send(err.message);
            }
    })

})
 

app.get("/fetch-user",function(req,resp){
    mySqlServer.query("select * from volkyc where emailid=?",[req.query.email],function(err,jsonArray){
        if(err==null)
            {
                resp.send(jsonArray);
                }
                else
                {
                    resp.send(err.message);
                    }
})

})


app.post("/cl-save",function(req,resp){
    mySqlServer.query("insert into clprof value(?,?,?,?,?,?,?,?,?,?)",[req.body.clientid,req.body.Cname,req.body.CFB,req.body.Cbprof,req.body.Cadd,req.body.Ccity,req.body.Ccontact,req.body.Cidprof,req.body.Cidno,req.body.Cother],function(err,jsonArray){
        console.log(req.query.Clientid)
        if(err==null)
        {
            resp.send("savedddd bhaiiii.....");

        }
        else
        {
            resp.send(err.message);
        }
})
})


app.get("/search-user",function(req,resp){
    mySqlServer.query("select * from clprof where email=?",[req.query.email],function(err,jsonArray){
        if(err==null)
            {
                resp.send(jsonArray);
                }
                else
                {
                    resp.send(err.message);
                    }
})
})


app.post("/cl-change",function(req,resp){
    mySqlServer.query("update  clprof set name=?,business=?,bprofile=?,address=?,city=?,contact=?,idproof=?,idno=?,info=? where email=?",[req.body.Cname,req.body.CFB,req.body.Cbprof,req.body.Cadd,req.body.Ccity,req.body.Ccontact,req.body.Cidprof,req.body.Cidno,req.body.Cother,req.body.clientid],function(err,jsonArray){
        if(err==null )         
            {
                resp.send("update successfully");
    
            }
            else
            {
                resp.send(err.message);
            }
    })
})


app.post("/publish-job",function(req,resp){
    mySqlServer.query("insert into jobs value(?,?,?,?,?,?,?,?)",[null,req.body.pid,req.body.pjob,req.body.pradio,req.body.paddress,req.body.pCity,req.body.pedu,req.body.pcontact],function(err,jsonArray){
        if(err==null)
        {
            resp.send("savedddd bhaiiii.....");

        }
        else
        {
            resp.send(err.message);
        }
})
})


app.get("/all-records",function(req,resp)
{
    mySqlServer.query("select * from users",function(err,result)
    {
        if(err==null)
        {
         resp.send(result);
        }
        else
        resp.send(err.message);
    })
})


app.get("/doBlock",function(req,resp)
{
    let userMail=req.query.emailKuch;
                                                  //col name Same as  table col name
    mySqlServer.query("update users set status=0 where emailid=?",[userMail],function(err,result)
    {
        if(err==null)
        {
            if(result.affectedRows==1)
            resp.send("stuts block Successfulllyyyy");
            else
            resp.send("Inavlid User Id");
        }
        else
        resp.send(err.message);
    })
})


app.get("/Resume",function(req,resp)
{
    let userMail=req.query.emailKuch;
                                                  //col name Same as  table col name
    mySqlServer.query("update users set status=1 where emailid=?",[userMail],function(err,result)
    {
        if(err==null)
        {
            if(result.affectedRows==1)
            resp.send("status Resume Successfulllyyyy");
            else
            resp.send("Inavlid User Id");
        }
        else
        resp.send(err.message);
    })
})


app.get("/fetch-records",function(req,resp)
{
    mySqlServer.query("select * from volkyc",function(err,result)
    {
        if(err==null)
        {
         resp.send(result);
        }
        else
        resp.send(err.message);
    })
})


app.get("/client-records",function(req,resp)
{
    mySqlServer.query("select * from clprof",function(err,result)
    {
        if(err==null)
        {
         resp.send(result);
        }
        else
        resp.send(err.message);
    })
})

app.get("/find-work",function(req,resp)
{
    mySqlServer.query("select * from jobs where city=? and jobtitle=? ",[req.query.city,req.query.jobtitle],function(err,result)
    {
        if(err==null)
        {
         resp.send(result);
        }
        else
        resp.send(err.message);
    })
})
app.get("/fetchcity1",function(req,resp)
{
    mySqlServer.query("select distinct city from jobs",function(err,result)
    {
        if(err==null)
        {
         resp.send(result);
        }
        else
        resp.send(err.message);
    })
})
app.get("/fetchjob",function(req,resp)
{
    mySqlServer.query("select distinct jobtitle from jobs",function(err,result)
    {
        if(err==null)
        {
         resp.send(result);
        }
        else
        resp.send(err.message);
    })
})

app.get("/search",function(req,resp)
{
    mySqlServer.query("select * from jobs where cid= ?",[req.query.email],function(err,result)
    {
        if(err==null)
        {
         resp.send(result);
        }
        else
        resp.send(err.message);
    })
})

app.get("/delete",function(req,resp)
{
    mySqlServer.query("delete  from jobs where jobid= ?",[req.query.email1],function(err,result)
    {
        if(err==null)
        {
         resp.send(result);
        }
        else
        resp.send(err.message);
    })
})

app.get("/changepwd",function(req,resp)
{
    let userMail=req.query.txtemail;
                                                  //col name Same as  table col name
    mySqlServer.query("update users set pwd=? where emailid=? and pwd=?",[req.query.txtnew,userMail,req.query.txtpwd],function(err,result)
    {
        if(err==null)
        {
            if(result.affectedRows==1)
            resp.send("upadate Successfulllyyyy");
            else
            resp.send("Inavlid User Id");
        }
        else
        resp.send(err.message);
    })
})

app.get("/changeclient",function(req,resp)
{
    let userMail=req.query.txtemail;
                                                  //col name Same as  table col name
    mySqlServer.query("update users set pwd=? where emailid=? and pwd=?",[req.query.txtnew,userMail,req.query.txtpwd],function(err,result)
    {
        if(err==null)
        {
            if(result.affectedRows==1)
            resp.send("upadate Successfulllyyyy");
            else
            resp.send("Inavlid User Id");
        }
        else
        resp.send(err.message);
    })
})
