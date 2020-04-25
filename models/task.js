const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        type: String,
        taskId: String,
        creator: String,
        assignee: String,
        description: String,
        acceptanceCriteria: String,
        boardName: String,
        parent: String,
        subtasks: [String],
        comments: [{
            content: String,
            commentor: String
        }]
    },
    {
        collection: 'tasks'
    }
);

const Task = module.exports = mongoose.model('Task', taskSchema);