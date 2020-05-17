const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToAtlasDb = require('./db');

const app = express();


// MiddleWares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:8081',
}));

// Routes

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to TOOS APP no save ;)' });
});




// Listen

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// db connection

connectToAtlasDb();
