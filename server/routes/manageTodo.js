const express = require("express");
const router = express.Router();
const fsPromises = require("fs").promises;


//get all todos
router.get("/", async (req, res) => {
        try {
           const response = await fsPromises.readFile("./json/todo.json", "utf-8");
           res.status(201).json({method : "GET", data: JSON.parse(response).to_do_objects})
        } catch (error) {
           res.status(500).json({message : error.message})
        }
});

//add todos
router.post("/", async (req, res) => {
    const { name } = req.body;
    try {
       const getTodos = await fsPromises.readFile("./json/todo.json", "utf-8");
       const newTodos = JSON.parse(getTodos);
        newTodos.to_do_objects.push({name : name})
       await fsPromises.writeFile("./json/todo.json", JSON.stringify(newTodos));
       const response = await fsPromises.readFile("./json/todo.json", "utf-8");
       res.status(201).json({method : "POST", data: JSON.parse(getTodos).to_do_objects})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
});

//remove 3rd position todo
router.delete("/", async(req, res) => {
    try {
        const getTodos = await fsPromises.readFile("./json/todo.json", "utf-8");
        const newTodos = JSON.parse(getTodos);
        newTodos.to_do_objects.splice(2,1);
        await fsPromises.writeFile("./json/todo.json", JSON.stringify(newTodos));
        const response = await fsPromises.readFile("./json/todo.json", "utf-8");
        res.status(201).json({method : "DELETE", data: JSON.parse(getTodos).to_do_objects})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

//update 2nd position
router.put("/", async(req, res) => {

    try {
        const getTodos = await fsPromises.readFile("./json/todo.json", "utf-8");
        const newTodos = JSON.parse(getTodos);
        newTodos.to_do_objects.splice(1,1, {name: "new text"});
        await fsPromises.writeFile("./json/todo.json", JSON.stringify(newTodos));
        const response = await fsPromises.readFile("./json/todo.json", "utf-8");
        res.status(201).json({method : "DELETE", data: JSON.parse(getTodos).to_do_objects})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

//delete by name
router.delete("/:name", async(req, res) => {
    const { name } = req.params;
    try {
        const getTodos = await fsPromises.readFile("./json/todo.json", "utf-8");
        const newTodos = JSON.parse(getTodos);
        const updatedTodos = newTodos.to_do_objects.filter(item => item.name != name);
        newTodos.to_do_objects.length = 0;
        newTodos.to_do_objects = updatedTodos;
        await fsPromises.writeFile("./json/todo.json", JSON.stringify(newTodos));
        const response = await fsPromises.readFile("./json/todo.json", "utf-8");
        res.status(201).json({method : "DELETE", data: JSON.parse(getTodos).to_do_objects})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
});


//update a todo by name
router.put("/:name", async(req, res) => {
    const { name } = req.params;
    const { value } = req.body;
    try {
        const getTodos = await fsPromises.readFile("./json/todo.json", "utf-8");
        const newTodos = JSON.parse(getTodos);
        const todoToBeUpdatedIndex = newTodos.to_do_objects.findIndex(item => item.name == name);
        newTodos.to_do_objects[todoToBeUpdatedIndex].name = value;
        await fsPromises.writeFile("./json/todo.json", JSON.stringify(newTodos));
        const response = await fsPromises.readFile("./json/todo.json", "utf-8");
        res.status(201).json({method : "PUT", data: JSON.parse(getTodos).to_do_objects});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
});

module.exports = router;