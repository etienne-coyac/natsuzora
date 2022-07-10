const express = require('express');
const app = express();
const path = require('path')
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const animesRouter = require('./routes/animes.routes');
const authRouter = require('./routes/auth.routes');


app.use(express.static('client/build'))

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use('/api/animes', animesRouter);
app.use('/api', authRouter);

// redirect react
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
});

app.listen(process.env.PORT || 5000);
