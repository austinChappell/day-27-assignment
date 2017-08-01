const express = require('express');
const app = express();
const mongoClient = require('mongodb').MongoClient();
const mustacheExpress = require('mustache-express');

const router = require('./routes/router');

// let Object = {
//   id,
//   username,
//   name,
//   avatar,
//   email,
//   university,
//   job,
//   company,
//   skills,
//   phone,
//   address:
//   {
//     street_num,
//     street_name,
//     city,
//     state_or_province,
//     postal_code,
//     country
//   }
// };
//
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use('/', router);

app.get('/something/mongo', (req, res) => {
  db.collection('users').find({}).toArray((err, results) => {
    if (err) {
      console.log(err);
    } else {
      let data = { users: results };
      res.render('users', data);
    }
  });
});

app.get('/something/mongo/unemployed', (req, res) => {
  db.collection('users').find({ job: null }).toArray((err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
      let data = { users: results };
      res.render('users', data);
    }
  });
});

app.get('/something/mongo/employed', (req, res) => {
  db.collection('users').find({ job: { $type: 2 } }).toArray((err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
      let data = { users: results };
      res.render('users', data);
    }
  });
});

app.get('/something/mongo/country/:value', (req, res) => {
  let value = req.params.value;
  db.collection('users').find({ 'address.country': value }).toArray((err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log('results are:', results);
      console.log('value is:', value);
      let data = { users: results };
      res.render('users', data);
    };
  });
});

app.get('/something/mongo/skills/:value', (req, res) => {
  let value = req.params.value;
  db.collection('users').find({ skills: { $elemMatch: { $eq:value } } }).toArray((err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
      let data = { users: results }
      res.render('users', data);
    };
  });
});

app.get('/something/mongo/:id', (req, res) => {
  db.collection('users').find({ id: Number(req.params.id) }).toArray((err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
      res.render('user', results[0]);
    }
  })
})

let db;

mongoClient.connect('mongodb://localhost:27017/robots', (error, database) => {
  if (error) {
    console.log(error);
  } else {
    app.listen(3000, function() {
      db = database;
      console.log(`Your server has started on PORT 3000`);
    });
  }
});
