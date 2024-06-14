const express = require("express");


const cors = require("cors");
const userRouter = require("./routes/users");
const userAuth = require("./routes/auth")

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/auth",userAuth);

require("./swagger-setup")(app);

app.listen(8081, () => {
  console.log("listening");
});
