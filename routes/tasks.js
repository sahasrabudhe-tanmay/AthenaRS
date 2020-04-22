const express = require('express');
const router = express.Router();
const data = require('../assets/tasks');

router.get('/', (req, res) => {
    res.json(data.tasks);
});

router.get('/:id', (req, res) => {
    const task = data.tasks.find(t => t.taskID === req.params.id);
    if (task) {
        res.json(task);
    } else {
        res.json({message: 'No Task with given id'});
    }
});

router.post('/add', (req, res) => {
    const task = req.body;
    if (!task.type) {
        res.json({message: 'Type is missing'});
    }
    if (!task.creator) {
        res.json({message:'Creator is missing'});
    }
    if (task.type === 'TASK') {
        let lastIndex = 0;
        data.tasks.filter(t => t.type === 'TASK').map(t => {
            const index = Number(t.taskID.split('T-')[1]);
            index > lastIndex ?
                lastIndex = index :
                null;
        });
        task.taskID = 'T-' + (lastIndex + 1).toString();
    } else if (task.type === 'FEATURE') {
        let lastIndex = 0;
        data.tasks.filter(t => t.type === 'FEATURE').map(t => {
            const index = Number(t.taskID.split('F-')[1]);
            index > lastIndex ?
                lastIndex = index :
                null;
        });
        task.taskID = 'F-' + (lastIndex + 1).toString();
    }
    task.status = 'Funnel';

    data.tasks.push(task);
    res.json(task);
});

module.exports = router;