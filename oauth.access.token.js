var async = require('asyncawait/async');
var await = require('asyncawait/await');
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var OAuth = require('oauth-1.0a');
var CryptoJS = require('crypto-js');
const request = require('request');
chai.use(chaiHttp);


const getOAuthAccessToken = async (function (){

    var consumerkey="mA3gaAzIqWYrb9XqJR8KwlcKvPnc0Rcj";
    var callbackURL="https://customer-stg.autodesk.com";
    var timestamp=Math.floor((new Date()).getTime() / 1000);
    var message=callbackURL + consumerkey + timestamp;
    var clientSecret="zevi3Bb0UtzqUwQb";

    var signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(message, clientSecret));

    var authHeader = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(consumerkey + ":" + clientSecret));

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    let server = 'https://enterprise-api-stg.autodesk.com';
    let path = '/v2/oauth/generateaccesstoken?grant_type=client_credentials';

    const response = await (chai.request(server)
        .post(path)
        .send({})
        .set('Authorization', 'Basic '+authHeader)
        .set('timestamp',timestamp)
        .set('signature', signature));
    expect(response.status).to.equal(200);
    return response.body.access_token;
});


module.exports={getOAuthAccessToken};
