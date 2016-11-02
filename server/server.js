var express = require('express');
var app = express();

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var googleConfig = require('./config-google');

var bodyParser = require('body-parser')
app.use(bodyParser.json())

var gmail = google.gmail('v1');

var REDIRECT_URL = process.env.REDIRECT_URL || 'http://web-n-data.com/google/redirect'
console.log("redirect ulr :", REDIRECT_URL );
var SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send'];

app.use(express.static('client/app'));

app.get('/google/auth', function (req, res) {

    var oauth2Client = new OAuth2(
      googleConfig.web.client_id,
      googleConfig.web.client_secret,
      'http://web-n-data.com/google/redirect'
    );

    var url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',

      // If you only need one scope you can pass it as string
      scope: SCOPES
    });
    res.send({url: url});
});


app.get('/google/redirect', function (req, res) {

    var oauth2Client = new OAuth2(
      googleConfig.web.client_id,
      googleConfig.web.client_secret,
      'http://web-n-data.com/google/redirect'
    );

    var code = req.query.code;
    oauth2Client.getToken(code, function (err, tokens) {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if (!err) {
            oauth2Client.setCredentials(tokens);
            console.log(tokens)
        }
        res.send(tokens);
    });
});

app.get('/google/mails', function (req, res) {
    var token = req.query._auth_token;
    console.log("token", token);
    var oauth2Client = new OAuth2(
      googleConfig.web.client_id,
      googleConfig.web.client_secret,
      'http://web-n-data.com/google/redirect'
    );
    oauth2Client.setCredentials({access_token: token})

    var gmail = google.gmail('v1');
    gmail.users.labels.list({
       auth: oauth2Client,
       userId: 'me',
    }, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            res.send(err);
            return;
        }
        var labels = response.labels;
        if (labels.length == 0) {
            console.log('No labels found.');
        } else {
            console.log('Labels:');
            for (var i = 0; i < labels.length; i++) {
                var label = labels[i];
                console.log('- %s', label.name);
            }
        }
        res.send(response);
    });
});


app.post('/google/mail/send', function (req, res) {
    var token = req.query._auth_token;
    console.log("token", token);
    var oauth2Client = new OAuth2(
      googleConfig.web.client_id,
      googleConfig.web.client_secret,
      'http://web-n-data.com/google/redirect'
    );
    oauth2Client.setCredentials({access_token: token})

    var gmail = google.gmail('v1');
    gmail.users.messages.send({
        auth: oauth2Client,
        userId: 'me',
        resource: {
            'raw': req.body.message
        }
    }, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            res.send(err);
            return;
        }
        console.log(response);
        res.send(response);
    });
});


app.listen(3000, function () {
  console.log('Lobbying app listening on port 3000!');
});

