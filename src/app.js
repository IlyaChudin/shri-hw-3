const path = require("path");
const express = require("express");
const routes = require("./routes");
const config = require("./config");

const app = express();

app.use(express.static(path.resolve(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      data: err.data
    }
  });
});

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}!`);
});
