

import { Create, DeleteOutline, HowToReg, RadioButtonChecked, ShoppingCart } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Badge, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { completarWizardPersonas, editWizardPersonas, removeServicioWizardPersona, setWizardPersonaSelected } from '../../store/stateWizard/stateWizardSlice';




export const Personas = () => {

    const { servicios, persona_selected, nro_personas, personas } = useSelector(state => state.stateWizard);
    const dispatch = useDispatch();
    const [personaActiva, setpersonaActiva] = useState(null);
    const [inputActivo, setinputActivo] = useState(null);
    const [inputCompletado, setinputCompletado] = useState(null);


    //ACTIVA LA PERSONA SELECCIONADA
    const inputHandle = (item) => {
        setpersonaActiva(item);
        dispatch(setWizardPersonaSelected(item));
    }
    //ACTIVA TEXTFIELD Y RESETEAMOS CUALQUIER TEXTFIELDACTIVO 
    const editNombre = (itemPersona) => {
        setinputCompletado(null);
        setinputActivo(itemPersona);
    }
    //ACTIVAR TEXTFIELD AL ESCRIBIR Y PASAR ESTAR LISTO PARA SER COMPLETADO
    const inputChange = (event, item) => {
        setinputCompletado(item);
        dispatch(editWizardPersonas({
            value: event.target.value,
            index: item
        }));
    }
    //
    const saveNombre = (item) => {
        setinputActivo(null);
        setinputCompletado(null);
        dispatch(completarWizardPersonas({
            index: item
        }));
    }

    const deleteItem = (servicio_delete, personaItem) => {
        dispatch(removeServicioWizardPersona({
            servicioid: servicio_delete,
            personaid: personaItem
        }));
    }

    const onSubmit = (event, index) => {
        event.preventDefault();
        setinputActivo(null);
        setinputCompletado(null);
        dispatch(completarWizardPersonas({
            index: index
        }));
    }


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));


    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        console.log(newExpanded);
        setExpanded(newExpanded ? panel : false);
    };

    

    return (
        <>
            {
                personas.map((personaItem, index) => {
                    let personaIndex = index;
                    let items_servicios = [];
                    let serviciosagregado = [];
                    if (persona_selected != null) {
                        const array_servicios = personas[index].servicios;
                        serviciosagregado = personas[index].servicios;
                        items_servicios = array_servicios.map((serviciosItem) =>
                           
                                <List sx={{p:0}} key={serviciosItem.servicioid}>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => deleteItem(serviciosItem.servicioid, personaIndex)} >
                                            <ListItemIcon>
                                                <DeleteOutline /> {serviciosItem.descripcion}
                                            </ListItemIcon>
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            
                        )
                    }

                    return <Accordion sx={{background: personaActiva == index && '#009ee3', color: personaActiva == index && '#ffffff'}} onClick={() => inputHandle(index)} key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                                <AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
                                    <Box sx={{p:0}}>
                                    <IconButton>
                                        <StyledBadge badgeContent={serviciosagregado.length} color="secondary">
                                            <ShoppingCart />
                                        </StyledBadge>
                                    </IconButton>
                                        <span style={{marginLeft: '8px'}}>{personas[index].nombre}</span>
                                    </Box>
  
                                </AccordionSummary>
                                <AccordionDetails>
                                    {items_servicios.length > 0 && items_servicios}
                                </AccordionDetails>
                            </Accordion>

                            {/* {items_servicios.length > 0 &&  <Divider />}
                            {items_servicios.length > 0 && items_servicios} */}
                            {/* {items_servicios.length > 0 && items_servicios} */}
        
                })
            }
        </>
    )
}

export default Personas;
