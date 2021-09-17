const express = require('express');

const app = express();

const users = [
  { name: 'Nissim', age: 30, likes: ['football', 'hockey'] },
  { name: 'Chloe', age: 40, likes: ['Box', 'Cars'] },
  { name: 'Rachid', age: 50, likes: ['Painting', 'Hollidays'] },
];

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.post('/users', (req, res) => {
  console.log(req.body);
  res.send(users);
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listenning on port ${port}`));
