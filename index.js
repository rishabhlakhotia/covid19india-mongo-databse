const getdata = require('./utils/getdata');
const mongo = require('./utils/mongo');

module.exports.handler = async (event, context, callback) => {
var filename = '';
function rawData() {
  return new Promise((resolve, reject)=>{
    getdata.getRawData(filename, (res) => {
      if (res) {
        mongo.sendToMongo(JSON.parse(res).raw_data, 'raw_data', (res) => {
          if (res) resolve(true);
          resolve(false);
        });
      }
    });
  });
};

function tsData () {
  return new Promise((resolve, reject ) => {
    getdata.getData(filename, (res) => {
      if (res) {
        mongo.sendToMongo(JSON.parse(res).cases_time_series, 'data', (res) => {
          if (res) resolve (res);
          resolve (false);
        });
      }
    });
  })
}

await Promise.all([tsData(), rawData()]);
return sendRes(200, 'Success!');
};


const sendRes = (status, body) => {
  var response = {
    statusCode: status,
    headers: {
      "Content-Type": "text/html"
    },
    body: body
  };
  return JSON.stringify(response);
};
