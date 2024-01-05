const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-pass");
const loginButton = document.getElementById("login-butt");

let SocialBook_DB;

// emailInput.addEventListener('click', () => {
//     alert("EMAIL INPUT OK")
// })

// passwordInput.addEventListener('click', () => {
//     alert("PASS INPUT OK")
// })

document.addEventListener('DOMContentLoaded', () => { 
    // SocialBook_DB.currentUser={};
    // saveLocalStorage();
    validateLocalStorage();
    console.log("DOM charged");
    console.log(SocialBook_DB);
})

loginButton.addEventListener('click', () => {
    alert("LOGIN BUTTON OK")

    // let url = `https://node-api-eb84.onrender.com/api/users/login/${emailInput.value}/${passwordInput.value}`;
    let url = `http://localhost:9000/api/users/login/${emailInput.value}/${passwordInput.value}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {

        console.log(data);

        if(!data.value){
            alert("Usuario o Contraseña Incorrecta")
        } else {
            SocialBook_DB.currentUser = data.value[0];
            saveLocalStorage(SocialBook_DB);
            window.location.href="./app.html";
        }
        

    })
    //    !data.value ? alert("Usuario o Contraseña Incorrecta") : () => {
        //     SocialBook_DB.currentUser = data[value][0];
        //     console.log("dlag1  ", data[value][0]);
        //     // console.log(SocialBook_DB);
        //     saveLocalStorage(SocialBook_DB);
        //     window.location.href="./app.html"};
        //     // console.log(SocialBook_DB);
        
        // })
        
})



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