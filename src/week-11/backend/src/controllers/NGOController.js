const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const ngos = await connection('NGOs').select('*');

        return response.json(ngos);
    },
    async create(request, response) {
        const {
            name,
            email,
            whatsapp,
            city,
            state
        } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
        await connection('NGOs').insert({
            Id: id,
            Name: name,
            Email: email,
            Whatsapp: whatsapp,
            City: city,
            State: state
        });

        return response.json({ Id: id });
    }
}