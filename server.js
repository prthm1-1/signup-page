const express=require("express");
const bodyParser=require("body-parser");
const https = require('https');



const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    var firstname=req.body.fname;
    var lastname=req.body.lname;
    var email=req.body.email;
    var data={
        members:[{
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME: firstname,
                LNAME: lastname
            }
        }
        ]
    };
    var jsonData=JSON.stringify(data);
    console.log(firstname,lastname,email);
    const url="https://us9.api.mailchimp.com/3.0/lists/c8825a016e"
    const options={
        method:"POST",
        auth:"pratham1:62166208c217ae974cbc709cea34d284-us9"
    }
    const request=https.request(url,options,function(response){
        
        // if(response.statusCode===200){
        //     res.sendFile(__dirname+"/success.html");
        // }
        // else{
        //     res.sendFile(__dirname+"/failure.html");
        // }
        
        const displayFile=new Promise((resolve,reject)=>{
            if(response.statusCode===200){
                    resolve(__dirname+"/success.html");
                }else{
                    rejects(__dirname+"/failure.html");
                }
        })
        displayFile.then((v)=>{
        res.sendFile(v);
        }).catch((e)=>{
        res.sendFile(e);
        });
        


        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
     request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.post("/success",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
})

