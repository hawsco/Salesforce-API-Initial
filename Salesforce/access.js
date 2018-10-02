var jsforce = require('jsforce');

var conn = new jsforce.Connection({
    oauth2: {
      // you can change loginUrl to connect to sandbox or prerelease env.
      loginUrl: 'https://test.salesforce.com/',
      clientId: '3MVG9MHOv_bskkhQKsOfEdjGIWrWajLB2pf_QqbXZQZhEXGBNlP2NxNzBStxHH4augZU7vuG.FchltxVAIVrd',
      clientSecret: '2261574018905486495',
      //redirectUri: 'http://localhost:3000/' || 'https://gentle-reef-30466.herokuapp.com/auth/heroku/callback'
      redirectUri: 'http://salesforce-api-initial.appspot.com/'
    }
  });
 

  var getToken = (callback)=>{

    var securityToken = 'JDmYHNZGLnsTocy1MtePvltqB';

  conn.login('systems@hawsco.com.iot', 'SF18r3s3t'+securityToken, function (err, userInfo) {
    if (err) { 
      
      console.log(err);

      callback(err); 
    
    } else if (conn.accessToken){

      console.log(conn.accessToken);

      callback(undefined, {

        accToken: conn.accessToken,
        url: conn.instanceUrl

      });

    }
 
        
    });
  
  }

module.exports = {

    getToken
};

 