const mailchimp = require("@mailchimp/mailchimp_marketing");
const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
  apiKey: "7f731a5be5d7a2a4f0a9ea5716c8238b-us1",
  server: "us1",
});


app.post("/", function(req, res){
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

const newUser = {
  firstName: firstName,
  lastName:lastName,
  email: email
      }



      const run = async () => {
        try {
          const response = await mailchimp.lists.addListMember("86558f6f47", {
            email_address: newUser.email,
            status: "subscribed",
            merge_fields: {
              FNAME: newUser.firstName,
              LNAME: newUser.lastName
            }
          });
          console.log(response);
          res.sendFile(__dirname + "/success.html");
        } catch (err) {
          console.log(err.status);
          res.sendFile(__dirname + "/failure.html");
        }
      };

      run();
      });


    app.post("/failure", function(req, res) {
      res.redirect("/");
    });

    app.listen(process.env.PORT || 2000, function() {
      console.log("Server is running on port 2000.");
    });





//
//
//
// const jsonData = JSON.stringify(data);
//
// const url = "https://us1.api.mailchimp.com/3.0/lists/86558f6f47";
//
// const options = {
//   method: "POST",
//   auth: "emily25:7f731a5be5d7a2a4f0a9ea5716c8238b-us1"
// }
// const request = https.request(url, options, function(response) {
//
// if (response.statusCode === 200) {
//   res.sendFile(__dirname + "/success.html");
// } else {
//   res.sendFile(__dirname + "/failure.html");
// }
//
//   response.on("data", function(data){
//     console.log(JSON.parse(data));
//   })
// })
//
// request.write(jsonData);
// request.end;
//
// });
//
// app.post("/failure", function(req, res){
//   res.redirect("/");
// })
//
// app.listen(2000, function(){
//   console.log("server is running on port 2000.");
// });

// 7f731a5be5d7a2a4f0a9ea5716c8238b-us1

// 86558f6f47
