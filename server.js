var ldapsearch = require('./lib/ldapsearch')
var express = require('express');
var app = express();

const port = 3000;

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

//app.use(express.static('dist'));

app.listen(port, function() {
    console.log('Started on port ' + port);
});