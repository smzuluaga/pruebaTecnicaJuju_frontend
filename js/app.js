
// Captura de los elementos DOM

//BOTONES
const buttonLogout = document.getElementById("header-app-buttonLogout");
const buttonAvailableBooks = document.getElementById("main-app-button_avaBooks");
const buttonBookedBooks = document.getElementById("main-app-button_booBooks");
const buttonUploadedBooks = document.getElementById("main-app-button_uplBooks");
const buttonNewBook = document.getElementById("main-app-button_newBook");
const buttonBackForm = document.getElementById("main-app-form-backbutton");
const buttonSaveForm = document.getElementById("main-app-form-savebutton");

//ELEMENTOS 
const tableBodyContainer = document.getElementById("main-app-container");
const tableBody = document.getElementById("main-app-tableBody");
const formContainer = document.getElementById("main-app-form-container");
const formOwnerId = document.getElementById("ownerId");
const formCurrentHolderId = document.getElementById("currentHolderId");
const form = document.getElementById("main-app-form-container");


//Funcion que se ejecuta cada que se carga el DOM

document.addEventListener('DOMContentLoaded', () => {
    setLocalStorage();
})


// Funciones Generales para identificar al usuario en sesión.
let SocialBook_DB;

function saveLocalStorage(DB){

    localStorage.setItem('SocialBook_DB', JSON.stringify(DB));

}

function setLocalStorage(){

    SocialBook_DB = JSON.parse(localStorage.getItem('SocialBook_DB'));

}

// CONFIGURACION DE BOTONES


//Button: Logout - Configuration
buttonLogout.addEventListener('click', () => {

    SocialBook_DB.currentUser = {};
    saveLocalStorage(SocialBook_DB);

    window.location.href="./index.html"

})


//Button: Ver Disponibles - Configuration
buttonAvailableBooks.addEventListener('click', () => {

    formContainer.style.display="none";
    tableBodyContainer.style.display="flex";

    // alert("entre")

    // const url = `http://localhost:9000/api/books`;
    const url = `https://nodeapi-jmgi.onrender.com/api/books`;

    fetch(url)
    .then(response => response.json())
    .then((data) => {

        buildTable(data, "state", "Disponible");
        alert("Operacion Realizada con Éxito, \n Datos Generados Correctamente");
        
    })
})


//Button: Mis Libros Reservados - Configuration
buttonBookedBooks.addEventListener('click', () => {

    formContainer.style.display="none";
    tableBodyContainer.style.display="flex";

    // const url = `http://localhost:9000/api/books`;
    const url = `https://nodeapi-jmgi.onrender.com/api/books`;

    fetch(url)
    .then(response => response.json())
    .then((data) => {

        buildTable(data, "currentHolderId", `${SocialBook_DB.currentUser._id}`);
        alert("Operacion Realizada con Éxito, \n Datos Generados Correctamente");
        
    })
})

//Button: Mis Libros Cargados - Configuration
buttonUploadedBooks.addEventListener('click', () => {

    formContainer.style.display="none";
    tableBodyContainer.style.display="flex";

    // const url = `http://localhost:9000/api/books`;
    const url = `https://nodeapi-jmgi.onrender.com/api/books`;

    fetch(url)
    .then(response => response.json())
    .then((data) => {

        buildTable(data, "ownerId", `${SocialBook_DB.currentUser._id}`);
        alert("Operacion Realizada con Éxito, \n Datos Generados Correctamente");
        
    })
})


//Button:Nuevo Libro - Configuration
buttonNewBook.addEventListener('click', () => {

    formContainer.style.display="flex"
    tableBodyContainer.style.display="none";

    formOwnerId.value= `${SocialBook_DB.currentUser._id}`
    console.log(SocialBook_DB.currentUser._id);
    formCurrentHolderId.value= `${SocialBook_DB.currentUser._id}`
})


// Button: Guardar Nuevo Libro - Configuration
buttonSaveForm.addEventListener('click', () => {

    // const url = `http://localhost:9000/api/books`;
    const url = `https://nodeapi-jmgi.onrender.com/api/books`;

    const data = {
        author: `${document.getElementById("author").value}`,
        pubYear: `${document.getElementById("pubYear").value}`,
        title: `${document.getElementById("title").value}`,
        state: `${document.getElementById("state").value}`,
        ownerId: `${document.getElementById("ownerId").value}`,
        currentHolderId: `${document.getElementById("currentHolderId").value}`
    }
    // const data = {
    //     author: "J.K. Rowling",
    //     pubYear: 1997,
    //     title: "Harry Potter y las reliquias de la muerte",
    //     state: "Disponible",
    //     ownerId: "6597231b33ff26046b94c397",
    //     currentHolderId: "6597231b33ff26046b94c397"
    // }

    fetch(url, 
        {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        }
    )
    .then(response => response.json())
    .then((data) => {

        tableBodyContainer.style.display="none";
        buildTable(data, "ownerId", `${SocialBook_DB.currentUser._id}`);
        alert("Operacion Realizada con Éxito.");
        
    })
})



//Button: Atras del Formulario - Configuration
buttonBackForm.addEventListener('click', () => {

    formContainer.style.display="none"
    tableBodyContainer.style.display="flex";

})


// FUNCIONES PARA CONSTRUIR LA TABLA

// COSTRUIR UNA FILA POR CADA DATO RETORNADO EN LA PROMESA
function buildTable (BooksList, filterAtribute, AtributeValue) {

    tableBody.innerHTML="";

    for(let book of BooksList){

        const row = document.createElement('tr');
        
        if (book[`${filterAtribute}`] !== AtributeValue){
            continue;
        }

        for (let property in book){

            if(property === ("__v")){
                continue
            }

            const cell = document.createElement('td');

            // cell.scope="row";
            cell.innerHTML=book[property];

            row.appendChild(cell);

            
        }

        buildRowButtons(row);
        tableBody.appendChild(row);
    }
}

// CONSTRUIR BOTONES DE CADA FILA

function buildRowButtons (row){
    
    const ownerActionsButtons = document.createElement('td');
    const ownerActionsButton1 = document.createElement('button');
    const ownerActionsButton2 = document.createElement('button');

    ownerActionsButton1.innerHTML="Editar";
    ownerActionsButton2.innerHTML="Eliminar";
    
    ownerActionsButton1.id = 'rowButton-editar';
    ownerActionsButton2.id = 'rowButton-eliminar';
    
    // ownerActionsButton1.classList.add('btn');
    // ownerActionsButton1.classList.add('btn-warning');
    // ownerActionsButton1.classList.add('button1');
    // ownerActionsButton2.classList.add('btn');
    // ownerActionsButton2.classList.add('btn-danger');
    // ownerActionsButton2.classList.add('button1');

    ownerActionsButtons.appendChild(ownerActionsButton1);
    ownerActionsButtons.appendChild(ownerActionsButton2);

    row.appendChild(ownerActionsButtons);
    
    const currentHolderActionsButtons = document.createElement('td');
    const currentHolderActionsButton1 = document.createElement('button');
    const currentHolderActionsButton2 = document.createElement('button');

    currentHolderActionsButton1.innerHTML="Reservar";
    currentHolderActionsButton2.innerHTML="Devolver";
    
    currentHolderActionsButton1.id = 'rowButton-reservar';
    currentHolderActionsButton2.id = 'rowButton-devolver';
    
    // currentHolderActionsButton1.classList.add('btn');
    // currentHolderActionsButton1.classList.add('btn-success');
    // currentHolderActionsButton2.classList.add('btn');
    // currentHolderActionsButton2.classList.add('btn-primary');

    currentHolderActionsButtons.appendChild(currentHolderActionsButton1);
    currentHolderActionsButtons.appendChild(currentHolderActionsButton2);

    row.appendChild(currentHolderActionsButtons);
}

