<?php
    require_once("config.php"); 

    $conexion = obtenerConexion();

    //Recoger parámetros de entrada: 
    $preciomin = $_GET["precioMin"];
    $preciomax = $_GET["precioMax"];

    //Sentencia SQL
    $sql = "SELECT p.*, c.nombre AS categoria 
                FROM producto p, categoria c
                WHERE p.idcategoria = c.idcategoria
                    AND p.precio >= $preciomin
                    AND p.precio <= $preciomax
                ORDER BY p.precio ASC;";

    //Ejecutar la sentencia SQL
    $resultado = mysqli_query($conexion, $sql);

    //Resultados de la lista
    while($fila = mysqli_fetch_assoc($resultado)) {
        $datos[] = $fila;
    } 
    
    if ($datos) {
        responder($datos, false, "Datos Recuperados", $conexion);
    } else {
        responder(null, true, ("No hay productos en ese rango de precio"), $conexion);
    }

?>