
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReservacionTemporal } from '../store/stateReservacion/thunks';

export const useHorarioEmpleado = (horaini, horafin, fecha_selecccionada, serviciominutos) => {

    // console.log({horaini, horafin, fecha_selecccionada, serviciominutos});
    console.log(fecha_selecccionada);

 
   
   

    let itemvalido = 1; //bandera para valir fecha
    let itemshorarios = []; //array contenedor
    let detallehorario = []; //subarray para horarios

    const h = '10:00'
    const horaInicio = new Date(`2023-04-17T${h}:00`);

    // console.log(horaInicio);

    /*
      Reseteamos en string en formato DD/MM/YYYY 00:00 el dia seleccionado y concatenamos la hora de inicio y hora de salida que el empleado trabaja
    */
    const fechastri = `${fecha_selecccionada.format('DD/MM/YYYY')} ${horaini}`;
    const fechastrf = `${fecha_selecccionada.format('DD/MM/YYYY')} ${horafin}`;
    //=======================================================================================================

    /*
     Formateamos la fecha para tenerlo en date object (dayjs)
    */
    let fechahoraistr = dayjs(fechastri, "DD/MM/YYYY HH:mm:ss");
    let fechahorafstr = dayjs(fechastrf, "DD/MM/YYYY HH:mm:ss");
    //==========================================================

    let horarioactual = fechahoraistr; //dia y hora del horario inicio
    

    const dispatch = useDispatch();
    const { temporales } = useSelector(state => state.stateReservacion);
    
   
    useEffect(() => {
      // console.log("temporales" , temporales);
    }, [temporales]);
    
     const reservaciones = [{
        "fechai" : "123",
        "fechaf": "3"
     },{
        "fechai" : "1",
        "fechaf": "2"
     }]

     console.log(reservaciones);

    do {
        let inicio = dayjs(horarioactual);                               //HORA INICIO
        let fin = dayjs(horarioactual).add(serviciominutos, 'minutes');  //HORA FIN (agregamos los minutos del servicio)


        if (fin <= fechahorafstr) { //comprobamos si al sumar los minutos del servicio es valido
            horarioactual = fin;
            itemvalido = 1;
            
            //Es horario valido, pero se valida si no hay una reservacion temporal
            detallehorario = [inicio, fin];

            //OBJEC :
               //0 : 21 - 01- 23 9:00
               //1:  21 - 01 -23 9:50

               //0 : 21 - 01- 23  9:50
               //1:  21 - 01 -23 10:40

           let validoTemp =  validarCitasTemporales(detallehorario,temporales);
           if(validoTemp == 1){
              itemshorarios = [...itemshorarios, detallehorario];
              //console.log(itemshorarios);
           }else{
               return;
           }

        } else {
            itemvalido = 0;
        }

    } while (itemvalido == 1);


   

//   console.log(itemshorarios);


    return {
        itemshorarios
    }

}

const validarCitasTemporales = (horarios,temporales) =>{
    const hora_i = horarios[0];
    const hora_f = horarios[1];
    let valido = 1;
      
    // console.log("temporales " + temporales);
    if(Object.keys(temporales).length > 0){
        // console.log("checamos en if > 0");
        let valido = 0;
        // temporales.map((item, index) => {

         
        //     // let fechaservicioini = horariotemp.fechaservicioini; //"2023-01-21 09:00:00"
        //     // let fechaserviciofin = horariotemp.fechaserviciofin; //"2023-01-21 09:50:00"
            
        //     // console.log("checamos en temporales index " + index +" "+  item[0]);
            
        //  });
        
    }else{
        let valido = 1; 
    }

   return valido;

}
