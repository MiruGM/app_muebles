<?php
    require_once("config.php"); 

    $conexion = obtenerConexion();

    //Recoger parámetros de entrada: 
    $idcategoria = $_GET["idCategoria"];

    //Sentencia SQL
    $sql = "SELECT * FROM categoria WHERE idcategoria = $idcategoria;";

    //Ejecutar la sentencia SQL
    $resultado = mysqli_query($conexion, $sql);

    //Sólo debe devolver un resultado: 
    $fila = mysqli_fetch_assoc($resultado); 
    
    if ($fila) {
        responder($fila, false, "Datos Recuperados", $conexion);
    } else {
        responder(null, true, "No existe una categoría con ese ID", $conexion);
    }

?>