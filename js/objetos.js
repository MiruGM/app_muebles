class Categoria {
    constructor(idcategoria, nombre, descripcion, estamontado) {
        this.idcategoria = idcategoria;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estamontado = estamontado;
    }
}

class Producto {
    constructor(idproducto, nombre, descripcion, precio, idcategoria) {
        this.idproducto = idproducto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.idcategoria = idcategoria;
    }
}

class TiendaMuebles {
    //Funciones de Categoria
    async altaCategoria(oCategoria) {
        let datos = new FormData();

        datos.append("nombre", oCategoria.nombre);
        datos.append("descripcion", oCategoria.descripcion);
        datos.append("estamontado", oCategoria.estamontado);

        let respuesta = await peticionPOST("alta_categoria.php", datos);

        return respuesta;
    }

    async buscarCategoria(idCategoria) {
        let datos = new FormData();

        datos.append("idCategoria", idCategoria);

        let respuesta = await peticionGET("buscar_categoria.php", datos);

        return respuesta;
    }

    async getCategorias() {
        let datos = new FormData();

        let respuesta = await peticionGET("get_categorias.php", datos);

        return respuesta;
    }

    async borrarCategoria(idCategoria) {
        let datos = new FormData();

        datos.append("idcategoria", idCategoria);

        let respuesta = await peticionPOST("borrar_categoria.php", datos);

        return respuesta; 
    }

    async editarCategoria(oCategoria) {

        let datos = new FormData();

        datos.append("categoria", JSON.stringify(oCategoria));
       
        let respuesta = await peticionPOST("editar_categoria.php", datos);

        return respuesta;
    }

    //Funciones de Producto
    async altaProducto(oProducto) {
        let datos = new FormData();

        datos.append("nombre", oProducto.nombre);
        datos.append("descripcion", oProducto.descripcion);
        datos.append("precio", oProducto.precio);
        datos.append("idcategoria", oProducto.idcategoria);

        let respuesta = await peticionPOST("alta_producto.php", datos);

        return respuesta;
    }

    async buscarProductoPorNombre(nombre) {
        let datos = new FormData();

        datos.append("nombre", nombre);

        let respuesta = await peticionGET("buscar_producto_por_nombre.php", datos);

        return respuesta;
    }

    async buscarProductoPorPrecio(precioMin, precioMax) {
        let datos = new FormData();
        let respuesta;

        if (precioMin && !precioMax) {

            datos.append("precioMin", precioMin);
            respuesta = await peticionGET("buscar_producto_por_precio_min.php", datos);

        } else if (!precioMin && precioMax) {

            datos.append("precioMax", precioMax);
            respuesta = await peticionGET("buscar_producto_por_precio_max.php", datos);

        } else {

            datos.append("precioMin", precioMin);
            datos.append("precioMax", precioMax);
            respuesta = await peticionGET("buscar_producto_por_rango_precio.php", datos);

        }

        return respuesta;
    }

    async getProductos() {

        let datos = new FormData();
        let respuesta = await peticionGET("get_productos.php", datos);

        let listado = "";

        if (respuesta.error) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado += "<thead><tr><th class='text-center'>ID PRODUCTO</th><th class='text-center'>PRODUCTO</th><th class='text-center'>DESCRIPCIÓN</th><th class='text-center'>PRECIO</th><th class='text-center'>CATEGORÍA</th></tr></thead>";
            listado += "<tbody>";

            for (let producto of respuesta.datos) {
                listado += "<tr><td class='text-center'>" + producto.idproducto + "</td>";
                listado += "<td>" + producto.nombre + "</td>";
                listado += "<td>" + producto.descripcion + "</td>";
                listado += "<td class='text-center'>" + producto.precio + "€</td>";
                listado += "<td>" + producto.categoria + "</td></tr>";
            }
            listado += "</tbody></table>";
        }
        return listado;
    }

    async borrarProducto(idProducto) {
        let datos = new FormData();

        datos.append("idProducto", idProducto);

        let respuesta = await peticionPOST("borrar_producto.php", datos);

        return respuesta;
    }

    async editarProducto(oProducto) {
        let datos = new FormData();

        datos.append("producto", JSON.stringify(oProducto));

        let respuesta = await peticionPOST("editar_producto.php", datos);

        return respuesta;
    }
}