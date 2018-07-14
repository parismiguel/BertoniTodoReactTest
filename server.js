const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

let taskRepository = [
    { "text": "Paris", "key": 1, "status": false},
    { "text": "Claudia", "key": 2, "status": false}
];

app.get('/api/tasks', (req, res) => {   
    res.send(taskRepository);
});

app.get('/api/tasks/:id', (req,res) => {
    const task = taskRepository.find(t=> t.key === parseInt(req.params.id));

    if(!task) return res.status(404).send("The task with the given ID was not found");
        res.send(task);
});

app.post('/api/tasks', (req, res) => {   
    if(!req.body.text || req.body.text.length < 3) {
        res.status(400).send('Text is required and should be minimu 3 characters.');
        return;
    }

    const task = {
        key: taskRepository.length + 1,
        text: req.body.text,
        status: req.body.status
    };

    taskRepository.push(task);
    res.send(task);
});

app.put('/api/tasks/:id', (req,res)=> {
    const task = taskRepository.find(t=> t.key === parseInt(req.params.id));

    if(!task) return res.status(404).send("The task with the given ID was not found");

    if(!req.body.text || req.body.text.length < 3) {
        res.status(400).send('Text is required and should be minimu 3 characters.');
        return;
    }

    task.text = req.body.text;
    task.status = req.body.status;

    res.send(task);
});

app.delete('/api/tasks/:id', (req,res)=> {
    const task = taskRepository.find(t=> t.key === parseInt(req.params.id));

    if(!task) return res.status(404).send("The task with the given ID was not found");

    const index = taskRepository.indexOf(task);
    taskRepository.splice(index, 1);

    res.send(task);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));