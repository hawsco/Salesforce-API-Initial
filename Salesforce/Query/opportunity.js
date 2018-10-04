const sfConnection = require('../access');

var querySoql = (accountName) => {

    return new Promise(

        (resolve, reject) => {
            sfConnection.getToken((err, res) => {

                if (res.accToken) {

                    var query = `select Name, probability, amount from Opportunity  where isClosed = false and AccountID in 
                                (select Id from Account where axaccountnum__c = '${accountName}' )`

                    sfConnection.conn.query(query, function (err, result) {

                        if (err) { reject(err); }

                        console.log(result)

                        var dataObj = [];

                        result.records.forEach(element => {

                            dataObj.push({

                                name: element.Name,
                                probability: element.Probability,
                                amount: element.Amount
                            });

                        });

                        resolve({

                            dataObj

                        });

                        // console.log("total : " + result.totalSize);
                        // console.log("fetched : " + result.records.length);

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
