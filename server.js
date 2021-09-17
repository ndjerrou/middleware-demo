const express = require('express');
const { valid } = require('joi');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');

const logger = require('./middlewares/logger');

const app = express();

app.use(express.json()); // first middleware : express.json()
app.use(helmet()); //Second middleware : set secure headers
app.use(morgan('tiny')); //Third middleware : log each incoming request
app.use(logger); // 4rd middlewaere : a custom one !

const users = [
  { name: 'Nissim', age: 30, likes: ['football', 'hockey'] },
  { name: 'Chloe', age: 40, likes: ['Box', 'Cars'] },
  { name: 'Rachid', age: 50, likes: ['Painting', 'Hollidays'] },
];

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().required(),
    likes: Joi.array().items(Joi.string()),
  });

  return schema.validate(data);
};

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.post('/users', (req, res) => {
  //ading a new user
  const dataUser = req.body;

  //validating data
  const result = validate(dataUser);
  console.log(result);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  users.push(req.body);
  res.send(users);
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listenning on port ${port}`));
