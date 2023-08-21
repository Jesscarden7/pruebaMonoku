const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bp = require("body-parser");
const { dbConnection } = require("./database/config");

dotenv.config();

const userRouter = require("./routes/user.routes");
const dailyEntryRouter = require("./routes/dailyEntry.routes");

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/dailyEntry", dailyEntryRouter);

dbConnection().then();

app.listen(process.env.PORT || 4000, () =>
  console.log("Servidor corriendo en el puerto 4000"),
);
