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
  const numRegex = /^\d+$/;

  // if Date.parse works
  // dont fully grok it, but millisec doesnt go through
  if (Date.parse(date)) {
    res.json({unix: new Date(date).getTime(), utc: new Date(date).toUTCString() })

    // if a pure num
  } else if (numRegex.test(date)) {
    let parsedDate = parseInt(date)
    let utc_date = new Date(parsedDate).toUTCString()

    res.json({unix: parsedDate, utc: utc_date })
  } else if (!date) {
    let now = Date.now()

    res.json({unix: Date.now(), utc: new Date(now).toUTCString()});
  } else {
    res.json({error: "Invalid Date"})
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
