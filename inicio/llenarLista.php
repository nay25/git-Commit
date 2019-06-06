<?php 
// Conexion a la base de datos
include'../conexion/conexion.php';

// Codificacion de lenguaje
mysql_query("SET NAMES utf8");

$fecha1=$_POST["fecha1"];
$fecha2=$_POST["fecha2"];

// Consulta a la base de datos
$consulta=mysql_query("SELECT registros.id_registros, 
 							  registros.id_alumno,
 							  registros.id_persona,
 							  registros.no_control,
								(SELECT personas.nombre FROM personas WHERE personas.id_persona=registros.id_persona)AS nAlumno,
                				(SELECT personas.ap_paterno FROM personas WHERE personas.id_persona=registros.id_persona)AS pAlumno, 
								(SELECT personas.ap_materno FROM personas WHERE personas.id_persona=registros.id_persona)AS mAlumno,
								(SELECT carreras.nombre FROM carreras WHERE alumnos.id_carrera=carreras.id_carrera)AS Carrera,   
								registros.fecha_ingreso, 
								registros.hora_ingreso ,
								registros.fecha_salida, 
								registros.hora_salida
								FROM registros 
								INNER JOIN alumnos on registros.id_alumno=alumnos.id_alumno 
								INNER JOIN carreras on alumnos.id_carrera=carreras.id_carrera  
								WHERE registros.fecha_ingreso BETWEEN '$fecha1' AND '$fecha2' ORDER BY registros.hora_ingreso DESC",$conexion)or die 
								 (mysql_error());
// $row=mysql_fetch_row($consulta)

 //BETWEEN=Entre
								 
 ?>
				            <div class="table-responsive">
				                <table id="example1" class="table table-responsive table-condensed table-bordered table-striped">

				                    <thead align="center">
				                      <tr class="info" >
				                        <th>#</th>
				                        <th>NOMBRE</th>
				                        <th>MATRICULA</th>
				                        <th>CARRERA</th>
				                        <th>FECHA INGRESO</th>
				                        <th>HORA INGRESO</th>
				                        <th>HORA SALIDA</th>
				                      </tr>
				                    </thead>

				                    <tbody align="center">
				                    <?php 
				                    $n=1;
				                    while ($row=mysql_fetch_row($consulta)) {
										$idregistros   = $row[0];
										$idpersona =$row[1];
										$idalumno=$row[2];
										$nombre = $row[5].' '.$row[6].' '.$row[4];
										$matricula     = $row[3];
										$Carrera       = $row[7];
										$fechaingreso  = $row[8];
										$horaingreso   = $row[9];
										$horasalida    = $row[11];
										?>
				                      <tr>
				                      	<td><?php echo "$n"; ?>	
				                      	</td>
				                        <td>
											
				                          	<?php echo $nombre; ?>
				                         
				                        </td>
				                        <td>
											
				                          	<?php echo $matricula; ?>
				                          
				                        </td>

				                          <td>
											
				                          	<?php echo $Carrera; ?>
				                         
				                        </td>
				                        <td>
											
				                          	<?php echo $fechaingreso; ?>
				                         
				                        </td>
				                        <td>
											
				                          	<?php echo $horaingreso; ?>
				                          	
										</td>
										</td>
				                        <td>
											
				                          	<?php echo $horasalida; ?>
				                         	
										</td>
				                        </td>
				                      </tr>
				                      <?php
				                      $n++;
				                    }
				                     ?>

				                    </tbody>

				                    <tfoot align="center">
				                      <tr class="info">
				                       <th>#</th>
				                        <th>NOMBRE</th>
				                        <th>MATRICULA</th>
				                        <th>CARRERA</th>
				                        <th>FECHA INGRESO</th>
				                        <th>HORA INGRESO</th>
				                        <th>HORA SALIDA</th>
				                      </tr>
				                    </tfoot>
				                </table>
				            </div>
			
      <script type="text/javascript">
        $(document).ready(function() {
              $('#example1').DataTable( {
                 "language": {
                         // "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                          "url": "../plugins/datatables/langauge/Spanish.json"
                      },
                 "order": [[ 0, "asc" ]],
                 "paging":   true,
                 "ordering": true,
                 "info":     true,
                 "responsive": true,
                 "searching": true,
                 stateSave: false,
                  dom: 'Bfrtip',
                  lengthMenu: [
                      [ 10, 25, 50, -1 ],
                      [ '10 Registros', '25 Registros', '50 Registros', 'Todos' ],
                  ],
                 columnDefs: [ {
                      // targets: 0,
                      // visible: false
                  }],
                  buttons: [
                            {
                                extend: 'pageLength',
                                text: 'Registros',
                                className: 'btn btn-default'
                            },
                          {
                              extend: 'excel',
                              text: 'Exportar a Excel',
                              className: 'btn btn-default',
                              title:'Bajas-Estaditicas',
                              exportOptions: {
                                  columns: ':visible'
                              }
                          },
                      
                  ]
              } );
          } );

      </script>
      .

















    
    
