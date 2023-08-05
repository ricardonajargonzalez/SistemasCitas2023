import { ErrorOutline, ExpandMore, WarningAmber } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, List, ListItemButton, ListItemText, Paper } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux';

export const Agendar_Comp1_Serviciosv2 = ({onSeleccionServicio,valueTab,nextTab}) => {
    //selectors
    const { servicios, personas } = useSelector(state => state.stateWizard);
    //useStates
    const [expanded, setExpanded] = useState(false);

    let servicio_No_agendado = (personaIndex, servicioid) => {
        let personaseleccionada = personas[personaIndex];
        let { servicios } = personaseleccionada;
        let agendado = 0;
        let servicio = servicios.filter(({ servicioid }) => servicioid == servicioid);
        return servicio;
      }

     //funcion props seleccionar-servicio
      const onSeleccionarServicio = ({ servicioid, serviciominutos, descripcion, detalle_servicio }, personaIndex) => {
        onSeleccionServicio({servicioid: servicioid,serviciominutos, descripcion, detalle_servicio:detalle_servicio , personaIndex});
        nextTab(1);
      }

      const serviciosCompletados = (personaIndex, personas) => {
        const personaseleccionada = personas[personaIndex];
        const { servicios } = personaseleccionada;
        let result = [];
        const servicioSinAgendar = servicios.filter(({ servicio_agendado }) => servicio_agendado == false);
        const servicioagendados = servicios.filter(({ servicio_agendado }) => servicio_agendado == true);
        result['agendados'] = servicioagendados.length;
        result['no_agendados'] = servicioSinAgendar.length;
        result['total'] = servicios.length;
        return result;
      }

      const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };


  return (<Box sx={{mt:12,p: 1}}>
    aaaaaaaaaaaaa
     {/* <Paper sx={{ mt: 12, p: 1, minHeight: 300, maxHeight: 300, overflow: 'auto' }} elevation={3}> */}
          {
            personas.map((personaItem, index) => {

              let personaIndex = index;
              let items_servicios = [];
              const array_servicios = personas[index].servicios;

              items_servicios = array_servicios.map((serviciosItem, index) => {
                let agendado = servicio_No_agendado(personaIndex, serviciosItem.servicioid);
                return <ListItemButton disableGutters={true} divider={true} onClick={event => onSeleccionarServicio(serviciosItem, personaIndex)} 
                  key={serviciosItem.servicioid}>
                  <ListItemText primary={serviciosItem.descripcion} /> {!agendado[index].servicio_agendado && <ErrorOutline></ErrorOutline>}
                </ListItemButton>
              }
              )

              let completados = serviciosCompletados(index, personas);
              return (<Accordion key={`key${index}`} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: 'black' }} />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                  sx={{height:9, background: 'rgba(0, 158, 227, 1)', p: 1, fontSize: 15, color: completados['agendados'] == completados['total'] ? 'green' : '#ffffff' }}>

                  {personaItem.nombre}
                  {completados['no_agendados'] > 0 && <>  -  <Chip sx={{color: '#ffffff'}} label={`Incompletos: ${completados['no_agendados']}`} size="small" icon={<WarningAmber style={{color: '#ffffff'}} />} /></>}

                </AccordionSummary>
                <AccordionDetails>
                  <List component="nav">
                    {
                      items_servicios.length > 0 && items_servicios
                    }
                  </List>
                </AccordionDetails>
              </Accordion>)
            })
          }
       {/* </ Paper> */}
 </Box> )
}
