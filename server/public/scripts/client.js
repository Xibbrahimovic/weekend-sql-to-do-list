console.log('js');

$(document).ready(function (){
    console.log('jquery loaded');
    //establishing click listeners

    $('#addButton').on('click', addTask);
    $('#allTasks').on('click', '.removeBtn', handleRemove);
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
           console.log("rendering to DOM");
           console.log(tasks);
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
        date: $('#dateIn').val(),
        completed: $('#completedIn').val(),
        notes: $('#notesIn').val(),
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


function handleRemove(){
    console.log('In remove button');
    
}

function renderToDOM(tasks){
    $('#allTasks').empty();

    for(let task of tasks){
        if(task.completed === true){
            $(`#allTasks`).append(`
            <tr data-id="${task.id}">
                <th>${task.task}</th>
                <th>${task.date}</th>
                <th>${task.completed}</th>
                <th>${task.notes}</th>
                <th><button class="completedBtn">Completed</button></th>
                <th><button class="removeBtn">Remove</button></th>
            </tr>
            `)
        } if(task.completed === false){
            $(`#allTasks`).append(`
            <tr data-id="${task.id}">
                <th>${task.task}</th>
                <th>${task.date}</th>
                <th>${task.completed}</th>
                <th>${task.notes}</th>
                <th><button class="completedBtn">Not Complete</button></th>
                <th><button class="removeBtn">Remove</button></th>
            </tr>
            `)
        } //end if conditional
    }//end loop
}//end renderToDom