'use strict'

module.exports = {
    WEB_SERVER_PORT: process.env.WEB_SERVER_PORT || 3000,
    LDAP_BIND_DN: process.env.LDAP_BIND_DN,
    LDAP_BIND_PWD: process.env.LDAP_BIND_PWD,
    LDAP_HOST: process.env.LDAP_HOST,
    LDAP_BASE: process.env.LDAP_BASE,
    LDAP_FILTER: process.env.LDAP_FILTER,
    LDAP_ATTRIBUTES: process.env.LDAP_ATTRIBUTES.split(',') || ['cn', 'dn', 'fullname']
}