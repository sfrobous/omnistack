const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const incidents = await connection('Incidents').select('*');

        return response.json(incidents);
    }
};