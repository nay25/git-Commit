<?php
//se manda llamar la conexion
include("../conexion/conexion.php");

$nombre    = $_POST["nombre"];
$paterno   = $_POST["paterno"];
$materno   = $_POST["materno"];
$direccion = $_POST["direccion"];
$telefono  = $_POST["telefono"];
$correo    = $_POST["correo"];
$tipo      = $_POST["tipo"];
$sexo      = $_POST["sexo"];
$ide       = $_POST["ide"];

$nombre    =trim($nombre);
$paterno   =trim($paterno);
$materno   =trim($materno);
$direccion =trim($direccion);
$telefono  =trim($telefono);
$correo    =trim($correo);
$tipo      =trim($tipo);
$sexo      =trim($sexo);

$fecha=date("Y-m-d"); 
$hora=date ("H:i:s");

mysql_query("SET NAMES utf8");
 $insertar = mysql_query("UPDATE alumnos SET
							id_carrera='$id_carrera',
							no_control ='$no_control',
							id_persona ='id_persona',
							fecha_registro='$fecha',
							hora_registro='$hora',
							id_registro='1'
						WHERE id_alumno='$ide'
							 ",$conexion)or die(mysql_error());

?>