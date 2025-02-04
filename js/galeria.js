// Variables
const btnCierre =document.getElementById("btn-cierre");
const btnRetrocede =document.getElementById("btn-retrocede");
const btnAdelante =document.getElementById("btn-adelante");
const imagenes = document.querySelectorAll(".gallery-img");
const cntPrincipal = document.getElementById("contenedor-principal");
const imagenActiva = document.getElementById("img-activa");
let indiceImagen = 0;

/*Abrir carrusel*/ 
const abrirCarrusel = (event)=>{
   imagenActiva.src = event.target.src;
    cntPrincipal.style.display = 'flex';
    indiceImagen = Array.from(imagenes).indexOf(event.target);
};
imagenes.forEach((imagen)=>{
    imagen.addEventListener('click', abrirCarrusel);
});
/*Cerrar carrusel*/
btnCierre.addEventListener('click', ()=>{
    cntPrincipal.style.display = 'none';
});
/*Adelanta la imagen*/
const adelantaImagen = ()=>{
    if(indiceImagen === imagenes.length -1){
        indiceImagen = -1;
    }
    imagenActiva.src = imagenes[indiceImagen + 1].src;
    indiceImagen++;
};
btnAdelante.addEventListener('click', adelantaImagen);
/*Retrocede la imagen*/
const retrocedeImagen = ()=>{
    if(indiceImagen === 0){
        indiceImagen = imagenes.length;
    }
    imagenActiva.src = imagenes[indiceImagen - 1].src;
    indiceImagen--;
};
btnRetrocede.addEventListener('click', retrocedeImagen);