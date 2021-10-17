const express = require('express');
const todoRouter = express.Router();

//DB connection 
const pool = require('../modules/pool');

//GET ROUTE
todoRouter.get('/', (req, res) =>{
    console.log('Received GET /todo route');
    //building SQL query
    let queryText = `SELECT * FROM "tasks_table"`;

    //send the query to the SQL database
    pool
        .query(queryText)
        .then((response) => {
            //the response here are your tasks from the DB
            let tasks = response.rows;
            console.log('These are the tasks:', tasks);
            //send the tasks to the client 
            res.send(tasks);
        })
        .catch((error) =>{
            console.log('There was an error on the server', error);
            res.sendStatus(500);
        })
}); //end ajax GET route 


//POST //
todoRouter.post('/', (req, res) => {
    console.log(`in post /todo`,);
    let newTask = req.body;
    console.log(`Adding new task`, newTask);

    let queryText = `INSERT INTO "tasks_table" ("task", "due_date", "completed", "notes")
    VALUES($1, $2, $3, $4);`;

    pool.query(queryText, [
        newTask.task,
        newTask.date,
        newTask.completed,
        newTask.notes,
    ])
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((error) =>{  
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
    }); 

});


//PUT
todoRouter.put('/:id', (req,res)=>{
    let id = req.params.id;
    let completed = req.body.completed;

    console.log(id);
    console.log(completed);

    let queryText = `
    UPDATE "tasks_table"
    SET "completed" = true
    WHERE "id" = $1;`;

    let values = [id];

    pool.query(queryText, values).then(result => {
        res.sendStatus(204);
    }).catch(err => {
        console.log('Error with PUT query', err);
        res.sendStatus(500);
    })
})


//DELETE

todoRouter.delete('/:id', (req,res) => {
    let id = req.params.id;
    console.log(id);
    //pool.query...
    let queryText = `
    DELETE FROM "tasks_table"
    WHERE "id" = $1;
    `
    let values = [id];

    pool.query(queryText, values).then(result =>{
        res.sendStatus(204);
    })
    .catch(err => {
        console.log(`Error with delete query`, err);
        res.sendStatus(500);
    })
})

module.exports = todoRouter;