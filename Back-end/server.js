const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
// const routes = require('./routes')

const app = express();
app.use(cors());
app.use(express.json());
// app.use("/",routes);

require("./swagger-setup")(app);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restfull",
});

app.post("/signin", (req, res) => {
  const sql =
    "INSERT INTO signin(`ID`,`firstname`,`lastname`,`NationalID`,`telephone`,`email`,`department`,`Position`,`Manufacturer`,`Model`,`SerialNumber`,`password`) values(?)";
  const values = [
    req.body.ID,
    req.body.firstname,
    req.body.lastname,
    req.body.NationalID,
    req.body.telephone,
    req.body.email,
    req.body.Department,
    req.body.Position,
    req.body.Manufacturer,
    req.body.Model,
    req.body.SerialNumber,
    req.body.password,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("error");
    }
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM signin where `email`=? AND `password`=?";
  const values = [req.body.email, req.body.password];

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("error");
    }
    if (data.length > 0) {
      return res.json("success");
    } else {
      return res.json("faile");
    }
  });
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM signin", (err, data) => {
    if (err) {
      return res.json("error");
    } else {
      res.send(data);
    }
  });
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM signin WHERE id = ?', [id], (err, data) => {
    if (err) throw err;
    res.json(data[0]);
  });
});

// Update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err) => {
    if (err) throw err;
    res.json({ message: 'User updated successfully' });
  });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'User deleted successfully' });
  });
});

app.listen(8081, () => {
  console.log("listening");
});
