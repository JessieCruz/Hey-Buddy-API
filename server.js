const express = require("express");
const bodyParser = require("body-parser");
const {Persona} = require('./models/Personitas');
// const cors = require('cors');
const PORT = process.env.PORT || 3000; 

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',(req, res)=>{
    res.status(200)
    .send({message: "Hola desde el puerto 3000"});
})

//Postear personas

app.post('/personas', (req, res)=>{
    const Personas = req.body;
    console.log("Este es el body", Personas);
    const newPersona = Persona (Personas);
    newPersona.save((err, persona)=>{
        err ? res.status(409).send(err) :
        res.status(201).send(persona);
    })
});

//Obtener personas

app.get('/personas',(req, res)=>{
    Persona.find((err, personas)=>{
        err ? res.status(500).send(err) :
        res.status(200).send(personas);
    })
})

//Obtener una sola persona

app.get('/personas/:id',(req, res)=>{
    const {id} = req.params;
    Persona.findById(id, (err, persona)=>{
        err ? res.status(500).send(err) :
        res.send(persona);
    })
})

//Modificar Persona (PUT)

app.put('/personas/:id', (req, res)=>{
    const {id} = req.params;

    //Validaciones de datos

    const personaBody = req.body;
    Persona.findByIdAndUpdate(id, {$set: personaBody}, (err, persona)=>{
        err ? res.status(500).send(err) : res.send(persona)
    })
})

// Busqueda 

app.get('/buscar', (req, res)=>{
    const {nombre, tipo, cp, correo} = req.query;
    console.log(req.query, nombre, tipo, cp, correo);

    if(nombre){
        Persona.find({nombre: nombre}, (err, persona)=>{
            err ? res.status(500).send(err) : res.status(200).send(persona)
        });
    }else if(tipo){
        Persona.find({tipo: tipo}, (err, persona)=>{
            err ? res.status(500).send(err) : res.status(200).send(persona)
        });
    }else if (cp){
        Persona.find({cp: cp}, (err, persona)=>{
            err ? res.status(500).send(err) : res.status(200).send(persona)
        });
    }else if (correo){
        Persona.find({correo: correo}, (err, persona)=>{
            err ? res.status(500).send(err) : res.status(200).send(persona)
        });
    }
})




app.listen(PORT, ()=>{
    console.log("Servidor iniciado en puerto", PORT);
})