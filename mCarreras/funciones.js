function llenar_lista(){
     // console.log("Se ha llenado lista");
    preCarga(1000,4);
    $.ajax({
        url:"llenarLista.php",
        type:"POST",
        dateType:"html",
        data:{},
        success:function(respuesta){
            $("#lista").html(respuesta);
            $("#lista").slideDown("fast");
        },
        error:function(xhr,status){
            alert("no se muestra");
        }
    });	
}

function ver_alta(){
    preCarga(800,4);
    $("#lista").slideUp('low');
    $("#alta").slideDown('low');
    $("#nombre").focus();
}

function ver_lista(){
    $("#alta").slideUp('low');
    $("#lista").slideDown('low');
}

$('#btnLista').on('click',function(){
    llenar_lista();
    ver_lista();
});

$("#frmAlta").submit(function(e){
  
    var nombre    = $("#nombre").val();
    var abreviatura   = $("#abreviatura").val();
    var fecha_registro = $("#fecha_registro").val();
  

        $.ajax({
            url:"guardar.php",
            type:"POST",
            dateType:"html",
            data:{
                    'nombre':nombre,
                    'abreviatura':abreviatura,
                    'fecha_registro':fecha_registro,
                    
                 },
            success:function(respuesta){
              
            alertify.set('notifier','position', 'bottom-right');
            alertify.success('Se ha guardado el registro' );
            $("#frmAlta")[0].reset();
            $("#nombre").focus();
            // llenarLista();
            },
            error:function(xhr,status){
                alert(xhr);
            },
        });
        e.preventDefault();
        return false;
});

function abrirModalEditar(nombre,abreviatura,ide){
   
    $("#frmActuliza")[0].reset();
    $("#nombreE").val(nombre);
    $("#abreviaturaE").val(abreviatura);
    $("#ide").val(ide);

    $(".select2").select2();

    $("#modalEditar").modal("show");

     $('#modalEditar').on('shown.bs.modal', function () {
         $('#nombreE').focus();
     });   
}

$("#frmActuliza").submit(function(e){
  
    var nombre    = $("#nombreE").val();
    var abreviatura   = $("#abreviaturaE").val();
    var ide       = $("#idE").val();

        $.ajax({
            url:"actualizar.php",
            type:"POST",
            dateType:"html",
            data:{
                    'nombre':nombre,
                    'abreviatura':abreviatura,
                    'ide':ide 
                 },
            success:function(respuesta){

            alertify.set('notifier','position', 'bottom-right');
            alertify.success('Se ha actualizado el registro' );
            $("#frmActuliza")[0].reset();
            $("#modalEditar").modal("hide");
            llenar_lista();
            },
            error:function(xhr,status){
                alert(xhr);
            },
        });
        e.preventDefault();
        return false;
});

function status(consecutivo,id){
    var nomToggle="#interruptor"+consecutivo;
    var nomBoton="#boton"+consecutivo;
    var numero="#tConsecutivo"+consecutivo;
    var carrera="#tCarrera"+consecutivo;
    var abreviatura="#tabreviatura"+consecutivo;
   

//console.log(consecutivo);
//var nomBoton="#interruptor"+consecutivo;

if ($(nomToggle).is(':checked') ) {
    console.log("activo");
    var valor=0;
    alertify.success('Registro habilitado');
      $(nomBoton).removeAttr("disabled");

      //Es para el lado del cliente
      $(numero).removeAttr("desabilita");
      $(carrera).removeAttr("desabilita");
      $(abreviatura).removeAttr("desabilita");
     
      
}else{
    console.log("desactivado");
    var valor=1;
     alertify.error('Registro dehabilitado');
      $(nomBoton).attr("disabled", "disabled" );
      $(numero).addClass("desabilita");
      $(carrera).addClass("desabilita");
      $(abreviatura).addClass("desabilita");

    

    }

 //console.log(consecutivo+' | '+id);
     $.ajax({
            url:"status.php",
            type:"POST",
            dateType:"html",
            data:{
                    'valor':valor,
                    'id':id
                    
                 },
            success:function(respuesta){
            //console.log(respuesta);
            alertify.set('notifier','position', 'bottom-right');
            alertify.success('Se ha actualizado el registro' );
            $("#frmActuliza")[0].reset();
            $("#modalEditar").modal("hide");
            llenar_lista();
            },
            error:function(xhr,status){
                alert(xhr);
            },
        });

}