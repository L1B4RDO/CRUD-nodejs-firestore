
// seleccionamos el contenido del formulario de registro
const signup_form = document.querySelector('#register-form');

// capturamos el evento submit  todo esto para crear un usuario
signup_form.addEventListener('submit', (e) => {
    e.preventDefault();
    //capturo lo que esta en mis input 
    const signup_email = document.querySelector('#signup-email').value;
    const signup_password = document.querySelector('#signup-password').value;
    //console.log('enviando',signup_email,':',signup_password)

    //le envio email y password para que valide y me retorne una respuesta
    auth
        .createUserWithEmailAndPassword(signup_email, signup_password)  //con esto creamos el usuario 
        .then(userCreation => {
            //clear the form
            signup_form.reset();
            alert('Registro Exitoso')
        }, userCreation => {  // De esta forma ingreso si de lo contrario mante otra alerta 
            alert('Usuario Invalido');
        })
});

//// seleccionamos el contenido del formulario de login
const signin_form = document.querySelector('#loginform');

signin_form.addEventListener('submit', e => {
    e.preventDefault();
    //capturo lo que esta en mis input 
    const signin_email = document.querySelector('#usuario').value; //capturo lo que trae el input
    const signin_password = document.querySelector('#password').value;
    //console.log('enviando',signin_email,':',signin_password)

    auth
        .signInWithEmailAndPassword(signin_email, signin_password)  //con esto creamos el usuario 
        .then(userLogin => {
            //clear the form
            signup_form.reset();
            location.href = "http://127.0.0.1:5500/menu.html";
            alert('Ha ingresado')
        }, userLogin => {  // De esta forma ingreso si de lo contrario mante otra alerta 
            alert('Usuario Invalido');
        })
});
// Google Login
const googleButton = document.querySelector('#google-btn');
googleButton.addEventListener('click', e => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            //console.log('Ha ingresado')
            location.href = "http://127.0.0.1:5500/menu.html";
        })
        .catch(err => {
            console.log(err);
            alert('No existe cuenta');
        })

});
// Facebook Login
const FacebookButton = document.querySelector('#facebook-btn');
FacebookButton.addEventListener('click', e => {
    e.preventDefault();
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            //console.log('Ha ingresado')
            location.href = "http://127.0.0.1:5500/menu.html";
        })
        .catch(err => {
            console.log(err);
            alert('No existe cuenta');
        })

});

// End 
//Para salir de la aplicacion

// Para mostrar texto cuando se hace click en el div
function show_detail_agent() {
    location.href = "http://127.0.0.1:5500/login.html";
    auth.singOut().then(() => {
        console.log('sing out')  
    });
};
// End
//Vista usuario
const users_span = document.querySelector('#User-info');
auth.onAuthStateChanged(user => {
    if (user) {
        let li = ``;
        if (user.displayName == null) {
            li = `${user.email}`;
        } else {
            li = `${user.displayName}`;
        }

        users_span.innerHTML += li;
        
    } else {
        console.log('sign out')

    }
})
