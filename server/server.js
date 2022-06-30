const express = require('express');
const app = express();
const path = require('path')
const jwt = require('jsonwebtoken');

const animesRouter = require('./routes/animes.routes');
const authRouter = require('./routes/auth.routes');


app.use(express.static('client/build'))
app.use(express.json());

app.use('/api/animes', animesRouter);
app.use('/api', authRouter);

// redirect react
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
});

app.listen(process.env.PORT || 5000);
