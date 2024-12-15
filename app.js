const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3005

app.use(bodyParser.json())

let taskList = {}

app.post('/todo/', (req, res) => {
    const id = Math.floor(Math.random() * 1000)
    let newTask = {
        task: req.body.task,
        id: id,
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    taskList[id] = newTask
    res.send(newTask)
})

app.get('/todo/', (req, res) => {
    res.send(taskList)
})

app.put('/todo/:id', (req, res) => {
    let id = req.params.id

    let taskItem = taskList[id]

    let updatedTask = {
        id: id,
        task: taskItem.task,
        isCompleted: req.body.is_completed,
        createdAt: taskItem.createdAt,
        updatedAt: new Date()
    }

    taskList[id] = updatedTask

    res.send(updatedTask)
})

app.delete('/todo/:id', (req, res) => {
    let id = req.params.id

    delete taskList[id]

    res.send({message: 'your task isdeleted', id: id})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})