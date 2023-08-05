

import { Avatar, Box, Divider, FormControl, FormControlLabel, FormLabel, List, ListItem, ListItemAvatar, ListItemText, Paper, Radio, RadioGroup, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from '@mui/material';
import { useState } from 'react';
import dayjs from 'dayjs';
import { AdminPanelSettings, BeachAccess, FileCopy, Print, Refresh, Save, Share } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { agendasServicioWizardPersona } from '../../store/stateWizard';


const horariosdisponibles = (horaini,horafin,fecha_selecccionada,serviciominutos) => {
  // console.log(fecha_selecccionada);
  // console.log(horaini);

  let itemvalido = 1;
  let itemshorarios = [];
  let detallehorario = [];

  const fechastri = `${fecha_selecccionada} ${horaini}`;
  const fechastrf = `${fecha_selecccionada} ${horafin}`;
  let fechahoraistr = dayjs(fechastri, "DD/MM/YYYY HH:mm:ss");
  let fechahorafstr = dayjs(fechastrf, "DD/MM/YYYY HH:mm:ss");

  let horarioactual = fechahoraistr;

  

 
  do {

    let inicio = dayjs(horarioactual);
    let fin = dayjs(horarioactual).add(serviciominutos, 'minutes'); //agregamos los minutos del servicio
    

    if (fin <= fechahorafstr) { //comprobamos si al sumar los minutos del servicio es valido
      horarioactual = fin;
      itemvalido = 1;

      detallehorario = [inicio, fin];
      itemshorarios = [...itemshorarios, detallehorario];

    } else {
      itemvalido = 0;
    }

  } while (itemvalido == 1);

  return itemshorarios;

}


export const Comp_horas = ({ empleado, seleccionServicio, fecha_selecccionada }) => {
  const dispatch = useDispatch(); 
  const { personas } = useSelector(state => state.stateWizard);
  const { empleadoid, empleadodes,horaini,horafin } = empleado;
  const { servicioid, serviciominutos, descripcion, personaIndex } = seleccionServicio;
  const [counter, setCounter] = useState(empleadoid);
  let itemsHorariosD = horariosdisponibles(horaini,horafin,fecha_selecccionada,serviciominutos);
  const [horarioCita, sethorarioCita] = useState({});


  const selectedRadio = (horariostr,itemHorario) => {
    const horario_i = itemHorario[0];
    const horario_f = itemHorario[1];


    // console.log(`2 horarioCita en comp_horas ${fecha_selecccionada}`);
    // console.log(`2 horarioCita en comp_horas ${horario_i}`);


    sethorarioCita({horariostr, horario_i : horario_i, horario_f: horario_f});

  }
 
  // console.log(personas);

  const handleClick = (e,operation) =>{
    e.preventDefault();
   if(operation=="save"){



      let horaistr = dayjs(horarioCita.horario_i).format('DD-MM-YYYY HH:mm A');
      let horafstr = dayjs(horarioCita.horario_f).format('DD-MM-YYYY HH:mm A');
      
      // console.log(horaistr);

      dispatch( agendasServicioWizardPersona({
      persona_seleccionado: personaIndex,
      servicioid: servicioid,
      detallehorario: {
        horario_i : horaistr, 
        horario_f: horafstr
      }
    }));

    // console.log(horaistr);


   }else if(operation=="refresh"){
    //Do
   }
   
  }

  const actions = [
    { icon: <Save />, name: 'Guardar', action: handleClick, operation: 'save' },
    { icon: <Refresh />, name: 'Refrescar', action: handleClick, operation: 'refresh' },
  ];



  return (
    <>
      <Box sx={{ mt:12, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <List
          sx={{
            width: '250px',
            position: 'absolute',
            right: '5%',
            top: 5
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AdminPanelSettings />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Personal" secondary={empleadodes} />
          </ListItem>
          <Divider component="li" />
           <ListItem>Fecha</ListItem>
          <li>
            <Typography
              sx={{ mt: 0, ml: 2 }}
              color="text.secondary"
              display="block"
              variant="caption"
            >
              {fecha_selecccionada} {horarioCita.horariostr}
            </Typography>
          </li>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Servicio" />
          </ListItem>
          <li>
            <Typography
              sx={{ mt: 0, ml: 2 }}
              color="text.secondary"
              display="block"
              variant="caption"
            >
              {descripcion} / {serviciominutos} minutos.
            </Typography>
          </li>
        </List>
      </Box>
      <Paper sx={{ p: 1, minHeight: 300, maxHeight: 300, overflow: 'auto' }} elevation={3}>

        <FormControl>
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
            {
              itemsHorariosD.map((itemHorario, index) => {
                let item_inicio = itemHorario[0];
                let item_iniciostr = dayjs(itemHorario[0]).format('HH:mm A');

                let item_fin = itemHorario[1];
                let item_finstr = dayjs(itemHorario[1]).format('HH:mm A');

                return <FormControlLabel onClick={() => selectedRadio(`${item_iniciostr} - ${item_finstr}`,itemHorario)} key={`${item_iniciostr} - ${item_finstr}`} value={`${item_iniciostr} - ${item_finstr}`} control={<Radio />} label={`${item_iniciostr} - ${item_finstr}`} />

              })
            }
          </RadioGroup>
        </FormControl>
      </Paper>
      <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          onClick={handleClick}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={(e) => {
                handleClick(e,action.operation)
               //console.log(e);
              }}
            />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
}

// Comp_horas.defaultProps = {
//   empleadoid : 1,
//   empleado : 'Ricardo N'
// }
