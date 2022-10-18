const express = require("express");
const app = express();
const port = 8001;
const fsPromises = require("fs").promises;
const fs = require("fs")
const cors = require("cors");
const path = require("path")

app.use(cors({
  origin : 'http://localhost/3000'
}));
app.use(express.json())
const router = require("./routes/manageTodo");
app.use("/manageTodo", router);

const data = {
  author : "Shikhar",
  version : process.env.npm_package_version,
  date : new Date(Date.now()).toLocaleDateString("en-US", {month : "long", year : "numeric", day : "2-digit"}),
  to_do_objects : [{name : "one"}, {name : "two"}]
}

const createNWrite = async () => {
  try {
    const response = await fsPromises.readFile(path.join(__dirname, "json", "todo.json"), "utf-8");
    console.log(response);
  } catch (error) {
    await fsPromises.writeFile(path.join(__dirname, "json", "todo.json"), JSON.stringify(data))
  }
}
createNWrite()

fs.copyFile(path.join(__dirname, "json", "todo.json"), '_updatedTodo.json', (err) => {
  if (err) throw err;
  console.log('Success in Copy');

});

const UpdateNewFile = async () => {
  try {
    const response = await fsPromises.readFile("_updatedTodo.json", "utf-8");
    const data = JSON.parse(response);
    data.date = new Date(Date.now()).toLocaleDateString("en-US", {month : "long", year : "numeric", day : "2-digit"});
    await fsPromises.writeFile("_updatedTodo.json", JSON.stringify(data))
    console.log(response);
  } catch (error) {
console.error(error)
  }
}
UpdateNewFile()


app.listen(port, (req, res) => {
  console.log(`Server started at port ${port}`);
});