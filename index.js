const express = require('express')
require('dotenv').config();
const {dbConection} = require('./config/database')
const cors = require('cors');

//Crear el servidor express
const app = express();

app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Establece conexion a la DB
dbConection();
//Verificando variable de entorno
//console.log(process.env);

//Rutas de la API proyectos

//Rutas de la API
app.use('/api/usuarios', require('./routes/usuarios.route'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/alquileres', require('./routes/alquiler.route'));
app.use('/api/autores',require('./routes/autor.route'));
app.use('/api/TipoPelis', require('./routes/tipoPelicula.route'));
app.use('/api/peliculas', require('./routes/pelicula.route'));
app.use('/api/Dvds',require('./routes/dvd.route'));
//Codigo para desplegar el servidor

app.listen(process.env.PORT,()=>{
    console.log('Servidor deplegado en el puerto:'+ process.env.PORT);
})
