const connection = require('../database/connection');
const { Segments, Joi } = require('celebrate');
const generateUniqueId = require('../utils/generateUniqueId');

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

        const id = generateUniqueId();
        await connection('NGOs').insert({
            Id: id,
            Name: name,
            Email: email,
            Whatsapp: whatsapp,
            City: city,
            State: state
        });

        return response.json({ Id: id });
    },
    createValidation: {
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required().min(3),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required().min(10).max(11),
            city: Joi.string().required(),
            state: Joi.string().required().length(2)
        })
    }
}