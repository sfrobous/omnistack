const express = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.json({
        event: 'OmniStack 11.0',
        author: 'Jorge Soprani'
    });
});

app.listen(3333);