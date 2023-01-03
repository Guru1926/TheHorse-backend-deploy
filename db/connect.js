// mongodb+srv://THEHORSE:THEHORSE@cluster0.b8nmfte.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://sachin_patel:sachinpatel@cluster0.jdy4bcc.mongodb.net/?retryWrites=true&w=majority
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
async function connect() {
  return new Promise((res, rej) => {
    mongoose.connect(
      "mongodb+srv://THEHORSE:THEHORSE@cluster0.b8nmfte.mongodb.net/?retryWrites=true&w=majority",
      (err) => {
        if (err) {
          console.log("unable to connect to database" + err);
          rej(err);
        }
        console.log("connection");
        res();
      }
    );
  });
}

module.exports = connect;
