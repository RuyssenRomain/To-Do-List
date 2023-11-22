// @ts-nocheck
        document.addEventListener('DOMContentLoaded', () => {
            const input = document.getElementById('input_task');
            const addButton = document.getElementById('add_button');
            const todos = document.querySelector('.todos');
            const filters = document.getElementsByClassName('filter');
            
            
            // ajouter une tache 
            function addTodo (content, completed, id) {
              //declaration variable de la fonction 
              let isNewTask, taskText, newTodo, checkboxId, checkbox, label, deleteBtn
              
              isNewTask = !content; // nouvelle tache
              
              //si tache nouvelle alors 
              if (isNewTask) {  
                taskText = input.value.trim();
                id = Date.now().toString(); // convertit en chaine pour eviter erreurs pour stockage de données

              }else {
                //si on charge une tache,  utiliser le contenu de l ID
                taskText = content.trim();
              }

              if (taskText === "") {
                window.alert(`veillez ajouter une nouvelle tache avant de valider`)
                return
              }

            //  creer un nouvel element li
               newTodo = document.createElement('li');
               checkboxId = `todo-${id}`;
              
              // création de la checkbox
              checkbox = document.createElement('input');
              checkbox.setAttribute('type', 'checkbox');
              checkbox.className = 'toggle-completed';
              checkbox.id = checkboxId;
              checkbox.checked = completed;

              // création du label
              label = document.createElement('label');
              label.htmlFor = checkboxId;
              label.textContent = content || taskText;

              // création du bouton de suppression
              deleteBtn = document.createElement('button');
              deleteBtn.className = 'delete-btn';
              deleteBtn.setAttribute('type', 'button');
              deleteBtn.textContent = 'X';
              deleteBtn.addEventListener('click',() => {
                deleteTask(newTodo);
              } );

              // insertion des elements creer dans la variable newTodo
              newTodo.appendChild(checkbox);
              newTodo.appendChild(label);
              newTodo.appendChild(deleteBtn);

              // ajout style a la classe toggle-completed
              newTodo.classList.add('toggle-completed');

              // insertion de l'element li creer dans l'ul
              todos.appendChild(newTodo);

            //effcacer le champ du texte aprés avoir valider la tache 
            if (isNewTask) {
              // pour enregistrer la tache 
              saveTask();
              input.value = "";
            }
            

            }

            // ajout au click d une tache avec le button 
            addButton.addEventListener('click', () => {
              addTodo();
            });


            // ecouteur lors de la touche relaché === ENTRER pour soumettre nouvelle tache 
            input.addEventListener('keyup', (event) => {
                if ( event.key === 'Enter') {
                    addTodo()
                }
            });

            // pour supprimer une tache et mettre a jour le storage  
            function deleteTask(taskelement) {
              //suppression de l'element li du Dom
              taskelement.remove();

              //mise a jour des données 
              saveTask();
            }
            

            //fonction pour sauvegarder les taches 

            function saveTask() {
              //variable fonction 
              let tasks, taskData
              tasks = document.querySelectorAll('.todos li');
              taskData = [];

              tasks.forEach(task => {
                const id = task.querySelector('.toggle-completed').id;
                const content = task.querySelector('label').textContent;
                const completed = task.querySelector('.toggle-completed').checked;
                taskData.push({id, content, completed});
              })
              localStorage.setItem('todos', JSON.stringify(taskData));
            }

            //fonction pour charger les données
            function loadTask() {
              //declaration variable 
              let taskData
              taskData = JSON.parse(localStorage.getItem('todos'));
              if(taskData) {
                taskData.forEach(task => {
                  addTodo(task.content, task.completed, task.id);
                })               
              }
            }
            loadTask();


            // ajout gestionnaire d evenenments pour les filtres
            Array.from(filters).forEach(filterElement => {
              filterElement.addEventListener('click', function () {
                targetFilter(filterElement.dataset.filter); // permet d acceder a la valeur de l element data
              })
            })

            
            // fonction permettant de switcher par catégories
            function targetFilter(filterType) {
              const tasks = document.querySelectorAll('.todos li');

              tasks.forEach(task => {
                const isChecked = task.querySelector('.toggle-completed').checked;

                //affichage du filtre selectionné
                switch (filterType) {

                  //affiche toute les taches 
                  case 'all':
                    task.style.display = '';
                    break;

                    //affiche toute les taches terminés et cochés
                  case 'completed':
                    task.style.display = isChecked ? '' : 'none';
                    break;

                    //affiche toute les taches non terminés et non cochés
                  case 'in-progress':
                    task.style.display = !isChecked ? '' : 'none';
                    break;

                    //reset to do list 
                  case 'delete':
                    task.remove();
                    saveTask();
                    break;
                }

              })
            }



        });




// penser a faire ajout d une modale pour demander si oui suppression totale 
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