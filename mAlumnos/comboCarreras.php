<?php
include "../conexion/conexion.php";
mysql_query("SET NAMES utf8");
$consulta = mysql_query("SELECT
							carreras.id_carrera,
							CONCAT(carreras.nombre) AS 	carreras
							FROM
							alumnos
							RIGHT JOIN carreras ON alumnos.id_carrera = carreras.id_carrera
							WHERE  ISNULL(id_alumno)
							AND carreras.activo=1
							ORDER BY carreras.id_carrera ASC",$conexion)or die(mysql_error());
?>
    <option value="0">Seleccione...</option>
<?php
while($row = mysql_fetch_row($consulta))
{  
	?>
    	<option value="<?php echo $row[0];?>"><?php echo $row[1];?></option>
	<?php
}
?>
<script>
 $("#idCarrera").select2();
</script>