const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

module.exports.sendToMongo = function (data, collectionName, callback) {
  const dbName = 'covid';
  const mongoUri = '';
  const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });


  client.connect(err => {
		client.db(dbName).collection(collectionName).drop().catch(err=>console.log(err));
    const collection = client.db(dbName).collection(collectionName).insertMany(data, function (err, res) {
      if (err) console.log(err);
      else {
        callback(true);
        client.close();
      }
    });
  });

}
