import { Close, Comment, ExpandMore } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Snackbar, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServiciosPaquetes } from "../../store/serviciosPaquetes";
import { addServiciosWizardPersonas } from "../../store/stateWizard";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { addServicioIndividual, addServicioPaquete } from "../funciones/Funciones_ServiciosPaquetes";





export const ServiciosPaquetes = () => {

  const dispatch = useDispatch();
  const { servicios_paquetes } = useSelector(state => state.serviciosPaquetes);
  const { servicios, persona_selected, personas } = useSelector(state => state.stateWizard);
  const [checked, setChecked] = useState([0]);



  const handleToggle = (servicio_Id, checkedIndex, servicioTipoId, descripcion, serviciominutos, servicioPrecio) => () => {
    const currentIndex = checked.indexOf(servicio_Id);
    const newChecked = [...checked];
    let accion = false;
    // console.log("serviciominutos " + serviciominutos);

    if (persona_selected != null) {
      if (checkedIndex === -1) {
        const ver_persona = personas[persona_selected]; //ARRAY PERSONAS > PERSONA INDICE
        const ver_servicios = ver_persona.servicios;  //ARRAY SERVICIOS DE LA PERSONA


        if (ver_servicios.length > 0) {
            /*
            ======================================
            SELECCION DE SERVICIO INDIVIDUAL
            ======================================
            */
            if (servicioTipoId == 1) {
              let { valido, message_string } = addServicioIndividual(servicio_Id, servicios_paquetes, servicios, persona_selected, personas);
              if (valido == true) {
                //AGREGAMOS EL SERVICIO
                dispatch(addServiciosWizardPersonas(
                  {
                    servicioid: servicio_Id,
                    tipo: servicioTipoId,
                    descripcion: descripcion,
                    serviciominutos,
                    servicio_agendado: false,
                    servicioPrecio: servicioPrecio
                  }
                ));
                setstateSnackBar({ open: true, ...{
                  vertical: 'top',
                  horizontal: 'right',
                  message: `${descripcion} agregado`
                } });
                accion = true;
              } else {
                accion = false;
                notify(message_string);
              }
            /*
            ======================================
            SELECCION DE SERVICIO/PAQUETE
            ======================================
            */
          } else if (servicioTipoId == 2) {
            let { valido, message_string } = addServicioPaquete(servicio_Id, servicios_paquetes, servicios, persona_selected, personas);
            if (valido == true) {
            //AGREGAMOS EL SERVICIO
              dispatch(addServiciosWizardPersonas(
                {
                  servicioid: servicio_Id,
                  tipo: servicioTipoId,
                  descripcion: descripcion,
                  serviciominutos,
                  servicio_agendado: false,
                  servicioPrecio: servicioPrecio
                }
              ));
              accion = true;
              setstateSnackBar({ open: true, ...{
                vertical: 'top',
                horizontal: 'right',
                message: `${descripcion} agregado`
              } });
            } else {
              accion = false;
              notify(message_string);
            }
          } 
        } else {
          accion = true;
          //AGREGAMOS EL 1er SERVICIO
          dispatch(addServiciosWizardPersonas(
            {
              servicioid: servicio_Id,
              tipo: servicioTipoId,
              descripcion: descripcion,
              serviciominutos,
              servicio_agendado: false,
              servicioPrecio: servicioPrecio
            }
          ));
          setstateSnackBar({ open: true, ...{
            vertical: 'top',
            horizontal: 'right',
            message: `${descripcion} agregado`
          } });
        }

      }
    } else {
      accion = false;
      notify("Seleccione una persona");
    }


    /*
    ======================================
    REALIZAMOS LA ACCION PARA MARCAR O DESMARCAR EL CHECKBOX
    ======================================
     */
    if (currentIndex === -1) {
      //marcar
      if (accion == true) {
        newChecked.push(servicio_Id);
      }
    } else {
      //desmarcar
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);




  };

  useEffect(() => {
    dispatch(getServiciosPaquetes(1));
    setChecked([0]);
  }, []);

  useEffect(() => {
    dispatch(getServiciosPaquetes(1));
    setChecked([0]);
  }, [persona_selected]);

  const notify = (texto) => { toast.warn(texto) };
  const notifysucess = (texto) => { toast.success(texto) };
  

  const [stateSnackBar, setstateSnackBar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: ''
  });

  const { vertical, horizontal, open, message } = stateSnackBar;

  const handleClose = () => {
    setstateSnackBar({ ...stateSnackBar, open: false });
  };

  const action = (
    <>
        <IconButton
            size="small"
            color="inherit"
            onClick={handleClose}
        >
            <Close fontSize="small" />
        </IconButton>
    </>
);
  

 


  return (
    <Paper elevation={3}>
            <Snackbar autoHideDuration={10}
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            // onClose={handleClose}
            message={message}
            key={vertical + horizontal}
            action={action}
          />
      {
        servicios_paquetes.map(servicioItem => (
          <List key={`list${servicioItem.servicioId}`} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem
              key={servicioItem.servicioId}
              //   secondaryAction={
              //     <IconButton edge="end" aria-label="comments">
              //       <Comment />
              //     </IconButton>
              //   }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(servicioItem.servicioId, checked.indexOf(servicioItem.servicioId), servicioItem.servicioTipoId, servicioItem.serviciodes,servicioItem.serviciominutos,servicioItem.servicioPrecio)} dense>
                {/* <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(servicioItem.servicioId) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': `checkbox-list-label-${servicioItem.servicioId}` }}
                  />
                </ListItemIcon> */}
                <ListItemText id={`checkbox-list-label-${servicioItem.servicioId}`} primary={servicioItem.serviciodes} />
              </ListItemButton>
            </ListItem>
          </List>
        ))
      }

    </Paper>
  )
}

export default ServiciosPaquetes;
