'use strict'

var ldap = require('ldapjs');
var assert = require('assert');
var config = require('./config');

var getUsers = function(searchString, callback, userBase = config.LDAP_BASE) {
    var client = ldap.createClient({
        url: config.LDAP_HOST
    });

    client.bind(config.LDAP_BIND_DN, config.LDAP_BIND_PWD, function(err) {
        assert.ifError(err);
        var opts = {
            filter: "(&(objectclass=user)(cn=" + searchString + "*))",
            scope: 'sub',
            attributes: config.LDAP_ATTRIBUTES
        };
        client.search(userBase, opts, function(err, res) {
            assert.ifError(err);

            var users = [];
            res.on('searchEntry', function(entry) {
                users.push(entry.object);
            });

            res.on('end', function() {
                client.destroy();
                var userList = {
                    user_count: users.length,
                    users: users
                };
                callback(userList);
            });

            res.on('error', function(err) {
                console.error('error: ' + err.message);
            });
        });
    });
}

/*
var getUser = function(dn, callback) {
    var client = ldap.createClient({
        url: config.LDAP_HOST
    });

    client.bind(config.LDAP_BIND_DN, config.LDAP_BIND_PWD, function(err) {
        assert.ifError(err);
        var opts = {
            scope: 'base',
            attributes: ['cn', 'sn', 'givenName', 'brfkDisplayNameLocation', 'mobile', 'mail']
        };
        client.search(dn, opts, function(err, res) {
            assert.ifError(err);
            console.log('searching ...');
            res.on('searchEntry', function(entry) {
                console.log(entry.object);
                callback(entry.object);
            });

            res.on('error', function(err) {
                console.error('error: ' + err.message);
            });
        });
    });
}
*/

module.exports = {
    //getUser: getUser,
    getUsers: getUsers
};