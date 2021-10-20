const mongoose = require('mongoose');
const dbConection = async() => {
    try {
        //Debemos utilizar la cadena de conexion que tenemos en mongocompass        
        await mongoose.connect(process.env.DB_CNN);
        //await mongoose.connect('mongodb+srv://adminproject:YQGD74ZQiSe0qpqt@cluster0.wkpoc.mongodb.net/proyectodb');
        console.log('Conexion exitosa a la BD')
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la BD');
    }
}
module.exports ={
    dbConection
}