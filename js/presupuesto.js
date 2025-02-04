/*---Validar datos personales---*/
const nombreInput = document.getElementById('nombre');
const apellidosInput = document.getElementById('apellidos');
const telefonoInput = document.getElementById('telefono');
const emailInput = document.getElementById('email');

function validarNombre(){
    const nombre = nombreInput.value;
    const nombrePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
    if(nombre.length <=15 && nombrePattern.test(nombre)){
        nombreInput.classList.add('valido');
        nombreInput.classList.remove('invalido');
        document.getElementById('nombreError').textContent = '';
    }else{
        nombreInput.classList.add('invalido');
        nombreInput.classList.remove('valido');
        document.getElementById('nombreError').textContent='El nombre no debe contener números y debe ser menor a 15 caracteres';
    }
};
function validarApellidos(){
    const apellidos = apellidosInput.value;
    const apellidosPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
    if(apellidos.length <=40 && apellidosPattern.test(apellidos)){
        apellidosInput.classList.add('valido');
        apellidosInput.classList.remove('invalido');
        document.getElementById('apellidosError').textContent = '';
    }else{
        apellidosInput.classList.add('invalido');
        apellidosInput.classList.remove('valido');
        document.getElementById('apellidosError').textContent='El apellido no debe contener números y debe ser menor a 40 caracteres';
    }
};
function validarTelefono(){
    const telefono = telefonoInput.value;
    const telefonoPattern = /^[\d]{9}$/
    if(telefono.length <=9 && telefonoPattern.test(telefono)){
        telefonoInput.classList.add('valido');
        telefonoInput.classList.remove('invalido');
        document.getElementById('telefonoError').textContent = '';
    }else{
        telefonoInput.classList.add('invalido');
        telefonoInput.classList.remove('valido');
        document.getElementById('telefonoError').textContent='El teléfono no debe contener letras y debe ser menor a 9 caracteres';
    }
};
function validarEmail(){
    const email = emailInput.value;
    const emailPattern = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/
    if(emailPattern.test(email)){
        emailInput.classList.add('valido');
        emailInput.classList.remove('invalido');
        document.getElementById('emailError').textContent = '';
    }else{
        emailInput.classList.add('invalido');
        emailInput.classList.remove('valido');
        document.getElementById('emailError').textContent='El email debe ser válido';
    }
};
nombreInput.addEventListener('input', validarNombre);
apellidosInput.addEventListener('input', validarApellidos);
telefonoInput.addEventListener('input', validarTelefono);
emailInput.addEventListener('input', validarEmail);

/*---Validar presupuesto---*/
const selectProduct = document.getElementById('select-product');
const plazoMeses = document.getElementById('plazo-meses');
const totalPresu = document.getElementById('total-presu');
const botonCarrito = document.getElementById('añadir-carrito');
const articulosCarrito = document.getElementById('articulos-carrito');
let carrito = [];

botonCarrito.addEventListener('click', ()=>{
    const opcionSeleccionada = selectProduct.options[selectProduct.selectedIndex];
    const valorSeleccionado = opcionSeleccionada.value;
    if(!valorSeleccionado){
        selectProduct.classList.add('seleccionError').textContent='Debe seleccionar un producto';
    }
    const [nombreProducto, precioProducto] = valorSeleccionado.split(':');
    const precio = parseFloat(precioProducto);
    carrito.push({nombre: nombreProducto, precio});
    actualizarCarrito();
});

function actualizarCarrito(){
    articulosCarrito.innerHTML = "";
    let totalCarrito = 0;
    carrito.forEach((producto, index) =>{
        totalCarrito += producto.precio;
        const articuloCarrito = document.createElement("div");
        articuloCarrito.classList.add("articulo-carrito");
        articuloCarrito.innerHTML = `${producto.nombre} - ${producto.precio.toFixed(2)}<button class="eliminar-articulo" data-index="${index}">Eliminar</button>`
        articulosCarrito.appendChild(articuloCarrito);
    });
    document.querySelectorAll(".eliminar-articulo").forEach((boton) =>{
        boton.addEventListener("click", (e)=>{
            const index =e.target.dataset.index;
            eliminarArticulo(index);
        })
    })
    actualizarTotalFinal();
};

function eliminarArticulo(index){
    carrito.splice(index, 1);
    actualizarCarrito();
};

function actualizarTotalFinal(){
    let total = carrito.reduce((suma, item) => suma + item.precio, 0);
    const extrasSeleccionados = document.querySelectorAll(".checkbox-extra:checked");
    extrasSeleccionados.forEach((checkbox) =>{
        const [, precioExtra] = checkbox.value.split(':');
        total += parseFloat(precioExtra);
    })
    totalPresu.value = `Total final: ${total.toFixed(2)}€`
};

const checkboxesExtras = document.querySelectorAll(".checkbox-extra");
checkboxesExtras.forEach((checkbox) =>{
    checkbox.addEventListener('change', actualizarTotalFinal)
});

const etiquetaCheckbox =document.getElementById("etiqueta-checkbox");
const dedicatoriaContainer = document.getElementById("dedicatoria-container");
etiquetaCheckbox.addEventListener("change", function(){
    if(this.checked){
        dedicatoriaContainer.style.display ="block";
    }else{
        dedicatoriaContainer.style.display= "none"
    }
});

const cataCheckbox = document.getElementById("cata-checkbox");
const fechaContainer = document.getElementById("fecha-container");
cataCheckbox.addEventListener("change", function(){
    if(this.checked){
        fechaContainer.style.display="block";
    }else{
        fechaContainer.style.display="none";
    }
});