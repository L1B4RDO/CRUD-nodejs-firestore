// ############ VARIABLES ##################

let placas = '';
let bandera = 'true';
let placasRegistradas = '';
let nombres = '';
let apellidos = '';
let correo = '';
let estados = '';
let vehiculo = '';
let fechaRegister = '';

// ################## END ##################

const taskForm = document.querySelector('#task-form'); // capturo lo que tengo en task-form  todos los input 

const fecha = new Date();
const FechaSalida = fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDate() + ' ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
//console.log(FechaSalida);

let editStatus = false;
//funcion para guardar una tarea 
const saveTask = (nombre, apellido, email, estado, mensaje, vehiculo, fecha) =>
    db.collection('Parqueo').doc().set({//indico que quiero guardar en la coleccion tasks un documento y que ese documento va a tener unos objetos
        Name: nombre,
        LastName: apellido,
        Email: email,
        Message: mensaje,
        Vehiculo: vehiculo,
        Estado: estado,
        FechaIngreso: fecha
    });

//con el evento submit guardamos en firebase 


taskForm.addEventListener('submit', async (evento) => {
    evento.preventDefault(); //para que no se refresque la pagina 
    const nombre = taskForm['nombre']; //capturo de esta manera capturo lo que tengo en mi input task-tiempo capturo el elemento
    nombres = nombre.value;
    const apellido = taskForm['apellidos'];
    apellidos = apellido.value;
    const email = taskForm['email'];
    correo = email.value;
    const estado = taskForm['estado'];
    estados = estado.value;
    const mensaje = taskForm['mensaje'];
    placasRegistradas = mensaje.value;
    const select = taskForm['task-select'];
    vehiculo = select.value;
    const fecha = taskForm['fecha'];
    fechaRegister = fecha.value;
    // Con esto valido que no se ingrese el mismo vehiculo dos veces 
    const data = db.collection('Parqueo')
        .get()
        .then((snapshot) => {
            //console.log('Data', snapshot.docs)
            // console.log('User', snapshot.docs)
            const data = snapshot.docs

            data.forEach(doc => {
                const post = doc.data();//Con esto traigo la data de mi database
                post.id = doc.id;
                placas = post.Message;
                if (placas == placasRegistradas) {
                    bandera = 'false';
                }
                console.log(placas, '=', placasRegistradas)
            });
            if (bandera == 'true') {
                let cant = 0;
                db.collection('Parqueo').get().then(snap => {
                    size = snap.size // will return the collection size
                    cant = size;
                    console.log('Cantidad', cant);
                    // restringo para que el parqueadero solo registre 50 vehiculos
                    if (cant < 50) {
                        saveTask(nombres, apellidos, correo, estados, placasRegistradas, vehiculo, fechaRegister);
                        alert('Usuario Registrado con exito')
                    }else{
                        alert('No hay mas cupos disponibles')
                    }
                });


            } else {
                alert('Este vehiculo ya se encuentra reguistrado')
                bandera = 'true';
            }
        });


    taskForm.reset();

    nombre.focus();


    // console.log('Titulo: ', titulo.value, '\n Descripcion: ',descripcion.value);
});

//


//Vista usuario
const users_spa = document.querySelector('#User-info');
auth.onAuthStateChanged(user => {
    if (user) {
        let li = ``;
        if (user.displayName == null) {
            li = `${user.email}`;
        } else {
            li = `${user.displayName}`;
        }

        users_spa.innerHTML += li;

    } else {
        console.log('sign out')

    }
})
