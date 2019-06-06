<?php
//se manda llamar la conexion
include("../conexion/conexion.php");

$matricula = $_POST["matricula"];

$fecha=date("Y-m-d"); 
$hora=date ("H:i:s");
$fecha_salida='null';

mysql_query("SET NAMES utf8")
$filtroA=mysql_query("SELECT id_alumno FROM alumnos WHERE no_control = $matricula", $conexion)or die (mysql_error());
WHILE ($row=mysql_fetch_array($filtroA))
{
	$id_alumno= $row["id_alumno"];
}

 $insertar = mysql_query("INSERT INTO registros 
 								(
 								id_alumno,
 								matricula,
 								fecha_ingreso,
 								hora_ingreso,
 								fecha_salida
 								)
							VALUES
								(
								'$idAlumno',
 								'$matricula',
 								'$fecha',
 								'$hora',
 								'$fecha_salida'
								)
							",$conexion)or die(mysql_error());
 				

?>