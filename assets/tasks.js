const tasks = [
    {
        type: 'TASK',
        taskID: 'T-1',
        status: 'In Development',
        creator: 'Vikas',
        assignee: 'Akshay'
    },
    {
        type: 'TASK',
        taskID: 'T-2',
        status: 'Backlog',
        creator: 'Mangesh',
        assignee: 'Rakesh'
    },
    {
        type: 'FEATURE',
        taskID: 'F-1',
        status: 'In Development',
        creator: 'Neeraj',
        assignee: 'Neeraj'
    },
    {
        type: 'TASK',
        taskID: 'T-3',
        status: 'Analysis',
        creator: 'Akshay',
        assignee: 'Mangesh'
    },
    {
        type: 'FEATURE',
        taskID: 'F-2',
        status: 'Analysis',
        creator: 'Bhushan',
        assignee: 'Bhushan'
    }
]

exports.tasks = tasks;