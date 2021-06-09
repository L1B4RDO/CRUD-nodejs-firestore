
const fecha = new Date();
const FechaSalida = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();
// console.log(FechaSalida);
// variables Glovales 

var parqueadero_1 = 0;

// ####################
// Collection parking
const taskContainer = document.getElementById('task-container');
let editStatus = false;
let id = '';
//metodo para obtener los datos 
const getTask = () => db.collection('Parqueo').get();

const onGetTask = (callback) => db.collection('Parqueo').onSnapshot(callback); // cada que halla cambio  se actualize 


//para eliminar tarea
const deleteTask = id => db.collection('Parqueo').doc(id).delete();

//para editar 
const getTaskEdit = (id) => db.collection('Parqueo').doc(id).get();
const updateTask = (id, updateTask) => db.collection('Parqueo').doc(id).update(updateTask);
//cantidad  de vehiculos
let vehiculos = '';
window, addEventListener('DOMContentLoaded', async (evento) => {

    onGetTask((querySnapshot) => {//ongettask viene de firebase para que me recargue cada que halla cambios 
        taskContainer.innerHTML = `<tr>
        <th>Vehiculos</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Email</th>
        <th>Placas</th>
        <th>Estado</th>
        <th>Fecha Ingreso</th>
        <th>OPTION</th>
         </tr>`; //para que no me repita los cambios 
        querySnapshot.forEach(doc => {
            parqueadero_1 = parqueadero_1 + 1;
            // console.log(doc.data());
            const contenido = doc.data();//almaceno la data capturada 
            //capturo el id de la tarea 
            contenido.id = doc.id;
            //  console.log(contenido.id)


            taskContainer.innerHTML += `
                <tr >
                <td><h5>${contenido.Vehiculo}</h5></td>
                    <td><h5>${contenido.Name}</h5></td>
                    <td><h5>${contenido.LastName} </h5></td>
                    <td> <h5>${contenido.Email}</h5></td>
                    <td><h5>${contenido.Message}</h5></td>
                    <td><h5>${contenido.Estado}</h5></td>
                    <td><h5>${contenido.FechaIngreso}</h5></td>
                    <td>
                    <div>
                    <a href="#" onclick="removeTask('${contenido.id}')"><img style=" width:20px; height:17px " src="./icon/delete.png" alt="png" /></a>
                    <a href="#miModal2" onclick="viewDataUpdate('${contenido.id}','${contenido.Name}','${contenido.LastName}','${contenido.Email}','${contenido.Message}','${contenido.FechaIngreso}')"><img style=" width:20px; height:17px " src="./icon/edit.png" alt="png"  /></a>
                    <a href="#miModal" onclick="viewDataExit('${contenido.id}','${contenido.FechaIngreso}')"><img style=" width:20px; height:17px " src="./icon/susses.png" alt="png"  /></a>
                    </div>
                    </td>
                    </tr>`;
        });
        taskContainer.innerHTML += `
        <tfoot>
        <tr>
          <th>Cantidad de vehiculos</th>
          <th><div id="cant_vehiculos">${parqueadero_1}</div></th>
        </tr>
      </tfoot>`
    });
})


//capturo el evento de mi boton 
const update = document.getElementById('update');
//capturo mi div donde pondre los datos a editar de mi modal
const editUpdate = document.getElementById('editData');
// funcion para capturar los valores de mi formulario de edicion
function value(request) {
    return document.getElementById(request).value;
}
update.disabled = true;
// Funcion para editar 
function viewDataUpdate(key, name, lastname, email, mensaje, fecha) {
    editUpdate.innerHTML = '';
    // console.log(key)
    const response = `<div class="form-group"><input type="hidden" value='${key}' id="key">
    <label for="nombre">Nombre</label>
    <input type="text" name="nombre" id="nombre" placeholder="Nombre" value="${name}" />

    <label for="apellidos">Apellidos</label>
    <input type="text" name="apellidos" id="apellidos" placeholder="Apellido" value="${lastname}" />

    <label for="email">Email</label>
    <input type="email" name="email" id="email" placeholder="email" required  value="${email}"/>

    <label for="estado">Estado:</label>
    <select id="estado" >
        <option>Seleccione...</option>
        <option>Activo</option>
        <option>Inactivo</option>
    </select>
    <label for="placa">Placas:*</label>
    <input type="text" id="mensaje" placeholder="Obligatorio" required value="${mensaje}"/>
    <label for="vehiculo">Vehiculo:</label>
    
    <select id="vehiculo">
        <option>Seleccione...</option>
        <option>Automovil</option>
        <option>Motocicleta</option>
    </select>
    <label for="fecha">Fecha de ingreso</label>
    <input type="text" name="fecha" id="fecha" value="${fecha}"  disabled  />

    <div class=container >
    </div>
        </div>`;
    editUpdate.innerHTML += response;
    update.disabled = false;
}


function onClickUpdate() {
    // console.log('>>>',key);
    const key = value('key');
    const nombre = value('nombre');
    const apellido = value('apellidos');
    const email = value('email');
    const estado = value('estado');
    const placas = value('mensaje');
    const vehiculo = value('vehiculo');
    const fecha = value('fecha');
    if (nombre.length == 0 || placas.length == 0) {
        alert("empty field");
    } else {
        updateTask(key, {
            Name: nombre,
            LastName: apellido,
            Email: email,
            Message: placas,
            Vehiculo: vehiculo,
            Estado: estado,
            FechaIngreso: fecha,

        });
        editStatus = false;
        id = ''
        alert("Datos modificados Exitosamente");
        update.disabled = true;
    }
}
//funcion delete
async function removeTask(key) {
    //console.log(key);
    if (confirm("¿Estas seguro de eliminar?")) {
        await deleteTask(key);
        // location.reload();
    }
}


//events
//listo los datos para los usuarios autenticados 
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
        // llamo mi coleccion 
        db.collection('Depositos')
            .get()
            .then((snapshot) => {
                //console.log('Data', snapshot.docs)
                // console.log('User', user)
                setupPost(snapshot.docs);
            })
    } else {
        console.log('sign out')

    }
})

//TOTAL
//consultas 
const postList = document.querySelector('#post');
var valor;
let NewValor;
const setupPost = data => {
    if (data.length) {
        let html = 'Tarifa por dia: $10.000';
        data.forEach(doc => {
            const post = doc.data();//Con esto traigo la data de mi database
            post.id = doc.id;
            console.log(post.id)
            valor = post.Total;
            const li = `
             <ul class="view-ul">
                Tarifa Total mensaual:  <h5>$ ${post.Total}</h5>
             </ul>
             `;
            html += li;

        })
        postList.innerHTML = html;
    } else {
        postList.innerHTML = '<p>No hay publicaciones.</p>';
    }
}


// SALIDA 
const exitUpdate = document.getElementById('exit');
//COLECCION 


const getTaskExit = () => db.collection('Depositos').get();


const exit_btn = document.getElementById('exit-btn');

const updateTaskExit = (updateTaskExit) => db.collection('Depositos').doc("zM6LrRxtWTEYgKhz8FL4").update(updateTaskExit);
function onClickExit() {
    console.log('>>>');
    const IDUSUARIO = document.querySelector('#key2');
    const fechaFin = document.querySelector('#fechasalida');
    const descriptor = document.querySelector('#exit-select');
    const fechaInicio = document.querySelector('#fechaentrada');

    // console.log('>>>',Total,descriptor.value,fecha);
    if (descriptor.value == 'Seleccione...') {
        alert("Seleccionar opcion");
    } else {
        // FORMULA PARA CALCULAR TIEMPO DE ESTANCIA CON EL VALOR DEL PARQUEADERO
        const fechaini = new Date(fechaInicio.value);
        const fechafin = new Date(fechaFin.value);
        var day_as_milliseconds = 86400000;
        const diasdif = fechafin.getTime() - fechaini.getTime();
        //console.log(Math.round(diasdif / day_as_milliseconds), ' dias de diferencia');
        const cantDias = Math.round(diasdif / day_as_milliseconds);
        NewValor = cantDias * 10000;
        if (cantDias == 0) {
            NewValor = 10000;
            alert("Cantidad de dias: " + (cantDias + 1) + " El valor total a pagar es: $" + NewValor)

        } else {
            alert("Cantidad de dias: " + cantDias + " El valor total a pagar es: $" + NewValor)
        }
        valor = (valor + NewValor);
        //console.log('>>>',valor);
        updateTaskExit({
            Total: valor,
            Descripcion: descriptor.value,
            Actualizacion: fechaFin.value,
        });
        editStatus = false;
        id = ''
        alert("Datos Guardados Exitosamente");


        exit_btn.disabled = true;
    }
}



function viewDataExit(key, fecha) {
    exitUpdate.innerHTML = ` 
      <h1>FORMULARIO DE SALIDA</h1>
      <select id="exit-select">
      <option>Seleccione...</option>
      <option>Retirar Vehiculo</option>
      </select>`;
    // console.log(key)
    const response = `<div class="form-group"><input type="hidden" value='${key}' id="key2">
      <label for="fecha">Fecha de entrada</label>
      <input type="text" name="nombre" id="fechaentrada" disabled value="${fecha}" />
      <label for="fecha">Fecha Salida</label>
      <input type="text" name="fechasalida" id="fechasalida" disabled value="${FechaSalida}" />

          </div>`;
    exitUpdate.innerHTML += response;
    exit_btn.disabled = false;
}
console.log('Cantidad', parqueadero_1)