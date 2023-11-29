"use strict";

// MAIN PROGRAM
var oTiendaMuebles = new TiendaMuebles();
registrarEventos();


// MÉTODOS: 
// Registro de eventos
function registrarEventos() {
    // Opciones de menú 
    //document.querySelector("#mnuInicio").addEventListener("click", ocultarFormulariosYListas);
    document.querySelector("#mnuAltaCategoria").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuAltaProducto").addEventListener("click", mostrarFormulario);
    
    document.querySelector("#mnuBuscarCategoria").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarProducto").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarProductoPrecio").addEventListener("click", mostrarFormulario);
    
    document.querySelector("#mnuListarCategorias").addEventListener("click", mostrarListadoCategorias);
    document.querySelector("#mnuListarProducto").addEventListener("click", mostrarListadoProductos);

    //Botones 
    frmAltaCategoria.btnAceptarAltaCategoria.addEventListener("click", procesarAltaCategoria);
    frmAltaProducto.btnAceptarAltaProducto.addEventListener("click", procesarAltaProducto);
    
    frmBuscarCategoria.btnAceptarIdCategoria.addEventListener("click", procesarBuscarCategoria);
    frmBuscarProducto.btnAceptarBuscarNombreProducto.addEventListener("click", procesarBuscarProductoPorNombre);
    frmBuscarProductoPorPrecio.btnAceptarBuscarProductoPorPrecio.addEventListener("click", procesarBuscarProductoPorPrecio);
    
    frmEditarProducto.btnAceptarEditarProducto.addEventListener("click", procesarEditarProducto);
    frmEditarCategoria.btnAceptarEditarCategoria.addEventListener("click", procesarEditarCategoria);
}


// Ocultar todos los formularios
function ocultarFormulariosYListas() {
    //Ocultar formularios
    frmAltaCategoria.style.display = "none";
    frmAltaProducto.style.display = "none";
    frmBuscarCategoria.style.display = "none";
    frmBuscarProducto.style.display = "none";
    frmBuscarProductoPorPrecio.style.display = "none";
    frmEditarProducto.style.display = "none";
    frmEditarCategoria.style.display = "none";

    //Ocultar listas
    resultadoBusqueda.style.display = "none";
}

// Mostrar furmulario clicado
function mostrarFormulario(oEvento) {
    // Ocultar formularios (por si acaso)
    ocultarFormulariosYListas();

    // Opción de menú pulsada
    let opcionMenu = oEvento.target.id;

    switch (opcionMenu) {
        case "mnuAltaCategoria":
            frmAltaCategoria.style.display = "block";
            break;
        case "mnuAltaProducto":
            frmAltaProducto.style.display = "block";
            actualizarDesplegableCategoria(undefined);
            break;
        case "mnuBuscarCategoria":
            frmBuscarCategoria.style.display = "block";
            break;
        case "mnuBuscarProducto":
            frmBuscarProducto.style.display = "block";
            break;
        case "mnuBuscarProductoPrecio":
            frmBuscarProductoPorPrecio.style.display = "block";
            break;
    }
}

// PROCESOS DE BOTONES
// CATEGORIA
// Procesar alta de categoría
async function procesarAltaCategoria() {
    //Validar primero los campos
    if (validarAltaCategoria()) {
        let nombre = frmAltaCategoria.txtNombreCategoria.value.trim();
        let descripcion = frmAltaCategoria.txtDescripcionCategoria.value.trim();
        let estamontado = frmAltaCategoria.chkMontado.checked;

        let respuesta = await oTiendaMuebles.altaCategoria(new Categoria(null, nombre, descripcion, estamontado));

        alert(respuesta.mensaje);

        //Si no hay error: 
        if (!respuesta.error) {
            frmAltaCategoria.reset();
            frmAltaCategoria.style.display = "none";
        }
    }

}

function validarAltaCategoria() {
    //Recojo los campos a validar
    let nombre = frmAltaCategoria.txtNombreCategoria.value.trim();
    let descripcion = frmAltaCategoria.txtDescripcionCategoria.value.trim();

    //Variables de validación
    let valido = true;
    let errores = "";

    //Validación de campos
    if (nombre.length == 0) {
        errores += "El nombre de la categoría no puede estar vacío";
        valido = false;
    }

    if (descripcion.length == 0) {
        errores += "La descripción de la categoría no puede estar vacío";
        valido = false;
    }

    if (!valido) {
        //Tratar de cambiarlo por un modal o un toast
        alert(errores);
    }

    return valido;

}

// Procesar búsqueda de categoría
async function procesarBuscarCategoria() {
    //Validar el campo id
    if (validarBuscarCategoria()) {
        let idCategoria = parseInt(frmBuscarCategoria.txtIdCategoria.value.trim());
        //Buscar donde se inserta
        let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

        let respuesta = await oTiendaMuebles.buscarCategoria(idCategoria);

        if (!respuesta.error) {
            //Escribir el resultado en variable
            let tablaSalida = "<table class='table table-striped mt-5'><thead><tr><th class='text-center'>ID CATEGORÍA</th><th class='text-center'>NOMBRE</th><th class='text-center'>DESCRIPCIÓN</th><th class='text-center'>SE MANDA MONTADO</th><th class='text-center'>ACCIÓN</th></tr></thead>";
            tablaSalida += "<tbody><tr>";
            tablaSalida += "<td class='text-center'>" + respuesta.datos.idcategoria + "</td>";
            tablaSalida += "<td>" + respuesta.datos.nombre + "</td>";
            tablaSalida += "<td>" + respuesta.datos.descripcion + "</td>";
            tablaSalida += "<td class='text-center'>" + (respuesta.datos.estamontado == 1 ? "Sí" : "No") + "</td>";
            
            tablaSalida += "<td><input type='button' class='btn btn-primary mt-1 me-2' value='Editar' id='btnEditarCategoria' name='btnEditarCategoria' data-categoria='" + JSON.stringify(respuesta.datos) + "'>";
            tablaSalida += "<input type='button' class='btn btn-danger mt-1' value='Borrar' id='btnBorrarCategoria' name='btnBorrarCategoria' data-idcategoria='" + respuesta.datos.idcategoria + "'></td>";

            tablaSalida += "</tr></tbody></table>";

            //Se escribe la salida
            resultadoBusqueda.innerHTML = tablaSalida;
            resultadoBusqueda.style.display = "block";

            //Registrar evento para el botón borrar/editar una vez existe la tabla
            document.querySelector("#btnEditarCategoria").addEventListener("click", mostrarFormularioEdicionCategoria);
            document.querySelector("#btnBorrarCategoria").addEventListener("click", procesarBorrarCategoria);

        } else {
            resultadoBusqueda.innerHTML = respuesta.mensaje;
            resultadoBusqueda.style.display = "block";
        }
    }
}

function validarBuscarCategoria() {
    let idCategoria = parseInt(frmBuscarCategoria.txtIdCategoria.value.trim());

    //Variables de validación
    let valido = true;
    let errores = "";

    //Validación del campo
    if (isNaN(idCategoria)) {
        errores += "El campo id debe ser un número";
        valido = false;

    }

    return valido;
}

//Mostar listado de categorías
async function mostrarListadoCategorias() {
    // Ocultar formularios
    ocultarFormulariosYListas();

    //Buscar donde se inserta
    let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

    //Llamo a BD
    let respuesta = await oTiendaMuebles.getCategorias();

    if (!respuesta.error) {
        //Escribir el resultado en variable
        let tablaSalida = "<table class='table table-striped'><thead><tr><th class='text-center'>ID CATEGORÍA</th><th class='text-center'>NOMBRE</th><th class='text-center'>DESCRIPCIÓN</th><th class='text-center'>SE MANDA MONTADO</th></tr></thead>";
        tablaSalida += "<tbody><h3 class='text-center boldRegularFont mb-5'>Listado de Categorías</h3>";

        for (let categoria of respuesta.datos) {
            tablaSalida += "<tr><td class='text-center'>" + categoria.idcategoria + "</td>";
            tablaSalida += "<td>" + categoria.nombre + "</td>";
            tablaSalida += "<td>" + categoria.descripcion + "</td>";
            tablaSalida += "<td class='text-center'>" + (categoria.estamontado == 1 ? "Sí" : "No") + "</td></tr>";
        }

        tablaSalida += "</tbody></table>";

        //Se escribe la salida
        resultadoBusqueda.innerHTML = tablaSalida;
        resultadoBusqueda.style.display = "block";

    } else {
        resultadoBusqueda.innerHTML = respuesta.mensaje;
        resultadoBusqueda.style.display = "block";
    }

}
//Procesar borrar categoría 
async function procesarBorrarCategoria(oEvento) {
    let boton = oEvento.target;
    let idCategoria = boton.dataset.idcategoria;

    let respuesta = await oTiendaMuebles.borrarCategoria(idCategoria);

    if (!respuesta.error) {
        document.querySelector("#resultadoBusqueda").innerHTML = "Categoría borrada correctamente";
    }

}

//Procesar editar categoría
function mostrarFormularioEdicionCategoria(oEvento) {
    //Ocultar furmularios, cargar el formulario de edición y cargar los datos pasados por el botón en una variable
    ocultarFormulariosYListas();
    frmEditarCategoria.style.display = "block";
    let categoria = JSON.parse(oEvento.target.dataset.categoria);

    //Cargar los datos de la variable en los campos del formulario
    frmEditarCategoria.txtEditarIdCategoria.value = categoria.idcategoria;
    frmEditarCategoria.txtEditarNombreCategoria.value = categoria.nombre;
    frmEditarCategoria.txtEditarDescripcionCategoria.value = categoria.descripcion;
    frmEditarCategoria.chkEditarMontado.checked = categoria.estamontado;

}

async function procesarEditarCategoria() {
    //Recojo los campos del fomulario tanto se si han modificado como sino
    let idcategoria = parseInt(frmEditarCategoria.txtEditarIdCategoria.value.trim());
    let nombre = frmEditarCategoria.txtEditarNombreCategoria.value.trim();
    let descripcion = frmEditarCategoria.txtEditarDescripcionCategoria.value.trim();
    let estamontado = frmEditarCategoria.chkEditarMontado.checked;

    // Validar datos del formulario
    if (validarEditarCategoria()) {

        let respuesta = await oTiendaMuebles.editarCategoria(new Categoria(idcategoria, nombre, descripcion, estamontado));

        alert(respuesta.mensaje);

        if (!respuesta.error) {
            frmEditarCategoria.reset();
            frmEditarCategoria.style.display = "none";
        }
    }
}

function validarEditarCategoria() {
    //Recojo los campos a validar 
    let idcategoria = frmEditarCategoria.txtEditarIdCategoria.value.trim();
    let nombre = frmEditarCategoria.txtEditarNombreCategoria.value.trim();
    let descripcion = frmEditarCategoria.txtEditarDescripcionCategoria.value.trim();

    //Variables de validación
    let valido = true;
    let errores = "";

    //Validación de campos
    if (isNaN(idcategoria)) {
        errores += "El campo id debe ser un número";
        valido = false;
    }

    if (nombre.length == 0) {
        errores += "El campo nombre no puede estar vacío";
        valido = false;
    }

    if (descripcion.length == 0) {
        errores += "El campo descripción no puede estar vacío";
        valido = false;
    }

    if (!valido) {
        alert(errores);
    }

    return valido; 
}


//PRODUCTO
// Procesar alta de producto
async function procesarAltaProducto() {
    if (validarAltaProducto()) {
        let nombre = frmAltaProducto.txtNombreProducto.value.trim();
        let descripcion = frmAltaProducto.txtDescripcionProducto.value.trim();
        let precio = frmAltaProducto.txtPrecioProducto.value.trim();
        let idcategoria = frmAltaProducto.lstCategoria.value;

        let respuesta = await oTiendaMuebles.altaProducto(new Producto(null, nombre, descripcion, precio, idcategoria));

        alert(respuesta.mensaje);

        if (!respuesta.error) {
            frmAltaProducto.reset();
            frmAltaProducto.style.display = "none";
        }
    }
}

function validarAltaProducto() {
    //Recojo los campos a validar: 
    let nombre = frmAltaProducto.txtNombreProducto.value.trim();
    let descripcion = frmAltaProducto.txtDescripcionProducto.value.trim();
    let precio = parseInt(frmAltaProducto.txtPrecioProducto.value.trim());
    let idcategoria = parseInt(frmAltaProducto.lstCategoria.value);

    //Variables de validación
    let valido = true;
    let errores = "";

    //Validación de campos
    if (nombre.length == 0) {
        errores += "El campo nombre no puede estar vacío";
        valido = false;
    }

    if (descripcion.length == 0) {
        errores += "El campo descripción no puede estar vacío";
        valido = false;
    }

    if (isNaN(precio)) {
        errores += "El campo precio no puede estar vacío";
        valido = false;
    }

    if (isNaN(idcategoria)) {
        errores += "El campo categoría debe ser un número";
        valido = false;
    }

    if (!valido) {
        alert(errores);
    }

    return valido;

}

// Procesar búsqueda de producto por nombre
async function procesarBuscarProductoPorNombre() {
    if (validarBuscarProductoPorNombre()) {
        //Recojo el campo nombre
        let nombre = frmBuscarProducto.txtBuscarNombreProducto.value.trim();

        //Buscar donde se inserta
        let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

        //Llamo a BD
        let respuesta = await oTiendaMuebles.buscarProductoPorNombre(nombre)

        if (!respuesta.error) {
            //Escribir el resultado en variable
            let tablaSalida = "<table class='table table-striped mt-5'><thead><tr><th class='text-center'>ID PRODUCTO</th><th class='text-center'>NOMBRE</th><th class='text-center'>DESCRIPCIÓN</th><th class='text-center'>PRECIO</th><th class='text-center'>CATEGORÍA</th><th class='text-center'>ACCIÓN</th></tr></thead>";
            tablaSalida += "<tbody>";

            for (let producto of respuesta.datos) {
                tablaSalida += "<tr><td class='text-center'>" + producto.idproducto + "</td>";
                tablaSalida += "<td>" + producto.nombre + "</td>";
                tablaSalida += "<td>" + producto.descripcion + "</td>";
                tablaSalida += "<td class='text-center'>" + producto.precio + "€</td>";
                tablaSalida += "<td>" + producto.categoria + "</td>";
                //Botón de editar
                tablaSalida += "<td><input type='button' class='btn btn-primary me-2' value='Editar' name='btnEditarProducto' id='btnEditarProducto' data-producto='" + JSON.stringify(producto) + "'>";
                //Botón de borrar
                tablaSalida += "<input type='button' class='btn btn-danger' value='Borrar' name='btnBorrarProducto' id='btnBorrarProducto' data-idproducto='" + producto.idproducto + "'></td>";
                tablaSalida += "</tr>";
            }

            tablaSalida += "</tbody></table>";

            //Se escribe la salida
            resultadoBusqueda.innerHTML = tablaSalida;
            resultadoBusqueda.style.display = "block";

            //Registrar evento para el botón borrar/editar una vez existe la tabla
            document.querySelector("#btnEditarProducto").addEventListener("click", mostrarFormularioEdicionProducto);
            document.querySelector("#btnBorrarProducto").addEventListener("click", procesarBorrarProducto);

        } else {
            resultadoBusqueda.innerHTML = respuesta.mensaje;
            resultadoBusqueda.style.display = "block";
        }
    }
}

function validarBuscarProductoPorNombre() {
    let nombre = frmBuscarProducto.txtBuscarNombreProducto.value.trim();

    //Variables de validación
    let errores = "";
    let valido = true;

    //Validar campo
    if (nombre.length == 0) {
        errores += "El campo nombre no puede estar vacío";
        valido = false;
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}

//Procesar búsqueda de producto por precio 
async function procesarBuscarProductoPorPrecio() {
    if (validarProductosPorPrecio()) {
        //Recojo los campos 
        let precioMin = parseInt(frmBuscarProductoPorPrecio.txtPrecioMin.value.trim());
        let precioMax = parseInt(frmBuscarProductoPorPrecio.txtPrecioMax.value.trim());

        //Buscar donde se inserta
        let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

        //Llamo a BD
        let respuesta = await oTiendaMuebles.buscarProductoPorPrecio(precioMin, precioMax);

        if (!respuesta.error) {
            //Escribir el resultado en variable
            let tablaSalida = "<table class='table table-striped mt-5'><thead><tr><th class='text-center'>ID PRODUCTO</th><th class='text-center'>NOMBRE</th><th class='text-center'>DESCRIPCIÓN</th><th class='text-center'>PRECIO</th><th class='text-center'>CATEGORÍA</th></thead>";
            tablaSalida += "<tbody>";

            for (let producto of respuesta.datos) {
                tablaSalida += "<tr><td class='text-center'>" + producto.idproducto + "</td>";
                tablaSalida += "<td>" + producto.nombre + "</td>";
                tablaSalida += "<td>" + producto.descripcion + "</td>";
                tablaSalida += "<td class='text-center'>" + producto.precio + "€</td>";
                tablaSalida += "<td>" + producto.categoria + "</td>";
                tablaSalida += "</tr>";
            }

            tablaSalida += "</tbody></table>";

            //Se escribe la salida
            resultadoBusqueda.innerHTML = tablaSalida;
            resultadoBusqueda.style.display = "block";

        } else {
            resultadoBusqueda.innerHTML = respuesta.mensaje;
            resultadoBusqueda.style.display = "block";
        }
    }
}

function validarProductosPorPrecio() {
    let precioMin = parseInt(frmBuscarProductoPorPrecio.txtPrecioMin.value.trim());
    let precioMax = parseInt(frmBuscarProductoPorPrecio.txtPrecioMax.value.trim());

    //Variables de validación 
    let errores = "";
    let valido = true;

    if (isNaN(precioMin) && isNaN(precioMax)) {
        errores += "Al menos un campo debe estar relleno";
        valido = false;
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}

//Procesar borrar producto
async function procesarBorrarProducto(oEvento) {
    let boton = oEvento.target;
    let idProducto = boton.dataset.idproducto;

    let respuesta = await oTiendaMuebles.borrarProducto(idProducto);

    if (!respuesta.error) {
        document.querySelector("#resultadoBusqueda").innerHTML = "Producto borrado correctamente";
    }
}

//Procesar editar producto
function mostrarFormularioEdicionProducto(oEvento) {

    ocultarFormulariosYListas()
    frmEditarProducto.style.display = "block";
    let producto = JSON.parse(oEvento.target.dataset.producto);

    frmEditarProducto.txtIdProductoEditar.value = producto.idproducto;
    frmEditarProducto.txtNombreProductoEditar.value = producto.nombre;
    frmEditarProducto.txtDescripcionProductoEditar.value = producto.descripcion;
    frmEditarProducto.txtPrecioProductoEditar.value = producto.precio;
    actualizarDesplegableCategoria(producto.idcategoria);

}

async function procesarEditarProducto() {
    //Recojo los campos del fomulario tanto se si han modificado como sino
    let idproducto = frmEditarProducto.txtIdProductoEditar.value.trim();
    let nombre = frmEditarProducto.txtNombreProductoEditar.value.trim();
    let descripcion = frmEditarProducto.txtDescripcionProductoEditar.value.trim();
    let precio = frmEditarProducto.txtPrecioProductoEditar.value.trim();
    let idcategoria = frmEditarProducto.lstCategoriaEditar.value;

    // Validar datos del formulario
    if (validarEditarProducto()) {

        let respuesta = await oTiendaMuebles.editarProducto(new Producto(idproducto, nombre, descripcion, precio, idcategoria));

        alert(respuesta.mensaje);

        if (!respuesta.error) {
            frmEditarProducto.reset();
            frmEditarProducto.style.display = "none";
        }
    }
}

function validarEditarProducto() {
    //Recojo los campos del fomulario tanto se si han modificado como sino
    let idproducto = parseInt(frmEditarProducto.txtIdProductoEditar.value.trim());
    let nombre = frmEditarProducto.txtNombreProductoEditar.value.trim();
    let descripcion = frmEditarProducto.txtDescripcionProductoEditar.value.trim();
    let precio = parseInt(frmEditarProducto.txtPrecioProductoEditar.value.trim());
    let idcategoria = parseInt(frmEditarProducto.lstCategoriaEditar.value);

    //Variables de validación
    let valido = true;
    let errores = "";

    //Validación de campos
    if (isNaN(idproducto)) {
        errores += "El campo id debe ser un número";
        valido = false;
    }

    if (nombre.length == 0) {
        errores += "El campo nombre no puede estar vacío";
        valido = false;
    }

    if (descripcion.length == 0) {
        errores += "El campo descripción no puede estar vacío";
        valido = false;
    }

    if (isNaN(precio)) {
        errores += "El campo precio no puede estar vacío";
        valido = false;
    }

    if (isNaN(idcategoria)) {
        errores += "El campo categoría no puede estar vacío";
        valido = false;
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}

// Mostrar listado de productos 
function mostrarListadoProductos() {
    open("listado_producto.html");
}

//Actualizar los desplegables
async function actualizarDesplegableCategoria(categoriaSeleccionada) {
    //Petición al servidor de la categorías: 
    let respuesta = await oTiendaMuebles.getCategorias();

    //Con la respuesta, monto las opciones del desplegable: 
    let options = "";

    for (let categoria of respuesta.datos) {
        if (categoriaSeleccionada && categoriaSeleccionada == categoria.idcategoria) {
            options += "<option selected value='" + categoria.idcategoria + "'>" + categoria.nombre + "</option>";
        } else {
            options += "<option value='" + categoria.idcategoria + "'>" + categoria.nombre + "</option>";
        }
    }

    frmAltaProducto.lstCategoria.innerHTML = options;
    frmEditarProducto.lstCategoriaEditar.innerHTML = options;
}