const mongoose = require('mongoose'); //ORM - Object Relational Mapping 

const URL_MONGO = "mongodb+srv://JessieCruz:Samara1969@cluster0-kikeu.mongodb.net/test?retryWrites=true"

mongoose.connect(URL_MONGO, (err)=>{
    err ? console.log("Algo falló:", err) : console.log("Conexión exitosa:");
});

const Schema = mongoose.Schema;

const personitasSchema = new Schema ({
    foto: [String],
    nombre: String,
    correo: String,
    tipo:{
        type: String,
        enum: ['Pedagogo','Psicólogo','Psiquiatra'],
        required: true
    },
    experiencia: {
        type: Number,
        required: true
    },
    bio:String,
    duracion: {
        type: Number,
        default: 45
    }, 
    direccion: String, 
    cp: String
}, {timestamps: true});

const Persona = mongoose.model('Persona', personitasSchema);

module.exports = {Persona};