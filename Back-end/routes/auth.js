const router = require("express").Router();

const db = require("../db");


router.post("/signin", (req, res) => {
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

router.post("/login", (req, res) => {
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

module.exports = router
  
