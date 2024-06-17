const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const todo = require('./todo');
require('./mongo');

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

app.listen(3000, () => {
    console.log("Server Started")
})

module.exports = app