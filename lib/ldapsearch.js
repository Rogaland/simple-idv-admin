#!/usr/bin/env node

var ldap = require('ldapjs');
var assert = require('assert');

var getUsers = function(searchString, callback, userBase = process.env.LDAP_BASE) {
    var client = ldap.createClient({
        url: process.env.LDAP_HOST
    });

    client.bind(process.env.LDAP_BIND_DN, process.env.LDAP_BIND_PWD, function(err) {
        assert.ifError(err);
        console.log('searchString: ', searchString);
        var opts = {
            filter: "(&(objectclass=user)(cn=" + searchString + "*))",
            scope: 'sub',
            attributes: ['cn', 'sn', 'givenName', 'brfkDisplayNameLocation', 'mobile', 'mail']
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

var getUser = function(dn, callback) {
    var client = ldap.createClient({
        url: process.env.LDAP_HOST
    });

    client.bind(process.env.LDAP_BIND_DN, process.env.LDAP_BIND_PWD, function(err) {
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

module.exports = {
    getUsers: getUsers,
    getUser: getUser
};