const express   = require('express');
const morgan    = require('morgan');
const helmet    = require('helmet');
const cors      = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');

// mongo
const mongoose = require('mongoose');
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, 
{
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Agile Engine Backend restAPI');
});



// routes
const routes = require('./routes/index')(app);
app.use('/', routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
