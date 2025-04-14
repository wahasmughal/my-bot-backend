const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Bot backend is running!');
});

app.post('/webhook', (req, res) => {

    const intent = req.body.queryResult.intent.displayName;
    const parameters = req.body.queryResult.parameters;

    let responseText = 'I didn’t understand that.';

    if (intent === 'Dynamic Order Status Intent') {
        const orderId = parameters['order-id'];
        if (orderId === 13) {
            responseText = `Your order ${orderId} has been delivered.`;
        } else if (orderId === 14) {
            responseText = `Your order ${orderId} is dispatched.`;
        } else {
            responseText = `Your order ${orderId} is being processed.`;
        }
    }

    res.json({
        fulfillmentText: responseText
    });
});

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});