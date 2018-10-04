var jsforce = require('jsforce');

var conn = new jsforce.Connection({
    oauth2: {
      // you can change loginUrl to connect to sandbox or prerelease env.
      loginUrl: 'https://test.salesforce.com/',
      clientId: '3MVG9MHOv_bskkhQKsOfEdjGIWrWajLB2pf_QqbXZQZhEXGBNlP2NxNzBStxHH4augZU7vuG.FchltxVAIVrd',
      clientSecret: '2261574018905486495',
      redirectUri: 'http://localhost:3000/'
      
    }
  });

  //callback function to get the token 

  var getToken = (callback)=>{

    var securityToken = 'JDmYHNZGLnsTocy1MtePvltqB';  //received from Salesforce 

  conn.login('systems@hawsco.com.iot', 'SF18r3s3t'+securityToken, function (err, userInfo) { //use security token to use SF in a browser or desktop app
    if (err) { 
      
      console.log(err);

      callback(err); 
    
    } else if (conn.accessToken){

      //console.log(conn.accessToken);

      callback(undefined, {   // returning NULL as error and json object with access token and Instance Url

        accToken: conn.accessToken,
        url: conn.instanceUrl

      });

    }
 
        
    });
  
  }

module.exports = {

    getToken, conn
};

 