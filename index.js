const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const app = express();
app.use(bodyParser.json());

const expectedApiKey = 'bananaiscool'; // TODO: Your API key of this API

app.post('/endpoint', (req, res, next) => {
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

function handleAppExternalDataToolQuery(params, res) {
    const { app_id, tool_variable, inputs, query } = params;

    console.log(`app_id: ${app_id}`);
    console.log(`tool_variable: ${tool_variable}`);
    console.log(`inputs: ${JSON.stringify(inputs)}`);
    console.log(`query: ${query}`);

    // TODO: Your external data tool query implementation here
    if (inputs.choice === 'foods') {
        return res.json({
            result: 'apple,banana,orange,grape,watermelon,kiwi,peach,pear,pineapple,lemon,mango,blueberry,raspberry,blackberry,grapefruit,apricot,avocado,coconut,fig,guava,lychee,olive,papaya,passion fruit,pomegranate,star fruit,dragon fruit,plum',
        });
    } else if (inputs.choice === 'drinks') {
        return res.json({
            result: 'coffee,tea,juice,water,milk,beer,wine,whiskey,rum,vodka,gin,brandy,tequila,coke,pepsi,sprite,7up,fanta,red bull,monster',
        });
    } else {
        return res.json({ result: 'Unknown inputs' });
    }
}

app.use((err, _, res, __) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
