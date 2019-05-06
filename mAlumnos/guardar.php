<?php
//se manda llamar la conexion
include("../conexion/conexion.php");

$nocontrol = $_POST["nocontrol"];
$idCarrera = $_POST["idCarrera"];
$idPersona = $_POST["idPersona"];


 
$nocontrol   = trim($nocontrol);
$idCarrera   = trim($idCarrera);
$idPersona   = trim($idPersona);


$fecha=date("Y-m-d"); 
$hora=date ("H:i:s");

mysql_query("SET NAMES utf8");
 $insertar = mysql_query("INSERT INTO alumnos 
 								(
 								no_control,
 								id_carrera,
 								id_persona,
 								id_registro,
 								fecha_registro,
 								hora_registro,
 								activo
 								)
							VALUES
								(
								'$nocontrol',
								'$idCarrera ',
 								'$idPersona ',
 								'1',
 								'$fecha',
 								'$hora',
 								'1'
								)
							",$conexion)or die(mysql_error());

?>