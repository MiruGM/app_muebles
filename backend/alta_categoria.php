<?php
    include_once("config.php");
    $conexion = obtenerConexion();

    //Recoger Datos
    $tipo = $_POST["nombre"];
    $descripcion = $_POST["descripcion"];
    $estamontado = $_POST["estamontado"];

    //Sentencia SQL
    $sql = "INSERT INTO categoria VALUES (NULL, '$tipo', '$descripcion', $estamontado);";

    //Ejecutar sentencia SQL
    mysqli_query($conexion, $sql); 

    if (mysqli_errno($conexion) != 0) {
        $numerror = mysqli_errno($conexion);
        $descrerror = mysqli_error($conexion);

        responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror", $conexion);
        
    } else {
        responder(null, false, "Inserción correcta", $conexion);
    }
?>