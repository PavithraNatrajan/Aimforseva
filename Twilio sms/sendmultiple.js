var fs = require("fs");
// Get content from file
var contents = fs.readFileSync("sms.json");
// Define to JSON type
var jsonContent = JSON.parse(contents); 

var accountSid = jsonContent.accountSid,
     authToken = jsonContent.authToken
//var serviceSid = 'ISe313018081349a3c4e7a68b4bf2c0429'

var client = require('twilio')(accountSid, authToken);

// For Single User

/*client.messages.create({
    to: '+918639471140',
    from: '+12015003242',
    body: "Hi People of Cintana"
}, function(err, smsdt) {
    if (smsdt) {
        console.log("Testing SMS " + smsdt.body);
        //res.setHeader('Content-Type', 'application/json');
       // res.status(200).send(JSON.stringify(smsdt.body));
    } else {
        console.log(err);
    }
}); */

// For Multiple Users.

  var phoneArr = [{"mobnumber":"+918098271254","msg":"Greetings Mythreyi"}    
  //NOTE: Mytheryi for twilio sms we should register our phone number else it wont give you messages
                //req.body.mobilenumber
                // {"mobnumber":"+919949709720","msg":"Greetings Rahul"},
                // {"mobnumber":"+919952967615","msg":"Greetings Shobana"},
                // {"mobnumber":"+919698655055","msg":"Greetings Pavithra"},
                // {"mobnumber":"+917661815544","msg":"Greetings Deekshitha"},
                // {"mobnumber":"+918098271254","msg":"Greetings Mytheryi"}
              ];

        phoneArr.forEach(function(doc) {
            console.log(doc);

           client.messages.create({
                to: doc.mobnumber,
                from: jsonContent.from,
                body:doc.msg 
              })

         });  
//var smsmodule = require('smsmodule');


        
        

             
        