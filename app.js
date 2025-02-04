const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true})); 

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req , res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    var data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    
    const jsonData = JSON.stringify(data);
    
    const url = "https://us17.api.mailchimp.com/3.0/lists/f911ee2a87";
    
    const options = {
        method: "POST",
        auth: "sudhanshu:41bcfa6ca66e61a16f879a7dad041d20-us17"
    }

    const request = https.request(url, options, function (response) {

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else{
            res.sendFile(__dirname + "/failure.html");
        }

    response.on("data", function(data) {
         console.log(JSON.parse(data));
    })
    
 })
       request.write(jsonData);
       request.end();

});

app.listen(3000, function(){
    console.log("server is running on port 3000.")
})





// api key
// 41bcfa6ca66e61a16f879a7dad041d20-us17
// audience id
// f911ee2a87