const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', (req, res) => {
    Task.find((error, tasks) => {
        if (error) {
            console.log(error);
            res.json({message: 'Error fetching tasks'});
        } else {
            res.json(tasks);
        }
    });
});

router.get('/:id', (req, res) => {
    Task.findOne({taskId: req.params.id}, (error, task) => {
        if (error) {
            console.log(error);
            res.json({message: 'Error fetching task with id ' + req.params.id});
        } else {
            res.json(task);
        }
    });
});

router.post('/add', (req, res) => {
    const task = new Task({
        type: req.body.type,
        taskId: req.body.taskId,
        creator: req.body.creator,
        assignee: req.body.assignee,
        description: req.body.description,
        acceptanceCriteria: req.body.acceptanceCriteria,
        boardName: req.body.boardName,
        parent: req.body.parent
    });
    Task.insertMany([task], (error, tasks) => {
        if (error) {
            console.log(error);
            res.json({message: 'Error saving the task'});
        } else {
            res.json(tasks[0]);
        }
    });
});

module.exports = router;