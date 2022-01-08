

function ocultar(elementos) {//Funcion que se llama para ocultar elementos
    document.querySelectorAll(elementos).forEach(function (e) { e.style.display = "none" })
}

function mostrar(elementos) {//Funcion que se llama para mostrar elementos
    document.querySelectorAll(elementos).forEach(function (e) { e.style.display = "block" })
}

function validar(pTexto) {//Funcion que valida las exigencias de la contraseña al momento de crearse
    let resultado = false;
    let minusc = false;
    let mayusc = false;
    let numer = false;
    if (pTexto.length >= 4) {
        for (let index = 0; index < pTexto.length; index++) {
            if (pTexto[index] >= 'A' && pTexto[index] <= 'Z') {//al menos una mayuscula
                mayusc = true;
            }
            if (pTexto[index] >= 'a' && pTexto[index] <= 'z') {//al menos una minuscula
                minusc = true;
            }
            if (pTexto[index] >= '0' && pTexto[index] <= '9') {//al menos un numero
                numer = true;
            }
            if (mayusc && minusc && numer) {//si las tres variables se cumplen(true)
                resultado = true;
                break;
            }
        }
    }

    return resultado;
}

function buscarPersonaXUsuario(pUsuario) {//Se llama a la funcion buscar para encontrar coincidencia entre usuario ingresado y parametro "usuario" en el array de personas
    return buscar(personas, "usuario", pUsuario)
}


function buscar(pArray, pAtributo, pValor) { //funcion generica que recorre un array, buscando coincidencia entre el atributo de un objeto y el parametro que se le pasa
    let personaBuscada = null;
    let encontre = false;
    let indice = 0;
    while (indice < pArray.length && !encontre) {
        if (pArray[indice][pAtributo] === pValor) {//comparo valor ingresado con el atributo que se le asigne
            personaBuscada = pArray[indice][pAtributo];//Devuelvo del objeto, el atributo encontrado
            encontre = true;
        } else {
            indice += 1;
        }
    }
    return personaBuscada;
}

function buscarPersonaXUsuarioNoCaseSensitive(pUsuario) {//Funcion que busca coincidencia en el usuario en mayusculas,
    return buscarSinNull(personas, "usuario", pUsuario.toUpperCase()); ////
}

function buscarSinNull(pArray, pAtributo, pValor) {//Funcion que devuelve un objeto entero del array asignado
    let personaBuscada = "";
    let encontre = false;
    let indice = 0;
    while (indice < pArray.length && !encontre) {
        if (pArray[indice][pAtributo].toUpperCase() === pValor) { ////
            personaBuscada = pArray[indice][pAtributo];
            encontre = true;
        } else {
            indice += 1;
        }
    }
    return personaBuscada;
}

function crearUnaPersona(objPersona) {//Funcion que permite levantar los objetos con los parametros indicados,dandole funcionalidad a los botones en la funcion generaraContenido
    let textoHTML = `<h1>${objPersona.nombre}</h1><br><br>
                    <input type="button" value = "Subir nivel" id="btnSubirNivel${objPersona.usuario}"  class="botones"><br>
                    <div id="divNivel${objPersona.usuario}">Nivel: ${objPersona.nivel} </div>`;
    return textoHTML;
}

function generarContenido() {//Funcion que permite cambiar el parametro nivel de los alumnos 
    let idClickedado = this.getAttribute("id");//btnSubirNivel${objPersona.usuario} ---> Boton creado en crearUnaPersona()
    let usuarioDePersona = (idClickedado.split("btnSubirNivel")[1]);//${objPersona.usuario}
    let objeto = devolverObjetoPersona(usuarioDePersona)// funcion(${objPersona.usuario}) ---> nos devuelve el objeto entero "persona" que tiene ese usuario
    let mensaje = "";
    if (objeto !== null) {
        switch (objeto.nivel) {
            case "Inicial": objeto.nivel = "Intermedio";
                mensaje = `Se cambio el nivel correctamente. Ahora ${objeto.nombre} tiene nivel ${objeto.nivel}`;
                break;
            case "Intermedio": objeto.nivel = "Avanzado";
                mensaje = `Se cambio el nivel correctamente. Ahora ${objeto.nombre} tiene nivel ${objeto.nivel}`;
                break;
            default: mensaje = `${objeto.nombre} ya es ${objeto.nivel}. No puede subir mas de nivel`;
                break;
        }
        document.querySelector("#divNivel" + usuarioDePersona).innerHTML = mensaje;
    }

}

//**************************************** FUNCION PARA BUSCAR Y OBTENER UN OBJETO CON UN PARAMETRO ****************************************          

function devolverObjetoPersona(pUsuario) {//Funcion que devuelve el objeto entero de una persona, buscando coincidencia en el usuario

    
    let objeto = null;
    let indice = 0;
    let encontrado = false;
    while (indice < personas.length && !encontrado) {
        if (personas[indice].usuario === pUsuario) {
            objeto = personas[indice];
            encontrado = true;
        } else {
            indice++;
        }
    }
    return objeto;
}

//**************************************** FUNCION PARA CREAR UN SELECT ****************************************

function crearSelect(pArray, pAtributo, pValor) { //Esta funcion genera un Select, 
    let opciones = '<option value="">Seleccione...</option>';   //Genero el primer valor (cuando no se selecciona nada)
    for (let index = 0; index < pArray.length; index++) //Recorro el array 
        if (pArray[index][pAtributo] === pValor) { //Si el atributo es igual al valor entonces genero el contenido del select
            opciones += `<option value="${pArray[index].usuario}">${pArray[index].nombre} (${pArray[index].usuario})</option>`
        }
    return opciones;//Devuelvo lo generado
}
//**************************************** FUNCION PARA CONTAR ENTREGA DE EJERCICIOS **************************************** 

function alumnosConMasEjerciciosEntregados() { //Esta funcion devuelve un mensaje con los alumnos que resolvieron mas ejercicios
    let contador = 0; //declaro e inicializo contadores 
    let mayorCantidadEjercicios = 0
    let resultado = "Los Alumnos que resolvieron mas ejercicios son: <br>";

    for (let index = 0; index < personas.length; index++) { //Recorro el array 
        if (personas[index].docente === personaConectada) {//Si esa persona tiene como docente a la persona conectada entonces es un alumno suyo
            contador = 0; //Cada vez que encuentro una persona inicializo el contador en 0
            for (let index2 = 0; index2 < personas[index].ejercicios.length; index2++) { //recorro el array de ejercicios de esa persona
               if (personas[index].ejercicios[index2].audio !== null) { //Si el audio no es nulo entonces esta resulto
                contador++;//sumo 1 al contador
                }
            } 
            if (contador > mayorCantidadEjercicios ) { //Si alguien resolvio mas ejercicios entonces ese es el nuevo maximo
                mayorCantidadEjercicios = contador;          
            } 
        }
    }

    //Una vez que tengo la cantidad maxima de ejercicios resueltos, me fijo quien es la persona que los resolvio
    for (let index = 0; index < personas.length; index++) {
        if (personas[index].docente === personaConectada) {
            contador = 0;
            for (let index2 = 0; index2 < personas[index].ejercicios.length; index2++) {//Itero de la misma manera
               if (personas[index].ejercicios[index2].audio !== null) {
                contador++;
                }
            } 
            if (contador = mayorCantidadEjercicios ) { // Cuando el contador es igual al maximo, esa es la perosna que resolvio mas ejercicios
                resultado += `${personas[index].nombre} con ${mayorCantidadEjercicios} Ejercicios <br>`;    //Se agrega al mensaje a devolver      
            } 
            if (contador = 0 ){
                resultado += "No se han entregado ejercicios"//En el caso que no hay ejercicios entregados muestro un mensaje
            }
        }
    }
    return resultado;

}

//**************************************** FUNCION PARA CALCULAR EL TOTAL DE EJERCICIOS ENTREGADOS ****************************************          
function entregaTotalDeEjerciciosEntregados() {
    let contador = 0;
    
    let resultado = "En total se han entregado: ";

    for (let index = 0; index < personas.length; index++) {
        if (personas[index].docente === personaConectada) {
            for (let index2 = 0; index2 < personas[index].ejercicios.length; index2++) {
               if (personas[index].ejercicios[index2].audio !== null) {
                contador++;
                }
            } 
        }
    }
    resultado += `${contador} Ejercicios <br>`;
    return resultado;
}

//**************************************** FUNCION PARA BUSCAR TEXTO DENTRO DE UNA CADENA DE TEXTO ****************************************          

function buscarTexto(pTextoBuscado,pTexto) { //Le paso un texto a buscar y otro texto donde se realizara la busqueda. 
    let resultado = false; //Si no se encuetra devuelvo false
    if (pTexto.indexOf(pTextoBuscado) > -1) { //Si el texto buscado esta contenido dentro del otro entonces...
        resultado = true; //... devuelvo true
    } 
    return resultado;
}

//**************************************** FUNCION PARA ENCONTRAR EL EJERCICIO QUE CONTIENE UN TEXTO BUSCADO ****************************************          

function busquedaDeTextoEnAtributo(pTextoBuscado, pAtributo) { //Esta funcion me devuelve el ejercicio buscado o un mensaje cuando no se encontro ninguno.
    //let resultado = "No hay resultados que coincidan con su búsqueda"; 
    let contenido = false; //varaible para verificar si se cargo contenido en la tabla
    let resultado = `<table border="1"><tr>
                    <td>Nombre del Ejercicio</td>
                    <td>Descripcion del ejercicio</td>
                    <td>Imagen del ejercicio</td>`;
    
    for (let index = 0; index < personas.length; index++) { //Recorro el array de personas para encontrar al alumno que esta conectado
        if (personas[index].usuario === personaConectada) { //Si la usuario es igual a la personaConectada entonces ese es el alumno
            for (let index2 = 0; index2 < personas[index].ejercicios.length; index2++) {
                if (personas[index].ejercicios[index2].audio === null) {//Cuando el audio del ejercicio es nulo entonces ese ejercicio esta sin resolver
                    //Se agrega en la tabla el contenido de la misma, titulo, descripcion, imagen y audio de los ejercicios
                    if (buscarTexto(pTextoBuscado, personas[index].ejercicios[index2][pAtributo])) {
                        resultado += `<tr><td>${personas[index].ejercicios[index2].titulo}</td>
                        <td>${personas[index].ejercicios[index2].descripcion}</td>
                        <td><img src="${personas[index].ejercicios[index2].imagen}" width="200"></td>
                        <td><input type="file" id="fileSubirAudio${index}-${index2}"  accept="audio/*"> 
                        <td><input type="button" value="Enviar tarea" id="btnEnviarTarea${index}-${index2}" class="botones2" ></td>
                        <td><div id="divConfirmarAudio${index}-${index2}"> Audio no enviado</div></td>
                        </tr>`;
                        contenido = true;//Si hay contenido cambio la variable a true
                    }
                }
            }
            resultado += `</table> <br><br>`; //Se cierra la tabla
        }
    }
    
    if (!contenido) { //Si no hay contenido guardo el mensaje correspondiente
        resultado = "No hay resultados que coincidan con su búsqueda";
    } 
    return resultado; //devuelvo el resultado

}