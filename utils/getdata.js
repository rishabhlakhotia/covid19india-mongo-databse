const https = require('https');


module.exports.getRawData = (filename, callback) => {


  var options = {
    host: 'api.covid19india.org',
    path: '/raw_data.json',
    method: 'GET'
  }

  var req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    })

    res.on('end', () => {
      callback(data);
    });
  })

  req.write('');
  req.end();

};

module.exports.getData = (filename, callback) => {

  var options = {
    host: 'api.covid19india.org',
    path: '/data.json',
    method: 'GET'
  }

  var req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    })

    res.on('end', () => {
      callback(data);
    });
  })

  req.write('');
  req.end();
};
