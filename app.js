const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');  // Add this line
const mongoose = require('./db/mongoose');
const photographsRouter = require('./controller/photograph');
const exhibitionRouter = require('./controller/exhibition');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));  // Use body-parser for URL-encoded data
app.use(cookieParser());

// Static files (optional, remove if not needed)
// app.use(express.static(path.join(__dirname, 'public')));

// Route setup
app.use('/photograph', photographsRouter);
app.use('/exhibition', exhibitionRouter);
// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // Log error to console (optional)
  console.error(err);

  // Respond with error message in JSON format
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});

module.exports = app;
