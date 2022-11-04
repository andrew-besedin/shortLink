const Storage = require("node-storage");
const express = require("express");

const store = new Storage('C:/JS/short_link/store.json');
const app = express();

function randomString(length) {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYS1234567890";
  let generatedString = "";
  for (let i = 1; i <= length; i ++) {
    generatedString += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return generatedString;
}

app.use(express.json());

app.use(express.static('public'));

app.get('/home', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.post('/generateLink', (req, res) => {
  console.log(req.body.input);
  let code = randomString(12);
  store.put("numbers." + code, req.body.input);
  res.send({ link:  `http://localhost:3000/shortLink?number=${code}`});
});
app.get('/shortLink', (req, res) => {
  res.redirect(store.get("numbers")[req.query.number] || "/home");
});

app.listen(3000);