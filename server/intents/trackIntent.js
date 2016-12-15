'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, cb) {
    if(intentData.intent[0].value != 'track') {
        return cb(new Error(`Expected suggest intent, got ${intentData.intent[0].value}`));
    }

    var ipaddr = intentData.ip[0].value;
    // what is the incpetion movie?
    // http://www.omdbapi.com/?t=inception&y=&plot=short&r=json
    // track this ip 199.212.27.188
    var urlGet = "http://ip-api.com/json/" + ipaddr;
      request.get(urlGet, (err, res) => {
          console.log(res.statusCode);
        if(err || res.statusCode != 200) {
            //console.log(err);
            //console.log(res.body);
           //return cb(false, `Sorry, It seems there is some problem in the network connection.`);
        }
        var ipinfo = res.body;   // ${ipinfo.as}
        var info = `ISP: ${ipinfo.as}, City: ${ipinfo.city}, Country: ${ipinfo.country}`;
        console.log("Response" + res.body.Response);
        return cb(false, info);
    });
  
    //console.log("genre");
    //return cb(false,"Sure, your genre is " + genre);
    /*
    const location = intentData.location[0].value;

    request.get(`http://localhost:4010/service/${location}`, (err, res) => {
        if(err || res.statusCode != 200 || !res.body.result) {
            console.log(err);
            console.log(res.body);

            return cb(false, `I had a problem find out the time in ${location}`);
        }

        return cb(false, `In ${location}, it is now ${res.body.result}`);
    });
*/
}

/*
https://slack-project.slack.com/messages/@mediabot/team/mediabot/
*/