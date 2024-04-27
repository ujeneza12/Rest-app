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
    "UPDATE users SET firstname = ?,lastname = ?,NationalID = ?,telephone = ?,email = ?,department = ?,Position = ?,Manufacturer = ?,Model = ?,SerialNumber= ? WHERE ID = ?",
    [id,firstname,lastname,NationalID,telephone,email,department,Position,Manufacturer,Model,SerialNumber],
    (err) => {
      if (err) throw err;
      res.json({ message: "User updated successfully" });
    }
  );
});

// Delete a user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "User deleted successfully" });
  });
});

module.exports = router;
