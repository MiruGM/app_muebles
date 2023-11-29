<?php
    include_once("config.php");
    $conexion = obtenerConexion();

    //Sentencia SQL
    $sql = "SELECT * FROM categoria;";

    $resultado = mysqli_query($conexion, $sql);

    while($fila = mysqli_fetch_assoc($resultado)){
        $datos[] = $fila;
    }

    responder($datos, false, "Datos Recuperados", $conexion); 
?>