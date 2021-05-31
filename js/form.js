const taskForm = document.querySelector('#task-form'); // capturo lo que tengo en task-form  todos los input 

const fecha = new Date();
const FechaSalida = fecha.getFullYear()+'-'+fecha.getMonth()+'-'+fecha.getDate()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
//console.log(FechaSalida);

let editStatus = false;
//funcion para guardar una tarea 
const saveTask = (nombre, apellido, email, estado, mensaje, vehiculo,fecha) =>
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
    const apellido = taskForm['apellidos'];
    const email = taskForm['email'];
    const estado = taskForm['estado'];
    const mensaje = taskForm['mensaje'];
    const select = taskForm['task-select'];
    const fecha = taskForm['fecha'];
    //console.log(nombre)
    if (!editStatus) {
        //en el evento submit llamo a mi funcon savetask y le envio el titulo y la descripcion con el .value para guardar el valor
        await saveTask(nombre.value, apellido.value, email.value, estado.value, mensaje.value, select.value,fecha.value);
    };
    alert('Usuario Registrado con exito')
    taskForm.reset();
    
    nombre.focus();


    // console.log('Titulo: ', titulo.value, '\n Descripcion: ',descripcion.value);
});

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