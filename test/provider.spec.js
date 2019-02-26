
    const Verifier = require('pact').Verifier


const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiAsPromised)
var getOAuthAccessToken = require('../oauth.access.token.js').getOAuthAccessToken;

var await = require('asyncawait/await');
var async = require('asyncawait/async');

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  it('should validate the expectations of Matching Service', async(function() { // lexical binding required here
      this.timeout(10000)
      let authToken = 'Authorization: Bearer '+await(getOAuthAccessToken());
      let oxygenId =  "ansasadsa";
      let opts = {
          providerBaseUrl: 'https://xxxx-api-xxx.xxxx.com',
          customProviderHeaders: authToken,
          pactUrls: [path.resolve(process.cwd(), './pacts/matching_service-animal_profile_service.json')]
    };
     // console.log(opts);

      return Verifier.verifyProvider(opts)
      .then(output => {
          console.log('STARTED');
          console.log(opts.pactUrls);
        console.log('Pact Verification Complete!')
        console.log(output)
      })
  }));
});


