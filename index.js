require('dotenv').config();
const express = require('express');
const massive = require('massive');
const PC = require('./products_controller');

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db)
        console.log('database connected')
    })
    .catch((error) => console.log(error));

app.use(express.json())

app.post('/api/products', PC.create);
app.get('/api/products/:product_id', PC.getOne);
app.get('/api/products', PC.getAll);
app.put('/api/products/:product_id', PC.update);
app.delete('/api/products/:product_id', PC.delete)

app.listen(SERVER_PORT, () => console.log(`Server is listening on ${SERVER_PORT}`))
