<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$producto = json_decode($_POST['producto']);

$sql = "UPDATE producto
            SET nombre = '" . $producto->nombre . "', 
                descripcion = '" .  $producto->descripcion . "', 
                precio = $producto->precio, 
                idcategoria = $producto->idcategoria
            WHERE idproducto = $producto->idproducto;";
            
mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror", $conexion);

} else {
    
    responder(null, false, "Se ha modificado el producto", $conexion);
}
?>