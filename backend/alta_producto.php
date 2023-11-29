<?php
    include_once("config.php");
    $conexion = obtenerConexion();

    //Recoger Datos
    $nombre = $_POST["nombre"];
    $descripcion = $_POST["descripcion"];
    $precio = $_POST["precio"];
    $idcategoria = $_POST["idcategoria"];


    //Sentencia SQL
    $sql = "INSERT INTO producto VALUES (NULL, '$nombre', '$descripcion', $precio, $idcategoria);";

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