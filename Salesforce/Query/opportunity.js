const sfConnection = require('../access');

var querySoql = (accountName) => {

    return new Promise(

        (resolve, reject) => {
            sfConnection.getToken((err, res) => {

                if (res.accToken) {

                    var query = `select Name, probability, amount from Opportunity  where isClosed = false and AccountID in 
                                (select Id from Account where axaccountnum__c = '${accountName}' )`

                    sfConnection.conn.query(query, function (err, result) {

                        if (err) { 
                            
                            console.log(err);
                            reject(err); 
                        }

                        //console.log(result)

                        var data = [];

                        result.records.forEach(element => {

                            data.push({

                                name: element.Name,
                                probability: element.Probability,
                                amount: element.Amount
                            });

                        });

                        resolve({

                            data

                        });

                    });

                } else {

                    console.log(err);
                }

            });

        });
}


module.exports = {

    querySoql

};
