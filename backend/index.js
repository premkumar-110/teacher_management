const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routes/authRouter");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/teachers", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
