const knex = require('knex');
const configuration = require('../../knexfile');

const isTest = process.env.NODE_ENV === 'test';

let environment = isTest ?
    configuration.test :
    configuration.development;

const connection = knex(environment);

module.exports = connection;