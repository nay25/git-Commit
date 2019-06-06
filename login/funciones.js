function entrando(){
    window.location='../inicio/index.php';
}

function cambioContra(){
    $("#cuerpo").hide();
    $("#cambiarContra").fadeIn('low');
    alertify.warning("Debes de cambiar tu contraseña , ya que es tu primer ingreso al sistema",3);
    $("#vContra1").val('');
    $("#vContra2").val('');
    $("#vContra1").focus();
}

$("#frmIngreso").submit(function(e){
    var usuario,contra;
    var usuario = $("#username").val();
    var contra  = $("#pass").val();
    var usuario=usuario.trim();
    
    // contra=contra.trim();
    if(usuario=='' || contra==''){
        alertify.dialog('alert').set({transition:'zoom',message: 'Transition effect: zoom'}).show();

        alertify.alert()
        .setting({
            'title':'Acceso denegado',
            'label':'Aceptar',
            'message': 'Debes de colocar nombre de usuario y contraseña' ,
            'onok': function(){ 
                alertify.message('Gracias !');
                $("#username").val('');
                $("#pass").val('');
                $("#username").focus();
            }
        }).show();
        return false;    
    }else{
        $.ajax({
            url:"verificar.php",
            type:"POST",
            dateType:"html",
            data:{
                    'usuario':usuario,
                    'contra':contra
                 },
            success:function(respuesta){
              console.log(respuesta);
              respuesta=parseInt(respuesta);
              switch(respuesta){
                  case 0 :
                        alertify.dialog('alert').set({transition:'zoom',message: 'Transition effect: zoom'}).show();

                        alertify.alert()
                        .setting({
                            'title':'Acceso denegado',
                            'label':'Aceptar',
                            'message': 'Nombre de usuario o contraseña incorrectos' ,
                            'onok': function(){ 
                                alertify.message('Gracias !');
                                $("#username").val('');

                            }
                        }).show();   
                    break;
                  case 1 :
                        var valorChk=$('#chkContra').val();
                        if(valorChk=='si'){
                            cambioContra();
                            $("#usuario").val(usuario);                       
                        }else{
                            alertify.success('Ingresando....') ; 
                            preCarga(2000,2);
                            setInterval(entrando, 2000);
                    }
                    break;
                  case 2 :
                        cambioContra();
                        $("#usuario").val(usuario);

                    break;
              }

            },
            error:function(xhr,status){
                alert(xhr);
            },
        });
    } 
        e.preventDefault();
        return false;
});

function evaluarCheck(valor){
    
    if(valor=='no'){
        $('#chkContra').val('si');
    }else{
        $('#chkContra').val('no');
    }

    console.log(valor);
   
}

function cancelar(){
        // console.log("Saliendo del sistema...")
        alertify.confirm('alert').set({transition:'zoom',message: 'Transition effect: zoom'}).show();
        alertify.confirm(
            'Sistema de Registro de Alumnos', 
            '¿ Deseas cancelar el cambio de contraseña?', 
            function(){ 
                $("#cuerpo").fadeIn();
                $("#cambiarContra").hide('low'); 
                $("#frmIngreso")[0].reset();   
                $("#frmCambiar")[0].reset();    
                $("#username").focus();      
                }, 
            function(){ 
                    alertify.error('Cancelar') ; 
                    console.log('cancelado')}
        ).set('labels',{ok:'Si',cancel:'No'});
}



 function registros(){
       // console.log("Saliendo del sistema...")
        $("#registros").fadeIn('low');
        $("#cuerpo").hide(); 
        $("#matricula").focus(); 
}

$("#frmCambiar").submit(function(e){
  
     var usuario= $("#usuario").val();
     var contra =$("#vContra1").val();
     var vContra = $("#vContra2").val();

    // validacion para que las contraseñas coincidan
    if(contra != vContra){
        alertify.dialog('alert').set({transition:'zoom',message: 'Transition effect: zoom'}).show();

        alertify.alert()
        .setting({
            'title':'Información',
            'label':'Salir',
            'message': 'Las contraseñas deben de ser iguales.' ,
            'onok': function(){ alertify.message('Gracias !');}
        }).show();
        //$("#contraR").focus();
        return false;       
    }
    //alert(contra);


  //var ide = $("#ide").val();

  //alert(ide);
        $.ajax({
            url:"actualizar.php",
            type:"POST",
            dateType:"html",
            data:{
                    'contra':contra,
                    'usuario':usuario,
                 
                 },
            success:function(respuesta){
              
            alertify.set('notifier','position', 'bottom-right');
            alertify.success('Se ha actualizado el registro' );
            $("#frmCambiar")[0].reset();
            entrando();
            
            },
            error:function(xhr,status){
                alert(xhr);
            },
        });
        e.preventDefault();
        return false;
});


(function(){
    var actualizarHora = function(){
        var fecha = new Date() ,
            horas = fecha.getHours(),
            ampm,
            minutos = fecha.getMinutes(),
            segundos = fecha.getSeconds(),
            diaSemana = fecha.getDay(),
            dia = fecha.getDate(),
            mes = fecha.getMonth(),
            year = fecha.getFullYear();

        var pHoras = document.getElementById('horas'),
            pAMPM = document.getElementById('ampm');
            pMinutos = document.getElementById('minutos');
            pSegundos = document.getElementById('segundos');
            pDiaSemana = document.getElementById('diaSemana');
            pDia = document.getElementById('dia');
            pMes = document.getElementById('mes');
            pYear = document.getElementById('year');

         var semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
         pDiaSemana.textContent = semana[diaSemana];

         pDia.textContent = dia;

          var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Ágosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
          pMes.textContent = meses[mes];

          pYear.textContent = year;


          if (horas >= 12) {//condicional
            horas = horas - 12;
            ampm = 'PM';

          }else{
            ampm = 'AM';
          }

          if (horas == 0) {
            horas = 12;
          };

          pHoras.textContent = horas;
          pAMPM.textContent = ampm;

          if (minutos < 10) { minutos = '0' + minutos }; //Cadena de texto

          if (segundos < 10) { segundos = '0' + segundos}


          pMinutos.textContent = minutos;
          pSegundos.textContent = segundos;


    };
    actualizarHora();
    var intervalo = setInterval(actualizarHora, 1000)
}())

function salir(){
        // console.log("Saliendo del sistema...")
      alertify.confirm('alert').set({transition:'zoom',message: 'Transition effect: zoom'}).show();
        alertify.confirm(
            'Sistema de Registro de Alumnos', 
            '¿ Deseas volver al login?', 
            function(){ 
                $("#cuerpo").fadeIn();
                $("#registros").hide('low'); 
               // $("#frmIngreso")[0].reset();   
                $("#frmRegistrar")[0].reset();    
                $("#username").focus();      
                }, 
            function(){ 
                    alertify.error('Cancelar') ; 
                    console.log('cancelado')}
        ).set('labels',{ok:'Si',cancel:'No'});
}


$("#frmRegistrar").on('keypress',function(e){
    if (e.which ==13) {
        //variables
        var matricula=$("#matricula").val();
     //   var img $("#imgPersona").val();
         $.ajax({
            url:"ver_matricula.php",
            type:"POST",
            dateType:"html",
            data:{
                    'matricula':matricula,
                 },
            success:function(respuesta){
              
              console.log(respuesta);
          
              if (respuesta.split(",")[0]!='') {
                $("#ES").val(respuesta.split(",")[0]);
                $("#descripcion").val(respuesta.split(",")[1]);
                $("#nombre").val(respuesta.split(",")[2]);
                $("#carrera").val(respuesta.split(",")[3]);
                $("#img").attr("src","../images/"+matricula+".jpg");

                var nombre=respuesta.split(",")[2];
                var situacion=respuesta.split(",")[0];
                hablar(nombre,situacion);
                 $("#matricula").val('');

                 setTimeout(limpiar,5000);
                  alertify.set('notifier','position', 'bottom-right');
                  alertify.success('Registro concreto' );
              }else{
                    alertify.dialog('alert').set({transition:'zoom',message: 'Transition effect: zoom'}).show();
                    alertify.alert()
                    .setting({
                    'title':'Operacion denegada',
                    'label':'Aceptar',
                    'message': 'Esta matricula ya existe.',
                    'onok': function(){ 
                    alertify.message('Gracias !');
                    $("#matricula").val('');
                    $("matricula").focus();
                }
                  
                    }).show();
              }
            },
            error:function(xhr,status){
                alert(xhr);
            },
        });
        e.preventDefault();
        return false;
    }
  });

function limpiar(){
    $("#descripcion").val('');
    $("#nombre").val('');
    $("#ES").val('');
    $("#carrera").val('');

    //Imagen
    $("#img").attr("src","../images/logo.jpg");

}

function hablar(nombre,situacion){
    var nombre=nombre.toString();
    var situacion=situacion.toString();

//Texto de lo que va a decir
    responsiveVoice.speak("El alumno "+ nombre +" ha registrado una" + situacion , "Spanish Female");
}