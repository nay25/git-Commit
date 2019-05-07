<?php
//se manda llamar la conexion
include("../conexion/conexion.php");

$no_control    = $_POST["no_control"];
$id_carrera    = $_POST["id_carrera"];
$id_persona    = $_POST["id_persona"];
$ide           = $_POST["ide"];

$no_control    =trim($no_control);
$id_carrera   =trim($id_carrera);
$id_persona   =trim($id_persona);


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