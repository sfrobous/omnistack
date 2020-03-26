const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ngo_id = request.headers.authorization;
        console.log(ngo_id);
        const incidents = await connection('Incidents')
            .where('NGO_Id', ngo_id)
            .select('*');

        return response.json(incidents);
    }
};