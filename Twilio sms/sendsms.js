var accountSid = 'ACe42eb87e4db5568d210d632e8d5ae29f'
var authToken = 'd64a993f290de096e82cd5d0e4ea0706'

var client = require('twilio')(accountSid, authToken);
//var recenumb=['+919952967615','+918639471140','+919698655055'];
client.messages.create({
    to: '+918639471140',
    from:'+12015003242',
    body: 'Hi Cintana',
}, function(err, message){
    if(err){
        console.log(err);
    }else{
        console.log(message.sid);
    }
});