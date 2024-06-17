require("dotenv").config();

const router = require("express").Router();
const jwt = require("jsonwebtoken");

const db = require("../db");

router.post("/employee-signin", (req, res) => {
  const sql =
    "INSERT INTO users(`firstname`,`lastname`,`nationalID`,`telephone`,`email`,`department`,`position`,`manufacturer`,`model`,`serialNumber`) values(?)";
  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.nationalID,
    req.body.telephone,
    req.body.email,
    req.body.department,
    req.body.position,
    req.body.manufacturer,
    req.body.model,
    req.body.serialNumber,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
}); 

router.post("/employee-login", (req, res) => {
  const sql = "SELECT * FROM signin where `email`=? AND `password`=?";
  const values = [req.body.email, req.body.password];
  const user = { email: values.email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1h' });

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("error");
    }
    if (data.length > 0) {
      return res.status(200).json({ accessToken: accessToken });

    } else {
      return res.json("failed");
    }
  });
});

module.exports = router;
