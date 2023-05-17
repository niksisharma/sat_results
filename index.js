const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const port = 3000;

const satRoutes = require("./satRoutes");

app.use(express.json());
app.use("/sat", satRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
