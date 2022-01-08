
//**************************************** ESCUCHADORES DE EVENTO DE CLICK ****************************************

document.querySelector("#btnlogin").addEventListener("click", cambiarAInicioSesion)
document.querySelector("#btnVolverARegistro").addEventListener("click", cambiarARegistro)
document.querySelector("#btnRegistro").addEventListener("click", validacionRegistro)
document.querySelector("#btnInicioSesion").addEventListener("click", iniciarSesion)
document.querySelector("#btnCerrarSesion").addEventListener("click", cerrarSesion)
document.querySelector("#btnMostrarAlumnos").addEventListener("click", mostrarAlumnos)
document.querySelector("#btnImagen").addEventListener("click", clickEnFile);
document.querySelector("#fileImagen").addEventListener("change", procesar);
document.querySelector("#btnAgregarEjercicio").addEventListener("click", agregar);
document.querySelector("#btnVerEjercicios").addEventListener("click", redactarDevoluciones)
document.querySelector("#btnVerInformacionEstadisticaDocente").addEventListener("click", verInformacionEstadisticaDocente)
document.querySelector("#btnMostrarEjercicios").addEventListener("click", verEjercicios) 
document.querySelector("#btnBusquedaEjercicio").addEventListener("click", buscarEjercicio)
document.querySelector("#btnMostrarEjerciciosResueltos").addEventListener("click", verejerciciosresueltos)
document.querySelector("#btnVerInformacionEstadisticaAlumno").addEventListener("click", estadisticasAlumno)



document.querySelector("#selectRegistro").innerHTML = crearSelect(personas,"docente","");


//**************************************** MANEJO DE INTERFAZ  ****************************************

function cambiarAInicioSesion() { // Funcion para cambiar de la interfaz de registro a la de inicio de sesion
    mostrar("#dInicioSesion")//se muestra la interfaz de inicio de sesion
    ocultar("#dRegistro") //se oculta la interfaz de registro
    document.querySelector("#dSalidaRegistro").innerHTML = ""
    document.querySelector("#txtNombreRegistro").value ="";
    document.querySelector("#txtUsuarioRegistro").value="";
    document.querySelector("#txtContraseñaRegistro").value="";
    document.querySelector("#selectRegistro").value="";
}
function cambiarARegistro() {
    ocultar("#dInicioSesion")// Se cambia el registro a inicio de seison de manera analoga a la funcion cambiarAInicioSesion()
    mostrar("#dRegistro")
    document.querySelector("#dSalidaInicioSesion").innerHTML = "";
}

//**************************************** REGISTRO DE USUARIO  ****************************************

function validacionRegistro() {
    let nombre = document.querySelector("#txtNombreRegistro").value; //Se toman valores de los inputs
    let usuario = document.querySelector("#txtUsuarioRegistro").value;
    let contraseña = document.querySelector("#txtContraseñaRegistro").value;
    let docente = document.querySelector("#selectRegistro").value;
    let nivel = "Docente";

    let usuarioBuscado = buscarPersonaXUsuarioNoCaseSensitive(usuario); // Se llama a la funcion para obtener el usuario ingresado dentro de los Pre Cargados               
    if (nombre === "" || usuario === "") {
        document.querySelector("#dSalidaRegistro").innerHTML = "Complete todos los campos"
    } else {
        if (usuarioBuscado !== "") {          //Si NO es vacio entonces el Usuario ingresado ya existe
            document.querySelector("#dSalidaRegistro").innerHTML = "Usuario ya existente"
        }
        else {
            if (validar(contraseña)) { //Esta funcion valida la contraseña, si es una contraseña valida da true y sigo con las instrucciones
                if (docente === "") { //Si no se selecciona un Docente, entonces es un Docente
                    personas.push(new Persona(nombre, usuario, contraseña, nivel, docente)); //Se guarda el nuevo registro
                    document.querySelector("#dSalidaRegistro").innerHTML = `Registro de ${personas[personas.length - 1].nivel} completado. Inicie Sesion para continuar `;
                    document.querySelector("#selectRegistro").innerHTML = "";
                    document.querySelector("#selectRegistro").innerHTML = crearSelect(personas,"docente",""); //Se actualiza el Select con el nuevo registro del Docente
                } else {//Si selecciono un Docente, entonces es alumno
                    nivel = "Inicial";//Por defecto su nivel sera Inicial
                    personas.push(new Persona(nombre, usuario, contraseña, nivel, docente));//Se guarda el nuevo registro
                    document.querySelector("#dSalidaRegistro").innerHTML = `Registro de Alumno completado con nivel "${personas[personas.length - 1].nivel}" y su docente es "${personas[personas.length - 1].docente}". Inicie Sesion para continuar`;
    
                }
            }
            else { //Si no es valida, se muestra un mensaje
                document.querySelector("#dSalidaRegistro").innerHTML = "La contraseña no cumple con los requisitos (al menos 1 minuscula, 1 mayuscula ,1 numero,4 caracteres)";
            }
        }
    }
    
}


//**************************************** INICIO DE SESION DE USUARIO  ****************************************

let personaConectada = null; //varaible para guardar el usuario de la persona que inicio sesion

function iniciarSesion() { //Funcion para realizar el inicio de seision
    let usuario = document.querySelector("#txtUsuarioInicioSesion").value;
    let contraseña = document.querySelector("#txtContraseñaInicioSesion").value;

    let personaBuscada = buscarPersonaXUsuarioNoCaseSensitive(usuario);   // Buscar que el usuario sea el mismo de la base de datos (Siendo permisivo con las mayusculas y minusculas)
    let objetoPersona = devolverObjetoPersona(personaBuscada);  // Con el usuario obtengo todo el objeto 
    
    if (objetoPersona !== null) {
        if (personaBuscada === objetoPersona.usuario && contraseña === objetoPersona.contraseña) { //Si se encontro el usuario Y ademas se encontro la contraseña entonces se puede iniciar sesion
            if (objetoPersona.nivel === "Docente") { //Si tiene nivel Docente, entonces es un Docente
                personaConectada = personaBuscada;
                // Ocultar el Inicio de Sesion y mostrar Cerrar Sesion y Pantalla Principal de Docente.
                ocultar("#dInicioSesion")
                mostrar("#dCerrarSesion")
                mostrar("#dPantallaDocente")
                document.querySelector("#dSalidaInicioSesion").innerHTML = "";
                document.querySelector("#selectInfoEstadisticaDocente").innerHTML = crearSelect(personas, "docente", personaConectada); //Se genera el desplegable para la seccion de Ver Infomracion Estadistica 
    
            } else {//Sino es un Alumno
                personaConectada = personaBuscada;
                // Ocultar el Inicio de Sesion y mostrar Cerrar Sesion y Pantalla Principal de Alumno.
                ocultar("#dInicioSesion")
                mostrar("#dCerrarSesion")
                mostrar("#dPantallaAlumno")
                document.querySelector("#dSalidaInicioSesion").innerHTML = "";                
            }
        } else {//Si no se encuetra el usuario o la contraseña no coincide, muestro un error
            document.querySelector("#dSalidaInicioSesion").innerHTML = "Error en el Usuario o Contraseña";
        }
    } else {
        document.querySelector("#dSalidaInicioSesion").innerHTML = "Error en el Usuario o Contraseña";
    }
    
}

function cerrarSesion() { //Funcion para realizar el cierre de sesion

    personaConectada = null; //Se limpia la variable
    //Se muestra el inicio de sesion y se ocultan las demas pantallas
    mostrar("#dInicioSesion") 
    ocultar("#dCerrarSesion")
    ocultar("#dPantallaDocente")
    ocultar("#dPantallaAlumno")
    //Se limpian los Divs del HTML para que no quede informacion precargada una vez que se vuelva a iniciar seison
    document.querySelector("#txtUsuarioInicioSesion").value = "";
    document.querySelector("#txtContraseñaInicioSesion").value = "";
    document.querySelector("#dAsignarNivel").innerHTML = "";
    document.querySelector("#divStatus").innerHTML = "";
    document.querySelector("#txtTitulo").value =""; //-------------------------------------------------------------------------------------------------------------------------------------
    document.querySelector("#txtDescripcion").value = "";
    document.querySelector("#txtImagen").value = "";
    document.querySelector("#selectNivelEjercicio").value = "";


    document.querySelector("#divEjercicios").innerHTML = "";
    document.querySelector("#txtBusquedaEjercicio").value = "";
    document.querySelector("#divEjerciciosResueltos").innerHTML = "";
    document.querySelector("#dVerInformacionEstadisticaDocente").innerHTML = "";

    document.querySelector("#dVerEjercicios").innerHTML = "";
    document.querySelector("#dVerEjerciciosResueltos").innerHTML = "";
    document.querySelector("#dVerInformacionEstadisticaAlumno").innerHTML = "";
}

//**************************************** SUBIR NIVEL A ALUMNOS  ****************************************

function mostrarAlumnos() { //Funcion para mostrar todos los alumnos correspondientes al Docente que esta conectado
    let contenidoHTML = "";
    for (let index = 0; index < personas.length; index++) { //Recorro el array de personas para encontrar a los alumnos que tengan al Docente que esta conectado como Docente
        if (personas[index].docente === personaConectada) {
            contenidoHTML += crearUnaPersona(personas[index]); //Cuando hay una coincidencia genero el contenido 
        }
    }
    document.querySelector("#dAsignarNivel").innerHTML = contenidoHTML; //Muestro en Pantalla lo generado
    document.querySelectorAll(".botones").forEach(function (e) { e.onclick = generarContenido }) //Cuando se haga un click en alguno de los
}

//**************************************** PLANTEAR EJERCICIOS SEGUN NIVEL  ****************************************

function clickEnFile() {
    let idGenerador = this.id;
    let idDestino = "#file" + idGenerador.split("btn")[1];
    document.querySelector(idDestino).click();
}

function procesar() {
    let archivo = this.value;
    let nombre = this.id.split("file")[1].toLowerCase() + archivo.split("fakepath")[1];
    document.querySelector("#txt" + this.id.split("file")[1]).value = nombre;
}
          
function agregar() { //Funcion que le da al profesor la posibilidad de agregar nuevos ejercios
    document.querySelector("#divStatus").innerHTML = "";
    let titulo = document.querySelector("#txtTitulo").value;//Variables que guardan los datos que el ejercicio requiere
    let descripcion = document.querySelector("#txtDescripcion").value;
    let imagen = document.querySelector("#txtImagen").value;
    let nivel = document.querySelector("#selectNivelEjercicio").value; //variable para saber el nivel del ejercicio
    let tieneAlumnos = false;
 
    if (titulo !== "" && descripcion !== "" && imagen !== "") {
        if ((titulo.length + descripcion.length) < 20 || (titulo.length + descripcion.length) > 200) {//Se evalua que el titulo y la descripcion del ejercicio cumplan con el requerimiento mayor a 20 y menor a 200 caracteres entre ambos
            document.querySelector("#divStatus").innerHTML = "La cantidad de caracteres debe estar entre 20 y 200";//Si no lo cumple, mensaje de error
        } else {
            for (let index = 0; index < personas.length; index++) {   //Hacer un for para recorrer el array de personas
                if (personas[index].nivel === nivel && personas[index].docente === personaConectada) {     //Hacer 1 if  para coincidir el docente y para coincidir el nivel (al mismo tiempo)
                    personas[index].ejercicios.push(new Ejercicio(titulo, descripcion, imagen, nivel));//Se agrega al array de ejercicios del alumno, un nuevo objeto ejercicios con los datos cargados
                    document.querySelector("#divStatus").innerHTML = "Ejercicio agregado con éxito.";
                    tieneAlumnos=true;
                } 
            }
            if (tieneAlumnos === false) {//si no le encuentra alumnos al profesor en la condicion de la linea 165, el valor de tieneAlumnos continua siendo false, se envia el siguiente mensje
                document.querySelector("#divStatus").innerHTML = "No tiene alumnos de ese nivel";
            }
        }
    }
    else {
        document.querySelector("#divStatus").innerHTML = "Falta información para agregar ejercicio.";
    }
}


//**************************************** REDACTAR DEVOLUCIONES ****************************************          


function redactarDevoluciones() {//Funcion que le da la posibilidad al profesor de redactar devoluciones a los ejercicios resueltos

    for (let index = 0; index < personas.length; index++) {  //Hacer un for para recorrer el array de personas
        if (personas[index].docente === personaConectada) {   //En el array de personas, busco los alumnos que tiene el docente conectado  
            
            let tabla = `<table border="1"><tr><td>Nombre del Ejercicio</td><td>Descripcion del ejercicio</td><td>Imagen del ejercicio</td><td>Audio del Ejercicio</td><td>Devolucion del Ejercicio</td><td>Enviar Devolucion</td><td>Confirmacion</td>`;

            for (let index2 = 0; index2 < personas[index].ejercicios.length; index2++) { //Una vez encuentro al alumno, recorro su array de ejercicios
                if (personas[index].ejercicios[index2].devolucion === "" && personas[index].ejercicios[index2].audio !== null) { //Datos que confirmar que el ejercicio esta resuelto y sin devolucion
                    //Muestro los ejercicios, incluido el audio enviado por el alumno
                    //A cada input generado le asigno un unico id,con la ubicacion del alumno+ubicacion ejercicio(irrepetible)
                    tabla += `<tr><td>${personas[index].ejercicios[index2].titulo}</td>
                    <td>${personas[index].ejercicios[index2].descripcion}</td>
                    <td><img src="${personas[index].ejercicios[index2].imagen}" width="200"></td>
                    <td><audio controls><source src="${personas[index].ejercicios[index2].audio}" type="audio/mpeg"></audio></td>
                    <td><input type="text" placeholder="Devolucion" name="" id="txtDevolucion${index}-${index2}" ></td>
                    <td><input type="button" value = "Cargar devolucion" id="btnCargarDevolucion${index}-${index2}"  class="botones"></td>
                    <td><div id="divMensajeDevolucion${index}-${index2}"> Mensaje de Confirmacion o Error</div></td>
                    </tr>`

                }
            }
            tabla += `</table> <br><br>`;
            if (tabla === `<table border="1"><tr><td>Nombre del Ejercicio</td><td>Descripcion del ejercicio</td><td>Imagen del ejercicio</td><td>Audio del Ejercicio</td><td>Devolucion del Ejercicio</td><td>Enviar Devolucion</td><td>Confirmacion</td></table> <br><br>`) {
                document.querySelector("#divEjerciciosResueltos").innerHTML =  "No tiene ejercicios para redactar devoluciones"
            } else {
                document.querySelector("#divEjerciciosResueltos").innerHTML = tabla;
            }
            document.querySelectorAll(".botones").forEach(function (e) { e.onclick = cargarDevolucion })//Llamo a la funcion cargarDevolucion para darle funcion a los botones nuevos
        }
    }
}

function cargarDevolucion(){//Funcion que van a realizar los botones de cargar devolucion, la llama la funcion redactarDevoluciones

    let idClickedado = this.getAttribute("id");//Del Boton Clickeado (que fue creado en redactarDevoluciones()) tomo los ids
    let indexsDelId = (idClickedado.split("btnCargarDevolucion")[1]);//Lo separo y me quedo solo con la parte de los indices usados para iterar arriba que son la posicion de cada Array
    let index = (indexsDelId.split("-")[0]);//Con la funcion split me quedo con esos indices y la vuelvo a usar para separarlos entre si
    let index2 = (indexsDelId.split("-")[1]);
    let devolucion = document.querySelector(`#txtDevolucion${index}-${index2}`).value;//Ahora puedo cargar en una variable lo que se escribio como devolucion
    let mensaje = "";

    personas[index].ejercicios[index2].devolucion = devolucion;//Envio la devolucion escrita al parametro "devolucion"
    if (devolucion !== "") {
        mensaje = "Devolucion cargada correctamente"
    } else {
        mensaje = "Devolucion vacia"
    }
    document.querySelector("#divMensajeDevolucion" + indexsDelId).innerHTML = mensaje;

}

//**************************************** VISUALIZAR INFORMACION ESTADISTICA (PROFESOR) ****************************************          

function verInformacionEstadisticaDocente() {//Funcion para que el profesor pueda ver estadisticas de los ejercicios planteados

    let mensaje = alumnosConMasEjerciciosEntregados();//Llama la funcion que calcula el alumno con mas ejercicios entregados y lo guardo en una variable
    mensaje +=`<br> ${entregaTotalDeEjerciciosEntregados()}`;//En la misma variable guardo los datos de otra funcion que calcula los ejercicios entregados

    let alumno = document.querySelector("#selectInfoEstadisticaDocente").value;//Elijo alumno asignado que quiero ver las estadisticas y lo guardo en una variable

    let contador = 0;
    let cantidadTotalDeEjerciciosPlanteados = 0;
    if (alumno !== "") {
        
        for (let index = 0; index < personas.length; index++) {
            if (personas[index].usuario === alumno) {//busco el alumno en array de personas
                cantidadTotalDeEjerciciosPlanteados = personas[index].ejercicios.length;//cantidad de ejercicios planteados es igual a la longitud de su array de ejercicios
            }
        }
        mensaje +=`<br> ${alumno} tiene ${cantidadTotalDeEjerciciosPlanteados} Ejercicios Planteados para su Nivel`;

        for (let index = 0; index < personas.length; index++) {
            if (personas[index].usuario === alumno) {
                for (let index2 = 0; index2 < personas[index].ejercicios.length; index2++) {//Los que tengan audio cargado(!=null) son ejercicios resueltos, se aumenta el contador en uno
                   if (personas[index].ejercicios[index2].audio !== null) {
                    contador++;
                    }
                } 
            }
        }
        mensaje +=`<br> ${alumno} tiene ${contador} Ejercicios Resueltos`;
    } 

    
    document.querySelector("#dVerInformacionEstadisticaDocente").innerHTML = mensaje;//Muestro todos los datos de las variables que se fueron guardando
}

//**************************************** VER Y BUSCAR EJERCICIOS  (ALUMNO)****************************************          

function verEjercicios() {
    for (let index = 0; index < personas.length; index++) { //Recorro el array de personas para encontrar al alumno que esta conectado
        if (personas[index].usuario === personaConectada) { //Si la usuario es igual a la personaConectada entonces ese es el alumno

            //Se crea una variable para guardar en ella una tabla, se inicializa con los titulos de la misma
            let tabla = `<table border="1"><tr><td>Nombre del Ejercicio</td><td>Descripcion del ejercicio</td><td>Imagen del ejercicio</td>
            <td>Cargar archivo de audio para enviar</td><td>Confirmar envio</td><td>Estado</td>`;
                        
            for (let index2 = 0; index2 < personas[index].ejercicios.length; index2++) {
               if (personas[index].ejercicios[index2].audio === null) { //Cuando el audio del ejercicio es nulo entonces ese ejercicio esta sin resolver
                    //Se agrega en la tabla el contenido de la misma, titulo, descripcion, imagen y audio de los ejercicios    
                    tabla += `<tr><td>${personas[index].ejercicios[index2].titulo}</td>
                    <td>${personas[index].ejercicios[index2].descripcion}</td>
                    <td><img src="${personas[index].ejercicios[index2].imagen}" width="200"></td>
                    <td><input type="file" id="fileSubirAudio${index}-${index2}"  accept="audio/*"></td>
                    <td><input type="button" value="Enviar tarea" id="btnEnviarTarea${index}-${index2}" class="botones2" ></td>
                    <td><div id="divConfirmarAudio${index}-${index2}"> Audio no enviado</div></td>
                    </tr>`
                }
            }
            tabla += `</table> <br><br>`;
            document.querySelector("#dVerEjercicios").innerHTML = tabla; //Muestro la tabla en la pantalla
        }
    }
    document.querySelectorAll(".botones2").forEach(function (e) { e.onclick = enviartarea })//Le da funcion a todos los "botones2" creados arriba

}

function enviartarea() {
    let idClickedado = this.getAttribute("id");//Del Boton Clickeado (que fue creado en verEjercicios()) tomo los ids
    let indexsDelId = (idClickedado.split("btnEnviarTarea")[1]);//Lo separo y me quedo solo con la parte de los indices usados para iterar arriba que son la posicion de cada Array
    let index = (indexsDelId.split("-")[0]); //Con la funcion split me quedo con esos indices y la vuelvo a usar para separarlos entre si
    let index2 = (indexsDelId.split("-")[1]);

    let audioCargado = document.querySelector(`#fileSubirAudio${index}-${index2}`).value;//Ahora puedo cargar en una variable lo que se selecciono como archivo de audio
    let audioCargadoSinFakePath = (audioCargado.split("C:\\fakepath\\")[1])//Le quito el fakepath porque solo me interesa la parte de su nombre

    if (audioCargado !== "") { //Si se selecciono un archivo entonces 
        document.querySelector(`#divConfirmarAudio${index}-${index2}`).innerHTML = "El audio se envio correctamente"//Se muestra un mensaje
        personas[index].ejercicios[index2].audio = "audio/" + audioCargadoSinFakePath;//le agrego la ruta de la carpeta porque sino no lo reproduce
    } else {
        document.querySelector(`#divConfirmarAudio${index}-${index2}`).innerHTML = "Audio no seleccionado" //Si da vacio entonces muestro un error
    }
}


function buscarEjercicio() {  //Filtrar ejercicios por audio para que no aparezcan
    let textoBuscado = document.querySelector("#txtBusquedaEjercicio").value;   
    let mensaje = "";

    //Esta funcion me devuelve el ejercicio buscado o un mensaje cuando no se encontro ninguno.
    mensaje = busquedaDeTextoEnAtributo(textoBuscado, "titulo")//Le paso el texto que quiero buscar y el atributo donde se quiere buscar, en este caso el titulo

    if (mensaje === "No hay resultados que coincidan con su búsqueda" ) { //Si la funcion devuelve ese mensaje entonces no se encontro lo buscado 
        mensaje = busquedaDeTextoEnAtributo(textoBuscado, "descripcion")//Entonces repito el procedimiento pero en la descripcion
    }
    document.querySelector("#dVerEjercicios").innerHTML = mensaje;//Muestro el mensaje generado, ya sea el ejercicio o el mensaje que no se encontro
    document.querySelectorAll(".botones2").forEach(function (e) { e.onclick = enviartarea })//Escuchador de evento de click para todos los botones con clase "botones2" (Le da funcion a todos los botones creados en la funcion de busquedaDeTextoEnAtributo)
}


//**************************************** VER EJERCICIOS RESUELTOS (ALUMNO) ****************************************


function verejerciciosresueltos() { //Se crea una variable para guardar en ella una tabla, se inicializa con los titulos de la misma
    let tabla = `<table border="1"><tr><td>Nombre del Ejercicio</td><td>Descripcion del ejercicio</td><td>Imagen del ejercicio</td><td>Audio enviado</td>`;

    for (let index = 0; index < personas.length; index++) {  //Recorro el array de personas para encontrar al alumno que esta conectado

        if (personas[index].usuario === personaConectada) { //Si la usuario es igual a la personaConectada entonces ese es el alumno
            for (let index2 = 0; index2 < personas[index].ejercicios.length; index2++) {
                if (personas[index].ejercicios[index2].audio !== null) { //Cuando el audio del ejercicio es distinto de nulo entonces ese ejercicio esta resuelto
                    //Se agrega en la tabla el contenido de la misma, titulo, descripcion, imagen y audio de los ejercicios
                    tabla += `<tr><td>${personas[index].ejercicios[index2].titulo}</td> 
                        <td>${personas[index].ejercicios[index2].descripcion}</td>
                        <td><img src="${personas[index].ejercicios[index2].imagen}" width="200"></td>
                        <td><audio controls><source src="${personas[index].ejercicios[index2].audio}" type="audio/mpeg"></audio></td>
                        </tr>`
                }

            }
        }
    }
    if (tabla === `<table border="1"><tr><td>Nombre del Ejercicio</td><td>Descripcion del ejercicio</td><td>Imagen del ejercicio</td>`) { //si el contenido de la tabla es solo lso titulos entonces NO se guardo ningun ejercicio y por lo tanto no hay ejercicio resueltos
        document.querySelector("#dVerEjerciciosResueltos").innerHTML = "no tiene ejercicios resueltos"  //Muestro un mensaje en la pantalla

    } else {
        document.querySelector("#dVerEjerciciosResueltos").innerHTML = tabla //Si la tabla tiene ejercicios muestro la tabla en pantalla

    }

}


//**************************************** VISUALIZAR INFORMACION ESTADISTICA (ALUMNO) ****************************************

function estadisticasAlumno() {             
    let cantidadEjerciciosPlanteados = 0;  //Se crean e inicializan varaibles
    let ejerciciosResueltos = 0;
    let ejerciciosConDevolucion = 0;
    let totalSinDevolucion = 0;
    let porcentajeResuelto = 0;



    for (let index = 0; index < personas.length; index++) {     //Recorro el array de personas para encontrar al alumno que esta conectado

        if (personas[index].usuario === personaConectada) {     //Si la usuario es igual a la personaConectada entonces ese es el alumno
            for (let index2 = 0; index2 < personas[index].ejercicios.length; index2++) { //Recorro el array de ejercicios de ese alumno
                if (personas[index].ejercicios[index2].audio !== null) {    //Cuando el audio del ejercicio es distinto de nulo entonces ese ejercicio esta resuelto
                    cantidadEjerciciosPlanteados += 1 //Como encontre un ejercicio, sumo 1 al contador de ejercicios planteados 
                    ejerciciosResueltos += 1 //Como ese ejercicio esta resuelto, sumo 1 al contador de ejercicios resueltos

                } else {//Si el audio es null, entonces es un ejercicio pero no esta resuelto
                    cantidadEjerciciosPlanteados += 1//Como encontre un ejercicio, sumo 1 al contador de ejercicios planteados 

                }
                if (personas[index].ejercicios[index2].devolucion !== "") { //Por otro lado cada vez que encuentro una devolucion distinta de vacia
                    ejerciciosConDevolucion += 1// sumo 1 al contador de ejercicios con devilucion
                }
            }
        }
    }
    //Ahora que tengo los contadores hago los calculos
    porcentajeResuelto = ejerciciosResueltos * 100 / cantidadEjerciciosPlanteados//Calculo el porcentaje de ejercicios resueltos
    totalSinDevolucion = cantidadEjerciciosPlanteados - ejerciciosConDevolucion //calculo la cantidad de ejercicios sin devolcuion

    //Muestro en pantalla la informacion estadistica.
    document.querySelector("#dVerInformacionEstadisticaAlumno").innerHTML = `Ejercicios planteados por su docente: ${cantidadEjerciciosPlanteados}  <br>Resolvio: ${ejerciciosResueltos}
<br>Porcentaje de ejercicios resueltos: ${porcentajeResuelto}%<br>Ejercicios entregados con devolucion: ${ejerciciosConDevolucion} 
<br>Ejercicios entregados sin devolucion: ${totalSinDevolucion}`;



}