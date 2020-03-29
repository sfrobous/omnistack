const connection = require('../database/connection');
const { Segments, Joi } = require('celebrate');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('Incidents').count();

        const incidents = await connection('Incidents')
            .join('NGOs', 'NGOs.Id', '=', 'Incidents.NGO_Id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'Incidents.*',
                'NGOs.Name',
                'NGOs.Email',
                'NGOs.Whatsapp',
                'NGOs.City',
                'NGOs.State'
            ]);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },
    indexValidation: {
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number()
        })
    },
    async create(request, response) {
        const { title, description, value } = request.body;
        const ngo_id = request.headers.authorization;

        const [id] = await connection('Incidents').insert({
            Title: title,
            Description: description,
            Value: value,
            NGO_Id: ngo_id
        });

        return response.json({ id });
    },
    async delete(request, response) {
        const { id } = request.params;
        const ngo_id = request.headers.authorization;

        const incident = await connection('Incidents')
            .where('Id', id)
            .select('NGO_Id')
            .first();

        if (incident.NGO_Id !== ngo_id) {
            return response.status(403).json({ error: 'Operation not permitted' });
        }

        await connection('Incidents')
            .where('Id', id)
            .delete();

        return response.status(204).send();
    },
    deleteValidation: {
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
        }).unknown()
    }
}