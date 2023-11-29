<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idproducto = $_POST['idProducto'];

// SQL
$sql = "DELETE FROM producto WHERE idproducto = $idproducto;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);

?>