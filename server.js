const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const corsOptions = { origin: '*', optionsSuccessStatus: 200 };
app.use(cors(corsOptions));

let PORT = 9001;

app.get("/products", async (req, res) => {
  const result = new Promise((r, rej) => {
    axios.get('http://lcboapi.com/products')
    .then(res => r(res.data))
    .catch(err => err);
  });

  result.then(resp => {
    res.json(resp);
  })
  .catch(err => res.json(err));
});

app.get("/product/stores", async (req, res) => {
  console.log(
    req.query, req.params, req.param
  )
  const result = new Promise((r, rej) => {
    axios.get(
      'http://lcboapi.com/stores',
      {
        lat: req.params.lat,
        long: req.params.long,
        product_id: req.params.product_id
      }
    )
    .then(res => r(res.data))
    .catch(err => err);
  });

  result.then(resp => {
    res.json(resp);
  })
  .catch(err => res.json(err));
});

app.listen(PORT);
