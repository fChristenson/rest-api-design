const app = require("./src/app");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/rest", { useNewUrlParser: true });

app.listen(3000);

process.on("unhandledRejection", error => {
  console.log(error.message);
  console.log("--------------------------");
  process.exit(1);
});
