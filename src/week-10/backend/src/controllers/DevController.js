const axios = require('axios');
const Dev = require('../models/Dev');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },
    async store(req, res) {
        const { githubUsername, techs, longitude, latitude } = req.body;

        let dev = await Dev.findOne({ githubUsername });

        if (!dev) {
            const githubUserRequest = await axios.get(`https://api.github.com/users/${githubUsername}`);
            const { name = login, avatar_url, bio } = githubUserRequest.data;

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                githubUsername,
                name,
                avatarUrl: avatar_url,
                bio,
                techs,
                location
            });
            const sendMessageTo = findConnections(
                {
                    latitude,
                    longitude
                },
                techs
            );
            
            sendMessage(sendMessageTo, 'new-dev', dev);
        }

        return res.json(dev);
    },
    async update(req, res) {
        const { id, techs, name, bio, avatarUrl, longitude, latitude } = req.body;

        let dev = await Dev.findOne({ _id: id });

        if (dev) {
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.update({
                githubUsername
            }, {
                techs,
                location,
                name,
                bio,
                avatarUrl
            });
        } else {
            // TO DO: return error
        }

        return res.json(dev);
    },
    async destroy(req, res) {
        const { id } = req.body;

        await Dev.deleteOne({ _id: id });

        return res.json(true);
    }
};