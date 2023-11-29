<?php
    include_once("config.php");
    $conexion = obtenerConexion();

    //Sentencia SQL
    $sql = "SELECT p.* , c.nombre AS categoria
                FROM producto p, categoria c
                WHERE p.idcategoria = c.idcategoria;";

    $resultado = mysqli_query($conexion, $sql);

    while($fila = mysqli_fetch_assoc($resultado)){
        $datos[] = $fila;
    }

    responder($datos, false, "Datos Recuperados", $conexion); 
?>