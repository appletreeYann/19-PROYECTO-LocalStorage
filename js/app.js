//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners

eventListeners();

function eventListeners() {

    //Cuando se introduce un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando se carga el documento
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []; //El operador || se ejecuta automaticamente si la primera opcion es null
        crearHTML();
    })
    
}


////Funciones

function agregarTweet(e){
    e.preventDefault();
    //console.log('Agregar tweet');

    const tweet = document.querySelector('#tweet').value;

    //Validación

    if(tweet === ''){
        mostrarError('Ingrese texto');
        return; //Interrumpe la ejecución de la función
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //Añadir tweet a arreglo de tweets
    tweets = [...tweets, tweetObj];
    console.log(tweets);

    //crear HTML
    if(tweets.length > 0){
        crearHTML();
    }
    
}

//MOstrar error

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error');

    //Insertar en html
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elminar alerta después de 3 segundos

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML(){

    limpiarHTML();

    tweets.forEach( elem => {

        //Agregar botón de eliminar
        const btnEliminar = document.createElement('a');
        btnEliminar.classList.add('borrar-tweet');
        btnEliminar.innerText = 'x';

        //Añadir función a botón
        btnEliminar.onclick = () => {
            borrarTweet(elem.id);
        }

        //Agregar li
        const li = document.createElement('li');
        li.innerText = elem.tweet;
        li.appendChild(btnEliminar),
        listaTweets.appendChild(li);
    });

    sincronizarStorage();
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id){
    //console.log(id);
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}