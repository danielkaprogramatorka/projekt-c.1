const express = require('express')//import express fw
const app = express()//spusteni expresu
const port = 80//definovani portu
const path = require('path');//pro manipulaci s cestami, ať už se jedná o absolutní cesty, relativní cesty
const bodyParser = require('body-parser');//imort bodyParseru
app.use(bodyParser.urlencoded({ extended: false }));//dekoduje data poslana pres POST



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var mysql = require('mysql2');

const con = mysql.createConnection({
    host: '192.168.1.161', // Náz
    user: 'daniela.vasilova', // Uživatelské jméno
    password: 'Danielavasilova16', // Heslo
    database: 'daniela.vasilova', // Název databáze
    port: 3001
  });
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
app.post('/createuser', function (request, response, next) {
  console.log(request.body)
    // SQL dotaz pro vložení dat do databáze
    var sql = `INSERT INTO users (fname, lname) VALUES ('${request.body.fname}', '${request.body.lname}')`;
   
    con.query(sql, (error, results, fields) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(results);
    })
    response.send(`Uživatele byli vloženi do DB`)
   
  })
app.get('/newuser', (req, res) => {//home routa

    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM students", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.render('index', { result });
        });
      });

})

app.listen(port, () => {//spustni serveru
  console.log(`Example app listening on port ${port}`)
})
app.post('/newuser', function (request, response, next) {
  // console.log(request.body)
    // SQL dotaz pro vložení dat do databáze
    var sql = `INSERT INTO students (fname, lname) VALUES ('${request.body.fname}', '${request.body.lname}')`;
   
    con.query(sql, (error, results, fields) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(`Uživatele byli vloženi do DB`);
    })
    response.send(`Uživatele byli vloženi do DB`)
   
  })
  app.get('/newuser', (req, res) => {//home routa

  
          res.render('newuser')
        })
      
