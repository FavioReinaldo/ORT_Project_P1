//          ********** PERSONAS ********** 

let personas = []; //Array para guardar cada objeto Persona 

class Persona {
    constructor(pNombre, pUsuario, pContraseña, pNivel, pDocente) {
        this.nombre = pNombre;
        this.usuario = pUsuario;
        this.contraseña = pContraseña;
        this.nivel = pNivel;
        this.docente = pDocente;
        this.ejercicios = []; 
    }
}

//          ********** PERSONAS PRE CARGADAS ********** 

// PROFESORES
personas.push(new Persona("Andrea", "Andrea12",  "Andrea6",  "Docente", ""));
personas.push(new Persona("Agnes",  "Agnes11",   "Agnes7",   "Docente", ""));
personas.push(new Persona("Jose",   "Jose1",     "Agne2",    "Docente", ""));
personas.push(new Persona("Marcelo","Marcelo11", "Marcelo7", "Docente", ""));
personas.push(new Persona("Martin", "Martin13",  "Martin12", "Docente", ""));


// ALUMNOS
personas.push(new Persona("Juan",   "Juan33",   "Juan1",   "Inicial",    "Andrea12"));
personas.push(new Persona("Ana",    "Ana13",    "Ana2",    "Intermedio", "Andrea12"));
personas.push(new Persona("Luis",   "Luis53",   "Luis3",   "Avanzado",   "Jose1"));
personas.push(new Persona("Pedro",  "Pedro28",  "Pedro4",  "Inicial",    "Marcelo11"));
personas.push(new Persona("Lorena", "Lorena54", "Lorena5", "Intermedio", "Martin13"));


//          ********** EJERCICIOS ********** 

//A diferencia de Persona, Ejercicio no tiene un array global para guardar cada objeto. Se guarda en cada array (de ejercicios) de cada Persona  **Ver linea 12**
class Ejercicio {
    constructor(pTitulo, pDescripcion, pImagen, pNivel) {
        this.titulo = pTitulo;
        this.descripcion = pDescripcion;
        this.imagen = pImagen;
        this.nivel = pNivel;   
        this.devolucion = "";
        this.audio=null;
    }
}

//          ********** EJERCICIOS PRE CARGADOS ********** 

// EJERCICIOS PARA EL USAURIO "Juan33"
personas[5].ejercicios.push(new Ejercicio ("Titulo 1", "Descripcion del Ejercicio 1", "imagen/ej8.png", "Inicial"));
personas[5].ejercicios[0].audio = "audio/ej8.m4a"
personas[5].ejercicios.push(new Ejercicio ("Titulo 2", "Descripcion del Ejercicio 2", "imagen/ej8.png", "Inicial"));
personas[5].ejercicios[1].audio = "audio/ej8.m4a"
personas[5].ejercicios.push(new Ejercicio ("Titulo 3", "Descripcion del Ejercicio 3", "imagen/ej8.png", "Inicial"));
personas[5].ejercicios.push(new Ejercicio ("Titulo 4", "Descripcion del Ejercicio 4", "imagen/ej8.png", "Inicial"));
personas[5].ejercicios.push(new Ejercicio ("Titulo 5", "Descripcion del Ejercicio 5", "imagen/ej8.png", "Inicial"));


// EJERCICIOS PARA EL USAURIO "Ana13"
personas[6].ejercicios.push(new Ejercicio ("Titulo 1", "Descripcion del Ejercicio 1", "imagen/ej8.png", "Intermedio"));
personas[6].ejercicios[0].audio = "audio/ej8.m4a"
personas[6].ejercicios.push(new Ejercicio ("Titulo 2", "Descripcion del Ejercicio 2", "imagen/ej8.png", "Intermedio"));
personas[6].ejercicios[1].audio = "audio/ej8.m4a"
personas[6].ejercicios.push(new Ejercicio ("Titulo 3", "Descripcion del Ejercicio 3", "imagen/ej8.png", "Intermedio"));
personas[6].ejercicios.push(new Ejercicio ("Titulo 4", "Descripcion del Ejercicio 4", "imagen/ej8.png", "Intermedio"));
personas[6].ejercicios.push(new Ejercicio ("Titulo 5", "Descripcion del Ejercicio 5", "imagen/ej8.png", "Intermedio"));



