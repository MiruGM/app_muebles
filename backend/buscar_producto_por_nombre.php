<?php
    require_once("config.php"); 

    $conexion = obtenerConexion();

    //Recoger parámetros de entrada: 
    $nombre = $_GET["nombre"];

    //Sentencia SQL
    $sql = "SELECT p.*, c.nombre AS categoria 
                FROM producto p, categoria c
                WHERE p.idcategoria = c.idcategoria
                    AND LOWER(p.nombre) LIKE LOWER('%$nombre%');";

    //Ejecutar la sentencia SQL
    $resultado = mysqli_query($conexion, $sql);

    //Resultados de la lista
    while($fila = mysqli_fetch_assoc($resultado)) {
        $datos[] = $fila;
    } 
    
    if ($datos) {
        responder($datos, false, "Datos Recuperados", $conexion);
    } else {
        responder(null, true, ("No hay productos con el nombre: " . $nombre), $conexion);
    }

?>