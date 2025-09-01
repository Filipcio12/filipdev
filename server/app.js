const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/public/views/workInProgress.html");
});

// custom 404 page
app.use((req, res) => {
  res.redirect("/");
});

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message);
  res.sendFile(__dirname + "/public/views/500.html");
});

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(
      `Express started in ${app.get("env")} mode ` +
        `on http://localhost:${port}` +
        "; press Ctrl-C to terminate.",
    );
    console.log("Current working directory:", process.cwd());
  });
} else {
  module.exports = app;
}
