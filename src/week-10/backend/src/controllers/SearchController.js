const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res) {
        console.log('query: ' + JSON.stringify(req.query));
        const { latitude, longitude, techs } = req.query;
        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [latitude, longitude]
                    },
                    $maxDistance: 100000// 100km
                }
            }
        });

        console.log('result: ' + JSON.stringify(devs));
        return res.json(devs);
    }
};