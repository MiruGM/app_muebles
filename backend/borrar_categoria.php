<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idcategoria = $_POST['idcategoria'];

// SQL
$sql = "DELETE FROM categoria WHERE idcategoria = $idcategoria;";

$resultado = mysqli_query($conexion, $sql);

responder(null, false, "Datos eliminados", $conexion);

?>