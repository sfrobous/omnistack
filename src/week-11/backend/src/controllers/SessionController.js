const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ngo = await connection('NGOs')
            .where('Id', id)
            .select('Name')
            .first();

        if (!ngo) {
            return response.status(401).json({ error: 'No NGO found with this Id' });
        }

        return response.json(ngo);
    }
}