// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) {
  const date = req.params.date;

  // if it's a utc num. if a num

  // new Date(1451001600000);
  // console.log(typeof date)

  if (parseInt(date)) {
    let parsedDate = parseInt(date)
    let utc_date = new Date(parsedDate).toUTCString()

    res.json({unix: parsedDate, utc: utc_date })
  } else {
    // l: might be an issue with this date being an obj
    res.json({unix: Date.now()});
  }
});

// desired
// Thu, 01 Jan 1970 00:00:00 GMT
// Wed, 02 Oct 2024 15:37:27 GMT

// Wed Oct 02 2024 11:33:04 GMT-0400 (Eastern Daylight Time)

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
