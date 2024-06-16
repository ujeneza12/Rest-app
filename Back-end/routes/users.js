const router = require("express").Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM signin", (err, data) => {
    if (err) {
      return res.json("error");
    } else {
      res.send(data);
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM signin WHERE id = ?", [id], (err, data) => {
    if (err) throw err;
    res.json(data[0]);
  });
});

// Update a user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { firstname,lastname,NationalID,telephone,email,department,Position,Manufacturer,Model,SerialNumber} = req.body;
  db.query(
    "UPDATE signin SET firstname = ?,lastname = ?,NationalID = ?,telephone = ?,email = ?,department = ?,Position = ?,Manufacturer = ?,Model = ?,SerialNumber= ? WHERE ID = ?",
    [id,firstname,lastname,NationalID,telephone,email,department,Position,Manufacturer,Model,SerialNumber],
    (err) => {
      if (err) throw err;
      res.json({ message: "User updated successfully" });
    }
  );
});

// Delete a user
router.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM signin WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "User deleted successfully" });
  });
});


router.post("/signup", (req, res) => {
  const sql =
    "INSERT INTO user(`email`,`password`) values(?)";
  const values = [
    req.body.email,
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
  const sql = "SELECT * FROM user where `email`=? AND `password`=?";
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
