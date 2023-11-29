<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$categoria = json_decode($_POST['categoria']);
$estamontado = $categoria->estamontado ? 1 : 0; 

$sql = "UPDATE categoria
            SET nombre = '" . $categoria->nombre . "', 
                descripcion = '" .  $categoria->descripcion . "', 
                estamontado = $estamontado 
            WHERE idcategoria = $categoria->idcategoria;";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror", $conexion);
} else {

    responder(null, false, "Se ha modificado el categoria", $conexion);
}
?>