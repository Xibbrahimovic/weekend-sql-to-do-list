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

//POST 

//PUT

//DELETE

module.exports = todoRouter;