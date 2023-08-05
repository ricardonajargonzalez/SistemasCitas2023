

import { useSelector } from "react-redux";





export const addServicioIndividual = (servicio_Id, servicios_paquetes, servicios, persona_selected, personas) => {
  // console.log("dentro de la function invidual");

  let ver_persona = personas[persona_selected]; //ARRAY PERSONAS > PERSONA INDICE
  let ver_servicios = ver_persona.servicios;  //ARRAY SERVICIOS DE LA PERSONA
  let servicioi = false;
  let serviciop = false;
  let messageString = "";
  let valido = false;
  let resul_servicios = [];
  let accion = false;
  /* 
  BUSCAMOS EN EL ARRAY LOS SERVICIOS DE TIPO 1(INDIVIDUAL)
  */
  resul_servicios = ver_servicios.filter(({ tipo }) => tipo == "1"); //se crea array de resultados
  //BUSCAMOS EN EL NUEVO ARREGLO DE RESULTADOS SI YA EXISTE UN SERVICIO INDIVIDUAL AGREGADO
  const serv_indi = resul_servicios.filter(({ servicioid }) => servicioid == servicio_Id);
  if (serv_indi.length > 0) { //el servicio ya existe
    servicioi = true;
    accion = false;
    valido = false;
    messageString = "Este servicio ya esta agregado";
  }

  /* 
  BUSCAMOS EN EL ARRAY LOS SERVICIOS DE TIPO 2(PAQUETES)
  */
  if (servicioi == false) {
    resul_servicios = ver_servicios.filter(({ tipo }) => tipo == "2"); //se busca en los servicios agregados al usuario y se crea array de resultados
    /*
      BUSCAMOS EN LOS DETALLES DEL SERVICIO TRAIDA DE LA API Y VER QUE SERVICIOS INDIVIDUALES CONTIENE
    */
    if (resul_servicios.length > 0) {
      let existe_ser_en_paq = false;
      for (let i = 0; i < resul_servicios.length; i++) {
        let servicioid_paquete = resul_servicios[i].servicioid;
        let resul_serv_paquete = servicios_paquetes.filter(({ servicioId }) => servicioId == servicioid_paquete); //se crea array de resultados de todo el paquete
        if (resul_serv_paquete.length > 0) {
          let detalle_paquete = resul_serv_paquete[0].detpaquete; //array de solo el detalle[0](encuentra el primero)
          /*
           BUSCAMOS EN EL DETALLE SI EXISTE EL SERVICIO INDIVIDUAL
          */
          let resul_paq_existe = detalle_paquete.filter(({ paqueteServicioId }) => paqueteServicioId == servicio_Id);

          if (resul_paq_existe.length > 0) {
            existe_ser_en_paq = true;
            accion = false;
            valido = false;
            messageString = `Este servicio ya se encuentra en el paquete ${resul_serv_paquete[0].serviciodes}`;
            break
          }

        }
      }
      if (existe_ser_en_paq == false) {
        accion = true;
        //AGREGAMOS  SERVICIO
        valido = true;
      }
    } else { //SI NO EXISTE SERVICIO INDIVUAL Y ADEMAS NO "EXISTEN" PAQUETES AGREGADOS AL USUARIO
      accion = true;
      //AGREGAMOS  SERVICIO
      valido = true;
    }
  }

  return {
    valido: valido,
    message_string: messageString
  }
}

export const addServicioPaquete = (servicio_Id, servicios_paquetes, servicios, persona_selected, personas) => {
  // console.log("dentro de la function paquete");
  let ver_persona = personas[persona_selected]; //ARRAY PERSONAS > PERSONA INDICE
  let ver_servicios = ver_persona.servicios;  //ARRAY SERVICIOS DE LA PERSONA
  let servicioi = false;
  let serviciop = false;
  let messageString = "";
  let valido = false;
  let resul_servicios = [];
  let accion = false;

  resul_servicios = ver_servicios.filter(({ tipo }) => tipo == "2"); //se busca en los servicios agregados al usuario y se crea array de resultados
  //BUSCAMOS EN EL NUEVO ARREGLO DE RESULTADOS SI YA EXISTE UN SERVICIO INDIVIDUAL AGREGADO
  const serv_indi = resul_servicios.filter(({ servicioid }) => servicioid == servicio_Id);
  if (serv_indi.length > 0) { //el servicio ya existe
    serviciop = true;
    accion = false;
    valido = false;
    messageString = "Este paquete ya esta agregado";
  }

  if (serviciop == false) { //revisamos los servicios indivuales contra el detalle del paquete que se desea agregar
    let servicios_paquetes_t2 = servicios_paquetes.filter(({ servicioTipoId }) => servicioTipoId == "2");
    let result_detpaquete = servicios_paquetes_t2.filter(({ servicioId }) => servicioId == servicio_Id); //se busca el paquete de el resultado de la api y desestructuramos el detalle
    let { detpaquete } = result_detpaquete[0];
    if (detpaquete.length > 0) {
      resul_servicios = ver_servicios.filter(({ tipo }) => tipo == "1"); //se crea array de resultados
      if (resul_servicios.length > 0) { //revisamos si tenemos servicios indivuales agregados
        for (let j = 0; j < detpaquete.length; j++) {
          let paquete_ServicioId = detpaquete[j].paqueteServicioId;
          let resul_servi_vs_promoser_array = resul_servicios.filter(({ servicioid }) => servicioid == paquete_ServicioId);
          if (resul_servi_vs_promoser_array.length > 0) {
            //recuperamos la descripcion de servicioid repetido
            let servicios_paquetes_t1 = servicios_paquetes.filter(({ servicioTipoId }) => servicioTipoId == "1");
            let servicio_des = servicios_paquetes_t1.find(({ servicioId }) => servicioId == paquete_ServicioId);
            accion = false;
            valido = false;
            messageString = `No puede agregar este paquete, porque ya cuenta con el servicio ${JSON.stringify(servicio_des.serviciodes)}`;
            break
          }
        }
      }else{ //Revisamos si el paquete al seleccionar ya existe 
        resul_servicios = ver_servicios.filter(({ tipo }) => tipo == "2"); //se crea array de resultados
        if (resul_servicios.length > 0) { //revisamos si tenemos servicios indivuales agregados
          let existePaquete = false;
          for (let j = 0; j < resul_servicios.length; j++) {
             if(resul_servicios[j].servicioid == servicio_Id){
              accion = false;
              existePaquete = true;
              break
             }
          }
          if(existePaquete==true){
            valido = false;
            messageString = "Este paquete ya esta agregado";
          }else{
            valido = true;
            messageString = ""; 
          }
        }
      }

    }
  }
  return {
    valido: valido,
    message_string: messageString
  }
}



