const express = require('express');
const path = require('path') 
// creo instancia
const app = express();
const port = 5500;


// Para que los archivos estaticos queden disponibles.
app.use(express.static('public'));

// registro hrl
app.get('/', function (req, res){
    res.sendFile(path.join(__dirname + '/public/login.html'));
});
// pongo a correr el servidor
app.listen(port, () => {
    console.log(`App corriendo en el puerto ${port}`)
});