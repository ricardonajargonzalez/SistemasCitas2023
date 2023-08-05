import { ExpandMore, SensorOccupied, SocialDistance } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Grid, List, ListItemButton, ListItemText, Paper, Typography } from "@mui/material"
import { useState } from "react";
import { useSelector } from "react-redux";

export const Comp_personas_servicios = () => {
    const { servicios, personas } = useSelector(state => state.stateWizard);
    const [expanded, setExpanded] = useState(false);

    const handleChange =(panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };


  return (
    <Paper sx={{ p:1,minHeight: 300 }} elevation={3}>
      
    {
      personas.map(( personaItem, index) =>{ 

        let personaIndex = index;
        let items_servicios = [];
          const array_servicios = personas[index].servicios;
          items_servicios =  array_servicios.map((serviciosItem)=>
              <ListItemButton key={serviciosItem.servicioid}>
                <ListItemText primary={serviciosItem.descripcion} />
              </ListItemButton>
          )
       



        return <Accordion key={`key${index}`} expanded={expanded === `panel${index}` } onChange={handleChange(`panel${ index}`)}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
            { personaItem.nombre}
            </Typography>
            {/* <Typography sx={{ color: 'text.secondary' }}>{ index.nombre}</Typography> */}
          </AccordionSummary>
          <AccordionDetails>
          <List component="nav">
          { 
             items_servicios.length > 0 && items_servicios 
           }
          </List>
          </AccordionDetails>
        </Accordion>
        })
      }  
        </ Paper>
  )
}
