console.log('js');

$(document).ready(function (){
    console.log('jquery loaded');
    //establishing click listeners

    $('#addButton').on('click', addTask);
    getTasks();
})
function getTasks(){
    console.log('in getTasks');
    //ajax call to get tasks
       $.ajax({
           method: 'GET',
           url: '/todo',  
       })
       .then(function(tasks) {
           renderToDOM(tasks);
       })
       .catch(function(error){
           console.log('There was an error retrieving tasks from the database');
       })
   };//end getTasks

function addTask() {
    console.log('addButton clicked!');
//create an object from the input values to send to server side
    let taskToAdd = {
        task: $('#taskIn').val(),
        task: $('#dateIn').val(),
        task: $('#completedIn').val(),
        task: $('#notesIn').val(),
    };
    //ajax call to server to add tasks
     $.ajax({
         method: 'POST',
         url: '/todo',
         data: taskToAdd
     })
     .then(function(response) {
         console.log('Your task was successfully added to the database!');
         getTasks();
     })
     .catch(function(error){
         console.log('There was an error adding new tasks to the server: ', error);
     })
};//end addTask

function renderToDOM(tasks){
    $('#allTasks').empty();

    for(let task of tasks){
        
    }
}