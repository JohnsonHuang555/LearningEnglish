let express = require('express');
let app = express();
let apis = require('./routes/api')
let path = require('path');
let bodyParser = require('body-parser');
let cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
  next();
})

app.use('/api', apis);
app.use(express.static('public'));

// Handler for 404
app.use((req, res) => {
  res.status(404).send('We think you are lose');
});

app.use((err, req, res) => {
  console.error(err.statck);
  res.sendFile(path.join(__dirname, '../public/500.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));
