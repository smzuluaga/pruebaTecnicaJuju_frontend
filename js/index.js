
// Captura de los elementos DOM
const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-pass");
const loginButton = document.getElementById("login-butt");

let SocialBook_DB;

//Funcion que se ejecuta cada que se carga el DOM
document.addEventListener('DOMContentLoaded', () => { 
    validateLocalStorage();
    console.log("DOM charged");
    console.log(SocialBook_DB);
})

// Funciones Generales para identificar al usuario en sesión.

function validateLocalStorage(){

    if(!localStorage.getItem("SocialBook_DB")){

        const NewSocialBook_DB = {
            currentUser: {},
            version: "1.0",
            PoweredBy: "Miraclouds"  
        };

        saveLocalStorage(NewSocialBook_DB);
        setLocalStorage();
        console.log("LOCAL STORAGE SETTED");
    } else {
        setLocalStorage();
    }
}

function saveLocalStorage(DB){

    localStorage.setItem('SocialBook_DB', JSON.stringify(DB));

}

function setLocalStorage(){

    SocialBook_DB = JSON.parse(localStorage.getItem('SocialBook_DB'));

}


//CONFIGURACION DE BOTONES DEL LOGIN

// Button login Button - Configuracion 

loginButton.addEventListener('click', () => {


    let url = `https://nodeapi-jmgi.onrender.com/api/users/login/${emailInput.value}/${passwordInput.value}`;
    // let url = `http://localhost:9000/api/users/login/${emailInput.value}/${passwordInput.value}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {

        console.log(data);

        if(!data.value){
            alert("Usuario o Contraseña Incorrecta, Intente de nuevo")
        } else {
            SocialBook_DB.currentUser = data.value[0];
            saveLocalStorage(SocialBook_DB);
            window.location.href="./app.html";
            alert("Ingreso Exitoso, Bienvenido")

        }
        

    })
        
})

