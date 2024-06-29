const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const todo = require('./todo');
require('./mongo');


app.get('/', (req, res) => {
    res.send("<h1>Welcome to Todos App</h1>")
})

app.get('/todos', async (req, res) => {
    let todoData = await todo.find({})
    res.send(todoData)
})

app.post('/addtodo', async (req, res)=> {
    let todoData = await todo(req.body)
    let result = await todoData.save();
    res.send(result);
})

app.put('/updatetodo/:id', async (req, res) => {
    let result = await todo.updateOne(
        {_id : req.params.id},
        {
            $set : req.body
        }
    )
    res.send(`updated with ${result}`);
})

app.delete('/deletetodo/:id', async (req, res) => {
    let id = req.params.id;
    let data = await todo.deleteOne({_id : id});
    res.send(`Deleted ${id}`);
})

app.listen(3000, () => {
    console.log("Server Started")
})

module.exports = app