nombreProfesional  = 'Omar Hernando Jimenez Arrieta';
emailProfesional   = 'Omar Hernando Jimenez Arrieta';

/* init MATERIALIZECSS */
$('.sidenav').sidenav();
$('.collapsible').collapsible();
$('.tabs').tabs();
$('.modal').modal();
$('.fixed-action-btn').floatingActionButton({
  hoverEnabled: false,
});

{
    
    // VARIABLES GESTION EN SOSTENIBILIDAD AMBIENTAL    
    sumaGestionAmbiental = null;
    sumaGesRecNat =null;
    sumaCambioClimatico = null;
    sumaCulturaAmbiental = null;
    sumaOtrasEstrategias = null;

    sumaGestionAmbientalUSU = null;
    sumaGesRecNatUSU =null;
    sumaCambioClimaticoUSU = null;
    sumaCulturaAmbientalUSU = null;
    sumaOtrasEstrategiasUSU = null;

    // VARIABLES ALINEASIÓN USAID
    sumaOperaciones = null;
    sumaMonitoreoEva = null;
    sumaDiseñoPlanificacion = null;
    sumaCierre = null;

    sumaOperacionesUSU = null;
    sumaMonitoreoEvaUSU = null;
    sumaDiseñoPlanificacionUSU = null;
    sumaCierreUSU = null;

    arrayCierrePISCICOLAS = [];
    objCierreBrechas = null;

    date = new Date();
    fechaRegistro = date.toLocaleDateString();  

    generarID = () => {
      var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
          var contraseña = "";
          for (i=0; i<10; i++) contraseña +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
          return contraseña
    }  

    idEncuesta = generarID();
}

alCargar = async () => {

    { /* PARA CARGAR LA FECHA ACTUAL */
        var fecha = new Date(); //Fecha actual
        var mes = fecha.getMonth() + 1; //obteniendo mes
        var dia = fecha.getDate(); //obteniendo dia
        var ano = fecha.getFullYear(); //obteniendo año
        if (dia < 10)
            dia = '0' + dia; //agrega cero si el menor de 10
        if (mes < 10)
            mes = '0' + mes //agrega cero si el menor de 10
        document.getElementById('fechaDiligenciamiento').value = ano + "-" + mes + "-" + dia;

        LaFechaRegistro = new Date($('#fechaDiligenciamiento').val());
        day = LaFechaRegistro.getDate() + 1;
        month = LaFechaRegistro.getMonth() + 1;
        year = LaFechaRegistro.getFullYear();
        fechaPDF = [day, month, year].join('_');
        
    }

    document.getElementById("nombreProfesional").innerHTML = nombreProfesional;
    document.getElementById("nombreProfesional2").innerHTML = nombreProfesional;    
    document.getElementById("emailProfesional").innerHTML = emailProfesional;

    /* CONSULTANDO PARA MOSTRAR */
    var db = new Dexie("bd_avancemosPISCICOLAS");
          db.version(1).stores({
              tblPiscicola: '++id, org_nombreOrganizacion, org_nit',
              tblCierreBrechaPiscicola: "++id, org_nombreOrganizacion, org_nit"              
          });

          const tablaPiscicola = await db.tblPiscicola.toArray();

          
          var encuestasPiscicolasDigitadas = document.querySelector('#encuestasPiscicolasDigitadas');    

          var contador = 1;
          encuestasPiscicolasDigitadas.innerHTML = ''
                  for(let valor of tablaPiscicola){
                      /* console.log(valor.nombre) */
                      encuestasPiscicolasDigitadas.innerHTML += `                
                      <tr>
                          <th scope="row">${ contador++ }</th>
                          <td>${ valor.org_fechaDiligenciamiento }</td>
                          <td>${ valor.org_nombreOrganizacion }</td>                      
                          <td>${ valor.totalGestSostAmbiental }%</td>
                          <td>${ valor.totalAlineasionUSAID }%</td>
                          <td>${ valor.totalEncuestaFINAL }%</td>                      
                      </tr>                
                      `
                  }


          //console.log(tablaPiscicola);
   
}

{ //*****************PRIMER BLOQUE IGUAL PARA AMBAS ENCUESTAS
  $('.validaGestionAmbiental').click((e) => {


    e.preventDefault();
   // Obtengo los valores de los inputs  y se convierten en variables globales

   nombreOrganizacion     =  $('#nombreOrganizacion').val();
   ubicacion              =  $('#ubicacion').val();
   nit                    =  $('#nit').val();
   telefono               =  $('#telefono').val();
   email                  =  $('#email').val();
   representante          =  $('#representante').val();
   categoria              =  $('#categoria').val();
   fechaDiligenciamiento  =  $('#fechaDiligenciamiento').val();

   ga1 = parseFloat($('input:radio[name=ga1]:checked').val());
   ga2 = parseFloat($('input:radio[name=ga2]:checked').val());
   ga3 = parseFloat($('input:radio[name=ga3]:checked').val());
   ga4 = parseFloat($('input:radio[name=ga4]:checked').val());
   ga5 = parseFloat($('input:radio[name=ga5]:checked').val());

       
   // Valido que no esten vacias
   GestionAmbientalVacias = 0;

    if (nombreOrganizacion == null || nombreOrganizacion == "") {
      M.toast({
        html:
          "El nombre de la organización en el bloque de IDENTIFICACIÓN DE LA EMPRESA esta sin diligenciar",
        classes: "red",
      });
      GestionAmbientalVacias++;
    }

    if (ubicacion == null || ubicacion == "" ) {
      M.toast({
        html:
          "La ubicación de la ubicación en el bloque de IDENTIFICACIÓN DE LA EMPRESA esta sin diligenciar",
        classes: "red",
      });
      GestionAmbientalVacias++;
    }

    if (categoria == null || categoria == "" ) {
      M.toast({
        html:
          "La categoria en el bloque de IDENTIFICACIÓN DE LA EMPRESA esta sin diligenciar",
        classes: "red",
      });
      GestionAmbientalVacias++;
    }

    if (fechaDiligenciamiento == null || fechaDiligenciamiento == "" ) {
      M.toast({
        html:
          "La fecha en el bloque de IDENTIFICACIÓN DE LA EMPRESA esta sin diligenciar",
        classes: "red",
      });
      GestionAmbientalVacias++;
    }



    if (ga1 == null || ga1 =="" || isNaN(ga1)){M.toast({html: 'La pregunta 1 de GESTIÓN AMBIENTAL esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); GestionAmbientalVacias++}
    if (ga2 == null || ga2 =="" || isNaN(ga2)){M.toast({html: 'La pregunta 2 de GESTIÓN AMBIENTAL esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); GestionAmbientalVacias++}
    if (ga3 == null || ga3 =="" || isNaN(ga3)){M.toast({html: 'La pregunta 3 de GESTIÓN AMBIENTAL esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); GestionAmbientalVacias++}
    if (ga4 == null || ga4 =="" || isNaN(ga4)){M.toast({html: 'La pregunta 4 de GESTIÓN AMBIENTAL esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); GestionAmbientalVacias++}
    if (ga5 == null || ga5 =="" || isNaN(ga5)){M.toast({html: 'La pregunta 5 de GESTIÓN AMBIENTAL esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); GestionAmbientalVacias++}
  
  

   if (GestionAmbientalVacias === 0) {

     sumaGestionAmbiental = parseFloat(ga1+ga2+ga3+ga4+ga5).toFixed(1);
     sumaGestionAmbientalUSU = parseFloat((sumaGestionAmbiental * 100) / 20).toFixed(1);

    //  IMPRIMIR PANTALLA
    console.log("RESULTADOS DE LAS SUMAS DE CADA LINEA:")
    console.log("01. GESTION EN SOSTENIBILIDAD AMBIENTAL")
    console.log("a. Suma GESTION AMBIENTAL: " + sumaGestionAmbiental +"%");
    console.log("a. Suma GESTION AMBIENTAL PARA USUARIO: " + sumaGestionAmbientalUSU +"%");

   /* Swal.fire({
     title: 'Recuerda',
     text: 'Al final de cada linea debes dar clic en el boton siguiente para poder realizar los calculos correctamente',
     icon: 'warning',
     confirmButtonText: 'OK'
   }) */

   //  PARA CALCULAR CIERRE DE BRECHAS DE CADA PREGUNTA  
   
 // console.log(arrayCierrePISCICOLAS);
   
   
   $(".tabs").tabs("select", "test2")
   $("html, body").animate({ scrollTop: 0 }, "slow")
  
 }  

 
});

  $('.ValidaGesRecNat').click((e) => {

 e.preventDefault();
// Obtengo los valores de los inputs  y se convierten en variables globales  
grn1 = parseFloat($('input:radio[name=grn1]:checked').val());
grn2 = parseFloat($('input:radio[name=grn2]:checked').val());
grn3 = parseFloat($('input:radio[name=grn3]:checked').val());
grn4 = parseFloat($('input:radio[name=grn4]:checked').val());
grn5 = parseFloat($('input:radio[name=grn5]:checked').val());
grn6 = parseFloat($('input:radio[name=grn6]:checked').val());
grn7 = parseFloat($('input:radio[name=grn7]:checked').val());

    
// Valido que no esten vacias
GesRecNatVacias = 0;
 if (grn1 == null || grn1 =="" || isNaN(grn1)){M.toast({html: 'La pregunta 1 de GESTIÓN DE RECURSOS NATURALES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); GesRecNatVacias++}
 if (grn2 == null || grn2 =="" || isNaN(grn2)){M.toast({html: 'La pregunta 2 de GESTIÓN DE RECURSOS NATURALES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); GesRecNatVacias++}
 if (grn3 == null || grn3 =="" || isNaN(grn3)){M.toast({html: 'La pregunta 3 de GESTIÓN DE RECURSOS NATURALES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); GesRecNatVacias++}
 if (grn4 == null || grn4 =="" || isNaN(grn4)){M.toast({html: 'La pregunta 4 de GESTIÓN DE RECURSOS NATURALES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); GesRecNatVacias++}
 if (grn5 == null || grn5 =="" || isNaN(grn5)){M.toast({html: 'La pregunta 5 de GESTIÓN DE RECURSOS NATURALES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); GesRecNatVacias++}
 if (grn6 == null || grn6 =="" || isNaN(grn6)){M.toast({html: 'La pregunta 6 de GESTIÓN DE RECURSOS NATURALES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); GesRecNatVacias++}
 if (grn7 == null || grn7 =="" || isNaN(grn7)){M.toast({html: 'La pregunta 7 de GESTIÓN DE RECURSOS NATURALES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); GesRecNatVacias++}



if (GesRecNatVacias === 0) {
  
  sumaGesRecNat = parseFloat(grn1+grn2+grn3+grn4+grn5+grn6+grn7).toFixed(1);
  sumaGesRecNatUSU = parseFloat((sumaGesRecNat * 100) / 20).toFixed(1);

 //  IMPRIMIR PANTALLA
  console.log("b. Suma GESTION DE RECURSOS NATURALES: " + sumaGesRecNat +"%")
  console.log("b. Suma GESTION DE RECURSOS NATURALES PARA USUARIO: " + sumaGesRecNatUSU +"%")


/* Swal.fire({
  title: 'Recuerda',
  text: 'Al final de cada linea debes dar clic en el boton siguiente para poder realizar los calculos correctamente',
  icon: 'warning',
  confirmButtonText: 'OK'
}) */
    
//console.log(arrayCierrePISCICOLAS);




$(".tabs").tabs("select", "test3")
$("html, body").animate({ scrollTop: 0 }, "slow")

}  


});

  $('.validaCambioClimatico').click((e) => {

e.preventDefault();
// Obtengo los valores de los inputs  y se convierten en variables globales  
acc1 = parseFloat($('input:radio[name=acc1]:checked').val());
acc2 = parseFloat($('input:radio[name=acc2]:checked').val());
acc3 = parseFloat($('input:radio[name=acc3]:checked').val());

  
// Valido que no esten vacias
CambioClimaticoVacias = 0;
if (acc1 == null || acc1 =="" || isNaN(acc1)){M.toast({html: 'La pregunta 1 de CAMBIO CLIMATICO esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); CambioClimaticoVacias++}
if (acc2 == null || acc2 =="" || isNaN(acc2)){M.toast({html: 'La pregunta 2 de CAMBIO CLIMATICO esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); CambioClimaticoVacias++}
if (acc3 == null || acc3 =="" || isNaN(acc3)){M.toast({html: 'La pregunta 3 de CAMBIO CLIMATICO esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); CambioClimaticoVacias++}


if (CambioClimaticoVacias === 0) {

sumaCambioClimatico = parseFloat(acc1+acc2+acc3).toFixed(1);
sumaCambioClimaticoUSU = parseFloat((sumaCambioClimatico * 100) /20).toFixed(1);



// IMPRIMIR PANTALLA
console.log("c. Suma CAMBIO CLIMATICO: " + sumaCambioClimatico +"%")
console.log("c. Suma CAMBIO CLIMATICO PARA USUARIO: " + sumaCambioClimaticoUSU +"%")


/* Swal.fire({
title: 'Recuerda',
text: 'Al final de cada linea debes dar clic en el boton siguiente para poder realizar los calculos correctamente',
icon: 'warning',
confirmButtonText: 'OK'
}) */



//console.log(arrayCierrePISCICOLAS);




$(".tabs").tabs("select", "test4")
$("html, body").animate({ scrollTop: 0 }, "slow")

}  


});

  $('.validaCulturaAmbiental').click((e) => {

e.preventDefault();
// Obtengo los valores de los inputs  y se convierten en variables globales  
ca1 = parseFloat($('input:radio[name=ca1]:checked').val());
ca2 = parseFloat($('input:radio[name=ca2]:checked').val());


  
// Valido que no esten vacias
CambioCulturaAmbiental = 0;
if (ca1 == null || ca1 =="" || isNaN(ca1)){M.toast({html: 'La pregunta 1 de CULTURA AMBIENTAL esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); CambioCulturaAmbiental++}
if (ca2 == null || ca2 =="" || isNaN(ca2)){M.toast({html: 'La pregunta 2 de CULTURA AMBIENTAL esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); CambioCulturaAmbiental++}


if (CambioCulturaAmbiental === 0) {

sumaCulturaAmbiental = parseFloat(ca1+ca2).toFixed(1);
sumaCulturaAmbientalUSU = parseFloat((sumaCulturaAmbiental *100) / 20).toFixed(1);


// IMPRIMIR PANTALLA
console.log("d. Suma CULTURA AMBIENTAL: " + sumaCulturaAmbiental +"%")
console.log("d. Suma CULTURA AMBIENTAL PARA USUARIO: " + sumaCulturaAmbientalUSU +"%")

/* Swal.fire({
title: 'Recuerda',
text: 'Al final de cada linea debes dar clic en el boton siguiente para poder realizar los calculos correctamente',
icon: 'warning',
confirmButtonText: 'OK'
}) */


//console.log(arrayCierrePISCICOLAS);


$(".tabs").tabs("select", "test5")
$("html, body").animate({ scrollTop: 0 }, "slow")

}  


});

  $('.ValidaOtrasEstrategias').click((e) => {

    e.preventDefault();

    if (sumaGestionAmbiental == null || sumaGestionAmbiental == "" || isNaN(sumaGestionAmbiental)) {
      M.toast({
        html:
          "Tienes preguntas sin responder en la linea de GESTION AMBIENTAL",
        classes: "red",
      }); 
    }
    if (sumaGesRecNat == null || sumaGesRecNat == "" || isNaN(sumaGesRecNat)) {
      M.toast({
        html:
          "Tienes preguntas sin responder en la linea de GESTION de RECURSOS NATURALES",
        classes: "red",
      }); 
    }

    if (sumaCambioClimatico == null || sumaCambioClimatico == "" || isNaN(sumaCambioClimatico)) {
      M.toast({
        html:
          "Tienes preguntas sin responder en la linea de CAMBIO CLIMATICO",
        classes: "red",
      }); 
    }

    if (sumaCulturaAmbiental == null || sumaCulturaAmbiental == "" || isNaN(sumaCulturaAmbiental)) {
      return M.toast({
        html:
          "Tienes preguntas sin responder en la linea de CULTURA AMBIENTAL",
        classes: "red",
      }); 
    }




    // Obtengo los valores de los inputs  y se convierten en variables globales  
    oea1 = parseFloat($('input:radio[name=oea1]:checked').val());
    oea2 = parseFloat($('input:radio[name=oea2]:checked').val());
    oea3 = parseFloat($('input:radio[name=oea3]:checked').val());
    oea4 = parseFloat($('input:radio[name=oea4]:checked').val());

      
    // Valido que no esten vacias
    otrasEstrategiasVacias = 0;
    if (oea1 == null || oea1 =="" || isNaN(oea1)){M.toast({html: 'La pregunta 1 de OTRAS ESTRATEGIAS esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); otrasEstrategiasVacias++}
    if (oea2 == null || oea2 =="" || isNaN(oea2)){M.toast({html: 'La pregunta 2 de OTRAS ESTRATEGIAS esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); otrasEstrategiasVacias++}
    if (oea3 == null || oea3 =="" || isNaN(oea3)){M.toast({html: 'La pregunta 3 de OTRAS ESTRATEGIAS esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); otrasEstrategiasVacias++}
    if (oea4 == null || oea4 =="" || isNaN(oea4)){M.toast({html: 'La pregunta 4 de OTRAS ESTRATEGIAS esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); otrasEstrategiasVacias++}


    if (otrasEstrategiasVacias === 0) {

    sumaOtrasEstrategias = parseFloat(oea1+oea2+oea3+oea4).toFixed(1);
    sumaOtrasEstrategiasUSU = parseFloat((sumaOtrasEstrategias * 100) / 20).toFixed(1);

    // IMPRIMIR PANTALLA
    console.log("e. Suma OTRAS ESTRATEGIAS AMBIENTALES: " + sumaOtrasEstrategias +"%");
    console.log("e. Suma OTRAS ESTRATEGIAS AMBIENTALES PARA USUARIO: " + sumaOtrasEstrategiasUSU +"%");

    totalGestSostAmbiental = parseFloat(sumaGestionAmbiental) + parseFloat(sumaGesRecNat) + parseFloat(sumaGestionAmbiental) + parseFloat(sumaCambioClimatico) + parseFloat(sumaCulturaAmbiental)

    totalGestSostAmbientalPONDERADO = parseFloat(totalGestSostAmbiental * 0.4).toFixed(1);

    console.log("Suma FINAL DE GESTION EN SOSTENIBILIDAD AMBIENTAL: " + totalGestSostAmbiental +"%");
    Swal.fire({
    title: 'RESULTADO',
    /* text: 'Haz complemtado correctamente el capitulo de GESTION EN SOSTENIBILIDAD AMBIENTAL y el resultado es del ' + totalGestSostAmbiental +"% lo que equivale al " + totalGestSostAmbientalPONDERADO + "% sobre la calificación final de la encuesta", */
    text: 'Haz completado correctamente el capitulo de GESTION EN SOSTENIBILIDAD AMBIENTAL',
    icon: 'success',
    confirmButtonText: 'OK'
    })

    
    //console.log(arrayCierrePISCICOLAS);




    $('.collapsible').collapsible('open', 2);



    }  


});

}

{//*****************SEGUNDO BLOQUE PISCICOLAS
  $('.validaOperaciones').click((e) => {


    e.preventDefault();
   // Obtengo los valores de los inputs  y se convierten en variables globales  
   op1 = parseFloat($('input:radio[name=op1]:checked').val());
   op2 = parseFloat($('input:radio[name=op2]:checked').val());
   op3 = parseFloat($('input:radio[name=op3]:checked').val());
   op4 = parseFloat($('input:radio[name=op4]:checked').val());
   op5 = parseFloat($('input:radio[name=op5]:checked').val());
   op6 = parseFloat($('input:radio[name=op6]:checked').val());
   op7 = parseFloat($('input:radio[name=op7]:checked').val());
   op8 = parseFloat($('input:radio[name=op8]:checked').val());
   op9 = parseFloat($('input:radio[name=op9]:checked').val());
   op10 = parseFloat($('input:radio[name=op10]:checked').val());
   op11 = parseFloat($('input:radio[name=op11]:checked').val());
   op12 = parseFloat($('input:radio[name=op12]:checked').val());
   op13 = parseFloat($('input:radio[name=op13]:checked').val());
   op14 = parseFloat($('input:radio[name=op14]:checked').val());
   op15 = parseFloat($('input:radio[name=op15]:checked').val());
   op16 = parseFloat($('input:radio[name=op16]:checked').val());
   op17 = parseFloat($('input:radio[name=op17]:checked').val());
   op18 = parseFloat($('input:radio[name=op18]:checked').val());
   op19 = parseFloat($('input:radio[name=op19]:checked').val());
   op20 = parseFloat($('input:radio[name=op20]:checked').val());
   op21 = parseFloat($('input:radio[name=op21]:checked').val());
   op22 = parseFloat($('input:radio[name=op22]:checked').val());
   op23 = parseFloat($('input:radio[name=op23]:checked').val());


       
   // Valido que no esten vacias
   operacionesVacias = 0;
    if (op1 == null || op1 =="" || isNaN(op1)){M.toast({html: 'La pregunta 1 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op2 == null || op2 =="" || isNaN(op2)){M.toast({html: 'La pregunta 2 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op3 == null || op3 =="" || isNaN(op3)){M.toast({html: 'La pregunta 3 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op4 == null || op4 =="" || isNaN(op4)){M.toast({html: 'La pregunta 4 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op5 == null || op5 =="" || isNaN(op5)){M.toast({html: 'La pregunta 5 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op6 == null || op6 =="" || isNaN(op6)){M.toast({html: 'La pregunta 6 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op7 == null || op7 =="" || isNaN(op7)){M.toast({html: 'La pregunta 7 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op8 == null || op8 =="" || isNaN(op8)){M.toast({html: 'La pregunta 8 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op9 == null || op9 =="" || isNaN(op9)){M.toast({html: 'La pregunta 9 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op10 == null || op10 =="" || isNaN(op10)){M.toast({html: 'La pregunta 10 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op11 == null || op11 =="" || isNaN(op11)){M.toast({html: 'La pregunta 11 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op12 == null || op12 =="" || isNaN(op12)){M.toast({html: 'La pregunta 12 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op13 == null || op13 =="" || isNaN(op13)){M.toast({html: 'La pregunta 13 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op14 == null || op14 =="" || isNaN(op14)){M.toast({html: 'La pregunta 14 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op15 == null || op15 =="" || isNaN(op15)){M.toast({html: 'La pregunta 15 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op16 == null || op16 =="" || isNaN(op16)){M.toast({html: 'La pregunta 16 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op17 == null || op17 =="" || isNaN(op17)){M.toast({html: 'La pregunta 17 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op18 == null || op18 =="" || isNaN(op18)){M.toast({html: 'La pregunta 18 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op19 == null || op19 =="" || isNaN(op19)){M.toast({html: 'La pregunta 19 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op20 == null || op20 =="" || isNaN(op20)){M.toast({html: 'La pregunta 20 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op21 == null || op21 =="" || isNaN(op21)){M.toast({html: 'La pregunta 21 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op22 == null || op22 =="" || isNaN(op22)){M.toast({html: 'La pregunta 22 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
    if (op23 == null || op23 =="" || isNaN(op23)){M.toast({html: 'La pregunta 23 de OPERACIONES esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); operacionesVacias++}
  
  
  

   if (operacionesVacias === 0) {

     sumaOperaciones = parseFloat(op1+op2+op3+op4+op5+op6+op7+op8+op9+op10+op11+op12+op13+op14+op15+op16+op17+op18+op19+op20+op21+op22+op23).toFixed(1);
     sumaOperacionesUSU = parseFloat((sumaOperaciones * 100) / 25).toFixed(1);    

    //  IMPRIMIR PANTALLA
     console.log("02. BLOQUE DE ALINEASION USAID");
     console.log("a. Suma OPERACIONES: " + sumaOperaciones +"%");
     console.log("a. Suma OPERACIONES PARA USUARIO: " + sumaOperacionesUSU +"%");

   /* Swal.fire({
     title: 'Recuerda',
     text: 'Al final de cada linea debes dar clic en el boton siguiente para poder realizar los calculos correctamente',
     icon: 'warning',
     confirmButtonText: 'OK'
   }) */


   //console.log(arrayCierrePISCICOLAS);


   
   
   $(".tabs").tabs("select", "testX2")
   $("html, body").animate({ scrollTop: 0 }, "slow")
  
 }  

 
});

  $('.validaMonitoreoEva').click((e) => {


  e.preventDefault();
 // Obtengo los valores de los inputs  y se convierten en variables globales  
 mye1 = parseFloat($('input:radio[name=mye1]:checked').val());
 mye2 = parseFloat($('input:radio[name=mye2]:checked').val());



     
 // Valido que no esten vacias
 monitoreoEvaVacias = 0;
  if (mye1 == null || mye1 =="" || isNaN(mye1)){M.toast({html: 'La pregunta 1 de MONITOREO Y EVALUACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); monitoreoEvaVacias++}
  if (mye2 == null || mye2 =="" || isNaN(mye2)){M.toast({html: 'La pregunta 2 de MONITOREO Y EVALUACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); monitoreoEvaVacias++}
  


 if (monitoreoEvaVacias === 0) {

   sumaMonitoreoEva = parseFloat(mye1+mye2).toFixed(1);
   sumaMonitoreoEvaUSU = parseFloat((sumaMonitoreoEva * 100)/25).toFixed(1);


  //  IMPRIMIR PANTALLA
   console.log("b. Suma MONITOREO Y EVALUACION: " + sumaMonitoreoEva +"%");
   console.log("b. Suma MONITOREO Y EVALUACION PARA USUARIO: " + sumaMonitoreoEvaUSU +"%");




/*  Swal.fire({
   title: 'Recuerda',
   text: 'Al final de cada linea debes dar clic en el boton siguiente para poder realizar los calculos correctamente',
   icon: 'warning',
   confirmButtonText: 'OK'
 }) */
 

// console.log(arrayCierrePISCICOLAS);

 $(".tabs").tabs("select", "testX3")
 $("html, body").animate({ scrollTop: 0 }, "slow")

}  


});

  $('.validaDiseñoPlanificación').click((e) => {

      e.preventDefault();
    // Obtengo los valores de los inputs  y se convierten en variables globales  
    dyp1 = parseFloat($('input:radio[name=dyp1]:checked').val());
    dyp2 = parseFloat($('input:radio[name=dyp2]:checked').val());
    dyp3 = parseFloat($('input:radio[name=dyp3]:checked').val());
    dyp4 = parseFloat($('input:radio[name=dyp4]:checked').val());
    dyp5 = parseFloat($('input:radio[name=dyp5]:checked').val());
    dyp6 = parseFloat($('input:radio[name=dyp6]:checked').val());
    dyp7 = parseFloat($('input:radio[name=dyp7]:checked').val());
    dyp8 = parseFloat($('input:radio[name=dyp8]:checked').val());
    dyp9 = parseFloat($('input:radio[name=dyp9]:checked').val());
    dyp10 = parseFloat($('input:radio[name=dyp10]:checked').val());
    dyp11 = parseFloat($('input:radio[name=dyp11]:checked').val());
    dyp12 = parseFloat($('input:radio[name=dyp12]:checked').val());
    dyp13 = parseFloat($('input:radio[name=dyp13]:checked').val());
    dyp14 = parseFloat($('input:radio[name=dyp14]:checked').val());
    dyp15 = parseFloat($('input:radio[name=dyp15]:checked').val());
    dyp16 = parseFloat($('input:radio[name=dyp16]:checked').val());
    dyp17 = parseFloat($('input:radio[name=dyp17]:checked').val());
    dyp18 = parseFloat($('input:radio[name=dyp18]:checked').val());
    dyp19 = parseFloat($('input:radio[name=dyp19]:checked').val()); 


        
    // Valido que no esten vacias
    disePlaniVacias = 0;
      if (dyp1 == null || dyp1 =="" || isNaN(dyp1)){M.toast({html: 'La pregunta 1 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp2 == null || dyp2 =="" || isNaN(dyp2)){M.toast({html: 'La pregunta 2 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp3 == null || dyp3 =="" || isNaN(dyp3)){M.toast({html: 'La pregunta 3 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp4 == null || dyp4 =="" || isNaN(dyp4)){M.toast({html: 'La pregunta 4 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp5 == null || dyp5 =="" || isNaN(dyp5)){M.toast({html: 'La pregunta 5 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp6 == null || dyp6 =="" || isNaN(dyp6)){M.toast({html: 'La pregunta 6 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp7 == null || dyp7 =="" || isNaN(dyp7)){M.toast({html: 'La pregunta 7 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp8 == null || dyp8 =="" || isNaN(dyp8)){M.toast({html: 'La pregunta 8 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp9 == null || dyp9 =="" || isNaN(dyp9)){M.toast({html: 'La pregunta 9 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp10 == null || dyp10 =="" || isNaN(dyp10)){M.toast({html: 'La pregunta 10 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp11 == null || dyp11 =="" || isNaN(dyp11)){M.toast({html: 'La pregunta 11 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp12 == null || dyp12 =="" || isNaN(dyp12)){M.toast({html: 'La pregunta 12 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp13 == null || dyp13 =="" || isNaN(dyp13)){M.toast({html: 'La pregunta 13 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp14 == null || dyp14 =="" || isNaN(dyp14)){M.toast({html: 'La pregunta 14 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp15 == null || dyp15 =="" || isNaN(dyp15)){M.toast({html: 'La pregunta 15 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp16 == null || dyp16 =="" || isNaN(dyp16)){M.toast({html: 'La pregunta 16 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp17 == null || dyp17 =="" || isNaN(dyp17)){M.toast({html: 'La pregunta 17 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp18 == null || dyp18 =="" || isNaN(dyp18)){M.toast({html: 'La pregunta 18 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      if (dyp19 == null || dyp19 =="" || isNaN(dyp19)){M.toast({html: 'La pregunta 19 de DISEÑO Y PLANIFICACIÓN esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); disePlaniVacias++}
      


    if (disePlaniVacias === 0) {

      sumaDiseñoPlanificacion = parseFloat(dyp1+dyp2+dyp3+dyp4+dyp5+dyp6+dyp7+dyp8+dyp9+dyp10+dyp11+dyp12+dyp13+dyp14+dyp15+dyp16+dyp17+dyp18+dyp19).toFixed(1);        
      sumaDiseñoPlanificacionUSU = parseFloat((sumaDiseñoPlanificacion * 100) / 25).toFixed(1);
      
      // IMPRIMIR PANTALLA
      console.log("c. Suma DISEÑO Y PLANIFICACIÓN: " + sumaDiseñoPlanificacion +"%");
      console.log("c. Suma DISEÑO Y PLANIFICACIÓN PARA USUARIO: " + sumaDiseñoPlanificacionUSU +"%");


  /*   Swal.fire({
      title: 'Recuerda',
      text: 'Al final de cada linea debes dar clic en el boton siguiente para poder realizar los calculos correctamente',
      icon: 'warning',
      confirmButtonText: 'OK'
    }) */
   
   // console.log(arrayCierrePISCICOLAS);
    
    
    $(".tabs").tabs("select", "testX4")
    $("html, body").animate({ scrollTop: 0 }, "slow")

    }  


});

// let base64;

//   function onFileChange(event) {
//     const file = event.target.files;
//     if (file[0]) {

//       /*
//       if (file[0].size > 1048576) {
//         Swal.fire({
//           text: this.translate.instant('system.img_size'),
//           imageUrl: 'assets/images/logomg.png',
//           imageWidth: 100,
//           imageHeight: 100,
//         });
//         this.deleteImg();
//         return;
//       }
//       */

//       setTimeout(() => {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           base64 = e.target.result;
//           // console.log(base64,"BASE 64");
//         };
//         reader.readAsDataURL(file[0]);
//       }, 100);
      
//     }
//   }

  $('.validaCierre').click((e) => {
    e.preventDefault();

    if (sumaOperaciones == null || sumaOperaciones == "" || isNaN(sumaOperaciones)) {
      M.toast({
        html:
          "Tienes preguntas sin responder en la linea de OPERACIONES",
        classes: "red",
      }); 
    }
    
    if (sumaMonitoreoEva == null || sumaMonitoreoEva == "" || isNaN(sumaMonitoreoEva)) {
      M.toast({
        html:
          "Tienes preguntas sin responder en la linea de MONITOREO Y EVALUACIÓN",
        classes: "red",
      }); 
    }
    
    if (sumaDiseñoPlanificacion == null || sumaDiseñoPlanificacion == "" || isNaN(sumaDiseñoPlanificacion)) {
      return M.toast({
        html:
          "Tienes preguntas sin responder en la linea de DISEÑO Y PLANIFICACIÓN",
        classes: "red",
      }); 
    }




    // Obtengo los valores de los inputs  y se convierten en variables globales  
    c1 = parseFloat($('input:radio[name=c1]:checked').val());
    c2 = parseFloat($('input:radio[name=c2]:checked').val());
    c3 = parseFloat($('input:radio[name=c3]:checked').val());
   
    
        
    // Valido que no esten vacias
    cierreVacias = 0;
      if (c1 == null || c1 =="" || isNaN(c1)){M.toast({html: 'La pregunta 1 de CIERRE esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); cierreVacias++}
      if (c2 == null || c2 =="" || isNaN(c2)){M.toast({html: 'La pregunta 2 de CIERRE esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); cierreVacias++}
      if (c3 == null || c3 =="" || isNaN(c3)){M.toast({html: 'La pregunta 3 de CIERRE esta sin marcar... recuerda que no pueden quedar preguntas en blanco', classes: 'red'}); cierreVacias++}
      
     

    if (cierreVacias === 0) {

      sumaCierre = parseFloat(c1+c2+c3).toFixed(1);      
      sumaCierreUSU = parseFloat((sumaCierre * 100) / 25 ).toFixed(1);   

      // IMPRIMIR PANTALLA
      console.log("c. Suma CIERRE: " + sumaCierre +"%");
      console.log("c. Suma CIERRE PARA USUARIO: " + sumaCierreUSU +"%");

      totalAlineasionUSAID = parseFloat(sumaOperaciones) + parseFloat(sumaMonitoreoEva) + parseFloat(sumaDiseñoPlanificacion) + parseFloat(sumaCierre);

      console.log("Suma FINAL DE ALINEACION USAID: " + totalAlineasionUSAID +"%");
      console.log("RESULTADO DE LA ENCUESTA EN GENERAL CON LAS PONDERACIONES: ");
      

    Swal.fire({
      title: 'RESULTADO',
      text: 'Haz complemtado correctamente el capitulo de ALINEACIÓN USAID',
      icon: 'success',
      confirmButtonText: 'OK'
    })

    // En esta funcion genero el arreglo de cierre de brechas
    funcionObtejosCierres();
    
    $('.collapsible').collapsible('open', 3);

    

    totalAlineasionUSAID_PONDERADO = parseFloat(totalAlineasionUSAID * 0.6).toFixed(1);
    totalEncuestaFINAL1 =  parseFloat(totalGestSostAmbientalPONDERADO) + parseFloat(totalAlineasionUSAID_PONDERADO);
    totalEncuestaFINAL = parseFloat(totalEncuestaFINAL1).toFixed(1)

    console.log("GESTION EN SOSTENIBILIDAD AMBIENTAL por 40%: " + totalGestSostAmbientalPONDERADO +"%");
    console.log("ALINEASION USAID por 60%: " + totalAlineasionUSAID_PONDERADO +"%");
    console.log("FINAL ENCUESTA 100%: " + totalEncuestaFINAL +"%");



    RES_totalGestSostAmbiental = parseFloat(Math.round(totalGestSostAmbiental * 100) / 100).toFixed(1);
    RES_totalAlineasionUSAID =   parseFloat(Math.round(totalAlineasionUSAID * 100) / 100).toFixed(1);
    RES_totalGestSostAmbientalPONDERADO =  parseFloat(Math.round(totalGestSostAmbientalPONDERADO * 100) / 100).toFixed(1);
    RES_totalAlineasionUSAID_PONDERADO =  parseFloat(Math.round(totalAlineasionUSAID_PONDERADO * 100) / 100).toFixed(1);
    RES_totalEncuestaFINAL =  parseFloat(Math.round(totalEncuestaFINAL * 100) / 100).toFixed(1);

    // Aqui es donde genero las filas para llenar la tabla de cierre de brechas
    var contenidoCierreBrechas = document.querySelector('#contenidoCierreBrechas');    

    var contador = 1;
    contenidoCierreBrechas.innerHTML = ''
            for(let valor of arrayCierrePISCICOLAS){
                /* console.log(valor.nombre) */
                contenidoCierreBrechas.innerHTML += `                
                <tr>
                    <th scope="row">${ contador++ }</th>
                    <td>${ valor.capitulo }</td>
                    <td>${ valor.lineaAccion }</td>
                    <td>${ valor.componente }</td>
                    <td>${ valor.accionMejora }</td>
                </tr>                
                `
            }
    
    /* contenidoCierreBrechas2.innerHTML = ''
            for(let valor of arrayCierrePISCICOLAS){
                
                contenidoCierreBrechas.innerHTML += `                
                <tr>
                    <th scope="row">${ contador++ }</th>
                    <td>${ valor.capitulo }</td>
                    <td>${ valor.lineaAccion }</td>
                    <td>${ valor.componente }</td>
                    <td>${ valor.accionMejora }</td>
                </tr>                
                `
            } */


 
    
    
    LaFechaRegistro = new Date($('#fechaDiligenciamiento').val());
    day = LaFechaRegistro.getDate() + 1;
    month = LaFechaRegistro.getMonth() + 1;
    year = LaFechaRegistro.getFullYear();
    MiFechaRegistro = [day, month, year].join('/');
 
    ArrayEncuestaPisicola = {
      // IDENTIFICACION DE LA EMPRESA 
      emailProfesional          : emailProfesional,
      org_idEncuesta            : idEncuesta,    
      org_nombreOrganizacion    : $('#nombreOrganizacion').val().toUpperCase(),
      org_ubicacion             : $('#ubicacion').val().toUpperCase(),
      org_nit                   : $('#nit').val(),
      org_telefono              : $('#telefono').val(),
      org_email                 : $('#email').val().toLowerCase(),
      org_representante         : $('#representante').val().toUpperCase(),
      org_categoria             : $('#categoria').val().toUpperCase(),
      org_fechaDiligenciamiento : MiFechaRegistro,
      org_fechaRegistro         : fechaRegistro,
      // PRIMERA PARTE GESTION EN SOSTENIBILIDAD AMBIENTAL
      ga1: parseFloat($('input:radio[name=ga1]:checked').val()).toFixed(1),//GESTION AMBIENTAL
      ga2: parseFloat($('input:radio[name=ga2]:checked').val()).toFixed(1),
      ga3: parseFloat($('input:radio[name=ga3]:checked').val()).toFixed(1),
      ga4: parseFloat($('input:radio[name=ga4]:checked').val()).toFixed(1),
      ga5: parseFloat($('input:radio[name=ga5]:checked').val()).toFixed(1),
      grn1: parseFloat($('input:radio[name=grn1]:checked').val()).toFixed(1),// GESTION DE RECURSOS NATURALES
      grn2: parseFloat($('input:radio[name=grn2]:checked').val()).toFixed(1),
      grn3: parseFloat($('input:radio[name=grn3]:checked').val()).toFixed(1),
      grn4: parseFloat($('input:radio[name=grn4]:checked').val()).toFixed(1),
      grn5: parseFloat($('input:radio[name=grn5]:checked').val()).toFixed(1),
      grn6: parseFloat($('input:radio[name=grn6]:checked').val()).toFixed(1),
      grn7: parseFloat($('input:radio[name=grn7]:checked').val()).toFixed(1),
      acc1: parseFloat($('input:radio[name=acc1]:checked').val()).toFixed(1),//CAMBIO CLIMATICO
      acc2: parseFloat($('input:radio[name=acc2]:checked').val()).toFixed(1),
      acc3: parseFloat($('input:radio[name=acc3]:checked').val()).toFixed(1),
      ca1: parseFloat($('input:radio[name=ca1]:checked').val()).toFixed(1),// CULTURA AMBIENTAL
      ca2: parseFloat($('input:radio[name=ca2]:checked').val()).toFixed(1),
      oea1: parseFloat($('input:radio[name=oea1]:checked').val()).toFixed(1), // OTRAS ESTRATEGIAS
      oea2: parseFloat($('input:radio[name=oea2]:checked').val()).toFixed(1),
      oea3: parseFloat($('input:radio[name=oea3]:checked').val()).toFixed(1),
      oea4: parseFloat($('input:radio[name=oea4]:checked').val()).toFixed(1),
      // SEGUNDO BLOQUE ALINEASION USAID
      op1: parseFloat($('input:radio[name=op1]:checked').val()).toFixed(1), // OPERACIONES
      op2: parseFloat($('input:radio[name=op2]:checked').val()).toFixed(1),
      op3: parseFloat($('input:radio[name=op3]:checked').val()).toFixed(1),
      op4: parseFloat($('input:radio[name=op4]:checked').val()).toFixed(1),
      op5: parseFloat($('input:radio[name=op5]:checked').val()).toFixed(1),
      op6: parseFloat($('input:radio[name=op6]:checked').val()).toFixed(1),
      op7: parseFloat($('input:radio[name=op7]:checked').val()).toFixed(1),
      op8: parseFloat($('input:radio[name=op8]:checked').val()).toFixed(1),
      op9: parseFloat($('input:radio[name=op9]:checked').val()).toFixed(1),
      op10: parseFloat($('input:radio[name=op10]:checked').val()).toFixed(1),
      op11: parseFloat($('input:radio[name=op11]:checked').val()).toFixed(1),
      op12: parseFloat($('input:radio[name=op12]:checked').val()).toFixed(1),
      op13: parseFloat($('input:radio[name=op13]:checked').val()).toFixed(1),
      op14: parseFloat($('input:radio[name=op14]:checked').val()).toFixed(1),
      op15: parseFloat($('input:radio[name=op15]:checked').val()).toFixed(1),
      op16: parseFloat($('input:radio[name=op16]:checked').val()).toFixed(1),
      op17: parseFloat($('input:radio[name=op17]:checked').val()).toFixed(1),
      op18: parseFloat($('input:radio[name=op18]:checked').val()).toFixed(1),
      op19: parseFloat($('input:radio[name=op19]:checked').val()).toFixed(1),
      op20: parseFloat($('input:radio[name=op20]:checked').val()).toFixed(1),
      op21: parseFloat($('input:radio[name=op21]:checked').val()).toFixed(1),
      op22: parseFloat($('input:radio[name=op22]:checked').val()).toFixed(1),
      op23: parseFloat($('input:radio[name=op23]:checked').val()).toFixed(1),
      mye1: parseFloat($('input:radio[name=mye1]:checked').val()).toFixed(1),// MONITERO Y EVALUACION
      mye2: parseFloat($('input:radio[name=mye2]:checked').val()).toFixed(1),
      dyp1: parseFloat($('input:radio[name=dyp1]:checked').val()).toFixed(1),// DISEÑO Y PLANIFICACION
      dyp2: parseFloat($('input:radio[name=dyp2]:checked').val()).toFixed(1),
      dyp3: parseFloat($('input:radio[name=dyp3]:checked').val()).toFixed(1),
      dyp4: parseFloat($('input:radio[name=dyp4]:checked').val()).toFixed(1),
      dyp5: parseFloat($('input:radio[name=dyp5]:checked').val()).toFixed(1),
      dyp6: parseFloat($('input:radio[name=dyp6]:checked').val()).toFixed(1),
      dyp7: parseFloat($('input:radio[name=dyp7]:checked').val()).toFixed(1),
      dyp8: parseFloat($('input:radio[name=dyp8]:checked').val()).toFixed(1),
      dyp9: parseFloat($('input:radio[name=dyp9]:checked').val()).toFixed(1),
      dyp10: parseFloat($('input:radio[name=dyp10]:checked').val()).toFixed(1),
      dyp11: parseFloat($('input:radio[name=dyp11]:checked').val()).toFixed(1),
      dyp12: parseFloat($('input:radio[name=dyp12]:checked').val()).toFixed(1),
      dyp13: parseFloat($('input:radio[name=dyp13]:checked').val()).toFixed(1),
      dyp14: parseFloat($('input:radio[name=dyp14]:checked').val()).toFixed(1),
      dyp15: parseFloat($('input:radio[name=dyp15]:checked').val()).toFixed(1),
      dyp16: parseFloat($('input:radio[name=dyp16]:checked').val()).toFixed(1),
      dyp17: parseFloat($('input:radio[name=dyp17]:checked').val()).toFixed(1),
      dyp18: parseFloat($('input:radio[name=dyp18]:checked').val()).toFixed(1),
      dyp19: parseFloat($('input:radio[name=dyp19]:checked').val()).toFixed(1),
      c1: parseFloat($('input:radio[name=c1]:checked').val()).toFixed(1),       //Cierre
      c2: parseFloat($('input:radio[name=c2]:checked').val()).toFixed(1),
      c3: parseFloat($('input:radio[name=c3]:checked').val()).toFixed(1),      
      // RESULTADOS DE CADA VARIABLE
      sumaGestionAmbiental            : parseFloat(sumaGestionAmbiental).toFixed(1),
      sumaGesRecNat                   : parseFloat(sumaGesRecNat).toFixed(1),
      sumaCambioClimatico             : parseFloat(sumaCambioClimatico).toFixed(1),
      sumaCulturaAmbiental            : parseFloat(sumaCulturaAmbiental).toFixed(1),
      sumaOtrasEstrategias            : parseFloat(sumaOtrasEstrategias).toFixed(1),
      sumaOperaciones                 : parseFloat(sumaOperaciones).toFixed(1), 
      sumaMonitoreoEva                : parseFloat(sumaMonitoreoEva).toFixed(1),
      sumaDisenoPlanificacion         : parseFloat(sumaDiseñoPlanificacion).toFixed(1),
      sumaCierre                      : parseFloat(sumaCierre).toFixed(1),
      // RESULTADOS PARA MOSTRAR AL USUARIO
      usu_sumaGestionAmbiental        : parseFloat(sumaGestionAmbientalUSU).toFixed(1),
      usu_sumaGesRecNat               : parseFloat(sumaGesRecNatUSU).toFixed(1),
      usu_sumaCambioClimatico         : parseFloat(sumaCambioClimaticoUSU).toFixed(1),
      usu_sumaCulturaAmbiental        : parseFloat(sumaCulturaAmbientalUSU).toFixed(1),
      usu_sumaOtrasEstrategias        : parseFloat(sumaOtrasEstrategiasUSU).toFixed(1),
      usu_sumaOperaciones             : parseFloat(sumaOperacionesUSU).toFixed(1),
      usu_sumaMonitoreoEva            : parseFloat(sumaMonitoreoEvaUSU).toFixed(1),
      usu_sumaDisenoPlanificacion     : parseFloat(sumaDiseñoPlanificacionUSU).toFixed(1),
      usu_sumaCierre                  : parseFloat(sumaCierreUSU).toFixed(1),
      // RESULTADOS
      totalGestSostAmbiental          : parseFloat(RES_totalGestSostAmbiental).toFixed(1),
      totalAlineasionUSAID            : parseFloat(RES_totalAlineasionUSAID).toFixed(1),
      totalGestSostAmbientalPONDERADO : parseFloat(RES_totalGestSostAmbientalPONDERADO).toFixed(1),
      totalAlineasionUSAID_PONDERADO  : parseFloat(RES_totalAlineasionUSAID_PONDERADO).toFixed(1),
      totalEncuestaFINAL              : parseFloat(RES_totalEncuestaFINAL).toFixed(1)
       
     }

     {//-------------------->BASE DE DATOS
      var db = new Dexie("bd_avancemosPISCICOLAS");
          db.version(1).stores({
              tblPiscicola: '++id, org_nombreOrganizacion, org_nit',
              tblCierreBrechaPiscicola: "++id, org_nombreOrganizacion, org_nit"    
          });
          
        /* Agrego los registros en la base de datos */
          db.tblPiscicola.add(            
            ArrayEncuestaPisicola
          );
          
          /* Si hay cierre de brechas los agrego a la tabla*/          
          if (arrayCierrePISCICOLAS.length > 0) {              
              for(let valor of arrayCierrePISCICOLAS){
                db.tblCierreBrechaPiscicola.add({
                emailProfesional          : emailProfesional,
                org_idEncuesta            : idEncuesta,    
                org_nombreOrganizacion    : $('#nombreOrganizacion').val().toUpperCase(),  
                org_nit                   : $('#nit').val(),            
                org_fechaRegistro         : fechaRegistro,
                capitulo                  : valor.capitulo,
                lineaAccion               : valor.lineaAccion,
                componente                : valor.componente,
                accionMejora              : valor.accionMejora,
              });
             /*  console.log(valor); */
            }

          } 
          
          M.toast({
            html:
              "La encuesta se ha guardado correcteamente en la base de datos local"
          });
      
     }

     
     if (arrayCierrePISCICOLAS.length == 0) {
      document.getElementById("imprimir").innerHTML = 
      `       <h4>Avancemos Bajo Cauca</h4>
              <p>Herramienta de Valoración Ambiental</p>  
              <p>Empresa piscícola: <strong>${nombreOrganizacion.toUpperCase()}</strong></p>
              <p>NIT: <strong>${nit}</strong></p>
              <p>Fecha de la visita: <strong>${MiFechaRegistro}</strong></p> 
              <h4>Resultados</h4>
              <table class="highlight">
                 <thead>
                   <tr>
                     <th>Capitulo</th>
                     <th>Linea</th>
                     <th>%</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>Gestión en Sostenibilidad Ambiental</td>
                     <td>Gestión ambiental</td>
                     <td>${sumaGestionAmbientalUSU}%</td>
                   </tr>
                   <tr>
                   <td>Gestión en Sostenibilidad Ambiental</td>
                     <td>Gestión Recursos Naturales</td>
                     <td>${sumaGesRecNatUSU}%</td>
                   </tr>
                   <tr>
                   <td>Gestión en Sostenibilidad Ambiental</td>
                     <td>Cambio Climático</td>
                     <td>${sumaCambioClimaticoUSU}%</td>
                   </tr>
                   <tr>
                   <td>Gestión en Sostenibilidad Ambiental</td>
                     <td>Cultura Ambiental</td>
                     <td>${sumaCulturaAmbientalUSU}%</td>
                   </tr>
                   <tr>
                   <td>Gestión en Sostenibilidad Ambiental</td>
                     <td>Otras Estrategias Ambientales</td>
                     <td>${sumaOtrasEstrategiasUSU}%</td>
                   </tr>
                   <tr>
                     <td>Alineacion USAID</td>
                     <td>Operaciones</td>
                     <td>${sumaOperacionesUSU}%</td>
                   </tr>
                   <tr>
                   <td>Alineacion USAID</td>
                     <td>Monitoreo y Evaluación</td>
                     <td>${sumaMonitoreoEvaUSU}%</td>
                   </tr>
                   <tr>
                   <td>Alineacion USAID</td>
                     <td>Diseño y Planificación</td>
                     <td>${sumaDiseñoPlanificacionUSU}%</td>
                   </tr>
                   <tr>
                   <td>Alineacion USAID</td>
                     <td>Cierre</td>
                     <td>${sumaCierreUSU}%</td> 
                   </tr>
                 </tbody>
                 </table>           
                <p>Total capitulo de GESTIÓN EN SOSTENIBILIDAD AMBIENTAL: <strong>${totalGestSostAmbiental}%.</strong> </p>
                <p>Total capitulo de ALINEACIÓN USAID: <strong>${totalAlineasionUSAID.toFixed(0)}%.</strong> </p>
                <p>Resultado final de la encuesta: <strong>${totalEncuestaFINAL}%.</strong></p>              
                                             
                <p>La empresa piscícola <strong>${nombreOrganizacion.toUpperCase()} </strong> no tiene aspectos a mejorar</p>
      `;  
     } 
 
     if (arrayCierrePISCICOLAS.length > 0) {
      document.getElementById("zonaResultados").innerHTML = 
      `<h4>Avancemos Bajo Cauca</h4>
        <p>Herramienta de Valoración Ambiental</p>
          <p>Empresa piscícola: <strong>${nombreOrganizacion.toUpperCase()}</strong></p>
          <p>NIT: <strong>${nit}</strong></p>
          <p>Fecha de la visita: <strong>${MiFechaRegistro}</strong></p> 
          <h4>Resultados</h4>
            <table class="highlight">
            <thead>
              <tr>
                <th>Capitulo</th>
                <th>Linea</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gestión en Sostenibilidad Ambiental</td>
                <td>Gestión ambiental</td>
                <td>${sumaGestionAmbientalUSU}%</td>
              </tr>
              <tr>
              <td>Gestión en Sostenibilidad Ambiental</td>
                <td>Gestión Recursos Naturales</td>
                <td>${sumaGesRecNatUSU}%</td>
              </tr>
              <tr>
              <td>Gestión en Sostenibilidad Ambiental</td>
                <td>Cambio Climático</td>
                <td>${sumaCambioClimaticoUSU}%</td>
              </tr>
              <tr>
              <td>Gestión en Sostenibilidad Ambiental</td>
                <td>Cultura Ambiental</td>
                <td>${sumaCulturaAmbientalUSU}%</td>
              </tr>
              <tr>
              <td>Gestión en Sostenibilidad Ambiental</td>
                <td>Otras Estrategias Ambientales</td>
                <td>${sumaOtrasEstrategiasUSU}%</td>
              </tr>
                   <tr>
                     <td>Alineacion USAID</td>
                     <td>Operaciones</td>
                     <td>${sumaOperacionesUSU}%</td>
                   </tr>
                   <tr>
                   <td>Alineacion USAID</td>
                     <td>Monitoreo y Evaluación</td>
                     <td>${sumaMonitoreoEvaUSU}%</td>
                   </tr>
                   <tr>
                   <td>Alineacion USAID</td>
                     <td>Diseño y Planificación</td>
                     <td>${sumaDiseñoPlanificacionUSU}%</td>
                   </tr>
                   <tr>
                   <td>Alineacion USAID</td>
                     <td>Cierre</td>
                     <td>${sumaCierreUSU}%</td>
                   </tr>
                 </tbody>
                 </table>           
                <p>Total capitulo de GESTIÓN EN SOSTENIBILIDAD AMBIENTAL: <strong>${totalGestSostAmbiental.toFixed(1)}%.</strong> </p>
                <p>Total capitulo de ALINEACIÓN USAID: <strong>${totalAlineasionUSAID.toFixed(1)}%.</strong> </p>
                <p>Resultado final de la encuesta: <strong>${totalEncuestaFINAL}%.</strong></p>
                <p>Para continuar con el proceso de mejoramiento, la empresa piscícola <strong>${nombreOrganizacion.toUpperCase()}</strong> deberá cerrar las brechas de los siguientes <strong>${arrayCierrePISCICOLAS.length}</strong> items</p>                                               
                <h5 class="center-align"><strong>Cierre de brechas</strong></h5>           
               
 
      `;
     }
       
     console.log("------------------->TABLA ENCUESTA")
     console.log(ArrayEncuestaPisicola);

     console.log("------------------->TABLA CIERRE DE BRECHAS")
     console.log(arrayCierrePISCICOLAS);

     $('#principal').find('input').attr('disabled','disabled');
     $('.validaGestionAmbiental').addClass("disabled").removeClass("pulse");
     $('.ValidaGesRecNat' ).addClass("disabled").removeClass("pulse");
     $('.validaCambioClimatico').addClass("disabled").removeClass("pulse");
     $('.validaCulturaAmbiental').addClass("disabled").removeClass("pulse");
     $('.ValidaOtrasEstrategias').addClass("disabled").removeClass("pulse");

     $('.validaOperaciones').addClass("disabled").removeClass("pulse");
     $('.validaMonitoreoEva').addClass("disabled").removeClass("pulse");     
     $('.validaDisenoPlanificacion').addClass("disabled").removeClass("pulse");
     $('.validaCierre').addClass("disabled").removeClass("pulse");

     /* Aqui genero el archivo en PDF */
    pruebaDivAPdf();





    $(".tabs").tabs("select", "testX4")
    $("html, body").animate({ scrollTop: 0 }, "slow")

    }  


  });


}

// Funcion para almacenar las posibles cierre de brechas
funcionCierreBrechas = (pregunta, valor, capitulo, lineaAccion, componente, accionMejora) => {
  if (pregunta < valor) {
    objCierreBrechas = {
      idEncuesta : idEncuesta,
      nombreOrganizacion: $('#nombreOrganizacion').val().toUpperCase(),
      nit: $('#nit').val(),      
      capitulo: capitulo,
      lineaAccion: lineaAccion,
      componente: componente,
      accionMejora: accionMejora,
    }
    // Agrego al arreglo de gestion ambiental
    arrayCierrePISCICOLAS.push(objCierreBrechas);   
  }
} 

 

funcionObtejosCierres = () => {
  //----------------------> GESTION EN SOSTENIBILIDAD AMBIENTAL -> GESTION AMBIENTAL
    funcionCierreBrechas(ga1, 4,'Gestión en Sostenibilidad Ambiental','Gestión ambiental', '1. Estrategia y equipo ambiental', 'La organización cuenta con un equipo encargado del área ambiental y con una política, objetivos y metas definidos en temas ambientales. Se hace seguimiento y se gestiona (documentado).');

    funcionCierreBrechas(ga2, 4,'Gestión en Sostenibilidad Ambiental','Gestión ambiental', '2. Aspectos e impactos', 'La organización cuenta con una identificación de aspectos e impactos ambientales por procesos y se cuenta con herramientas de gestión, seguimiento y actualización documentadas.');

    funcionCierreBrechas(ga3, 4,'Gestión en Sostenibilidad Ambiental','Gestión ambiental', '3. Sellos y certificaciones ambientales', 'La organización cuenta con un sello o certificación ambiental reconocida nacional e internacionalmente.');

    funcionCierreBrechas(ga4, 4,'Gestión en Sostenibilidad Ambiental','Gestión ambiental', '4. Gestión normatividad ambiental', 'La organización tiene identificados la totalidad de requerimientos legales ambientales, los prioriza y gestiona oportunamente.');

    funcionCierreBrechas(ga5, 4,'Gestión en Sostenibilidad Ambiental','Gestión ambiental', '5. Gestión de Riesgos ambientales', 'La organización cuenta con una identificación y clasificación de riesgos ambientales con mecanismos de seguimiento y respuesta.');

  //----------------------> GESTION EN SOSTENIBILIDAD AMBIENTAL -> GESTION RECURSOS NATURALES
    funcionCierreBrechas(grn1, 2.9,'Gestión en Sostenibilidad Ambiental','Gestión Recursos Naturales', '1. Gestión del agua para consumo', 'Se tienen identificadas las fuentes de agua, se monitorean las calidades y cantidades y se realiza gestión orientada a la optimización del recurso.');

    funcionCierreBrechas(grn2, 2.9,'Gestión en Sostenibilidad Ambiental','Gestión Recursos Naturales', '2. Gestión de vertimientos líquidos', 'Se tienen identificados la totalidad de puntos de descarga, se tienen caracterizaos (cantidad y calidad) y se cuenta con sistemas de prevención y/o control que garanticen la reducción del impacto ambiental.');

    funcionCierreBrechas(grn3, 2.9,'Gestión en Sostenibilidad Ambiental','Gestión Recursos Naturales', '3. Gestión de residuos sólidos', 'Se tienen identificados los diferentes tipos de residuos, se clasifican de acuerdo a sus características y cantidades y se realizan las gestiones necesarias para su aprovechamiento y disposición adecuada.');

    funcionCierreBrechas(grn4, 2.8,'Gestión en Sostenibilidad Ambiental','Gestión Recursos Naturales', '4. Materias Primas, Insumos y Sustancias Peligrosas', 'Se identifican las materias primas e insumos de los  procesos y se gestionan de acuerdo a sus características con el fin de optimizar su uso, manejo y  y/o reemplazo por unas más amigables con el medio ambiente.');

    funcionCierreBrechas(grn5, 2.8,'Gestión en Sostenibilidad Ambiental','Gestión Recursos Naturales', '5. Energéticos', 'La organización tiene una gestión energética avanzada y ha implementado cambios a energías sostenibles en sus procesos.');

    funcionCierreBrechas(grn6, 2.9,'Gestión en Sostenibilidad Ambiental','Gestión Recursos Naturales', '6. Ruido', 'La organización tiene identificadas y monitoreadas sus fuentes de emisión de ruido y sus impactos, las controla y gestiona.');

    funcionCierreBrechas(grn7, 2.8,'Gestión en Sostenibilidad Ambiental','Gestión Recursos Naturales', '7. Emisiones Atmosféricas', 'Se tienen identificadas las fuentes de emisión, se realizan monitoreos de contaminantes de forma periódica y se cuenta con  sistemas de gestión y/o control para la disminución de contaminación atmosférica.');

  //----------------------> GESTION EN SOSTENIBILIDAD AMBIENTAL -> CAMBIO CLIMATICO
    funcionCierreBrechas(acc1, 6.7,'Gestión en Sostenibilidad Ambiental','Cambio Climático', '1. Estimaciones e inventarios', 'La organización tiene identificadas sus fuentes de emisión y sumideros de gases efecto invernadero y cuantifica las cantidades emitidas y/o fijadas en términos de co2 equivalente al año');

    funcionCierreBrechas(acc2, 6.7,'Gestión en Sostenibilidad Ambiental','Cambio Climático', '2. Estrategias de reducción y/o compensación de emisiones', 'La organización cuenta con estrategias orientadas a la reducción y compensación de emisiones de gases efecto invernadero GEI.');

    funcionCierreBrechas(acc3, 6.6,'Gestión en Sostenibilidad Ambiental','Cambio Climático', '3. Verificación, comunicación y adaptación', 'La organización cuenta con estrategias de adaptación al cambio climático, verifica sus emisiones, las gestiona y comunica a sus partes interesadas.');

  //----------------------> GESTION EN SOSTENIBILIDAD AMBIENTAL -> CULTUARA AMBIENTAL
    funcionCierreBrechas(ca1, 10,'Gestión en Sostenibilidad Ambiental','Cultura Ambiental', '1. Formación y cultura de colaboradores', 'Se tiene establecido un programa de educación ambiental para colaboradores internos y externos, se evalúa y actualiza permanentemente');

    funcionCierreBrechas(ca2, 10,'Gestión en Sostenibilidad Ambiental','Cultura Ambiental', '2. Promoción de cultura ambiental externa', 'Se tienen programas para formación y promoción de buenas prácticas ambientales en sus diferentes grupos de interés.');

  //----------------------> GESTION EN SOSTENIBILIDAD AMBIENTAL -> OTRAS ESTRATEGIAS AMBIENTALES
    funcionCierreBrechas(oea1, 5,'Gestión en Sostenibilidad Ambiental','Otras Estrategias Ambientales', '1. Ciclo de vida', 'La organización realiza un análisis de ciclo de vida del producto o servicio, mide y gestiona los resultados.');

    funcionCierreBrechas(oea2, 5,'Gestión en Sostenibilidad Ambiental','Otras Estrategias Ambientales', '2. Compras sostenibles', 'La organización cuenta con políticas definidas de compras sostenibles y tiene lineamientos explícitos al respecto.');

    funcionCierreBrechas(oea3, 5,'Gestión en Sostenibilidad Ambiental','Otras Estrategias Ambientales', '3. Biodiversidad', 'Se tienen políticas y estrategias de conservación de la biodiversidad para sus grupos de interés en zonas de influencia');

    funcionCierreBrechas(oea4, 5,'Gestión en Sostenibilidad Ambiental','Otras Estrategias Ambientales', '4. Buenas prácticas Ambientales', 'Existen políticas de implementación de estrategias de buenas prácticas ambientales en la organización, son implementadas y se les hace seguimiento.');
 

  //----------------------> ALINEACION USAID OPERACIONES
  funcionCierreBrechas(op1, 1.1,'Alinación USAID','Operaciones', '1.Contar con botiquines de primeros auxilios', 'La organización cuenta con un botiquín de primeros auxilios en un lugar señalizado, de fácil acceso y bien dotado con los elementos necesarios');

   funcionCierreBrechas(op2, 1.1,'Alinación USAID','Operaciones', '2. Dotar y utilizar equipos de protección', 'La organización, cuenta con un protocolo y realiza monitoreos periódicos de la calidad del agua');   
      
   funcionCierreBrechas(op3, 1.1,'Alinación USAID','Operaciones', '3. Aplicar protocolos de bioseguridad laboral', 'La organización , cuenta con un protocolo establecido de bioseguridad laboral y lo pone en practica');   
      
   funcionCierreBrechas(op4, 1.1,'Alinación USAID','Operaciones', '4. Acogerse a la normatividad de SST', 'La organización, cuenta con un protocolo de seguridad y salud ocupacional de acuerdo a la normatividad y lo implementa');   
      
   funcionCierreBrechas(op5, 1.1,'Alinación USAID','Operaciones', '5. Controlar especies invasoras o problemáticas ', 'La organización, tiene establecido un protocolo implementado para controlar las plantas acuáticas invasoras');      
   
   funcionCierreBrechas(op6, 1.1,'Alinación USAID','Operaciones', '6. Gestionar adecuadamente los residuos', 'La organización, se encuentra capacitada y cuenta con un protocolo para realizar la separación y disposición correcta de residuos solidos ');   
      
   funcionCierreBrechas(op7, 1.1,'Alinación USAID','Operaciones', '7. Gestionar adecuadamente los residuos peligrosos', 'La organización, Implementa un protocolo para la gestión adecuada de residuos peligrosos ');      
   
   funcionCierreBrechas(op8, 1.1,'Alinación USAID','Operaciones', '8. Utilizar equipos eficientes ', 'La organización, cuenta con un protocolo y lo implemente para hacer uso eficiente de la energía en caso de ser necesaria');   
      
   funcionCierreBrechas(op9, 1,'Alinación USAID','Operaciones', '9. Usar métodos y equipos permitidos por las autoridades', 'La organización, tiene claro , identifica y cuenta con las herramientas adecuadas y permitidas para el uso en la unidad productiva');
      
   funcionCierreBrechas(op10, 1.1,'Alinación USAID','Operaciones', '10. Garantizar que no se rompa la cadena de frío', 'La organización, cuenta con un protocolo y lo implementa para garantizar la cadena de frio de los peces ya sean vivos o muertos ');   
      
   funcionCierreBrechas(op11, 1,'Alinación USAID','Operaciones', '11. Cumplir con los lineamientos de control sanitario', 'La organización, cuenta con los permisos de sanidad establecidos por el ICA ');   
   
   funcionCierreBrechas(op12, 1.1,'Alinación USAID','Operaciones', '12. Implementar el Manejo Integrado de Plagas', 'La organización cuenta con un protocolo y lo implementa para cumplir con el Manejo Integrado de plagas desde el PERSUAP');      
   
   funcionCierreBrechas(op13, 1.1,'Alinación USAID','Operaciones', '13. Aislar unidades enfermas o contaminadas', 'La organización, cuenta con un protocolo y lo implementa para el área de cuarentena a fin de evitar enfermedades y agentes contaminantes');      
   
   funcionCierreBrechas(op14, 1.1,'Alinación USAID','Operaciones', '14. Implementar técnicas para almacenar el agua.', 'La organización , cuenta con un protocolo y lo implementa para el almacenamiento de agua y suplir necesidades en tiempos de crisis');      
   
   funcionCierreBrechas(op15, 1.2,'Alinación USAID','Operaciones', '15. Promover la mano de obra local.', 'La organización, contrata la mano de obra local con el fin de promover la economía dentro de la comunidad');
   
   funcionCierreBrechas(op16, 1.2,'Alinación USAID','Operaciones', '16. Proteger las inversiones para evitar posibles pérdidas.', 'La organización, cuenta con seguros a fin de garantizar la protección de la inversión realizada en caso de accidente ');
   
   funcionCierreBrechas(op17, 1.1,'Alinación USAID','Operaciones', '17. Almacenar correctamente insumos agropecuarios y herramientas', 'La organización, cuenta con una bodega para almacenamiento de insumos y medicamentos ');   
      
   funcionCierreBrechas(op18, 1.1,'Alinación USAID','Operaciones', '18. Vacunar los animales, de acuerdo a las regulaciones', 'La organización, cuenta con un plan sanitario  establecido por un profesional para garantizar la sanidad de los peces');      
   
   funcionCierreBrechas(op19, 1.1,'Alinación USAID','Operaciones', '19. Utilizar alimento de alta calidad', 'La organización, cuenta con un proveedor de alta para la compra de  los concentrados ');   
      
   funcionCierreBrechas(op20, 1.1,'Alinación USAID','Operaciones', '20. Usar productos de limpieza biodegradables.', 'La organización, cuenta con un protocolo y lo implementa a fin de utilizar productos de limpieza amigables con el medio ambiente');   
      
   funcionCierreBrechas(op21, 1,'Alinación USAID','Operaciones', '21. Utilizar los residuos orgánicos para compostaje ', 'La organización, se encuentra capacitada y formada para el manejo adecuado de los residuos provenientes subproductos');   
   
   funcionCierreBrechas(op22, 1,'Alinación USAID','Operaciones', '22. Manejar aguas residuales y/o deshechos de la actividad', 'La organización, cuenta con la laguna de oxidación para el manejo de aguas residuales provenientes de los estanques');   
   
   funcionCierreBrechas(op23, 1,'Alinación USAID','Operaciones', '23. Evitar las quemas', 'La organización, evita realizar quemas y maneja otras alternativas agronómicas mas amigables con el medio ambiente ');

  //----------------------> ALINEACION USAID MONITOREO Y EVALUACION
    funcionCierreBrechas(mye1, 12.5,'Alinación USAID','Monitoreo y Evaluación', '1. Realizar mantenimientos periódicamente.', 'La organización, tiene implementado un protocolo de revisión y desinfección de estanques cuidando de todo el ciclo productivo');

    funcionCierreBrechas(mye2, 12.5,'Alinación USAID','Monitoreo y Evaluación', '2. Monitorear la presencia de plagas ', 'La organización, cuenta con un protocolo establecido y lo implementa para llevar un control de plagas y enfermedades ');

    //----------------------> ALINEACION USAID DISEÑO Y PLANIFICACION
    funcionCierreBrechas(dyp1, 1.3,'Alinación USAID','Diseño y Planificación', '1. Controlar la expansión de la frontera agrícola', 'La organización, identifica y realiza su expansión productiva de acuedo al uso del suelo');

    funcionCierreBrechas(dyp2, 1.3,'Alinación USAID','Diseño y Planificación', '2. Obtener todos los permisos/licencias legales', 'La organización, se encuentra legalmente constituida en Cámara de comercio , DIAN y con permisos de CAR, ICA Y AUNAP');

    funcionCierreBrechas(dyp3, 1.3,'Alinación USAID','Diseño y Planificación', '3. Proteger ecosistemas ecológicamente sensibles', 'La organización, realiza actividades para la protección de fuentes hídricas como reforestación de especies nativas y jornadas de limpieza');

    funcionCierreBrechas(dyp4, 1.3,'Alinación USAID','Diseño y Planificación', '4. Evitar tumbar árboles y/o extraer fauna.', 'La organización, evita realizar la tala de árboles para su expansión productiva');

    funcionCierreBrechas(dyp5, 1.3,'Alinación USAID','Diseño y Planificación', '5. Ubicar las actividades en áreas previamente intervenidas', 'La organización, aprovecha los espacios ya intervenidos para establecer su unidad productiva');

    funcionCierreBrechas(dyp6, 1.3,'Alinación USAID','Diseño y Planificación', '6. Utilizar arreglos resistentes al cambio climático', 'La organización, adopta BPPA en su unidad productiva para hacer frente al cambio climático ');

    funcionCierreBrechas(dyp7, 1.3,'Alinación USAID','Diseño y Planificación', '7. Considerar los registros de información histórica', 'La organización, tiene establecido un plan de contingencia para mitigar los efectos en  las variables de epoca de lluvia y sequía');

    funcionCierreBrechas(dyp8, 1.3,'Alinación USAID','Diseño y Planificación', '8. Garantizar ubicaciones en zonas seguras ', 'La organización, de acuerdo al uso del suelo tiene claro los lugares para establecer  la actividad producticva');

    funcionCierreBrechas(dyp9, 1.3,'Alinación USAID','Diseño y Planificación', '9. Involucar a las comunidades para garantizar apropiación', 'La organización , trabaja de manera colaborativa y se involucra en la puesta en marcha del proyecto productivo ');

    funcionCierreBrechas(dyp10, 1.3,'Alinación USAID','Diseño y Planificación', '10. Manejar las aguas durante los excesos de lluvia', 'La organización, cuenta con un plan de contingencia y lo implementa para trabajar en época de lluvia y evitar pérdidas ');

    funcionCierreBrechas(dyp11, 1.3,'Alinación USAID','Diseño y Planificación', '11. Evitar la modificación de la red hidrológica.', 'La organización, cuenta con la concesión de agua y permisos de vertimientos que garantizan el uso adecuado del recurso');

    funcionCierreBrechas(dyp12, 1.3,'Alinación USAID','Diseño y Planificación', '12. Respetar los usos del suelo', 'La organización, cuenta con el permisos de uso del suelo para su actividad');

    funcionCierreBrechas(dyp13, 1.3,'Alinación USAID','Diseño y Planificación', '13. Realizar planes de finca', 'La organización, cuenta con un plan de formación establecido para mejorar su sistema productivo y conservación de los recursos naturales ');

    funcionCierreBrechas(dyp14, 1.3,'Alinación USAID','Diseño y Planificación', '14. Utilizar infraestructura para prevenir filtraciones ', 'La organización cuenta con un plan de contingencia y lo implementa en caso de tener filtraciones en los estanques y evitar escapes de agua ');

    funcionCierreBrechas(dyp15, 1.3,'Alinación USAID','Diseño y Planificación', '15. Ahorrar y usar eficientemente el agua.', 'La organización, utiliza la recirculación del agua entre los estanques con el fin de hacer un uso adecuado del recurso');

    funcionCierreBrechas(dyp16, 1.3,'Alinación USAID','Diseño y Planificación', '16. Utilizar materiales que provengan de sitios legales ', 'La organización , cuenta con un proveedor de granja certificado en BBPA que provee las las semillas');

    funcionCierreBrechas(dyp17, 1.6,'Alinación USAID','Diseño y Planificación', '17. Conservar y proteger los bosques existentes.', 'La organización, realiza actividades de reforestación de especies nativas a fin de conservar los bosques de la zona');

    funcionCierreBrechas(dyp18, 1.3,'Alinación USAID','Diseño y Planificación', '18. Conservar o reforestar las zonas de protección ', 'La organización, realiza permanente mente reforestación en la zona de especies nativas con el fin de proteger las fuente hídricas');

    funcionCierreBrechas(dyp19, 1.3,'Alinación USAID','Diseño y Planificación', '19. usar materiales no tóxicos', 'La organización, usa productos amigables con el medio ambiente');

    //----------------------> ALINEACION USAID CIERRE
    funcionCierreBrechas(c1, 8.4,'Alinación USAID','Cierre', '1. Reemplazar los árboles talados con la siembra', 'La organización, identifica la presencia de árboles nativos, reconoce su importancia y fomenta la siembra reemplazando los árboles talados');

    funcionCierreBrechas(c2, 8.3,'Alinación USAID','Cierre', '2. Promover la revegetalización', 'La organización, realiza siembras de especies de vegetales nativas para la recuperación de suelos');

    funcionCierreBrechas(c3, 8.3,'Alinación USAID','Cierre', '3. Realizar el acondicionamiento topográfico', 'La organización, cuenta con un plan de trabajo para implementar en el momento de dejar la actividad productiva en la zona');
}


function pruebaDivAPdf() {
  var pdf = new jsPDF('p','pt', [1900, 1400]);
  source = $('#imprimir')[0];

 /*  specialElementHandlers = {
      '#bypassme': function (element, renderer) {
          return true
      }
  }; */
  margins = {
    top: 120,
    bottom: 60,
    left: 130,
    width: 900
  };

    pdf.fromHTML(
      source, 
      margins.left, // x coord
      margins.top, { // y coord
          'width': margins.width
          /* 'elementHandlers': specialElementHandlers */
      },

      function (dispose) {
          pdf.save(`${nombreOrganizacion.toUpperCase()}__Fecha__${fechaPDF }.pdf`);

           /* Swal.fire({
            title: 'Recuerda',
            text: 'Se ha generado correctamente el documento con los resultados en PDF, recuerda revisar la carpeta de descargas',
            icon: 'success',
            confirmButtonText: 'OK'
          }); */

          M.toast({
            html:
              "El Archivo PDF con los resultados se ha generado correctamente"
          });




      }, margins
  );
}


refrescarPagina = () => {  
  Swal.fire({
    title: 'Ingresar nueva encuesta?',
    text: "Antes de iniciar con una nueva encuesta debes descargar el PDF con los resultados actuales",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#00b36e',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si.. ya tengo descargados los resultados'
  }).then((result) => {
    if (result.isConfirmed) {
      /* Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      ) */
      /* location.reload(); */
      $(location).attr('href',"../pages/piscicolas.html");
    }
  })
}


// Funcion para traeerme los datos de la base de datos
enviarServerApicolas= async () => {
  $("#loader").show();

  var db = new Dexie("bd_avancemosPISCICOLAS");
      db.version(1).stores({
      tblPiscicola: '++id, org_nombreOrganizacion, org_nit',
      tblCierreBrechaPiscicola: "++id, org_nombreOrganizacion, org_nit"    
  });

  const tablaPiscicola = await db.tblPiscicola.toArray();
  const tasblaCierreBrechaPiscicola = await db.tblCierreBrechaPiscicola.toArray();

  console.log(tablaPiscicola);
  console.log(tasblaCierreBrechaPiscicola);

  

  console.log("Esto es lo que se envia al servidor y se guardara en la base de datos para APICOLAS: ")
  

    var EncuestasPiscicolas = {"dataEncuestaPiscicolas": tablaPiscicola };
    console.log(EncuestasPiscicolas);
    var CierrePiscicolas = {"dataCierresPiscicolas": tasblaCierreBrechaPiscicola };
    console.log(CierrePiscicolas);

    var jsonEncuestas = JSON.stringify(EncuestasPiscicolas);
    var jsonCierre = JSON.stringify(CierrePiscicolas);

    console.log(jsonEncuestas);
    console.log(jsonCierre);    

    //Variables para enviar al servidos:
    const dataEncuestas = new FormData();
    const dataCierres = new FormData();

    // Asigno el nombre a json que se va a enviar
    dataEncuestas.append('jsonEncuestas', jsonEncuestas);
    dataCierres.append('jsonCierres', jsonCierre);
    

    // /* Enviando las ENCUESTAS PISCICOLAS */
    fetch("http://portafolioverde.org/encuestas-afe/piscicolas.php", {
      method: "POST",
      body: dataEncuestas,
     /*  headers:{
        'Content-Type': 'application/json'
      } */
    })
      .then(function (response) {
        console.log(response);
        if (response.ok) {
          $("#loader").hide();
          return M.toast({html: 'Las encuestas se han sincronizado correctamente con el servidor'});
          
          /* Swal.fire({
            title: 'Atención',
            text: 'Las encuestas han sido registradas correctamente en el servidor',
            icon: 'info',
            confirmButtonText: 'OK'
          }) */
        } else {
          return M.toast({html: 'Error al comunicarse con el servidor'});
        }
      })
      .then(function (texto) {
        console.log(texto);
      })
      .catch(function (err) {
        console.log(err);
         Swal.fire({
          title: 'Error al intentar enviar las encuestas al servidor',
          text: 'Las encuestas no se han podido registrar en el servidor... por favor intenta nuevamente... recuerda estar conectado a internet',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
      });

    //   /* Enviando los CIERRES DE BRECHAS PISCICOLAS */
    fetch("http://portafolioverde.org/encuestas-afe/cierres-piscicolas.php", {
      method: "POST",
      body: dataCierres,
     /*  headers:{
        'Content-Type': 'application/json'
      } */
    })
      .then(function (response) {
        console.log(response);
        if (response.ok) {
          return M.toast({html: 'La tabla con los cierres de brechas se han sincronizado correctamente con el servidor'});
          
          /* Swal.fire({
            title: 'Atención',
            text: 'Las encuestas han sido registradas correctamente en el servidor',
            icon: 'info',
            confirmButtonText: 'OK'
          }) */
        } else {
          return M.toast({html: 'Se actualizaron las encuentas que estaban pendientes... Todas estan sincronizadas'});
        }
      })
      .then(function (texto) {
        console.log(texto);
      })
      .catch(function (err) {
        console.log(err);
         Swal.fire({
          title: 'Error al intentar enviar las encuestas al servidor',
          text: 'Las encuestas no se han podido registrar en el servidor... por favor intenta nuevamente... recuerda estar conectado a internet',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
      });

  };


  $('input.autocomplete').autocomplete({
    data: {
      '1 - CÁCERES - PARAGUAY - JUAN DAVID DOVAL MUÑOZ': null,
      '2 - CAUCASIA - ASOFRUP - EDISON ARLEX JARAMILLO OSORIO': null,
      '3 - CAUCASIA - PISCICOLA EL LAGO - ESTIANA JULIETH JARAMILLO OSORIO': null,
      '4 - CAUCASIA - PISCÍCOLA JERUSALÉN - JUAN RICARDO COGOLLO OYOLA': null,
      '5 - CAUCASIA - PISCÍCOLA LA BONITA - DIVISON SIERRA RODRÍGUEZ, / DOLLY ACOSTA NAVARRO': null,
      '6 - CAUCASIA - PISCÍCOLA TITAN - JISETH CÓRDOBA BRUN': null,
      '7 - CAUCASIA - VILLA SOFIA - LAUREANO VANEGAS MONSALVE': null,
      '8 - EL BAGRE - ASOAGROLLANA - ROBINSON ANTONIO CONTRERAS GRACIANO': null,
      '9 - EL BAGRE - EL PARAÍSO - ABEL POLO MUSLACO': null,
      '10 - EL BAGRE - LA BENDICIÓN DE DIOS - MIRLADIS HERNÁNDEZ - MIRLADIS DEL SOCORRO HERNÁNDEZ MAYORIANO': null,
      '11 - EL BAGRE - LA BENDICIÓN DE DIOS - ORLANDO DE JESÚS FUENTES SEPÚLVEDA - ORLANDO DE JESÚS FUENTES SEPÚLVEDA': null,
      '12 - EL BAGRE - PISCICOLA AGROPEZ - FRANCIS FRANCISCA MENDOZA NAVARRO': null,
      '13 - EL BAGRE - PISCICOLA ASOPITUREAL - Sin Dato': null,
      '14 - EL BAGRE - PISCICOLA GRANJA INTEGRAL DOÑA RAMONA - Sin Dato': null,
      '15 - EL BAGRE - PISCICOLA LA ESPERANZA - ELIZABETH VANEGA URDA': null,
      '16 - EL BAGRE - PISCICOLA LA REPRESA - MATILDA MARTÍNEZ': null,
      '17 - EL BAGRE - PISCICOLA LA UNIÓN - MARÍA ALEJANDRA FIGUEROA CABARCA': null,
      '18 - EL BAGRE - PISCICOLA LOS ACACIOS - CAMILO ARTURO PÉREZ ÁLVAREZ': null,
      '19 - NECHÍ - PISCÍCOLA LA GRANJA - SAUL ENRIQUE CARMONA QUICENO': null,
      '20 - TARAZÁ - ALEJANDRÍA - JOSÉ GILBERTO POSADA CADAVID': null,
      '21 - TARAZÁ - DON PABLO - GUIOMAR DE JESÚS ESPINAL VALENCIA': null,
      '22 - TARAZÁ - EL REPOSO - YESSICA JOHANA PULGARIN ROJAS': null,
      '23 - TARAZÁ - EL VIEJO - ELIECER BOHÓRQUEZ LONDOÑO': null,
      '24 - TARAZÁ - GRECIA - JAIME ALONSO RESTREPO FERNÁNDEZ': null,
      '25 - TARAZÁ - LA ENVIDIA - RAMIRO MANUEL LOPEZ CORDERO': null,
      '26 - TARAZÁ - LA FAMILY - GILBERTO VARGAS ÁLVAREZ': null,
      '27 - TARAZÁ - LA SOMBRITA - LOURDES YAMILE TORRES HERRERA': null,
      '28 - TARAZÁ - LOS QUINTEROS - MARINA ILDUARA AREIZA MENESES': null,
      '29 - TARAZÁ - PARCELA #5 - JULIANA CASTILLO DE RODRÍGUEZ': null,
      '30 - TARAZÁ - PISICOLA EL PARAISO - RODRIGO DE JESÚS PULGARIN RESTREPO': null,
      '31 - TARAZÁ - PISICOLA EL SILENCIO - CLAUDIA LILIANA PULGARIN MARTÍNEZ': null,
      '32 - TARAZÁ - SAN SEBASTIÁN - MARÍA ROSMIRA MISAS FERIA': null,
      '33 - TARAZÁ - TESORITO ABAJO - JUAN DAVID SEPÚLVEDA PULGARIN': null,
      '34 - TARAZÁ - UNIDAD PISCICOLA BORINQUEN - JOSÉ MANUEL GRANADOS': null,
      '35 - TARAZÁ - UNIDAD PISCICOLA LA BENDICION - ELCIS ADITH SALGADO DÍAZ': null,
      '36 - ZARAGOZA - ASOPISNAR - CLARIBEL DEL CARMEN QUINTANA': null,
      '37 - ZARAGOZA - BUENOS AIRES - BLEIBER SANABRIA GONZÁLEZ': null,
      '38 - ZARAGOZA - JEHOVÁ YIRE - RAÚL ANTONIO ZÚÑIGA MARTÍNEZ': null,
      '39 - ZARAGOZA - LA FORTUNA - NEVER DE JESÚS TAMARA GALAVIZ': null,
      '40 - ZARAGOZA - LAS PALMAS - MABELIS MARGOT GÓMEZ QUINTANA': null,
      '41 - ZARAGOZA - MARB - YUDY CRISTINA RODRÍGUEZ CIRO': null,

    },onAutocomplete: (texto) => {

			opcionSeleccionado = texto.split(" ")[0] // Selecciono la primera palabra

			// M.toast({ html: `${opcionSeleccionado}` });

     // alert(`Has seleccionado el ID: ${opcionSeleccionado}`);

      var opciones = {
        //'id': ['Nombre', 'Ubicación', 'NIT', 'Telefono', 'Correo Electronico', 'Representante']
        //'ID': ['0', '1', '2', '3', '4', '5']:      
          '1': ['PARAGUAY', 'CÁCERES', '1032253644', '3116779299', 'Sin Dato', 'JUAN DAVID DOVAL MUÑOZ'],
          '2': ['ASOFRUP', 'CAUCASIA', '901074492-6', '3146618234', 'asofrupc.2017@gmail.com', 'EDISON ARLEX JARAMILLO OSORIO'],
          '3': ['PISCICOLA EL LAGO', 'CAUCASIA', '1152191019', '3204943402', 'diana12jaramillo@gmail.com', 'ESTIANA JULIETH JARAMILLO OSORIO'],
          '4': ['PISCÍCOLA JERUSALÉN', 'CAUCASIA', '1038102211', '3164841762', 'jrcogollo@gmail.com', 'JUAN RICARDO COGOLLO OYOLA'],
          '5': ['PISCÍCOLA LA BONITA', 'CAUCASIA', '98653978', '3217619226', 'dibison .sierra2@gmail.com', 'DIVISON SIERRA RODRÍGUEZ, / DOLLY ACOSTA NAVARRO'],
          '6': ['PISCÍCOLA TITAN', 'CAUCASIA', '1038104159', '3147965741', 'julietabrun88@gmail.com', 'JISETH CÓRDOBA BRUN'],
          '7': ['VILLA SOFIA', 'CAUCASIA', '78293336', '3206188335', 'laureanodelcristo@gmail.com', 'LAUREANO VANEGAS MONSALVE'],
          '8': ['ASOAGROLLANA', 'EL BAGRE', '98649532', '3127545562', 'Sin Dato', 'ROBINSON ANTONIO CONTRERAS GRACIANO'],
          '9': ['EL PARAÍSO', 'EL BAGRE', '11056213', '3226601034', 'Sin Dato', 'ABEL POLO MUSLACO'],
          '10': ['LA BENDICIÓN DE DIOS - MIRLADIS HERNÁNDEZ', 'EL BAGRE', '43890395', '3217308575', 'Sin Dato', 'MIRLADIS DEL SOCORRO HERNÁNDEZ MAYORIANO'],
          '11': ['LA BENDICIÓN DE DIOS - ORLANDO DE JESÚS FUENTES SEPÚLVEDA', 'EL BAGRE', '8050494', '3134162883', 'Sin Dato', 'ORLANDO DE JESÚS FUENTES SEPÚLVEDA'],
          '12': ['PISCICOLA AGROPEZ', 'EL BAGRE', '9012752313', '3186387849', 'frank14444@hotmail.com', 'FRANCIS FRANCISCA MENDOZA NAVARRO'],
          '13': ['PISCICOLA ASOPITUREAL', 'EL BAGRE', '9305341', '3106020473', 'Sin Dato', 'Sin Dato'],
          '14': ['PISCICOLA GRANJA INTEGRAL DOÑA RAMONA', 'EL BAGRE', '1040499514', '3216103523', 'seanvasi88@hotmail.com', 'Sin Dato'],
          '15': ['PISCICOLA LA ESPERANZA', 'EL BAGRE', '22241149', '3194908656', 'Sin Dato', 'ELIZABETH VANEGA URDA'],
          '16': ['PISCICOLA LA REPRESA', 'EL BAGRE', 'Sin Dato', '3234216063', 'alejafigueroa05@hotmail.com', 'MATILDA MARTÍNEZ'],
          '17': ['PISCICOLA LA UNIÓN', 'EL BAGRE', '1040515088', '3044374584', 'alejafigueroa05@hotmail.com', 'MARÍA ALEJANDRA FIGUEROA CABARCA'],
          '18': ['PISCICOLA LOS ACACIOS', 'EL BAGRE', '8200170', '3105040650', 'camilo perez2107@gmail.com', 'CAMILO ARTURO PÉREZ ÁLVAREZ'],
          '19': ['PISCÍCOLA LA GRANJA', 'NECHÍ', '15536710', '3137529552', 'sacarqui@hotmail.com', 'SAUL ENRIQUE CARMONA QUICENO'],
          '20': ['ALEJANDRÍA', 'TARAZÁ', '8281664', '3218510487', 'joseposada2812@gmail.com', 'JOSÉ GILBERTO POSADA CADAVID'],
          '21': ['DON PABLO', 'TARAZÁ', '8400536', '3192218885', 'guiomar.espinal@hotmail.com', 'GUIOMAR DE JESÚS ESPINAL VALENCIA'],
          '22': ['EL REPOSO', 'TARAZÁ', '1045422612', '3122441693', 'pulgarin004@gmail.com', 'YESSICA JOHANA PULGARIN ROJAS'],
          '23': ['EL VIEJO', 'TARAZÁ', '8045261', '3108226384', 'Sin Dato', 'ELIECER BOHÓRQUEZ LONDOÑO'],
          '24': ['GRECIA', 'TARAZÁ', '15321302', '3197537052', 'Sin Dato', 'JAIME ALONSO RESTREPO FERNÁNDEZ'],
          '25': ['LA ENVIDIA', 'TARAZÁ', '8037386', '3128528780', 'Sin Dato', 'RAMIRO MANUEL LOPEZ CORDERO'],
          '26': ['LA FAMILY', 'TARAZÁ', '901298348-5', '3504873254', 'gilbervargas68@hotmail.com', 'GILBERTO VARGAS ÁLVAREZ'],
          '27': ['LA SOMBRITA', 'TARAZÁ', '32116304', '3148072368', 'Sin Dato', 'LOURDES YAMILE TORRES HERRERA'],
          '28': ['LOS QUINTEROS', 'TARAZÁ', '39267263', '3117410840', 'Sin Dato', 'MARINA ILDUARA AREIZA MENESES'],
          '29': ['PARCELA #5', 'TARAZÁ', '21586578', '3046829087', 'Sin Dato', 'JULIANA CASTILLO DE RODRÍGUEZ'],
          '30': ['PISICOLA EL PARAISO', 'TARAZÁ', '8261916', '3113592917', 'Sin Dato', 'RODRIGO DE JESÚS PULGARIN RESTREPO'],
          '31': ['PISICOLA EL SILENCIO', 'TARAZÁ', '25785170', '3117960846', 'Sin Dato', 'CLAUDIA LILIANA PULGARIN MARTÍNEZ'],
          '32': ['SAN SEBASTIÁN', 'TARAZÁ', '43893983', '3116123071', 'rosmirasena2008@gmail.com', 'MARÍA ROSMIRA MISAS FERIA'],
          '33': ['TESORITO ABAJO', 'TARAZÁ', '1045416999', '3044537083', 'asofucamp@gmail.com', 'JUAN DAVID SEPÚLVEDA PULGARIN'],
          '34': ['UNIDAD PISCICOLA BORINQUEN', 'TARAZÁ', '98583373', '3227456039', 'josemanuelgranados@gmail.com', 'JOSÉ MANUEL GRANADOS'],
          '35': ['UNIDAD PISCICOLA LA BENDICION', 'TARAZÁ', '39284300', '3127299111', 'elcysalgado66@gmail.com', 'ELCIS ADITH SALGADO DÍAZ'],
          '36': ['ASOPISNAR', 'ZARAGOZA', '1045136894', '3164280556', 'Sin Dato', 'CLARIBEL DEL CARMEN QUINTANA'],
          '37': ['BUENOS AIRES', 'ZARAGOZA', '98562200', '3157955537', 'Sin Dato', 'BLEIBER SANABRIA GONZÁLEZ'],
          '38': ['JEHOVÁ YIRE', 'ZARAGOZA', '1040490703', '0', 'Sin Dato', 'RAÚL ANTONIO ZÚÑIGA MARTÍNEZ'],
          '39': ['LA FORTUNA', 'ZARAGOZA', '92130076', '3234183653', 'Sin Dato', 'NEVER DE JESÚS TAMARA GALAVIZ'],
          '40': ['LAS PALMAS', 'ZARAGOZA', '43693853', '3208706792', 'Sin Dato', 'MABELIS MARGOT GÓMEZ QUINTANA'],
          '41': ['MARB', 'ZARAGOZA', '43985449', '3197959949', 'crisrodroguezciro@gmail.com', 'YUDY CRISTINA RODRÍGUEZ CIRO'],        
    
      }

      document.getElementById('nombreOrganizacion').value = opciones[opcionSeleccionado][0];  
      document.getElementById('ubicacion').value = opciones[opcionSeleccionado][1];  
      document.getElementById('nit').value = opciones[opcionSeleccionado][2];
      document.getElementById('telefono').value = opciones[opcionSeleccionado][3];
      document.getElementById('email').value = opciones[opcionSeleccionado][4];
      document.getElementById('representante').value = opciones[opcionSeleccionado][5];
      document.getElementById('autocomplete-input').value = "";

      M.toast({
        html:
        `Unidad productiva seleccionada: ${opciones[opcionSeleccionado][0]}`
      });


		
		},
  });





