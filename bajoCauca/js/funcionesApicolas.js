nombreProfesional = 'Omar Hernando Jimenez Arrieta';
emailProfesional = 'Omar Hernando Jimenez Arrieta';

/* init MATERIALIZECSS */
$('.sidenav').sidenav();
$('.collapsible').collapsible();
$('.tabs').tabs();
$('.modal').modal();
$('.fixed-action-btn').floatingActionButton({
  hoverEnabled: false,
});
$('select').formSelect();


{
  // VARIABLES GESTION EN SOSTENIBILIDAD AMBIENTAL
    sumaGestionAmbiental = null;
    sumaGesRecNat =null;
    sumaCambioClimatico = null;
    sumaCulturaAmbiental = null;
    sumaOtrasEstrategias = null;
    totalGestSostAmbientalPONDERADO = null;

    sumaGestionAmbientalUSU = null;
    sumaGesRecNatUSU =null;
    sumaCambioClimaticoUSU = null;
    sumaCulturaAmbientalUSU = null;
    sumaOtrasEstrategiasUSU = null;

    // VARIABLES ALINEASIÓN USAID - APICOLAS
    sumaMonitoreoEva = null;
    sumaOperaciones = null;
    sumaDiseñoPlanificacion = null;

    sumaMonitoreoEvaUSU = null;
    sumaOperacionesUSU = null;
    sumaDiseñoPlanificacionUSU = null;

    arrayCierreAPICOLAS = [];
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

        
        /* const cuerpoModal =  document.querySelector('#modal1 .modal-content');

        const button = document.createElement('button'); 
        button.type = 'button'; 
        button.innerText = 'Ver cierres de brechas'; 
        //document.body.appendChild(button);

        console.log(button); */


    }

    document.getElementById("nombreProfesional").innerHTML = nombreProfesional;
    document.getElementById("nombreProfesional2").innerHTML = nombreProfesional;    
    document.getElementById("emailProfesional").innerHTML = emailProfesional;

    
      
          var db = new Dexie("bd_avancemosAPICOLAS");
          db.version(1).stores({
              tblApicola: '++id, org_nombreOrganizacion, org_nit',
              tblCierreBrechaApicolas: "++id, org_nombreOrganizacion, org_nit",
              
          });

          tablaApicola = await db.tblApicola.toArray();
          tablaCierresApicolas = await db.tblCierreBrechaApicolas.toArray();
          

          
          encuestasApicolasDigitadas = document.querySelector('#encuestasApicolasDigitadas');
          cierresBrechasDigitadas = document.querySelector('#cierresBrechasDigitadas');

          // REGISTROS TABLA ENCUESTAS
          var contador = 1;
          encuestasApicolasDigitadas.innerHTML = ''
                  for(let valor of tablaApicola){
                      /* console.log(valor.nombre) */
                      encuestasApicolasDigitadas.innerHTML += `                
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
                  
                  // REGISTROS TABLA CIERRES
                  var contadorCierres = 1;
                  cierresBrechasDigitadas.innerHTML = ''
                          for(let cierre of tablaCierresApicolas){
                              /* console.log(cierre.nombre) */
                              cierresBrechasDigitadas.innerHTML += `                
                              <tr>
                                  <th scope="row">${ contadorCierres++ }</th>                                 
                                  <td>${ cierre.org_fechaRegistro }</td>                    
                                  <td>${ cierre.org_nombreOrganizacion }</td>
                                  <td>${ cierre.capitulo }</td>
                                  <td>${ cierre.lineaAccion }</td>
                                  <td>${ cierre.componente }</td>
                                  <td>${ cierre.accionMejora }</td>
                              </tr>                
                              `
                          }



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

    console.group("01. GESTION EN SOSTENIBILIDAD AMBIENTAL");
    console.log("RESULTADOS DE LAS SUMAS DE CADA LINEA:")
    console.log("------------> 01. GESTION EN SOSTENIBILIDAD AMBIENTAL")
    console.log("a. Suma GESTION AMBIENTAL: " + sumaGestionAmbiental +"%");
    console.log("a. Suma GESTION AMBIENTAL PARA USUARIO: " + sumaGestionAmbientalUSU +"%");

   /* Swal.fire({
     title: 'Recuerda',
     text: 'Al final de cada linea debes dar clic en el boton siguiente para poder realizar los calculos correctamente',
     icon: 'warning',
     confirmButtonText: 'OK'
   }) */

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

    totalGestSostAmbiental = parseFloat(sumaGestionAmbiental) + parseFloat(sumaGesRecNat) + parseFloat(sumaCambioClimatico) + parseFloat(sumaCulturaAmbiental) + parseFloat(sumaOtrasEstrategias);

    totalGestSostAmbientalPONDERADO = parseFloat(totalGestSostAmbiental * 0.4).toFixed(1);

    console.log("Suma FINAL DE GESTION EN SOSTENIBILIDAD AMBIENTAL: " + totalGestSostAmbiental +"%");
    console.log("Suma FINAL DE GESTION EN SOSTENIBILIDAD AMBIENTAL PONDERADO 40%: " + totalGestSostAmbientalPONDERADO +"%");

    console.groupEnd()


    Swal.fire({
    title: 'RESULTADO',
    /* text: 'Haz complemtado correctamente el capitulo de GESTION EN SOSTENIBILIDAD AMBIENTAL y el resultado es del ' + totalGestSostAmbiental +"% lo que equivale al " + totalGestSostAmbientalPONDERADO + "% sobre la calificación final de la encuesta", */
    text: 'Haz completado correctamente el capitulo de GESTION EN SOSTENIBILIDAD AMBIENTAL',
    icon: 'success',
    confirmButtonText: 'OK'
    })

    $('.collapsible').collapsible('open', 2);



    }  


});

}

{//*****************SEGUNDO BLOQUE APICOLA

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
     sumaMonitoreoEvaUSU = parseFloat((sumaMonitoreoEva * 100)/33.3).toFixed(1);
  
  
    //  IMPRIMIR PANTALLA

    console.group("02. ALINEACIÓN USAID");
    console.log("------------> 02. ALINEACIÓN USAID");
     console.log("a. Suma MONITOREO Y EVALUACION: " + sumaMonitoreoEva +"%");
     console.log("a. Suma MONITOREO Y EVALUACION PARA USUARIO: " + sumaMonitoreoEvaUSU +"%");
  
  
  
  
   /* Swal.fire({
     title: 'Recuerda',
     text: 'Al final de cada linea debes dar clic en el boton siguiente para poder realizar los calculos correctamente',
     icon: 'warning',
     confirmButtonText: 'OK'
   }) */
   
   
   $(".tabs").tabs("select", "testX2")
   $("html, body").animate({ scrollTop: 0 }, "slow")
  
  }  
  
  
  });
  
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
    
  
   

   if (operacionesVacias === 0) {

     sumaOperaciones = parseFloat((op1+op2+op3+op4+op5+op6+op7+op8+op9+op10+op11+op12+op13+op14+op15+op16+op17) - 0.7).toFixed(1);
     sumaOperacionesUSU = parseFloat((sumaOperaciones * 100) / 33.3).toFixed(1);    

    //  IMPRIMIR PANTALLA     
     console.log("b. Suma OPERACIONES: " + sumaOperaciones +"%");
     console.log("b. Suma OPERACIONES PARA USUARIO: " + sumaOperacionesUSU +"%");

   /* Swal.fire({
     title: 'Recuerda',
     text: 'Al final de cada linea debes dar clic en el boton siguiente para poder realizar los calculos correctamente',
     icon: 'warning',
     confirmButtonText: 'OK'
   }) */
   
   
   $(".tabs").tabs("select", "testX3")
   $("html, body").animate({ scrollTop: 0 }, "slow")
  
 }  

 
});

//---------------------------------------------------------------

//---------------------------------------------------------------

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

  $('.validaDisenoPlanificacion').click((e) => {

    if (sumaMonitoreoEva == null || sumaMonitoreoEva == "" || isNaN(sumaMonitoreoEva)) {
      M.toast({
        html:
          "Tienes preguntas sin responder en la linea de MONITOREO Y EVALUACIÓN",
        classes: "red",
      }); 
    }

    if (sumaOperaciones == null || sumaOperaciones == "" || isNaN(sumaOperaciones)) {
      return M.toast({
        html:
          "Tienes preguntas sin responder en la linea de OPERACIONES",
        classes: "red",
      }); 
    }    
   

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
  // adjunto = btoa(base64);
  // dyp16 = $('#dyp16').prop('files');
  // imagen = $('input:text[name=nombreAdj]').val()


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
    // if (dyp16 == null || dyp16.length == 0){M.toast({html: 'La pregunta 16 de DISEÑO Y PLANIFICACIÓN esta sin adjunto... recuerda que se debe agregar el adjunto', classes: 'red'}); disePlaniVacias++}
    


  if (disePlaniVacias === 0) {

    sumaDiseñoPlanificacion = parseFloat((dyp1+dyp2+dyp3+dyp4+dyp5+dyp6+dyp7+dyp8+dyp9+dyp10+dyp11+dyp12+dyp13+dyp14+dyp15) - 1.2).toFixed(1);        
    sumaDiseñoPlanificacionUSU = parseFloat((sumaDiseñoPlanificacion * 100) / 33.3).toFixed(1);
    
    // IMPRIMIR PANTALLA
    console.log("c. Suma DISEÑO Y PLANIFICACIÓN: " + sumaDiseñoPlanificacion +"%");
    console.log("c. Suma DISEÑO Y PLANIFICACIÓN PARA USUARIO: " + sumaDiseñoPlanificacionUSU +"%");


    totalAlineasionUSAID = parseFloat(sumaMonitoreoEva) + parseFloat(sumaOperaciones) +parseFloat(sumaDiseñoPlanificacion);

      console.log("Suma FINAL DE ALINEACION USAID: " + totalAlineasionUSAID.toFixed(0) +"%");
      console.log("RESULTADO DE LA ENCUESTA EN GENERAL CON LAS PONDERACIONES: ");

      totalAlineasionUSAID_PONDERADO = parseFloat(totalAlineasionUSAID * 0.6).toFixed(0);
      totalEncuestaFINAL =  parseFloat(totalGestSostAmbientalPONDERADO) + parseFloat(totalAlineasionUSAID_PONDERADO);

      console.log("GESTION EN SOSTENIBILIDAD AMBIENTAL por 40%: " + totalGestSostAmbientalPONDERADO +"%");
      console.log("ALINEASION USAID por 60%: " + totalAlineasionUSAID_PONDERADO +"%");
      console.log("FINAL ENCUESTA 100%: " + totalEncuestaFINAL +"%");


      


      Swal.fire({
        title: 'RESULTADO',
        text: 'Haz complemtado correctamente el capitulo de ALINEACIÓN USAID',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      // En esta funcion genero el arreglo de cierre de brechas
    funcionObtejosCierres();
  
      $('.collapsible').collapsible('open', 3);

      // ----------> MUESTRO LOS RESULTADOS

    
    RES_totalGestSostAmbiental = parseFloat(Math.round(totalGestSostAmbiental * 100) / 100).toFixed(1);
    RES_totalAlineasionUSAID =   parseFloat(Math.round(totalAlineasionUSAID * 100) / 100).toFixed(1);
    RES_totalGestSostAmbientalPONDERADO =  parseFloat(Math.round(totalGestSostAmbientalPONDERADO * 100) / 100).toFixed(1);
    RES_totalAlineasionUSAID_PONDERADO =  parseFloat(Math.round(totalAlineasionUSAID_PONDERADO * 100) / 100).toFixed(1);
    RES_totalEncuestaFINAL =  parseFloat(Math.round(totalEncuestaFINAL * 100) / 100).toFixed(1);

    var contenidoCierreBrechas = document.querySelector('#contenidoCierreBrechas');    

    var contador = 1;
    contenidoCierreBrechas.innerHTML = ''
            for(let valor of arrayCierreAPICOLAS){
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

    LaFechaRegistro = new Date($('#fechaDiligenciamiento').val());
    day = LaFechaRegistro.getDate() + 1;
    month = LaFechaRegistro.getMonth() + 1;
    year = LaFechaRegistro.getFullYear();
    var MiFechaRegistro = [day, month, year].join('/');

    



     ArrayEncuestaAPICOLA = {

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
      mye1: parseFloat($('input:radio[name=mye1]:checked').val()).toFixed(1),// MONITERO Y EVALUACION
      mye2: parseFloat($('input:radio[name=mye2]:checked').val()).toFixed(1),
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
            
        // RESULTADOS DE CADA VARIABLE
      sumaGestionAmbiental            : parseFloat(sumaGestionAmbiental).toFixed(1),
      sumaGesRecNat                   : parseFloat(sumaGesRecNat).toFixed(1),
      sumaCambioClimatico             : parseFloat(sumaCambioClimatico).toFixed(1),
      sumaCulturaAmbiental            : parseFloat(sumaCulturaAmbiental).toFixed(1),
      sumaOtrasEstrategias            : parseFloat(sumaOtrasEstrategias).toFixed(1),
      sumaMonitoreoEva                : parseFloat(sumaMonitoreoEva).toFixed(1),
      sumaOperaciones                 : parseFloat(sumaOperaciones).toFixed(1),      
      sumaDisenoPlanificacion         : parseFloat(sumaDiseñoPlanificacion).toFixed(1),      
      // RESULTADOS PARA MOSTRAR AL USUARIO
      usu_sumaGestionAmbiental        : parseFloat(sumaGestionAmbientalUSU).toFixed(1),
      usu_sumaGesRecNat               : parseFloat(sumaGesRecNatUSU).toFixed(1),
      usu_sumaCambioClimatico         : parseFloat(sumaCambioClimaticoUSU).toFixed(1),
      usu_sumaCulturaAmbiental        : parseFloat(sumaCulturaAmbientalUSU).toFixed(1),
      usu_sumaOtrasEstrategias        : parseFloat(sumaOtrasEstrategiasUSU).toFixed(1),      
      usu_sumaMonitoreoEva            : parseFloat(sumaMonitoreoEvaUSU).toFixed(1),
      usu_sumaOperaciones             : parseFloat(sumaOperacionesUSU).toFixed(1),
      usu_sumaDisenoPlanificacion     : parseFloat(sumaDiseñoPlanificacionUSU).toFixed(1),      
      // RESULTADOS
      totalGestSostAmbiental          : parseFloat(RES_totalGestSostAmbiental).toFixed(1),
      totalAlineasionUSAID            : parseFloat(RES_totalAlineasionUSAID).toFixed(1),
      totalGestSostAmbientalPONDERADO : parseFloat(RES_totalGestSostAmbientalPONDERADO).toFixed(1),
      totalAlineasionUSAID_PONDERADO  : parseFloat(RES_totalAlineasionUSAID_PONDERADO).toFixed(1),
      totalEncuestaFINAL              : parseFloat(RES_totalEncuestaFINAL).toFixed(1),
      // dyp16 : $('#dyp16').prop('files'),
      // adjunto: btoa(base64),
      // imagen: $('input:text[name=nombreAdj]').val()
      

      
    }
    

     {//-------------------->BASE DE DATOS
      var db = new Dexie("bd_avancemosAPICOLAS");
          db.version(1).stores({
            tblApicola: '++id, org_nombreOrganizacion, org_nit',
            tblCierreBrechaApicolas: "++id, org_nombreOrganizacion, org_nit",
            
          });
          
        /* Agrego los registros en la base de datos */
          db.tblApicola.add(
          ArrayEncuestaAPICOLA
          );

         
          
          /* Si hay cierre de brechas los agrego a la tabla*/          
          if (arrayCierreAPICOLAS.length > 0) {              
              for(let valor of arrayCierreAPICOLAS){
                db.tblCierreBrechaApicolas.add({
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
        


{/* <div class=" right-align">      
        <a class="btn-floating" onclick="pruebaDivAPdf()" ><i class="material-icons red">picture_as_pdf</i></a>        
      </div>
      <div> */}





     if (arrayCierreAPICOLAS.length == 0) {
      document.getElementById("imprimir").innerHTML = 
      `<h4>Avancemos Bajo Cauca</h4>
          <p>Herramienta de Valoración Ambiental</p>
      <p>Empresa apícola: <strong>${nombreOrganizacion.toUpperCase()}</strong></p>
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
                     <td>Monitoreo y Evaluación</td>
                     <td>${sumaMonitoreoEvaUSU}%</td>
                   </tr>
                   <tr>
                     <td>Alineacion USAID</td>
                     <td>Operaciones</td>
                     <td>${sumaOperacionesUSU}%</td>
                   </tr>
                   <tr>
                   <td>Alineacion USAID</td>
                     <td>Diseño y Planificación</td> 
                     <td>${sumaDiseñoPlanificacionUSU}%</td>
                   </tr>                   
                 </tbody>
                 </table>                  
                  <p>Total capitulo de GESTIÓN EN SOSTENIBILIDAD AMBIENTAL: <strong>${totalGestSostAmbiental}%.</strong> </p>
                  <p>Total capitulo de ALINEACIÓN USAID: <strong>${totalAlineasionUSAID.toFixed(0)}%.</strong> </p>
                  <p>Resultado final de la encuesta: <strong>${totalEncuestaFINAL}%.</strong></p>              
                                             
                  <p>La empresa apícola <strong>${nombreOrganizacion.toUpperCase()} </strong> no tiene aspectos a mejorar</p>              
               `;  
     } 

     {/* <div class=" right-align">      
        <a class="btn-floating" onclick="pruebaDivAPdf()" ><i class="material-icons red">picture_as_pdf</i></a>        
      </div> */}
 
     if (arrayCierreAPICOLAS.length > 0) {
      document.getElementById("zonaResultados").innerHTML = 
      ` <h4>Avancemos Bajo Cauca</h4>
        <p>Herramienta de Valoración Ambiental</p> 
        <p>Empresa apícola: <strong>${nombreOrganizacion.toUpperCase()}</strong></p>
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
                     <td>Monitoreo y Evaluación</td>
                     <td>${sumaMonitoreoEvaUSU}%</td>
                   </tr>
                   <tr>
                     <td>Alineacion USAID</td>
                     <td>Operaciones</td>
                     <td>${sumaOperacionesUSU}%</td>
                   </tr>                   
                   <tr>
                   <td>Alineacion USAID</td>
                     <td>Diseño y Planificación</td>
                     <td>${sumaDiseñoPlanificacionUSU}%</td>
                   </tr>                   
                 </tbody>
                 </table>                
                  <p>Total capitulo de GESTIÓN EN SOSTENIBILIDAD AMBIENTAL: <strong>${totalGestSostAmbiental.toFixed(1)}%.</strong> </p>
                  <p>Total capitulo de ALINEACIÓN USAID: <strong>${totalAlineasionUSAID.toFixed(1)}%.</strong> </p>
                  <p>Resultado final de la encuesta: <strong>${totalEncuestaFINAL.toFixed(1)}%.</strong></p>
                  <p>Para continuar con el proceso de mejoramiento, la empresa apícola <strong>${nombreOrganizacion.toUpperCase()}</strong> deberá cerrar las brechas de los siguientes <strong>${arrayCierreAPICOLAS.length}</strong> items</p>                                               
                <h5 class="center-align"><strong>Cierre de brechas</strong></h5> 
      `;
     }

     console.log("------------------->TABLA ENCUESTA")
     console.log(ArrayEncuestaAPICOLA);

     console.log("------------------->TABLA CIERRE DE BRECHAS")
     console.log(arrayCierreAPICOLAS);

     $('#principal').find('input').attr('disabled','disabled');
     $('.validaGestionAmbiental').addClass("disabled").removeClass("pulse");
     $('.ValidaGesRecNat' ).addClass("disabled").removeClass("pulse");
     $('.validaCambioClimatico').addClass("disabled").removeClass("pulse");
     $('.validaCulturaAmbiental').addClass("disabled").removeClass("pulse");
     $('.ValidaOtrasEstrategias').addClass("disabled").removeClass("pulse");

     $('.validaMonitoreoEva').addClass("disabled").removeClass("pulse");
     $('.validaOperaciones').addClass("disabled").removeClass("pulse");
     $('.validaDisenoPlanificacion').addClass("disabled").removeClass("pulse");



    /* Aqui genero el archivo en PDF */
    pruebaDivAPdf();
     



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
    arrayCierreAPICOLAS.push(objCierreBrechas);   
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
 

//----------------------> ALINEACION USAID MONITOREO Y EVALUACION

    funcionCierreBrechas(mye1, 16.7,'Alineación USAID','Monitoreo y Evaluación', '1. Realizar mantenimientos periódicamente.', 'La organización, realiza revisión diariamente de las colmenas para garantizar su producción y comportamiento');

    funcionCierreBrechas(mye2, 16.6,'Alineación USAID','Monitoreo y Evaluación', '2. Monitorear la presencia de posibles plagas', 'La organización, realiza revisión diariamente de las colmenas para garantizar la sanidad de las abejas');

    //----------------------> ALINEACION USAID OPERACIONES
    funcionCierreBrechas(op1, 2,'Alineación USAID','Operaciones', '1. Adoptar protocolos de seguridad.', 'La organización cuenta con un protocolo de seguridad y lo implementa ');

    funcionCierreBrechas(op2, 2,'Alineación USAID','Operaciones', '2. Aislar y/o controlar la zona ', 'La organización, tiene cercado el apiario a fin de evitar presencia de animales y personal no autorizado');

    funcionCierreBrechas(op3, 2,'Alineación USAID','Operaciones', '3. Cumplir con los lineamientos de control sanitario ', 'La organización cuenta con un protocolo y lo implementa para la correcta disposición de los residuos');

    funcionCierreBrechas(op4, 2,'Alineación USAID','Operaciones', '4. Contar con botiquines de primeros auxilios', 'La organización cuenta con un botiquín de primeros auxilios de fácil acceso y dotado con los elementos necesarios');

    funcionCierreBrechas(op5, 2,'Alineación USAID','Operaciones', '5. Dotar y utilizar equipos de protección', 'La organización, cuenta con el equipo de dotación para llevar a acabo cada una de las actividades productivas y lo usa');

    funcionCierreBrechas(op6, 2,'Alineación USAID','Operaciones', '6. Aplicar protocolos de bioseguridad ', 'La organización, cuenta con un protocolo de bioseguridad y lo implementa para prevenir posibles riesgos o desinfección');

    funcionCierreBrechas(op7, 2,'Alineación USAID','Operaciones', '7. Acogerse a la normatividad de SST', 'La organización, cuenta con herramientas y equipos de acuerdo a la normatividad ');

    funcionCierreBrechas(op8, 2,'Alineación USAID','Operaciones', '8. Señalizar claramente las zonas.', 'La organización, cuenta con los avisos dentro del apiario de cada ciclo productivo');

    funcionCierreBrechas(op9, 2,'Alineación USAID','Operaciones', '9. Almacenamiento seguro de insumos', 'La organización, cuenta con una bodega para almacenamiento de insumos y medicamentos ');

    funcionCierreBrechas(op10, 2,'Alineación USAID','Operaciones', '10. Aprovechar  los residuos y/o subproductos ', 'La organización, comercializa los subproductos provenientes de la actividad productiva como polen, propoleo, cera entre otros');

    funcionCierreBrechas(op11, 2,'Alineación USAID','Operaciones', '11. Proteger las inversiones para evitar posibles pérdidas.', 'La organización, cuenta con seguros a fin de garantizar la protección de la inversión realizada en caso de accidente ');

    funcionCierreBrechas(op12, 2,'Alineación USAID','Operaciones', '12. Promover la mano de obra local.', 'La organización, contrata la mano de obra local con el fin de promover la economía dentro de la comunidad');

    funcionCierreBrechas(op13, 2,'Alineación USAID','Operaciones', '13. Adoptar métodos de control para enfermedades y plagas ', 'La organización cuenta con un protocolo y lo implementa para cumplir con el Manejo Integrado de plagas desde el PERSUAP');

    funcionCierreBrechas(op14, 2,'Alineación USAID','Operaciones', '14. Realizar actividades usando métodos y equipos permitidos ', 'La organización, tiene claro , identifica y cuenta con las herramientas adecuadas y permitidas para el uso en la unidad productiva');

    funcionCierreBrechas(op15, 2,'Alineación USAID','Operaciones', '15. Adoptar métodos de control adecuados para especies introducidas ', 'La organización, cuenta con un protocolo y lo implementa para el manejo adecuado de especies invasoras ');

    funcionCierreBrechas(op16, 2,'Alineación USAID','Operaciones', '16. Usar los ahumadores solo cuando sean necesarios ', 'La organización, utiliza el ahumador solo en los casos que se requieren para la actividad productiva');

    funcionCierreBrechas(op17, 2,'Alineación USAID','Operaciones', '17. Evitar las quemas.', 'La organización, evita realizar quemas y maneja otras alternativas agronómicas amigables con el medio ambiente ');    

//----------------------> ALINEACION USAID DISEÑO Y PLANIFICACION

funcionCierreBrechas(dyp1, 2.3,'Alineación USAID','Diseño y Planificación', '1. Realizar planes de finca o planes de implementación', 'La organización, cuenta con un plan de formación para mejorar su sistemas productivo y conservar los recursos naturales');

funcionCierreBrechas(dyp2, 2.3,'Alineación USAID','Diseño y Planificación', '2. Promover corredores de conectividad entre bosques ', 'La organización, realiza la interacción de la producción con los bosque naturales a través del sistema productivo');

funcionCierreBrechas(dyp3, 2.3,'Alineación USAID','Diseño y Planificación', '3. Respetar los usos del suelo', 'La organización, cuenta con los permisos de uso del suelo para la implementación de esa actividad productiva');

funcionCierreBrechas(dyp4, 2.3,'Alineación USAID','Diseño y Planificación', '4. Utilizar materiales que provengan de sitios legales', 'La organización, utiliza materiales legales y certificadas por la autoridad competente');

funcionCierreBrechas(dyp5, 2.3,'Alineación USAID','Diseño y Planificación', '5. Ubicar las colmenas elevadas del piso ', 'La organización, cuenta con las colmenas elevadas del piso para evitar contaminación del producto');

funcionCierreBrechas(dyp6, 2.3,'Alineación USAID','Diseño y Planificación', '6. Involucrar a las comunidades locales', 'La organización , trabaja de la mano con las comunidades locales donde se ejecuta el proyecto');

funcionCierreBrechas(dyp7, 2.3,'Alineación USAID','Diseño y Planificación', '7. Verificar condiciones necesarias de alimento (polen) y agua', 'La organización, verifica permanentemente que se cuente con las condiciones necesarias de alimento en la zona');

funcionCierreBrechas(dyp8, 2.3,'Alineación USAID','Diseño y Planificación', '8. Garantizar ubicaciones en zonas seguras ', 'La organización, tienen ubicada el proyecto productivo en zona segura y menos vulnerables a derrumbes e inundaciones');

funcionCierreBrechas(dyp9, 2.3,'Alineación USAID','Diseño y Planificación', '9. Considerar los registros de información histórica  ', 'La organización, cuenta con información climática de la zona para trabajar adecuadamente de acuerdo a estas variables');

funcionCierreBrechas(dyp10, 2.3,'Alineación USAID','Diseño y Planificación', '10. Evitar tumbar árboles y/o extraer fauna.', 'La organización, no realiza tala de arboles y extracción de fauna en la zona');

funcionCierreBrechas(dyp11, 2.3,'Alineación USAID','Diseño y Planificación', '11. Verificar que no hayan aplicaciones de pesticidas ', 'La organización, cuenta con un protocolo y lo implementa para el uso de agroquímicos de manera responsable');

funcionCierreBrechas(dyp12, 2.3,'Alineación USAID','Diseño y Planificación', '12. Obtener todos los permisos/licencias legales ', 'La organización, cuenta con los permisos requeridos para la producción');

funcionCierreBrechas(dyp13, 2.3,'Alineación USAID','Diseño y Planificación', '13. Conservar y proteger los bosques existentes.', 'La organización, realiza actividades de reforestación de especies nativas a fin de conservar los bosques de la zona');

funcionCierreBrechas(dyp14, 2.3,'Alineación USAID','Diseño y Planificación', '14. Conservar o reforestar las zonas de protección ', 'La organización, realiza permanente mente reforestación en la zona de especies nativas con el fin de proteger las fuente hídricas');

funcionCierreBrechas(dyp15, 2.3,'Alineación USAID','Diseño y Planificación', '15. Usar materiales no tóxicos (ambientalmente aceptados).', 'La organización, usa productos amigables con el medio ambiente');

   

}


function pruebaDivAPdf() {
  var pdf = new jsPDF('p','pt', [1900, 1400]);
  // var pdf = new jsPDF('p', 'pt', 'letter');

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

//   margins = {
//     top: 0,
//     bottom: 10,
//     left: 40,
//     width: 450 
// };

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
      $(location).attr('href',"../pages/apicolas.html");
    }
  })
}

// Funcion para traeerme los datos de la base de datos
enviarServerApicolas= async () => {
  $("#loader").show();

  var db = new Dexie("bd_avancemosAPICOLAS");
  db.version(1).stores({
      tblApicola: '++id, org_nombreOrganizacion, org_nit',
      tblCierreBrechaApicolas: "++id, org_nombreOrganizacion, org_nit",   
  });

  const tablaApicola = await db.tblApicola.toArray();
  const tablaCierreBrechaApicola = await db.tblCierreBrechaApicolas.toArray();

  console.table(tablaApicola);
  console.table(tablaCierreBrechaApicola);

  

  console.log("Esto es lo que se envia al servidor y se guardara en la base de datos para APICOLAS: ")
  // console.log(arrayFamilias);

   /*  var dataApicolas = {"dataEncuestaApicolas": tablaApicola };
    var dataCierreApicolas = {"dataCierreApicolas": tablaCierreBrechaApicola }; */

    /* console.log(dataApicolas); */
    //console.log(dataCierreApicolas);

    /* var json = JSON.stringify(dataApicolas); */
    //var jsonCierres = JSON.stringify(dataCierreApicolas);

    var EncuestasApicolas = {"dataEncuestaApicolas": tablaApicola };
    // console.log(EncuestasApicolas);
    var CierreApicolas = {"dataCierresApicolas": tablaCierreBrechaApicola };
    // console.log(CierreApicolas);

    var json = JSON.stringify(EncuestasApicolas);
    var jsonCierre = JSON.stringify(CierreApicolas);

    // console.log(json);
    // console.log(jsonCierre);    

    // Variables para enviar al servidos:
    const dataEncuestas = new FormData();
    const dataCierres = new FormData();
   

    // Asigno el nombre a json que se va a enviar
    dataEncuestas.append('jsonEncuestas', json);
    dataCierres.append('jsonCierres', jsonCierre);
    
    

    /* Enviando las ENCUESTAS APICOLAS */
    await fetch("http://portafolioverde.org/encuestas-afe/apicolas.php", {
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
      

      /* Enviando los CIERRES DE BRECHAS APICOLAS */
  await fetch("http://portafolioverde.org/encuestas-afe/cierresapicolas.php", {
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

      
  };

  // BD par realizar el auntocargue
  /* var opciones = {
    //'id': ['Nombre', 'Ubicación', 'NIT', 'Telefono', 'Correo Electronico', 'Representante']
    //'ID': ['0', '1', '2', '3', '4', '5']:      
    '1': ['AGROASTURIAS', 'CÁCERES', '901112015-1', '3108333496', 'agroasturias2017@gmail.com', 'CLAUDIA PATRICIA VÉLEZ TORO'],
    '2': ['AMAGROCAN', 'CÁCERES', '901225896-7', '310894467', 'amagrocan2018@gmail.com', 'DENIS DEL SOCORRO MEJÍA MEJÍA'],
    '3': ['APÍCOLA EL AHORRO', 'CÁCERES', 'Sin Dato', '3147256947', 'navarrodeifa32@gmail.com', 'DELFA DEL CARMEN BANQUET NAVARRO'],
    '4': ['ASOAGROPIAMONTE', 'CÁCERES', '901359623-9', '3206495704', 'lopezar1224@gmail.com', 'ALBA ROCÍO LÓPEZ CASTILLO'],
    '5': ['ASOGRANCA', 'CÁCERES', '901334447-2', '3206975821', 'orlandobertel79@gmail.com', 'ORLANDO MANUEL BERTEL CAÑAVERAL'],
    '6': ['CANAÁN', 'CÁCERES', 'Sin Dato', '3104734525', 'oscarguerra8056@gmail.com', 'OSCAR ALONSO GUERRA LÓPEZ'],
    '7': ['EL PROGRESO', 'CÁCERES', '21590397', '3137129682', 'asobeca2019@gmail.com', 'MIRIAN IBED FLÓREZ ROJAS'],
    '8': ['GOLDEN BEE', 'CÁCERES', '7542199', '3136110270', 'davidpulgarinb@gmail.com', 'DAVID PULGARIN BETANCUR'],
    '9': ['LA ESMERALDA ALEJANDRO NUÑEZ', 'CÁCERES', '15309404', '3147181359', 'Sin Dato', 'ALEJANDRO FIDEL NÚÑEZ POLANCO'],
    '10': ['PARAÍSOS DE MIEL', 'CÁCERES', '1037618073', '3195733292', 'brayan.abello@gmail.com', 'BRAYAN JOSÉ ABELLO VERA'],
    '11': ['APIARIO LOS AMIGOS', 'CAUCASIA', '15304111', '3108437607', 'Sin Dato', 'GAMALIEL ANTONIO PÉREZ PÉREZ'],
    '12': ['APÍCOLA EL ESCONDIDO', 'CAUCASIA', '15307442', '3108029239', 'Sin Dato', 'MIGUEL ENRIQUE DURANGO VIDES'],
    '13': ['APÍCOLA EL FUTURO', 'CAUCASIA', '12603567', '3216965963', 'Sin Dato', 'VICENTE GALVIS NAVARRO'],
    '14': ['APÍCOLA EL PANAL', 'CAUCASIA', '1038139104', '3024008359', 'andreinacon2017@gmail.com', 'ANDREINA CONTRERAS MERCADO'],
    '15': ['APÍCOLA EL POLVILLO', 'CAUCASIA', '39284372', '3128780744', 'Sin Dato', 'DAMARIS ISABEL BLANCO'],
    '16': ['APÍCOLA EL PROGRESO', 'CAUCASIA', '39283111', '3126371125', 'david manzanares 2021@gmail.com', 'LUZ MERIS ARROLLO CASTILLO'],
    '17': ['APÍCOLA LA BENDICIÓN - ESTER MARÍA ARRIETA ARRIETA', 'CAUCASIA', '21640960', '3137237542', 'rut08@outlook.com', 'ESTER MARÍA ARRIETA ARRIETA'],
    '18': ['APÍCOLA LA BENDICIÓN - YIRA LILIANA ARRIETA ARRIETA', 'CAUCASIA', 'Sin Dato', '3137237542', 'rut08@outlook.com', 'YIRA LILIANA ARRIETA ARRIETA'],
    '19': ['APÍCOLA LA ESPERANZA - JUAN CARLOS ZURITA ROMERO', 'CAUCASIA', '1001535033', '3107065375', 'lidisromero13@gmail.com', 'JUAN CARLOS ZURITA ROMERO'],
    '20': ['APÍCOLA LA ESPERANZA - PAOLA ANDREA TAPIAS LÓPEZ', 'CAUCASIA', '1037481938', '3126404380', 'Sin Dato', 'PAOLA ANDREA TAPIAS LÓPEZ'],
    '21': ['APÍCOLA LA FE', 'CAUCASIA', '43896221', '3116130491', 'Sin Dato', 'NOREDIS TRINIDAD SAYAS HERNÁNDEZ'],
    '22': ['APÍCOLA LA PAULINA - CARLOS ALBERTO ARROYAVE LOPERA', 'CAUCASIA', '71535883', '3137324311', 'caal2373@hotmail.com', 'CARLOS ALBERTO ARROYAVE LOPERA'],
    '23': ['APÍCOLA LA PAULINA - MARÍA EPIFANÍA LOPERA DE ARROYAVE', 'CAUCASIA', '21631227', '3106048306', 'caal2373@hotmail.com', 'MARÍA EPIFANÍA LOPERA DE ARROYAVE'],
    '24': ['APÍCOLA LA VICTORIA', 'CAUCASIA', '39288381', '3137737494', 'Sin Dato', 'ARINDA DEL CARMEN POLO RODRÍGUEZ'],
    '25': ['APÍCOLA LAS FLORES', 'CAUCASIA', '43889259', '3217677324', 'Sin Dato', 'MIRLEY ELENA PARADA FLORES'],
    '26': ['APÍCOLA LOS AMIGOS', 'CAUCASIA', '8046251', '3136786400', 'josé maría tirado 521@gmail.com', 'JOSÉ MARIA TIRADO MONTES'],
    '27': ['APÍCOLA LOS ÁNGELES', 'CAUCASIA', '15303989', '3122855921', 'Sin Dato', 'GREGORIO MANUEL VERBEL ROJAS'],
    '28': ['APÍCOLA LOS OLIVOS', 'CAUCASIA', '8047083', '3505276941', 'Sin Dato', 'FRANCISCO MIGUEL TERÁN CELESTINO'],
    '29': ['APÍCOLA VILLA ADRIANA', 'CAUCASIA', '52353129', '3148321035', 'meléndezmartinezfransisca01@gmail.com', 'FRANCISCA MELÉNDEZ MARTÍNEZ'],
    '30': ['LA BENDICIÓN DE DIOS - PEDRO JUAN OVIEDO GUZMÁN', 'CAUCASIA', '8046697', '3147335235', 'pedrojuanoviedoguzman@gmail.com', 'PEDRO JUAN OVIEDO GUZMÁN'],
    '31': ['LA ESPERANZA - ANA RITA ARIAS MÉNDEZ', 'CAUCASIA', '39267250', '3105673275', 'Sin Dato', 'ANA RITA ARIAS MÉNDEZ'],
    '32': ['LOTE 5 Y LOTE 9', 'CAUCASIA', 'Sin Dato', '3205905226', 'cl192134@gmail.com', 'DANIEL ARENAS RAMÍREZ'],
    '33': ['NUEVA ESPERANZA', 'CAUCASIA', '39278927', '3137152431', 'astrid elena 1975@gmail.com', 'ASTRID ELENA GUZMÁN MORALES'],
    '34': ['BUENA SUERTE', 'EL BAGRE', '1007824306', '0', 'Sin Dato', 'SANDRA VIVIANA NAVARRO JORGE'],
    '35': ['DULCE MANJAR', 'EL BAGRE', '98475001', '3235097398', 'Sin Dato', 'MANUEL EUSEBIO TORRES'],
    '36': ['LA BENDICIÓN DE DIOS - EDER ENRIQUE PINTO PILA', 'EL BAGRE', '1003359519', '3117996891', 'Sin Dato', 'EDER ENRIQUE PINTO PILA'],
    '37': ['LA IDEA', 'EL BAGRE', '8372554', '3214316918', 'Sin Dato', 'JAIME MARTÍNEZ BENAVIDES'],
    '38': ['LA VIRGEN', 'EL BAGRE', '1038480740', '3114302272', 'Sin Dato', 'IVÁN DARÍO MARTÍNEZ NAVARRO'],
    '39': ['MANANTIAL', 'EL BAGRE', '43699235', '3114047018', 'Sin Dato', 'LUZ ENITH BERTEL SILGADO'],
    '40': ['APIARIO EL CERRITO', 'NECHÍ', '43890221', '3117121674', 'Sin Dato', 'ILSA RAQUEL MARTÍNEZ TOVAR'],
    '41': ['APIARIO EL FILO', 'NECHÍ', '1038111505', '3215605740', 'Sin Dato', 'CINDY PAOLA MIELES GAVIRIA'],
    '42': ['APIARIO EL INICIO', 'NECHÍ', '1001849457', '3178431378', 'Sin Dato', 'NESTOR IVAN PATERNINA MENDOZA'],
    '43': ['APIARIO EL MANGUITO', 'NECHÍ', '50930292', '3116309967', 'martinezadelisa502@gmail.com', 'ADELISA DEL CARMEN MARTÍNEZ NISPERUZA'],
    '44': ['APIARIO EL PAPAYOTE', 'NECHÍ', '43888886', '3102781265', 'Sin Dato', 'NELFIS ISABEL GOEZ LOOBO'],
    '45': ['APIARIO EL PIÑAL', 'NECHÍ', '43804203', '3125572720', 'Sin Dato', 'PIEDAD DE JESÚS MOLINA MEJÍA'],
    '46': ['APIARIO EL PORVENIR', 'NECHÍ', '15304556', '3117564090', 'Sin Dato', 'JUAN MANUEL SANDOVAL GAVIRIA'],
    '47': ['APIARIO LA QUEBRADA', 'NECHÍ', '43804119', '3132416013', 'Sin Dato', 'EMÉRITA SIERRA JIMÉNEZ'],
    '48': ['APIARIO LAS ACACIAS', 'NECHÍ', '8374176', '31898922278', 'nisperuza351@gmail.com', 'RAFAEL ANTONIO MARTÍNEZ NISPERUZA'],
    '49': ['APIARIO LOMA FRESCA', 'NECHÍ', '43804879', '3147125663', 'sorysalgado10@gmail.es', 'ZORAIDA SAILGADO ESCOBAR'],
    '50': ['APIARIO QUEMADO', 'NECHÍ', '1049563217', '3226055732', 'lecelisacosta33@gmail.com', 'LUCELIS ACOSTA AGUAS'],
    '51': ['APIARIO RENACER', 'NECHÍ', '100150661', '3234886107', 'acostasilgadozuri@gmail.com', 'ZURI SADAY ACOSTA SAILGADO'],
    '52': ['APIARIO VILLA ZULIA', 'NECHÍ', '8052466', '3105429911', 'piedadmolina813@gmail.com', 'JHON JAIRO SALAZAR JARAMILLO'],
    '53': ['APIARIO VIO MIEL', 'NECHÍ', '1066526425', '3136307351', 'Sin Dato', 'KEYLA MARGARITA CORREA PÉREZ'],
    '54': ['APIARIO YIRETH - YORLEDIS - MEJIA', 'NECHÍ', '39283882', '3218308144', 'Sin Dato', 'YORLEDIS MEJÍA SANTOS'],
    '55': ['EL RAYO', 'NECHÍ', '11003516', '3142012968', 'Sin Dato', 'ISIDRO MANUEL MARTÍNEZ NISPERUZA'],
    '56': ['LA ABUELA', 'NECHÍ', '39267810', '3143457810', 'Sin Dato', 'ELCY MARÍA BECERRA'],
    '57': ['LA BENDICIÓN - OLME MAURICIO RIVAS CALIS', 'NECHÍ', '1050426440', '3127016150', 'Sin Dato', 'OLME MAURICIO RIVAS CALIS'],
    '58': ['LA BENDICIÓN DE DIOS - ENITH DEL CARMEN LIBERNA', 'NECHÍ', '43693487', '3207978604', 'Sin Dato', 'ENITH DEL CARMEN LIBERNA'],
    '59': ['SOL Y LUNA', 'NECHÍ', '43890017', '3136837460', 'Sin Dato', 'NOLIBIS YADITH MONTOYA SIGADO'],
    '60': ['ALTO LOS LOROS', 'TARAZÁ', '32906683', '3226125340', 'claro2403@gmail.com', 'CLAUDIA ROCÍO ARCILA GIRALDO'],
    '61': ['APIARIO LA BENDICION - ARGENIDA MARÍA SIERRA COGOLLO', 'TARAZÁ', '50886172', '3192503170', 'sierraargenida@gmail.com', 'ARGENIDA MARÍA SIERRA COGOLLO'],
    '62': ['APÍCOLA LAS MUÑECAS-DUMAR', 'TARAZÁ', '8038947', '3103612605', 'semarve35@hotmail.com', 'JOSÉ DUMAR MONSALVE MAZO'],
    '63': ['APÍCOLA RÍO RAYO', 'TARAZÁ', '8058059', '3174395562', 'zootecnia@hdariorayo.com.co', 'CARLOS ARTURO MEZA BUSTAMANTE'],
    '64': ['BARRO BLANCO - JHON SUAREZ', 'TARAZÁ', '71991650', '3506123692', 'Sin Dato', 'JHON JAIRO SUÁREZ RAMÍREZ'],
    '65': ['EL AREQUIPE', 'TARAZÁ', '1045429738', '3008114007', 'Sin Dato', 'YACKELIN GIRALDO JARAMILLO'],
    '66': ['EL CARMELO', 'TARAZÁ', '8038114', '3218747608', 'Sin Dato', 'JESÚS ANTONIO SERNA ÁLVAREZ'],
    '67': ['EL CAUCE', 'TARAZÁ', '32111331', '3172781189', 'guerreronubia85@gmail.com', 'NUBIA DEL CARMEN GUERRERO QUIROZ'],
    '68': ['EL CAUCHO', 'TARAZÁ', '8037041', '3113398437', 'Sin Dato', 'JOSÉ NICOLÁS LONDOÑO JIMÉNEZ'],
    '69': ['EL GORGOJO', 'TARAZÁ', '8037803', '3002751031', 'Sin Dato', 'OVEY DE JESÚS ARGAEZ MONTOYA'],
    '70': ['EL SOLITO', 'TARAZÁ', '4964165', '3104398069', 'Sin Dato', 'WALDO RAMÓN SÁNCHEZ SÁNCHEZ'],
    '71': ['EL SOLITO - MARYARIS', 'TARAZÁ', '1001532503', '3103199955', 'mntorreglosa@gmail.com', 'MARYARIS NAUDITH TORREGLOSA COTERA'],
    '72': ['JALISCO', 'TARAZÁ', '3370753', '3216440328', 'jlalvarezbarreintos@gmail.com', 'JORGE LUIS ÁLVAREZ BARRIENTOS'],
    '73': ['LA CUENCA', 'TARAZÁ', '3651828', '3114767182', 'Sin Dato', 'JESÚS ANTONIO MORA'],
    '74': ['LA ESMERALDA', 'TARAZÁ', '78105199', '3504339909', 'Sin Dato', 'ALFREDO JOSÉ COCHERO ROMÁN'],
    '75': ['LA ESPERANZA - RICARDO ANTONIO RICARDO PÉREZ', 'TARAZÁ', '10876874', '3206603936', 'Sin Dato', 'RICARDO ANTONIO RICARDO PÉREZ'],
    '76': ['LA ESPERANZA PUERTO ANTIOQUIA', 'TARAZÁ', '8038483', '3148413382', 'Sin Dato', 'JHON SADITH SERNA ÁLVAREZ'],
    '77': ['LA ESPERANZA QUINTERON', 'TARAZÁ', '15324382', '3103178272', 'carlosemiliotuberquia67@gmail.com', 'CARLOS EMILIO TUBERQUIA TUBERQUIA'],
    '78': ['LA FAMILY', 'TARAZÁ', '45762553', '3104640830', 'Sin Dato', 'FRANCIA ELENA ARCILA GIRALDO'],
    '79': ['LA MICROCUENCA', 'TARAZÁ', '8037138', '3113757334', 'Sin Dato', 'MARIO DE JESÚS LOPERA'],
    '80': ['LAS MUÑECAS', 'TARAZÁ', '70541128', '3187737129', 'nederpaisa@hotmail.com', 'NEDER ALONSO RÍOS MONTOYA'],
    '81': ['LOS ANGELES', 'TARAZÁ', '8039430', '3136967452', 'Sin Dato', 'JOHNY DE JESÚS YOTAGRI'],
    '82': ['LUIS YANA', 'TARAZÁ', '79520671', '0', 'Sin Dato', 'LUIS MAURICIO ÁVILA RINCÓN'],
    '83': ['RIO RAYO', 'TARAZÁ', '1044505797', '3208462564', 'eduaranaya19@hotmail.com', 'EDUAR ANDRÉS AMAYA MORÓN'],
    '84': ['VALENTINA', 'TARAZÁ', '8037476', '3017772729', 'Sin Dato', 'ALCIDES YOTAGRI JARAMILLO'],
    '85': ['ABEJAS', 'ZARAGOZA', '39269776', '3156985860', 'Sin Dato', 'BETTY MARGOTH DIMAS CORONADO'],
    '86': ['AMADAS', 'ZARAGOZA', '22836253', '3232853657', 'Sin Dato', 'ROSMIRA ISABEL VILLEGAS PERALTA'],
    '87': ['ARIAS LOPEZ', 'ZARAGOZA', '8364740', '3155287315', 'Sin Dato', 'BAYRON YESID ARIAS ZAPATA'],
    '88': ['CAÑO CLARO', 'ZARAGOZA', '3371770', '3136816481', 'Sin Dato', 'JAIRO ALBERTO CHICA'],
    '89': ['DIOS PROVEERÁ', 'ZARAGOZA', '22239375', '3124141839', 'Sin Dato', 'MARIA MAGDALENA CASTILLO SUÁREZ'],
    '90': ['DIOS PROVEERÁ - SAN JUAN DE PELUSA', 'ZARAGOZA', '3672889', '3114175977', 'Sin Dato', 'TOMÁS FLÓREZ BERNA'],
    '91': ['EL 50', 'ZARAGOZA', '1042825124', '3183260416', 'Sin Dato', 'KARLA CAROLINA OLIVERO GRACIANO'],
    '92': ['EL CERRITO', 'ZARAGOZA', '6616358', '3156848826', 'Sin Dato', 'JOSÉ ALEJANDRO ROMERO DE HOYOS'],
    '93': ['EL JARDIN', 'ZARAGOZA', '3670689', '3104524427', 'Sin Dato', 'FRANCISCO JAVIER VILORIA ZABALETA'],
    '94': ['EL PALMAR', 'ZARAGOZA', '43897600', '3233683317', 'Sin Dato', 'FRANCIA ROSA RIVERA SUÁREZ'],
    '95': ['EL PROGRESO - YESID FERNEY PALACIO DE DIEGO', 'ZARAGOZA', '1007324725', '3172381285', 'Sin Dato', 'YESID FERNEY PALACIO DE DIEGO'],
    '96': ['GERILUZ', 'ZARAGOZA', '98475751', '3197419019', 'Sin Dato', 'GERMAN ANTONIO ARRIETA ALARCÓN'],
    '97': ['GERYLUZ - LUZ MARY SOLAR', 'ZARAGOZA', '1032248035', '3172947086', 'Sin Dato', 'LUZ MARY SOLAR SILVA'],
    '98': ['KELLY', 'ZARAGOZA', '1001682215', '3106271099', 'Sin Dato', 'KELLY JOHANA CASTILLO ACOSTA'],
    '99': ['LA BATEA', 'ZARAGOZA', '22243266', '3164319662', 'Sin Dato', 'Sin Dato'],
    '100': ['LA BENDICIÓN', 'ZARAGOZA', '92028645', '3175833079', 'Sin Dato', 'RAÚL ENRIQUE ROMERO PÉREZ'],
    '101': ['LA BENDICIÓN - EDISON TAMARA', 'ZARAGOZA', '4440077', '0', 'Sin Dato', 'EDINSON MANUEL TAMARA BENÍTEZ'],
    '102': ['LA BENDICIÓN CORDERO ICACALES', 'ZARAGOZA', '1007578265', '3126156158', 'Sin Dato', 'JANIS MELISSA JULIO VILLALBA'],
    '103': ['LA BENDICIÓN DE DIOS - CRISTOVALINA DE DIEGO', 'ZARAGOZA', '43693856', '3195935127', 'Sin Dato', 'CRISTOVALINA DE DIEGO'],
    '104': ['LA BENDICIÓN DE DIOS - DIONISIA VILORIA', 'ZARAGOZA', '43895824', '3167887639', 'Sin Dato', 'DIONISIA MARÍA VILORIA ARRIETA'],
    '105': ['LA BENDICIÓN DE DIOS - LUÍS FERNANDO MORELO', 'ZARAGOZA', '8363885', '3146814922', 'luisfdoromero38@gmail.com', 'LUÍS FERNANDO MORELO'],
    '106': ['LA BENDICIÓN DE DIOS - MARCIANA JUDITH PÉREZ PERTUZ', 'ZARAGOZA', '64564001', '3134715190', 'Sin Dato', 'MARCIANA JUDITH PÉREZ PERTUZ'],
    '107': ['LA BENDICIÓN DE DIOS - MARIA ROMERO', 'ZARAGOZA', '39279319', '0', 'Sin Dato', 'MARÍA MARGARITA ROMERO'],
    '108': ['LA BENDICIÓN DE DIOS - ROSA DEDIEGO', 'ZARAGOZA', '26284494', '0', 'Sin Dato', 'ROSA MARÍA DEDIEGO BERMÚDEZ'],
    '109': ['LA BENDICIÓN DE DIOS - ROSMIRA ZAMBRANO', 'ZARAGOZA', '23062654', '3136828375', 'Sin Dato', 'ROSMIRA ZAMBRANO DE MERCADO'],
    '110': ['LA BENDICIÓN DE DIOS MARI DE JESUS LARGO', 'ZARAGOZA', '43694206', '3182543423', 'Sin Dato', 'MARI DE JESÚS LARGO BURITICA'],
    '111': ['LA BENDICIÓN EL DOCE', 'ZARAGOZA', '15672282', '3148195931', 'Sin Dato', 'ARNEL ENRIQUE PEÑA RODELO'],
    '112': ['LA CIMA', 'ZARAGOZA', '1045142112', '3507573115', 'juanpedroza529@gmail.com', 'JUAN DAVID PEDROZA LARGO'],
    '113': ['LA ESPERANZA', 'ZARAGOZA', '1040501364', '0', 'Sin Dato', 'GLEIDY ESTHER MOSCOTE RAMÍREZ'],
    '114': ['LA ESPERANZA - ROSINA DEL CARMEN ALBA YENERIS', 'ZARAGOZA', '34944952', '3128740081', 'Sin Dato', 'ROSINA DEL CARMEN ALBA YENERIS'],
    '115': ['LA ESPERANZA - SENITH ALZATE', 'ZARAGOZA', '1001158581', '3188197248', 'Sin Dato', 'SENITH DEL CARMEN ALZATE FERRER'],
    '116': ['LA ESPERANZA - YORLEDIS SOLAR SILVA', 'ZARAGOZA', '1038480040', '3172947086', 'Sin Dato', 'YORLEDIS SOLAR SILVA'],
    '117': ['LA ESPERANZA EL PATO', 'ZARAGOZA', '15301328', '3117283992', 'Sin Dato', 'ARMANDO DE JESÚS MANJARREZ TRESPALACIOS'],
    '118': ['LA FÉ', 'ZARAGOZA', '1038125716', '3135565283', 'arneiderm69@gmail.com', 'ARNEIDER MEJÍA PEÑA'],
    '119': ['LA ILUSIÓN', 'ZARAGOZA', '70001542', '3128480120', 'Sin Dato', 'EDGAR DE JESÚS SIERRA CARDONA'],
    '120': ['LA LUCHA', 'ZARAGOZA', '22242897', '3205464297', 'ennita.ortiz@gmail.com', 'SARA ENNA ORTIZ HERNANDEZ'],
    '121': ['LA VELENTINA', 'ZARAGOZA', '3672769', '3102659019', 'Sin Dato', 'MANUEL DE JESÚS SANTERO CLEMENTE'],
    '122': ['LAS BRISAS - YOEL PEÑA', 'ZARAGOZA', '15671796', '3113181154', 'Sin Dato', 'YOEL AYAN PEÑA RODELO'],
    '123': ['LAS BRISAS - YONEDIS PEÑA', 'ZARAGOZA', '1007409072', '3232868281', 'Sin Dato', 'YONEDIS PEÑA GALLEGO'],
    '124': ['LAS DELICIAS', 'ZARAGOZA', '1032246705', '3157968005', 'Sin Dato', 'MARY LUZ SOLAR SILVA'],
    '125': ['LAS GUARDIANAS', 'ZARAGOZA', '1040515099', '3184816548', 'ederney19931@gmail.com', 'MARÍA CLARA ARRIETA VILORIA'],
    '126': ['LOS EXTENSIONISTA', 'ZARAGOZA', '1001741728', '3235083200', 'ruby.l.9c@gmail.com', 'RUBY ESTELLA LONDOÑO RAMÍREZ'],
    '127': ['LOS EXTENSIONISTA - EDWIN TEJADA', 'ZARAGOZA', '1001741558', '3128651274', 'bersabet.500@hotmail.com', 'EDWIN DAVID TEJADA NAVARRO'],
    '128': ['LOS EXTENSIONISTAS - YESICA RAMIREZ', 'ZARAGOZA', '1007407189', '3224097518', 'Sin Dato', 'YESICA PAOLA RAMÍREZ NAVARRO'],
    '129': ['LOS RAMÍREZ', 'ZARAGOZA', '73200093', '3192777764', 'Sin Dato', 'MANUEL MARÍA RAMÍREZ ZÚÑIGA'],
    '130': ['MARGARITA', 'ZARAGOZA', '98475188', '3173337715', 'Sin Dato', 'ABEL BIENVENIDO VILORIA RÍOS'],
    '131': ['MIRABU', 'ZARAGOZA', '1040498934', '3217132214', 'Sin Dato', 'LORENA ISABEL MIRANDA SALCEDO'],
    '132': ['PRIMAVERA', 'ZARAGOZA', '8200371', '3205418333', 'Sin Dato', 'HÉCTOR ENRIQUE NISPERUZA COBOS'],
    '133': ['PUERTO AMOR', 'ZARAGOZA', '11062344', '3123562273', 'Sin Dato', 'NORBERTO ANTONIO CASTILLO RUIZ'],
    '134': ['SAIRA', 'ZARAGOZA', '44120539', '0', 'Sin Dato', 'CARMEN LUISA DEDIEGO BERMÚDEZ'],
    '135': ['SAMUEL', 'ZARAGOZA', '22246893', '3197498635', 'Sin Dato', 'LUZ LEYDIS MOSQUERA CUESTA'],
    '136': ['SOLI', 'ZARAGOZA', '43693439', '3124362194', 'Sin Dato', 'NELLY GUISAO'],
    '137': ['TRES HERMANOS', 'ZARAGOZA', '98611970', '3122151615', 'anuarjosegaray@gmail.com', 'ANUAR JOSÉ GARAY SALGADO'],
    '138': ['VILLA ISAVAL', 'ZARAGOZA', '8746267', '3197312879', 'Sin Dato', 'Sin Dato'],
    '139': ['VILLA LUISA', 'ZARAGOZA', '22238596', '3128332360', 'Sin Dato', 'ARELIS DEL CARMEN ÁVILA GÓMEZ']     
  }
  
  function cambioOpciones(){

    var combo = document.getElementById('opciones');
    var opcion = combo.value;    
   
    document.getElementById('nombreOrganizacion').value = opciones[opcion][0];  
    document.getElementById('ubicacion').value = opciones[opcion][1];  
    document.getElementById('nit').value = opciones[opcion][2];
    document.getElementById('telefono').value = opciones[opcion][3];
    document.getElementById('email').value = opciones[opcion][4];
    document.getElementById('representante').value = opciones[opcion][5];
    
  } */

 
  { // INICIO FUNCIONES PARA EXPORTAR CSV


    function arrayObjToCsv(ar, fileName, dateHours) {
      //comprobamos compatibilidad
      if(window.Blob && (window.URL || window.webkitURL)){
        var contenido = "",
          d = new Date(),
          blob,
          reader,
          save,
          clicEvent;
        //creamos contenido del archivo
        for (var i = 0; i < ar.length; i++) {
          //construimos cabecera del csv
          if (i == 0)
            contenido += Object.keys(ar[i]).join(";") + "\n";
          //resto del contenido
          contenido += Object.keys(ar[i]).map(function(key){
                  return ar[i][key];
                }).join(";") + "\n";
        }
        //creamos el blob
        blob =  new Blob(["\ufeff", contenido], {type: 'text/csv'});
        //creamos el reader
        var reader = new FileReader();
        reader.onload = function (event) {
          //escuchamos su evento load y creamos un enlace en dom
          save = document.createElement('a');
          save.href = event.target.result;
          save.target = '_blank';
          //aquí le damos nombre al archivo
          save.download = fileName + "_" + dateHours +".csv";
          try {
            //creamos un evento click
            clicEvent = new MouseEvent('click', {
              'view': window,
              'bubbles': true,
              'cancelable': true
            });
          } catch (e) {
            //si llega aquí es que probablemente implemente la forma antigua de crear un enlace
            clicEvent = document.createEvent("MouseEvent");
            clicEvent.initEvent('click', true, true);
          }
          //disparamos el evento
          save.dispatchEvent(clicEvent);
          //liberamos el objeto window.URL
          (window.URL || window.webkitURL).revokeObjectURL(save.href);
        }
        //leemos como url
        reader.readAsDataURL(blob);
      }else {
        //el navegador no admite esta opción
        alert("Su navegador no permite esta acción");
      }
    };

    var fechaHoraAcual = () => {
       // INICIO para obtener fecha y hora actal y ponerlo al nombre del archivo - AlexQ
       var hoy = new Date();     
       var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();          
       var hours = date.getHours();
       var minutes = date.getMinutes();
       var seconds = date.getSeconds();
       var ampm = hours >= 12 ? 'PM' : 'AM';
       hours = hours % 12;
       hours = hours ? hours : 12; // the hour '0' should be '12'
       minutes = minutes < 10 ? '0'+minutes : minutes;
       seconds = seconds < 10 ? '0'+seconds : seconds;
       var horaActual = hours + '-' + minutes + '-' + seconds + ampm;
       var fechaHora = fecha + "__" + horaActual;
       return fechaHora;
       // FIN para obtener fecha y hora actal y ponerlo al nombre del archivo - AlexQ
    }

    function descagarEncuestasApicolas() {      
      if (tablaCierresApicolas.length == 0) {

        return M.toast({html: 'No hay registros en la tabla de encuestas de apícolas', classes: 'orange'});

      } else {

        arrayObjToCsv(tablaApicola, "EncuestasApicolas_", fechaHoraAcual());
        M.toast({html: 'Se ha descargado correctamente las encuestas apícolas', classes: 'orange darken-2'});
      }           
  }
    
    function descagarCierresApicolas() {
        if (tablaCierresApicolas.length == 0) {

          return M.toast({html: 'No hay registros en la tabla de cierres de brechas', classes: 'orange'});

        } else {

          arrayObjToCsv(tablaCierresApicolas, "CierresBrechasApicolas_", fechaHoraAcual());
          M.toast({html: 'Se ha descargado correctamente la tabla de cierres de brechas de las encuestas apícolas', classes: 'orange darken-2'});
        }           
    }



  } // FIN FUNCIONES PARA EXPORTAR A CSV


  $('input.autocomplete').autocomplete({
    data: {
      '1 - CÁCERES - AGROASTURIAS - CLAUDIA PATRICIA VÉLEZ TORO': null,
        '2 - CÁCERES - AMAGROCAN - DENIS DEL SOCORRO MEJÍA MEJÍA': null,
        '3 - CÁCERES - APÍCOLA EL AHORRO - DELFA DEL CARMEN BANQUET NAVARRO': null,
        '4 - CÁCERES - ASOAGROPIAMONTE - ALBA ROCÍO LÓPEZ CASTILLO': null,
        '5 - CÁCERES - ASOGRANCA - ORLANDO MANUEL BERTEL CAÑAVERAL': null,
        '6 - CÁCERES - CANAÁN - OSCAR ALONSO GUERRA LÓPEZ': null,
        '7 - CÁCERES - EL PROGRESO - MIRIAN IBED FLÓREZ ROJAS': null,
        '8 - CÁCERES - GOLDEN BEE - DAVID PULGARIN BETANCUR': null,
        '9 - CÁCERES - LA ESMERALDA ALEJANDRO NUÑEZ - ALEJANDRO FIDEL NÚÑEZ POLANCO': null,
        '10 - CÁCERES - PARAÍSOS DE MIEL - BRAYAN JOSÉ ABELLO VERA': null,
        '11 - CAUCASIA - APIARIO LOS AMIGOS - GAMALIEL ANTONIO PÉREZ PÉREZ': null,
        '12 - CAUCASIA - APÍCOLA EL ESCONDIDO - MIGUEL ENRIQUE DURANGO VIDES': null,
        '13 - CAUCASIA - APÍCOLA EL FUTURO - VICENTE GALVIS NAVARRO': null,
        '14 - CAUCASIA - APÍCOLA EL PANAL - ANDREINA CONTRERAS MERCADO': null,
        '15 - CAUCASIA - APÍCOLA EL POLVILLO - DAMARIS ISABEL BLANCO': null,
        '16 - CAUCASIA - APÍCOLA EL PROGRESO - LUZ MERIS ARROLLO CASTILLO': null,
        '17 - CAUCASIA - APÍCOLA LA BENDICIÓN - ESTER MARÍA ARRIETA ARRIETA - ESTER MARÍA ARRIETA ARRIETA': null,
        '18 - CAUCASIA - APÍCOLA LA BENDICIÓN - YIRA LILIANA ARRIETA ARRIETA - YIRA LILIANA ARRIETA ARRIETA': null,
        '19 - CAUCASIA - APÍCOLA LA ESPERANZA - JUAN CARLOS ZURITA ROMERO - JUAN CARLOS ZURITA ROMERO': null,
        '20 - CAUCASIA - APÍCOLA LA ESPERANZA - PAOLA ANDREA TAPIAS LÓPEZ - PAOLA ANDREA TAPIAS LÓPEZ': null,
        '21 - CAUCASIA - APÍCOLA LA FE - NOREDIS TRINIDAD SAYAS HERNÁNDEZ': null,
        '22 - CAUCASIA - APÍCOLA LA PAULINA - CARLOS ALBERTO ARROYAVE LOPERA - CARLOS ALBERTO ARROYAVE LOPERA': null,
        '23 - CAUCASIA - APÍCOLA LA PAULINA - MARÍA EPIFANÍA LOPERA DE ARROYAVE - MARÍA EPIFANÍA LOPERA DE ARROYAVE': null,
        '24 - CAUCASIA - APÍCOLA LA VICTORIA - ARINDA DEL CARMEN POLO RODRÍGUEZ': null,
        '25 - CAUCASIA - APÍCOLA LAS FLORES - MIRLEY ELENA PARADA FLORES': null,
        '26 - CAUCASIA - APÍCOLA LOS AMIGOS - JOSÉ MARIA TIRADO MONTES': null,
        '27 - CAUCASIA - APÍCOLA LOS ÁNGELES - GREGORIO MANUEL VERBEL ROJAS': null,
        '28 - CAUCASIA - APÍCOLA LOS OLIVOS - FRANCISCO MIGUEL TERÁN CELESTINO': null,
        '29 - CAUCASIA - APÍCOLA VILLA ADRIANA - FRANCISCA MELÉNDEZ MARTÍNEZ': null,
        '30 - CAUCASIA - LA BENDICIÓN DE DIOS - PEDRO JUAN OVIEDO GUZMÁN - PEDRO JUAN OVIEDO GUZMÁN': null,
        '31 - CAUCASIA - LA ESPERANZA - ANA RITA ARIAS MÉNDEZ - ANA RITA ARIAS MÉNDEZ': null,
        '32 - CAUCASIA - LOTE 5 Y LOTE 9 - DANIEL ARENAS RAMÍREZ': null,
        '33 - CAUCASIA - NORELIS - JAIRO MANUEL CASTILLO GOEZ': null,
        '34 - CAUCASIA - NUEVA ESPERANZA - ASTRID ELENA GUZMÁN MORALES': null,
        '35 - EL BAGRE - BUENA SUERTE - SANDRA VIVIANA NAVARRO JORGE': null,
        '36 - EL BAGRE - DULCE MANJAR - MANUEL EUSEBIO TORRES': null,
        '37 - EL BAGRE - EL ANHELO - WALTER HERRERA PÉREZ': null,
        '38 - EL BAGRE - EL CASTILLO - NEVER MANUEL CASTILLO MESA': null,
        '39 - EL BAGRE - EL CERRO - DAILER VEGA GALINDO': null,
        '40 - EL BAGRE - EL DESPERTAR - ESTEBAN MACEA ORTIZ': null,
        '41 - EL BAGRE - EL PARAÍSO - DURLEY PATRICIA FERNÁNDEZ FLOREZ': null,
        '42 - EL BAGRE - LA BENDICIÓN DE DIOS - EDER ENRIQUE PINTO PILA - EDER ENRIQUE PINTO PILA': null,
        '43 - EL BAGRE - LA IDEA - JAIME MARTÍNEZ BENAVIDES': null,
        '44 - EL BAGRE - LA PAZ - EMIL DE JESÚS SÁNCHEZ BARRAGÁN': null,
        '45 - EL BAGRE - LA UNION - RUBY ADELAIDA HERNÁNDEZ SUÁREZ': null,
        '46 - EL BAGRE - LA VALERIANA - CARMEN EDITH MANJARRÉS VALDOVINO': null,
        '47 - EL BAGRE - LA VIRGEN - IVÁN DARÍO MARTÍNEZ NAVARRO': null,
        '48 - EL BAGRE - LOS BOMBEROS - JAVID HERRERA PÉREZ': null,
        '49 - EL BAGRE - MANANTIAL - LUZ ENITH BERTEL SILGADO': null,
        '50 - EL BAGRE - MOTE DE SION - MAURICIO ALBERTO PACHECO SÁNCHEZ': null,
        '51 - NECHÍ - APIARIO ALTO DEL YUQUE - CONSTANTINORUBEN LAZARO URANGO': null,
        '52 - NECHÍ - APIARIO BUENOS AIRES - SANDRA MILENA MONTIEL SUAREZ': null,
        '53 - NECHÍ - APIARIO CAÑO GIL - ALFIGER TAPIAS MEJIA': null,
        '54 - NECHÍ - APIARIO EL CERRITO - ILSA RAQUEL MARTÍNEZ TOVAR': null,
        '55 - NECHÍ - APIARIO EL FILO - CINDY PAOLA MIELES GAVIRIA': null,
        '56 - NECHÍ - APIARIO EL INICIO - NESTOR IVAN PATERNINA MENDOZA': null,
        '57 - NECHÍ - APIARIO EL MANGUITO - ADELISA DEL CARMEN MARTÍNEZ NISPERUZA': null,
        '58 - NECHÍ - APIARIO EL PAPAYOTE - NELFIS ISABEL GOEZ LOOBO': null,
        '59 - NECHÍ - APIARIO EL PIÑAL - PIEDAD DE JESÚS MOLINA MEJÍA': null,
        '60 - NECHÍ - APIARIO EL PORVENIR - JUAN MANUEL SANDOVAL GAVIRIA': null,
        '61 - NECHÍ - APIARIO FLOR MIEL - AMADA ISABEL ANGULO LOPEZ - AMADA ISABEL ANGULO LOPEZ': null,
        '62 - NECHÍ - APIARIO FLOR MIEL - RODRIGO ANTONIO MERCADO MONTALVO - RODRIGO ANTONIO MERCADO MONTALVO': null,
        '63 - NECHÍ - APIARIO LA ALGARROBA - ANA LUCIA LOPEZ GALARCIA': null,
        '64 - NECHÍ - APIARIO LA BENDICIÓN DE DIOS - Sin Dato': null,
        '65 - NECHÍ - APIARIO LA BENDICIÓN DE DIOS - MARIA JOSEFA MACIAS BOHÓRQUEZ - MARIA JOSEFA MACIAS BOHÓRQUEZ': null,
        '66 - NECHÍ - APIARIO LA BENDICIÓN DE DIOS - YADIRAS ISABEL VILLEGAS BALDOVINO - YADIRAS ISABEL VILLEGAS BALDOVINO': null,
        '67 - NECHÍ - APIARIO LA BENDICIÓN DE DIOS - YORLEDIS ARROYO PALENCIA - YORLEDIS ARROYO PALENCIA': null,
        '68 - NECHÍ - APIARIO LA CARIMAGUA - MARCOS AURELIO VERGARA VARGAS': null,
        '69 - NECHÍ - APIARIO LA ILUSIÓN - PEDRO MANUEL DE HOYOS MERIÑO': null,
        '70 - NECHÍ - APIARIO LA LIBERTAD - Sin Dato': null,
        '71 - NECHÍ - APIARIO LA POBREZA - CHUPA FLOR - JULIO EMIRO ERAZO': null,
        '72 - NECHÍ - APIARIO LA PROSPERIDAD - DUBERNEY VERGARA VARGAS': null,
        '73 - NECHÍ - APIARIO LA QUEBRADA - EMÉRITA SIERRA JIMÉNEZ': null,
        '74 - NECHÍ - APIARIO LAS ACACIAS - RAFAEL ANTONIO MARTÍNEZ NISPERUZA': null,
        '75 - NECHÍ - APIARIO LAS ACACIAS - NANCY MARIA ANGULO LOPEZ - NANCY MARIA ANGULO LOPEZ': null,
        '76 - NECHÍ - APIARIO LAS ACACIOS - JUANA IRIS VEGA ARRIETA - JUANA IRIS VEGA ARRIETA': null,
        '77 - NECHÍ - APIARIO LOBON - YONADIS CONSTANZA VARGAS ARRIETA': null,
        '78 - NECHÍ - APIARIO LOMA FRESCA - ZORAIDA SAILGADO ESCOBAR': null,
        '79 - NECHÍ - APIARIO LOS ACACIOS - LILIANA ESTER GUISADO PUERTA - LILIANA ESTER GUISADO PUERTA': null,
        '80 - NECHÍ - APIARIO LOS ACACIOS - RODRIGO ANTONIO MERCADO MONTALVO - BERNARDA MERCADO MONTALVO': null,
        '81 - NECHÍ - APIARIO MARIA LINDA 1 Y 2 - LUIS ALBERTO REGINO VILLERAS': null,
        '82 - NECHÍ - APIARIO MARKANELLY - MARTHA LIGIA ROMERO CABRARA': null,
        '83 - NECHÍ - APIARIO NO HAY COMO DIOS - ALCIDES DE JESUS GONZALES': null,
        '84 - NECHÍ - APIARIO NUEVA ILUSION - LILIANA MARIA LOAIZA FLOREZ': null,
        '85 - NECHÍ - APIARIO QUEMADO - LUCELIS ACOSTA AGUAS': null,
        '86 - NECHÍ - APIARIO RENACER - ZURI SADAY ACOSTA SAILGADO': null,
        '87 - NECHÍ - APIARIO SANTA FE - OLGA MARINA OLMOS DE SILVA': null,
        '88 - NECHÍ - APIARIO VILLA SANDRA - VICTOR AMADO MENDEZ MENCO': null,
        '89 - NECHÍ - APIARIO VILLA ZULIA - JHON JAIRO SALAZAR JARAMILLO': null,
        '90 - NECHÍ - APIARIO VIO MIEL - KEYLA MARGARITA CORREA PÉREZ': null,
        '91 - NECHÍ - APIARIO YIRETH - YORLEDIS - MEJIA - YORLEDIS MEJÍA SANTOS': null,
        '92 - NECHÍ - EL RAYO - ISIDRO MANUEL MARTÍNEZ NISPERUZA': null,
        '93 - NECHÍ - LA ABUELA - ELCY MARÍA BECERRA': null,
        '94 - NECHÍ - LA BENDICIÓN - OLME MAURICIO RIVAS CALIS - OLME MAURICIO RIVAS CALIS': null,
        '95 - NECHÍ - LA BENDICIÓN DE DIOS - ENITH DEL CARMEN LIBERNA - ENITH DEL CARMEN LIBERNA': null,
        '96 - NECHÍ - LA BENDICIÓN DE DIOS - YENIS DEL CARMEN VILLEGA BALDOVINOS - YENIS DEL CARMEN VILLEGA BALDOVINOS': null,
        '97 - NECHÍ - MIELES DE SAN PABLO - JORGE FERNANDO ESTRADA DOVAL': null,
        '98 - NECHÍ - SOL Y LUNA - NOLIBIS YADITH MONTOYA SIGADO': null,
        '99 - TARAZÁ - ALTO LOS LOROS - CLAUDIA ROCÍO ARCILA GIRALDO': null,
        '100 - TARAZÁ - APIARIO LA BENDICION - ARGENIDA MARÍA SIERRA COGOLLO - ARGENIDA MARÍA SIERRA COGOLLO': null,
        '101 - TARAZÁ - APÍCOLA LAS MUÑECAS-DUMAR - JOSÉ DUMAR MONSALVE MAZO': null,
        '102 - TARAZÁ - APÍCOLA RÍO RAYO - CARLOS ARTURO MEZA BUSTAMANTE': null,
        '103 - TARAZÁ - BARRO BLANCO - JHON SUAREZ - JHON JAIRO SUÁREZ RAMÍREZ': null,
        '104 - TARAZÁ - EL AREQUIPE - YACKELIN GIRALDO JARAMILLO': null,
        '105 - TARAZÁ - EL CARMELO - JESÚS ANTONIO SERNA ÁLVAREZ': null,
        '106 - TARAZÁ - EL CAUCE - NUBIA DEL CARMEN GUERRERO QUIROZ': null,
        '107 - TARAZÁ - EL CAUCHO - JOSÉ NICOLÁS LONDOÑO JIMÉNEZ': null,
        '108 - TARAZÁ - EL GORGOJO - OVEY DE JESÚS ARGAEZ MONTOYA': null,
        '109 - TARAZÁ - EL SOLITO - WALDO RAMÓN SÁNCHEZ SÁNCHEZ': null,
        '110 - TARAZÁ - EL SOLITO - MARYARIS - MARYARIS NAUDITH TORREGLOSA COTERA': null,
        '111 - TARAZÁ - JALISCO - JORGE LUIS ÁLVAREZ BARRIENTOS': null,
        '112 - TARAZÁ - LA CUENCA - JESÚS ANTONIO MORA': null,
        '113 - TARAZÁ - LA ESMERALDA - ALFREDO JOSÉ COCHERO ROMÁN': null,
        '114 - TARAZÁ - LA ESPERANZA - RICARDO ANTONIO RICARDO PÉREZ - RICARDO ANTONIO RICARDO PÉREZ': null,
        '115 - TARAZÁ - LA ESPERANZA PUERTO ANTIOQUIA - JHON SADITH SERNA ÁLVAREZ': null,
        '116 - TARAZÁ - LA ESPERANZA QUINTERON - CARLOS EMILIO TUBERQUIA TUBERQUIA': null,
        '117 - TARAZÁ - LA FAMILY - FRANCIA ELENA ARCILA GIRALDO': null,
        '118 - TARAZÁ - LA MICROCUENCA - MARIO DE JESÚS LOPERA': null,
        '119 - TARAZÁ - LAS MUÑECAS - NEDER ALONSO RÍOS MONTOYA': null,
        '120 - TARAZÁ - LOS ANGELES - JOHNY DE JESÚS YOTAGRI': null,
        '121 - TARAZÁ - LUIS YANA - LUIS MAURICIO ÁVILA RINCÓN': null,
        '122 - TARAZÁ - RIO RAYO - EDUAR ANDRÉS AMAYA MORÓN': null,
        '123 - TARAZÁ - VALENTINA - ALCIDES YOTAGRI JARAMILLO': null,
        '124 - ZARAGOZA - ABEJAS - BETTY MARGOTH DIMAS CORONADO': null,
        '125 - ZARAGOZA - AMADAS - ROSMIRA ISABEL VILLEGAS PERALTA': null,
        '126 - ZARAGOZA - ARIAS LOPEZ - BAYRON YESID ARIAS ZAPATA': null,
        '127 - ZARAGOZA - CAÑO CLARO - JAIRO ALBERTO CHICA': null,
        '128 - ZARAGOZA - DIOS PROVEERÁ - MARIA MAGDALENA CASTILLO SUÁREZ': null,
        '129 - ZARAGOZA - DIOS PROVEERÁ - SAN JUAN DE PELUSA - TOMÁS FLÓREZ BERNA': null,
        '130 - ZARAGOZA - EL 50 - KARLA CAROLINA OLIVERO GRACIANO': null,
        '131 - ZARAGOZA - EL CERRITO - JOSÉ ALEJANDRO ROMERO DE HOYOS': null,
        '132 - ZARAGOZA - EL JARDIN - FRANCISCO JAVIER VILORIA ZABALETA': null,
        '133 - ZARAGOZA - EL PALMAR - FRANCIA ROSA RIVERA SUÁREZ': null,
        '134 - ZARAGOZA - EL PROGRESO - YESID FERNEY PALACIO DE DIEGO - YESID FERNEY PALACIO DE DIEGO': null,
        '135 - ZARAGOZA - GERILUZ - GERMAN ANTONIO ARRIETA ALARCÓN': null,
        '136 - ZARAGOZA - GERYLUZ - LUZ MARY SOLAR - LUZ MARY SOLAR SILVA': null,
        '137 - ZARAGOZA - KELLY - KELLY JOHANA CASTILLO ACOSTA': null,
        '138 - ZARAGOZA - LA BATEA - Sin Dato': null,
        '139 - ZARAGOZA - LA BENDICIÓN - RAÚL ENRIQUE ROMERO PÉREZ': null,
        '140 - ZARAGOZA - LA BENDICIÓN - EDISON TAMARA - EDINSON MANUEL TAMARA BENÍTEZ': null,
        '141 - ZARAGOZA - LA BENDICIÓN CORDERO ICACALES - JANIS MELISSA JULIO VILLALBA': null,
        '142 - ZARAGOZA - LA BENDICIÓN DE DIOS - CRISTOVALINA DE DIEGO - CRISTOVALINA DE DIEGO': null,
        '143 - ZARAGOZA - LA BENDICIÓN DE DIOS - DIONISIA VILORIA - DIONISIA MARÍA VILORIA ARRIETA': null,
        '144 - ZARAGOZA - LA BENDICIÓN DE DIOS - ELVIA NERIS LUNA VEGA - ELVIA NERIS LUNA VEGA': null,
        '145 - ZARAGOZA - LA BENDICIÓN DE DIOS - LUÍS FERNANDO MORELO - LUÍS FERNANDO MORELO': null,
        '146 - ZARAGOZA - LA BENDICIÓN DE DIOS - MARCIANA JUDITH PÉREZ PERTUZ - MARCIANA JUDITH PÉREZ PERTUZ': null,
        '147 - ZARAGOZA - LA BENDICIÓN DE DIOS - MARIA ROMERO - MARÍA MARGARITA ROMERO': null,
        '148 - ZARAGOZA - LA BENDICIÓN DE DIOS - ROSA DEDIEGO - ROSA MARÍA DEDIEGO BERMÚDEZ': null,
        '149 - ZARAGOZA - LA BENDICIÓN DE DIOS - ROSMIRA ZAMBRANO - ROSMIRA ZAMBRANO DE MERCADO': null,
        '150 - ZARAGOZA - LA BENDICIÓN DE DIOS MARI DE JESUS LARGO - MARI DE JESÚS LARGO BURITICA': null,
        '151 - ZARAGOZA - LA BENDICIÓN EL DOCE - ARNEL ENRIQUE PEÑA RODELO': null,
        '152 - ZARAGOZA - LA CIMA - JUAN DAVID PEDROZA LARGO': null,
        '153 - ZARAGOZA - LA ESPERANZA - GLEIDY ESTHER MOSCOTE RAMÍREZ': null,
        '154 - ZARAGOZA - LA ESPERANZA - MANUEL ADRIANO MEJÍA - MANUEL ADRIANO MEJÍA': null,
        '155 - ZARAGOZA - LA ESPERANZA - MANUEL ENRIQUE ATENCIO FERIA - MANUEL ENRIQUE ATENCIO FERIA': null,
        '156 - ZARAGOZA - LA ESPERANZA - ROSINA DEL CARMEN ALBA YENERIS - ROSINA DEL CARMEN ALBA YENERIS': null,
        '157 - ZARAGOZA - LA ESPERANZA - SENITH ALZATE - SENITH DEL CARMEN ALZATE FERRER': null,
        '158 - ZARAGOZA - LA ESPERANZA - YORLEDIS SOLAR SILVA - YORLEDIS SOLAR SILVA': null,
        '159 - ZARAGOZA - LA ESPERANZA EL PATO - ARMANDO DE JESÚS MANJARREZ TRESPALACIOS': null,
        '160 - ZARAGOZA - LA FÉ - ARNEIDER MEJÍA PEÑA': null,
        '161 - ZARAGOZA - LA ILUSIÓN - EDGAR DE JESÚS SIERRA CARDONA': null,
        '162 - ZARAGOZA - LA LUCHA - SARA ENNA ORTIZ HERNANDEZ': null,
        '163 - ZARAGOZA - LA VELENTINA - MANUEL DE JESÚS SANTERO CLEMENTE': null,
        '164 - ZARAGOZA - LAS BRISAS - YOEL PEÑA - YOEL AYAN PEÑA RODELO': null,
        '165 - ZARAGOZA - LAS BRISAS - YONEDIS PEÑA - YONEDIS PEÑA GALLEGO': null,
        '166 - ZARAGOZA - LAS DELICIAS - MARY LUZ SOLAR SILVA': null,
        '167 - ZARAGOZA - LAS GUARDIANAS - MARÍA CLARA ARRIETA VILORIA': null,
        '168 - ZARAGOZA - LOS EXTENSIONISTA - RUBY ESTELLA LONDOÑO RAMÍREZ': null,
        '169 - ZARAGOZA - LOS EXTENSIONISTA - EDWIN TEJADA - EDWIN DAVID TEJADA NAVARRO': null,
        '170 - ZARAGOZA - LOS EXTENSIONISTAS - YESICA RAMIREZ - YESICA PAOLA RAMÍREZ NAVARRO': null,
        '171 - ZARAGOZA - LOS RAMÍREZ - MANUEL MARÍA RAMÍREZ ZÚÑIGA': null,
        '172 - ZARAGOZA - MARGARITA - ABEL BIENVENIDO VILORIA RÍOS': null,
        '173 - ZARAGOZA - MIRABU - LORENA ISABEL MIRANDA SALCEDO': null,
        '174 - ZARAGOZA - PRIMAVERA - HÉCTOR ENRIQUE NISPERUZA COBOS': null,
        '175 - ZARAGOZA - PUERTO AMOR - NORBERTO ANTONIO CASTILLO RUIZ': null,
        '176 - ZARAGOZA - SAIRA - CARMEN LUISA DEDIEGO BERMÚDEZ': null,
        '177 - ZARAGOZA - SAMUEL - LUZ LEYDIS MOSQUERA CUESTA': null,
        '178 - ZARAGOZA - SAN PEDRO - ANA CIRA MONTIEL PEÑA': null,
        '179 - ZARAGOZA - SOLI - NELLY GUISAO': null,
        '180 - ZARAGOZA - TRES HERMANOS - ANUAR JOSÉ GARAY SALGADO': null,
        '181 - ZARAGOZA - VILLA ISAVAL - Sin Dato': null,
        '182 - ZARAGOZA - VILLA LUISA - ARELIS DEL CARMEN ÁVILA GÓMEZ': null
    },onAutocomplete: (texto) => {

			opcionSeleccionado = texto.split(" ")[0] // Selecciono la primera palabra

			// M.toast({ html: `${opcionSeleccionado}` });

     // alert(`Has seleccionado el ID: ${opcionSeleccionado}`);

      var opciones = {
        //'id': ['Ubicación', 'NombreOrganización', 'NIT', 'Telefono', 'Correo Electronico', 'Representante']
        //'ID': ['0', '1', '2', '3', '4', '5']:      
        '1': ['AGROASTURIAS', 'CÁCERES', '901112015-1', '3108333496', 'agroasturias2017@gmail.com', 'CLAUDIA PATRICIA VÉLEZ TORO'],
        '2': ['AMAGROCAN', 'CÁCERES', '901225896-7', '310894467', 'amagrocan2018@gmail.com', 'DENIS DEL SOCORRO MEJÍA MEJÍA'],
        '3': ['APÍCOLA EL AHORRO', 'CÁCERES', 'Sin Dato', '3147256947', 'navarrodeifa32@gmail.com', 'DELFA DEL CARMEN BANQUET NAVARRO'],
        '4': ['ASOAGROPIAMONTE', 'CÁCERES', '901359623-9', '3206495704', 'lopezar1224@gmail.com', 'ALBA ROCÍO LÓPEZ CASTILLO'],
        '5': ['ASOGRANCA', 'CÁCERES', '901334447-2', '3206975821', 'orlandobertel79@gmail.com', 'ORLANDO MANUEL BERTEL CAÑAVERAL'],
        '6': ['CANAÁN', 'CÁCERES', 'Sin Dato', '3104734525', 'oscarguerra8056@gmail.com', 'OSCAR ALONSO GUERRA LÓPEZ'],
        '7': ['EL PROGRESO', 'CÁCERES', '21590397', '3137129682', 'asobeca2019@gmail.com', 'MIRIAN IBED FLÓREZ ROJAS'],
        '8': ['GOLDEN BEE', 'CÁCERES', '7542199', '3136110270', 'davidpulgarinb@gmail.com', 'DAVID PULGARIN BETANCUR'],
        '9': ['LA ESMERALDA ALEJANDRO NUÑEZ', 'CÁCERES', '15309404', '3147181359', 'Sin Dato', 'ALEJANDRO FIDEL NÚÑEZ POLANCO'],
        '10': ['PARAÍSOS DE MIEL', 'CÁCERES', '1037618073', '3195733292', 'brayan.abello@gmail.com', 'BRAYAN JOSÉ ABELLO VERA'],
        '11': ['APIARIO LOS AMIGOS', 'CAUCASIA', '15304111', '3108437607', 'Sin Dato', 'GAMALIEL ANTONIO PÉREZ PÉREZ'],
        '12': ['APÍCOLA EL ESCONDIDO', 'CAUCASIA', '15307442', '3108029239', 'Sin Dato', 'MIGUEL ENRIQUE DURANGO VIDES'],
        '13': ['APÍCOLA EL FUTURO', 'CAUCASIA', '12603567', '3216965963', 'Sin Dato', 'VICENTE GALVIS NAVARRO'],
        '14': ['APÍCOLA EL PANAL', 'CAUCASIA', '1038139104', '3024008359', 'andreinacon2017@gmail.com', 'ANDREINA CONTRERAS MERCADO'],
        '15': ['APÍCOLA EL POLVILLO', 'CAUCASIA', '39284372', '3128780744', 'Sin Dato', 'DAMARIS ISABEL BLANCO'],
        '16': ['APÍCOLA EL PROGRESO', 'CAUCASIA', '39283111', '3126371125', 'david manzanares 2021@gmail.com', 'LUZ MERIS ARROLLO CASTILLO'],
        '17': ['APÍCOLA LA BENDICIÓN - ESTER MARÍA ARRIETA ARRIETA', 'CAUCASIA', '21640960', '3137237542', 'rut08@outlook.com', 'ESTER MARÍA ARRIETA ARRIETA'],
        '18': ['APÍCOLA LA BENDICIÓN - YIRA LILIANA ARRIETA ARRIETA', 'CAUCASIA', 'Sin Dato', '3137237542', 'rut08@outlook.com', 'YIRA LILIANA ARRIETA ARRIETA'],
        '19': ['APÍCOLA LA ESPERANZA - JUAN CARLOS ZURITA ROMERO', 'CAUCASIA', '1001535033', '3107065375', 'lidisromero13@gmail.com', 'JUAN CARLOS ZURITA ROMERO'],
        '20': ['APÍCOLA LA ESPERANZA - PAOLA ANDREA TAPIAS LÓPEZ', 'CAUCASIA', '1037481938', '3126404380', 'Sin Dato', 'PAOLA ANDREA TAPIAS LÓPEZ'],
        '21': ['APÍCOLA LA FE', 'CAUCASIA', '43896221', '3116130491', 'Sin Dato', 'NOREDIS TRINIDAD SAYAS HERNÁNDEZ'],
        '22': ['APÍCOLA LA PAULINA - CARLOS ALBERTO ARROYAVE LOPERA', 'CAUCASIA', '71535883', '3137324311', 'caal2373@hotmail.com', 'CARLOS ALBERTO ARROYAVE LOPERA'],
        '23': ['APÍCOLA LA PAULINA - MARÍA EPIFANÍA LOPERA DE ARROYAVE', 'CAUCASIA', '21631227', '3106048306', 'caal2373@hotmail.com', 'MARÍA EPIFANÍA LOPERA DE ARROYAVE'],
        '24': ['APÍCOLA LA VICTORIA', 'CAUCASIA', '39288381', '3137737494', 'Sin Dato', 'ARINDA DEL CARMEN POLO RODRÍGUEZ'],
        '25': ['APÍCOLA LAS FLORES', 'CAUCASIA', '43889259', '3217677324', 'Sin Dato', 'MIRLEY ELENA PARADA FLORES'],
        '26': ['APÍCOLA LOS AMIGOS', 'CAUCASIA', '8046251', '3136786400', 'josé maría tirado 521@gmail.com', 'JOSÉ MARIA TIRADO MONTES'],
        '27': ['APÍCOLA LOS ÁNGELES', 'CAUCASIA', '15303989', '3122855921', 'Sin Dato', 'GREGORIO MANUEL VERBEL ROJAS'],
        '28': ['APÍCOLA LOS OLIVOS', 'CAUCASIA', '8047083', '3505276941', 'Sin Dato', 'FRANCISCO MIGUEL TERÁN CELESTINO'],
        '29': ['APÍCOLA VILLA ADRIANA', 'CAUCASIA', '52353129', '3148321035', 'meléndezmartinezfransisca01@gmail.com', 'FRANCISCA MELÉNDEZ MARTÍNEZ'],
        '30': ['LA BENDICIÓN DE DIOS - PEDRO JUAN OVIEDO GUZMÁN', 'CAUCASIA', '8046697', '3147335235', 'pedrojuanoviedoguzman@gmail.com', 'PEDRO JUAN OVIEDO GUZMÁN'],
        '31': ['LA ESPERANZA - ANA RITA ARIAS MÉNDEZ', 'CAUCASIA', '39267250', '3105673275', 'Sin Dato', 'ANA RITA ARIAS MÉNDEZ'],
        '32': ['LOTE 5 Y LOTE 9', 'CAUCASIA', 'Sin Dato', '3205905226', 'cl192134@gmail.com', 'DANIEL ARENAS RAMÍREZ'],
        '33': ['NORELIS', 'CAUCASIA', '78109048', '3146167075', 'Sin Dato', 'JAIRO MANUEL CASTILLO GOEZ'],
        '34': ['NUEVA ESPERANZA', 'CAUCASIA', '39278927', '3137152431', 'astrid elena 1975@gmail.com', 'ASTRID ELENA GUZMÁN MORALES'],
        '35': ['BUENA SUERTE', 'EL BAGRE', '1007824306', '0', 'Sin Dato', 'SANDRA VIVIANA NAVARRO JORGE'],
        '36': ['DULCE MANJAR', 'EL BAGRE', '98475001', '3235097398', 'Sin Dato', 'MANUEL EUSEBIO TORRES'],
        '37': ['EL ANHELO', 'EL BAGRE', '98476033', '3146885340', 'Sin Dato', 'WALTER HERRERA PÉREZ'],
        '38': ['EL CASTILLO', 'EL BAGRE', '8373761', '3195506244', 'Sin Dato', 'NEVER MANUEL CASTILLO MESA'],
        '39': ['EL CERRO', 'EL BAGRE', '1040508121', '3145228253', 'Sin Dato', 'DAILER VEGA GALINDO'],
        '40': ['EL DESPERTAR', 'EL BAGRE', '1040519521', '3113388806', 'maceaesteban@gmail.com', 'ESTEBAN MACEA ORTIZ'],
        '41': ['EL PARAÍSO', 'EL BAGRE', '1038114094', '321781674', 'Sin Dato', 'DURLEY PATRICIA FERNÁNDEZ FLOREZ'],
        '42': ['LA BENDICIÓN DE DIOS - EDER ENRIQUE PINTO PILA', 'EL BAGRE', '1003359519', '3117996891', 'Sin Dato', 'EDER ENRIQUE PINTO PILA'],
        '43': ['LA IDEA', 'EL BAGRE', '8372554', '3214316918', 'Sin Dato', 'JAIME MARTÍNEZ BENAVIDES'],
        '44': ['LA PAZ', 'EL BAGRE', '78321864', '3128938304', 'Sin Dato', 'EMIL DE JESÚS SÁNCHEZ BARRAGÁN'],
        '45': ['LA UNION', 'EL BAGRE', '43693071', '3163605021', 'Sin Dato', 'RUBY ADELAIDA HERNÁNDEZ SUÁREZ'],
        '46': ['LA VALERIANA', 'EL BAGRE', '39287127', '3104041352', 'carmen-2911@hotmail.com', 'CARMEN EDITH MANJARRÉS VALDOVINO'],
        '47': ['LA VIRGEN', 'EL BAGRE', '1038480740', '3114302272', 'Sin Dato', 'IVÁN DARÍO MARTÍNEZ NAVARRO'],
        '48': ['LOS BOMBEROS', 'EL BAGRE', '8364907', '3226529994', 'Sin Dato', 'JAVID HERRERA PÉREZ'],
        '49': ['MANANTIAL', 'EL BAGRE', '43699235', '3114047018', 'Sin Dato', 'LUZ ENITH BERTEL SILGADO'],
        '50': ['MOTE DE SION', 'EL BAGRE', '8373126', '3193040932', 'Sin Dato', 'MAURICIO ALBERTO PACHECO SÁNCHEZ'],
        '51': ['APIARIO ALTO DEL YUQUE', 'NECHÍ', '15670320', '3218643663', 'constantinolazaroo@gmail.com', 'CONSTANTINORUBEN LAZARO URANGO'],
        '52': ['APIARIO BUENOS AIRES', 'NECHÍ', '1038435996', '3167850504', 'montielsandramilena659@gmail.com', 'SANDRA MILENA MONTIEL SUAREZ'],
        '53': ['APIARIO CAÑO GIL', 'NECHÍ', '8373532', '3147381651', 'alfilger10@hotmail.com', 'ALFIGER TAPIAS MEJIA'],
        '54': ['APIARIO EL CERRITO', 'NECHÍ', '43890221', '3117121674', 'Sin Dato', 'ILSA RAQUEL MARTÍNEZ TOVAR'],
        '55': ['APIARIO EL FILO', 'NECHÍ', '1038111505', '3215605740', 'Sin Dato', 'CINDY PAOLA MIELES GAVIRIA'],
        '56': ['APIARIO EL INICIO', 'NECHÍ', '1001849457', '3178431378', 'Sin Dato', 'NESTOR IVAN PATERNINA MENDOZA'],
        '57': ['APIARIO EL MANGUITO', 'NECHÍ', '50930292', '3116309967', 'martinezadelisa502@gmail.com', 'ADELISA DEL CARMEN MARTÍNEZ NISPERUZA'],
        '58': ['APIARIO EL PAPAYOTE', 'NECHÍ', '43888886', '3102781265', 'Sin Dato', 'NELFIS ISABEL GOEZ LOOBO'],
        '59': ['APIARIO EL PIÑAL', 'NECHÍ', '43804203', '3125572720', 'Sin Dato', 'PIEDAD DE JESÚS MOLINA MEJÍA'],
        '60': ['APIARIO EL PORVENIR', 'NECHÍ', '15304556', '3117564090', 'Sin Dato', 'JUAN MANUEL SANDOVAL GAVIRIA'],
        '61': ['APIARIO FLOR MIEL - AMADA ISABEL ANGULO LOPEZ', 'NECHÍ', '2164715', '3147041079', 'Sin Dato', 'AMADA ISABEL ANGULO LOPEZ'],
        '62': ['APIARIO FLOR MIEL - RODRIGO ANTONIO MERCADO MONTALVO', 'NECHÍ', '1038437098', '3508698446', 'Sin Dato', 'RODRIGO ANTONIO MERCADO MONTALVO'],
        '63': ['APIARIO LA ALGARROBA', 'NECHÍ', '1067402239', '3174741581', 'Sin Dato', 'ANA LUCIA LOPEZ GALARCIA'],
        '64': ['APIARIO LA BENDICIÓN DE DIOS', 'NECHÍ', '1038436826', '3203800944', 'Sin Dato', 'Sin Dato'],
        '65': ['APIARIO LA BENDICIÓN DE DIOS - MARIA JOSEFA MACIAS BOHÓRQUEZ', 'NECHÍ', '43890927', '3183767916', 'yecaviba@gmail.com', 'MARIA JOSEFA MACIAS BOHÓRQUEZ'],
        '66': ['APIARIO LA BENDICIÓN DE DIOS - YADIRAS ISABEL VILLEGAS BALDOVINO', 'NECHÍ', '43889580', '3176953539', 'villegasyadiras278@hotmail.com', 'YADIRAS ISABEL VILLEGAS BALDOVINO'],
        '67': ['APIARIO LA BENDICIÓN DE DIOS - YORLEDIS ARROYO PALENCIA', 'NECHÍ', '1049562993', '31606049569', 'yecaviba@gmail.com', 'YORLEDIS ARROYO PALENCIA'],
        '68': ['APIARIO LA CARIMAGUA', 'NECHÍ', '1038434653', '3232942122', 'afrocarimagua@gmail.comq', 'MARCOS AURELIO VERGARA VARGAS'],
        '69': ['APIARIO LA ILUSIÓN', 'NECHÍ', '15303479', '3113132214', 'Sin Dato', 'PEDRO MANUEL DE HOYOS MERIÑO'],
        '70': ['APIARIO LA LIBERTAD', 'NECHÍ', '8373494', '3177820877', 'jope714@hotmail.com', 'Sin Dato'],
        '71': ['APIARIO LA POBREZA - CHUPA FLOR', 'NECHÍ', '4011367', '3172182501', 'villegasyadiras278@hotmail.com', 'JULIO EMIRO ERAZO'],
        '72': ['APIARIO LA PROSPERIDAD', 'NECHÍ', '1038434465', '3114121233', 'Sin Dato', 'DUBERNEY VERGARA VARGAS'],
        '73': ['APIARIO LA QUEBRADA', 'NECHÍ', '43804119', '3132416013', 'Sin Dato', 'EMÉRITA SIERRA JIMÉNEZ'],
        '74': ['APIARIO LAS ACACIAS', 'NECHÍ', '8374176', '31898922278', 'nisperuza351@gmail.com', 'RAFAEL ANTONIO MARTÍNEZ NISPERUZA'],
        '75': ['APIARIO LAS ACACIAS - NANCY MARIA ANGULO LOPEZ', 'NECHÍ', '43889802', '3178736165', 'Sin Dato', 'NANCY MARIA ANGULO LOPEZ'],
        '76': ['APIARIO LAS ACACIOS - JUANA IRIS VEGA ARRIETA', 'NECHÍ', '1001550610', '3174918815', 'angulonancy422@gmail.com', 'JUANA IRIS VEGA ARRIETA'],
        '77': ['APIARIO LOBON', 'NECHÍ', '43890670', '3114228765', 'Sin Dato', 'YONADIS CONSTANZA VARGAS ARRIETA'],
        '78': ['APIARIO LOMA FRESCA', 'NECHÍ', '43804879', '3147125663', 'sorysalgado10@gmail.es', 'ZORAIDA SAILGADO ESCOBAR'],
        '79': ['APIARIO LOS ACACIOS - LILIANA ESTER GUISADO PUERTA', 'NECHÍ', '43890126', '3203260321', 'libardodo027@gmail.com', 'LILIANA ESTER GUISADO PUERTA'],
        '80': ['APIARIO LOS ACACIOS - RODRIGO ANTONIO MERCADO MONTALVO', 'NECHÍ', '1007452820', '3173387637', 'Sin Dato', 'BERNARDA MERCADO MONTALVO'],
        '81': ['APIARIO MARIA LINDA 1 Y 2', 'NECHÍ', '8373147', '3116827072', 'luis_regino@hotmail.com', 'LUIS ALBERTO REGINO VILLERAS'],
        '82': ['APIARIO MARKANELLY', 'NECHÍ', '436986333', '3114073363', 'marliroca1123@hotmail.com', 'MARTHA LIGIA ROMERO CABRARA'],
        '83': ['APIARIO NO HAY COMO DIOS', 'NECHÍ', '15280055', '3183158169', 'yecaviba@gmail.com', 'ALCIDES DE JESUS GONZALES'],
        '84': ['APIARIO NUEVA ILUSION', 'NECHÍ', '50886412', '3235093628', 'Sin Dato', 'LILIANA MARIA LOAIZA FLOREZ'],
        '85': ['APIARIO QUEMADO', 'NECHÍ', '1049563217', '3226055732', 'lecelisacosta33@gmail.com', 'LUCELIS ACOSTA AGUAS'],
        '86': ['APIARIO RENACER', 'NECHÍ', '100150661', '3234886107', 'acostasilgadozuri@gmail.com', 'ZURI SADAY ACOSTA SAILGADO'],
        '87': ['APIARIO SANTA FE', 'NECHÍ', '21638178', '3137067643', 'olgaolmos98@gmail.com', 'OLGA MARINA OLMOS DE SILVA'],
        '88': ['APIARIO VILLA SANDRA', 'NECHÍ', '8370330', '3127445840', 'Sin Dato', 'VICTOR AMADO MENDEZ MENCO'],
        '89': ['APIARIO VILLA ZULIA', 'NECHÍ', '8052466', '3105429911', 'piedadmolina813@gmail.com', 'JHON JAIRO SALAZAR JARAMILLO'],
        '90': ['APIARIO VIO MIEL', 'NECHÍ', '1066526425', '3136307351', 'Sin Dato', 'KEYLA MARGARITA CORREA PÉREZ'],
        '91': ['APIARIO YIRETH - YORLEDIS - MEJIA', 'NECHÍ', '39283882', '3218308144', 'Sin Dato', 'YORLEDIS MEJÍA SANTOS'],
        '92': ['EL RAYO', 'NECHÍ', '11003516', '3142012968', 'Sin Dato', 'ISIDRO MANUEL MARTÍNEZ NISPERUZA'],
        '93': ['LA ABUELA', 'NECHÍ', '39267810', '3143457810', 'Sin Dato', 'ELCY MARÍA BECERRA'],
        '94': ['LA BENDICIÓN - OLME MAURICIO RIVAS CALIS', 'NECHÍ', '1050426440', '3127016150', 'Sin Dato', 'OLME MAURICIO RIVAS CALIS'],
        '95': ['LA BENDICIÓN DE DIOS - ENITH DEL CARMEN LIBERNA', 'NECHÍ', '43693487', '3207978604', 'Sin Dato', 'ENITH DEL CARMEN LIBERNA'],
        '96': ['LA BENDICIÓN DE DIOS - YENIS DEL CARMEN VILLEGA BALDOVINOS', 'NECHÍ', '43889409', '3155802117', 'yecaviba@gmail.com', 'YENIS DEL CARMEN VILLEGA BALDOVINOS'],
        '97': ['MIELES DE SAN PABLO', 'NECHÍ', '71686147', '3206763353', 'Sin Dato', 'JORGE FERNANDO ESTRADA DOVAL'],
        '98': ['SOL Y LUNA', 'NECHÍ', '43890017', '3136837460', 'Sin Dato', 'NOLIBIS YADITH MONTOYA SIGADO'],
        '99': ['ALTO LOS LOROS', 'TARAZÁ', '32906683', '3226125340', 'claro2403@gmail.com', 'CLAUDIA ROCÍO ARCILA GIRALDO'],
        '100': ['APIARIO LA BENDICION - ARGENIDA MARÍA SIERRA COGOLLO', 'TARAZÁ', '50886172', '3192503170', 'sierraargenida@gmail.com', 'ARGENIDA MARÍA SIERRA COGOLLO'],
        '101': ['APÍCOLA LAS MUÑECAS-DUMAR', 'TARAZÁ', '8038947', '3103612605', 'semarve35@hotmail.com', 'JOSÉ DUMAR MONSALVE MAZO'],
        '102': ['APÍCOLA RÍO RAYO', 'TARAZÁ', '8058059', '3174395562', 'zootecnia@hdariorayo.com.co', 'CARLOS ARTURO MEZA BUSTAMANTE'],
        '103': ['BARRO BLANCO - JHON SUAREZ', 'TARAZÁ', '71991650', '3506123692', 'Sin Dato', 'JHON JAIRO SUÁREZ RAMÍREZ'],
        '104': ['EL AREQUIPE', 'TARAZÁ', '1045429738', '3008114007', 'Sin Dato', 'YACKELIN GIRALDO JARAMILLO'],
        '105': ['EL CARMELO', 'TARAZÁ', '8038114', '3218747608', 'Sin Dato', 'JESÚS ANTONIO SERNA ÁLVAREZ'],
        '106': ['EL CAUCE', 'TARAZÁ', '32111331', '3172781189', 'guerreronubia85@gmail.com', 'NUBIA DEL CARMEN GUERRERO QUIROZ'],
        '107': ['EL CAUCHO', 'TARAZÁ', '8037041', '3113398437', 'Sin Dato', 'JOSÉ NICOLÁS LONDOÑO JIMÉNEZ'],
        '108': ['EL GORGOJO', 'TARAZÁ', '8037803', '3002751031', 'Sin Dato', 'OVEY DE JESÚS ARGAEZ MONTOYA'],
        '109': ['EL SOLITO', 'TARAZÁ', '4964165', '3104398069', 'Sin Dato', 'WALDO RAMÓN SÁNCHEZ SÁNCHEZ'],
        '110': ['EL SOLITO - MARYARIS', 'TARAZÁ', '1001532503', '3103199955', 'mntorreglosa@gmail.com', 'MARYARIS NAUDITH TORREGLOSA COTERA'],
        '111': ['JALISCO', 'TARAZÁ', '3370753', '3216440328', 'jlalvarezbarreintos@gmail.com', 'JORGE LUIS ÁLVAREZ BARRIENTOS'],
        '112': ['LA CUENCA', 'TARAZÁ', '3651828', '3114767182', 'Sin Dato', 'JESÚS ANTONIO MORA'],
        '113': ['LA ESMERALDA', 'TARAZÁ', '78105199', '3504339909', 'Sin Dato', 'ALFREDO JOSÉ COCHERO ROMÁN'],
        '114': ['LA ESPERANZA - RICARDO ANTONIO RICARDO PÉREZ', 'TARAZÁ', '10876874', '3206603936', 'Sin Dato', 'RICARDO ANTONIO RICARDO PÉREZ'],
        '115': ['LA ESPERANZA PUERTO ANTIOQUIA', 'TARAZÁ', '8038483', '3148413382', 'Sin Dato', 'JHON SADITH SERNA ÁLVAREZ'],
        '116': ['LA ESPERANZA QUINTERON', 'TARAZÁ', '15324382', '3103178272', 'carlosemiliotuberquia67@gmail.com', 'CARLOS EMILIO TUBERQUIA TUBERQUIA'],
        '117': ['LA FAMILY', 'TARAZÁ', '45762553', '3104640830', 'Sin Dato', 'FRANCIA ELENA ARCILA GIRALDO'],
        '118': ['LA MICROCUENCA', 'TARAZÁ', '8037138', '3113757334', 'Sin Dato', 'MARIO DE JESÚS LOPERA'],
        '119': ['LAS MUÑECAS', 'TARAZÁ', '70541128', '3187737129', 'nederpaisa@hotmail.com', 'NEDER ALONSO RÍOS MONTOYA'],
        '120': ['LOS ANGELES', 'TARAZÁ', '8039430', '3136967452', 'Sin Dato', 'JOHNY DE JESÚS YOTAGRI'],
        '121': ['LUIS YANA', 'TARAZÁ', '79520671', '0', 'Sin Dato', 'LUIS MAURICIO ÁVILA RINCÓN'],
        '122': ['RIO RAYO', 'TARAZÁ', '1044505797', '3208462564', 'eduaranaya19@hotmail.com', 'EDUAR ANDRÉS AMAYA MORÓN'],
        '123': ['VALENTINA', 'TARAZÁ', '8037476', '3017772729', 'Sin Dato', 'ALCIDES YOTAGRI JARAMILLO'],
        '124': ['ABEJAS', 'ZARAGOZA', '39269776', '3156985860', 'Sin Dato', 'BETTY MARGOTH DIMAS CORONADO'],
        '125': ['AMADAS', 'ZARAGOZA', '22836253', '3232853657', 'Sin Dato', 'ROSMIRA ISABEL VILLEGAS PERALTA'],
        '126': ['ARIAS LOPEZ', 'ZARAGOZA', '8364740', '3155287315', 'Sin Dato', 'BAYRON YESID ARIAS ZAPATA'],
        '127': ['CAÑO CLARO', 'ZARAGOZA', '3371770', '3136816481', 'Sin Dato', 'JAIRO ALBERTO CHICA'],
        '128': ['DIOS PROVEERÁ', 'ZARAGOZA', '22239375', '3124141839', 'Sin Dato', 'MARIA MAGDALENA CASTILLO SUÁREZ'],
        '129': ['DIOS PROVEERÁ - SAN JUAN DE PELUSA', 'ZARAGOZA', '3672889', '3114175977', 'Sin Dato', 'TOMÁS FLÓREZ BERNA'],
        '130': ['EL 50', 'ZARAGOZA', '1042825124', '3183260416', 'Sin Dato', 'KARLA CAROLINA OLIVERO GRACIANO'],
        '131': ['EL CERRITO', 'ZARAGOZA', '6616358', '3156848826', 'Sin Dato', 'JOSÉ ALEJANDRO ROMERO DE HOYOS'],
        '132': ['EL JARDIN', 'ZARAGOZA', '3670689', '3104524427', 'Sin Dato', 'FRANCISCO JAVIER VILORIA ZABALETA'],
        '133': ['EL PALMAR', 'ZARAGOZA', '43897600', '3233683317', 'Sin Dato', 'FRANCIA ROSA RIVERA SUÁREZ'],
        '134': ['EL PROGRESO - YESID FERNEY PALACIO DE DIEGO', 'ZARAGOZA', '1007324725', '3172381285', 'Sin Dato', 'YESID FERNEY PALACIO DE DIEGO'],
        '135': ['GERILUZ', 'ZARAGOZA', '98475751', '3197419019', 'Sin Dato', 'GERMAN ANTONIO ARRIETA ALARCÓN'],
        '136': ['GERYLUZ - LUZ MARY SOLAR', 'ZARAGOZA', '1032248035', '3172947086', 'Sin Dato', 'LUZ MARY SOLAR SILVA'],
        '137': ['KELLY', 'ZARAGOZA', '1001682215', '3106271099', 'Sin Dato', 'KELLY JOHANA CASTILLO ACOSTA'],
        '138': ['LA BATEA', 'ZARAGOZA', '22243266', '3164319662', 'Sin Dato', 'Sin Dato'],
        '139': ['LA BENDICIÓN', 'ZARAGOZA', '92028645', '3175833079', 'Sin Dato', 'RAÚL ENRIQUE ROMERO PÉREZ'],
        '140': ['LA BENDICIÓN - EDISON TAMARA', 'ZARAGOZA', '4440077', '0', 'Sin Dato', 'EDINSON MANUEL TAMARA BENÍTEZ'],
        '141': ['LA BENDICIÓN CORDERO ICACALES', 'ZARAGOZA', '1007578265', '3126156158', 'Sin Dato', 'JANIS MELISSA JULIO VILLALBA'],
        '142': ['LA BENDICIÓN DE DIOS - CRISTOVALINA DE DIEGO', 'ZARAGOZA', '43693856', '3195935127', 'Sin Dato', 'CRISTOVALINA DE DIEGO'],
        '143': ['LA BENDICIÓN DE DIOS - DIONISIA VILORIA', 'ZARAGOZA', '43895824', '3167887639', 'Sin Dato', 'DIONISIA MARÍA VILORIA ARRIETA'],
        '144': ['LA BENDICIÓN DE DIOS - ELVIA NERIS LUNA VEGA', 'ZARAGOZA', '22241947', '3127917680', 'Sin Dato', 'ELVIA NERIS LUNA VEGA'],
        '145': ['LA BENDICIÓN DE DIOS - LUÍS FERNANDO MORELO', 'ZARAGOZA', '8363885', '3146814922', 'luisfdoromero38@gmail.com', 'LUÍS FERNANDO MORELO'],
        '146': ['LA BENDICIÓN DE DIOS - MARCIANA JUDITH PÉREZ PERTUZ', 'ZARAGOZA', '64564001', '3134715190', 'Sin Dato', 'MARCIANA JUDITH PÉREZ PERTUZ'],
        '147': ['LA BENDICIÓN DE DIOS - MARIA ROMERO', 'ZARAGOZA', '39279319', '0', 'Sin Dato', 'MARÍA MARGARITA ROMERO'],
        '148': ['LA BENDICIÓN DE DIOS - ROSA DEDIEGO', 'ZARAGOZA', '26284494', '0', 'Sin Dato', 'ROSA MARÍA DEDIEGO BERMÚDEZ'],
        '149': ['LA BENDICIÓN DE DIOS - ROSMIRA ZAMBRANO', 'ZARAGOZA', '23062654', '3136828375', 'Sin Dato', 'ROSMIRA ZAMBRANO DE MERCADO'],
        '150': ['LA BENDICIÓN DE DIOS MARI DE JESUS LARGO', 'ZARAGOZA', '43694206', '3182543423', 'Sin Dato', 'MARI DE JESÚS LARGO BURITICA'],
        '151': ['LA BENDICIÓN EL DOCE', 'ZARAGOZA', '15672282', '3148195931', 'Sin Dato', 'ARNEL ENRIQUE PEÑA RODELO'],
        '152': ['LA CIMA', 'ZARAGOZA', '1045142112', '3507573115', 'juanpedroza529@gmail.com', 'JUAN DAVID PEDROZA LARGO'],
        '153': ['LA ESPERANZA', 'ZARAGOZA', '1040501364', '0', 'Sin Dato', 'GLEIDY ESTHER MOSCOTE RAMÍREZ'],
        '154': ['LA ESPERANZA - MANUEL ADRIANO MEJÍA', 'ZARAGOZA', '3442817', '3226646504', 'Sin Dato', 'MANUEL ADRIANO MEJÍA'],
        '155': ['LA ESPERANZA - MANUEL ENRIQUE ATENCIO FERIA', 'ZARAGOZA', '1045143578', '3106114550', 'Sin Dato', 'MANUEL ENRIQUE ATENCIO FERIA'],
        '156': ['LA ESPERANZA - ROSINA DEL CARMEN ALBA YENERIS', 'ZARAGOZA', '34944952', '3128740081', 'Sin Dato', 'ROSINA DEL CARMEN ALBA YENERIS'],
        '157': ['LA ESPERANZA - SENITH ALZATE', 'ZARAGOZA', '1001158581', '3188197248', 'Sin Dato', 'SENITH DEL CARMEN ALZATE FERRER'],
        '158': ['LA ESPERANZA - YORLEDIS SOLAR SILVA', 'ZARAGOZA', '1038480040', '3172947086', 'Sin Dato', 'YORLEDIS SOLAR SILVA'],
        '159': ['LA ESPERANZA EL PATO', 'ZARAGOZA', '15301328', '3117283992', 'Sin Dato', 'ARMANDO DE JESÚS MANJARREZ TRESPALACIOS'],
        '160': ['LA FÉ', 'ZARAGOZA', '1038125716', '3135565283', 'arneiderm69@gmail.com', 'ARNEIDER MEJÍA PEÑA'],
        '161': ['LA ILUSIÓN', 'ZARAGOZA', '70001542', '3128480120', 'Sin Dato', 'EDGAR DE JESÚS SIERRA CARDONA'],
        '162': ['LA LUCHA', 'ZARAGOZA', '22242897', '3205464297', 'ennita.ortiz@gmail.com', 'SARA ENNA ORTIZ HERNANDEZ'],
        '163': ['LA VELENTINA', 'ZARAGOZA', '3672769', '3102659019', 'Sin Dato', 'MANUEL DE JESÚS SANTERO CLEMENTE'],
        '164': ['LAS BRISAS - YOEL PEÑA', 'ZARAGOZA', '15671796', '3113181154', 'Sin Dato', 'YOEL AYAN PEÑA RODELO'],
        '165': ['LAS BRISAS - YONEDIS PEÑA', 'ZARAGOZA', '1007409072', '3232868281', 'Sin Dato', 'YONEDIS PEÑA GALLEGO'],
        '166': ['LAS DELICIAS', 'ZARAGOZA', '1032246705', '3157968005', 'Sin Dato', 'MARY LUZ SOLAR SILVA'],
        '167': ['LAS GUARDIANAS', 'ZARAGOZA', '1040515099', '3184816548', 'ederney19931@gmail.com', 'MARÍA CLARA ARRIETA VILORIA'],
        '168': ['LOS EXTENSIONISTA', 'ZARAGOZA', '1001741728', '3235083200', 'ruby.l.9c@gmail.com', 'RUBY ESTELLA LONDOÑO RAMÍREZ'],
        '169': ['LOS EXTENSIONISTA - EDWIN TEJADA', 'ZARAGOZA', '1001741558', '3128651274', 'bersabet.500@hotmail.com', 'EDWIN DAVID TEJADA NAVARRO'],
        '170': ['LOS EXTENSIONISTAS - YESICA RAMIREZ', 'ZARAGOZA', '1007407189', '3224097518', 'Sin Dato', 'YESICA PAOLA RAMÍREZ NAVARRO'],
        '171': ['LOS RAMÍREZ', 'ZARAGOZA', '73200093', '3192777764', 'Sin Dato', 'MANUEL MARÍA RAMÍREZ ZÚÑIGA'],
        '172': ['MARGARITA', 'ZARAGOZA', '98475188', '3173337715', 'Sin Dato', 'ABEL BIENVENIDO VILORIA RÍOS'],
        '173': ['MIRABU', 'ZARAGOZA', '1040498934', '3217132214', 'Sin Dato', 'LORENA ISABEL MIRANDA SALCEDO'],
        '174': ['PRIMAVERA', 'ZARAGOZA', '8200371', '3205418333', 'Sin Dato', 'HÉCTOR ENRIQUE NISPERUZA COBOS'],
        '175': ['PUERTO AMOR', 'ZARAGOZA', '11062344', '3123562273', 'Sin Dato', 'NORBERTO ANTONIO CASTILLO RUIZ'],
        '176': ['SAIRA', 'ZARAGOZA', '44120539', '0', 'Sin Dato', 'CARMEN LUISA DEDIEGO BERMÚDEZ'],
        '177': ['SAMUEL', 'ZARAGOZA', '22246893', '3197498635', 'Sin Dato', 'LUZ LEYDIS MOSQUERA CUESTA'],
        '178': ['SAN PEDRO', 'ZARAGOZA', '1001848902', '3136719152', 'Sin Dato', 'ANA CIRA MONTIEL PEÑA'],
        '179': ['SOLI', 'ZARAGOZA', '43693439', '3124362194', 'Sin Dato', 'NELLY GUISAO'],
        '180': ['TRES HERMANOS', 'ZARAGOZA', '98611970', '3122151615', 'anuarjosegaray@gmail.com', 'ANUAR JOSÉ GARAY SALGADO'],
        '181': ['VILLA ISAVAL', 'ZARAGOZA', '8746267', '3197312879', 'Sin Dato', 'Sin Dato'],
        '182': ['VILLA LUISA', 'ZARAGOZA', '22238596', '3128332360', 'Sin Dato', 'ARELIS DEL CARMEN ÁVILA GÓMEZ']
    
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