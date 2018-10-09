
const request = require('request');

var sfAccess = require('../access');



var accounts = (accountType) => {

    //returns a promise with request output

    return new Promise(

        (resolve, reject) => {

            sfAccess.getToken((err, resp) => {

                if (err) {

                    console.log(err);

                    reject(err);

                } else {

                    url = 'https://haws--iot.cs8.my.salesforce.com/services/apexrest/showAccounts/' + accountType

                    request(url,
                        {
                            json: true,

                            auth: { bearer: resp.accToken }

                        },
                        (err, response, body) => {

                            if (err) {

                                console.log(err);

                                reject(err);
                            } else {

                                var dataObj = [];

                                body.forEach(element => {
                                    
                                    dataObj.push({

                                        accountId : element.Id,
                                        Name : element.Name,
                                        Type : element.Type,
                                        Phone : element.Phone,
                                        Website : element.Website

                                    })



                                });

                                resolve({
                                    "data" : dataObj
                                });

                            }

                        });

                }

            }
            )

        }

    );

}


module.exports = {

    accounts

};