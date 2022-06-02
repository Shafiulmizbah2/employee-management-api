require("dotenv").config();

const http = require("http");
const app = require("./app");
const db = require("./db");

const port = process.env.PORT || 8000;

//connect database
db.connect((err) => {
  if (!err) console.log("Database connected!");
  else console.log("Error happned " + JSON.stringify(err, null, 2));
});

//create server and listen
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server listening to port ${port}`);
});
