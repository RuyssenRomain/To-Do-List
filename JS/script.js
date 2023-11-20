// @ts-nocheck
        document.addEventListener('DOMContentLoaded', () => {
            const input = document.getElementById('input_task');
            const addButton = document.getElementById('add_button');
            const todos = document.querySelector('.todos');
            const filters = document.getElementsByClassName('filter');
            
            
            // ajouter une tache 
            function addTodo () {
              let taskText = input.value.trim();
              if (taskText === "") {
                window.alert(`veillez ajouter une nouvelle tache \n
                avant de valider`)
                return
              }

            //  creer un nouvel element li
              let newTodo = document.createElement('li');
              newTodo.innerHTML = `
                    <input type="checkbox" class="toggle-completed" id="todo-${Date.now()}">
                    <label for="todo-${Date.now()}">${taskText}</label>
                    <button class="delete-btn">X</button>"`
              todos.appendChild(newTodo);

            //effcacer le champ du texte 
            input.value = "";
            }

            // ajout au click d une tache avec le button 
            addButton.addEventListener('click', addTodo);


            // ecouteur lors de la touche relaché === ENTRER 
            input.addEventListener('keyup', (event) => {
                if ( event.key === 'Enter') {
                    addTodo()
                }
            })
        })





// POUR APPLIQUER UNE FONCTION DE RECHERCHE DANS LA TO DO LIST  
// Élément input pour la recherche dans la to-do list
// var searchInput = document.getElementById('searchTasks');

// // Écouteur d'événement pour la recherche en temps réel
// searchInput.addEventListener('keyup', function(event) {
//   var searchText = searchInput.value.toLowerCase();
//   var tasks = document.querySelectorAll('#tasks-list li');

//   tasks.forEach(function(task) {
//     var taskText = task.textContent.toLowerCase();
//     if (taskText.includes(searchText)) {
//       task.style.display = ''; // La tâche correspond, on l'affiche
//     } else {
//       task.style.display = 'none'; // La tâche ne correspond pas, on la cache
//     }
//   });
// });