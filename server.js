const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const authRouter = require('./server/routes/auth');
const boardsRouter = require('./server/routes/boards');
const path = require("path")
require('dotenv').config();
const app = express();
const port = process.env.PORT;

// DB connection
const DB_URL = process.env.DB_URL;
const mongoose = require('mongoose');
mongoose.connect(DB_URL,
    {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log('Connected to %s', DB_URL);
});

app.use((req, res, next) => {
  res.header({'Access-Control-Allow-Credentials': 'true'});
  next();
});

const corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));
app.disable('x-powered-by');

// Session stuff
app.use(cookieParser());
app.use(session({secret: process.env.SESS_SECRET}));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Logging function
app.use((_req, _res, next) => {
	 next();
});

app.use('/auth', authRouter);
app.use('/boards', boardsRouter);

app.use(express.static(path.join(__dirname,"client","build")))

app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, function() {
  console.log(`App started on port ${port}`);
});
