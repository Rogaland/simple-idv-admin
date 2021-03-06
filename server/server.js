var ldapsearch = require('./lib/ldapsearch');
var express = require('express');
var app = express();
var config = require('./lib/config');

app.get('/api/users', function(request, response) {
    try {
        ldapsearch.getUsers(request.query.q, function(users) {
            response.send(JSON.stringify(users));
        });
    } catch (ex) {
        response.status(500).send(JSON.stringify(ex));
    }
});

app.get('/api/users/:dn', function(request, response) {
    try {
        console.log('getUser: ' + request.params.dn);
        ldapsearch.getUser(request.params.dn, function(user) {
            response.send(JSON.stringify(user));
        });
    } catch (ex) {
        response.status(500).send(JSON.stringify(ex));
    }
});

app.use(express.static('server/public'));

app.listen(config.WEB_SERVER_PORT, function() {
    console.log('Started on port ' + config.WEB_SERVER_PORT);
});