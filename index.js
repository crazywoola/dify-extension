const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const app = express();
app.use(bodyParser.json());

const expectedApiKey = '123456'; // TODO: Your API key of this API

app.post('/api/dify/receive', (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return next(createError(401, 'Unauthorized'));
    }

    const [authScheme, apiKey] = authorization.split(' ');

    if (authScheme.toLowerCase() !== 'bearer' || apiKey !== expectedApiKey) {
        return next(createError(401, 'Unauthorized'));
    }

    const { point, params } = req.body;

    console.log(`point: ${point}`);

    if (point === 'ping') {
        return res.json({ result: 'pong' });
    } else if (point === 'app.external_data_tool.query') {
        return handleAppExternalDataToolQuery(params, res, next);
    } else {
        return next(createError(400, 'Not implemented'));
    }
});

function handleAppExternalDataToolQuery(params, res, next) {
    const { app_id, tool_variable, inputs, query } = params;

    console.log(`app_id: ${app_id}`);
    console.log(`tool_variable: ${tool_variable}`);
    console.log(`inputs: ${JSON.stringify(inputs)}`);
    console.log(`query: ${query}`);

    // TODO: Your external data tool query implementation here
    if (inputs.location === 'London') {
        return res.json({
            result: 'City: London\nTemperature: 10°C\nRealFeel®: 8°C\nAir Quality: Poor\nWind Direction: ENE\nWind Speed: 8 km/h\nWind Gusts: 14 km/h\nPrecipitation: Light rain'
        });
    } else {
        return res.json({ result: 'Unknown city' });
    }
}

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
