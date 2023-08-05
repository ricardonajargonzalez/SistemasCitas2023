

import { Avatar, Box, Divider, Fab, FormControl, FormControlLabel, FormLabel, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Radio, RadioGroup, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Add, AdminPanelSettings, BeachAccess, FileCopy, Print, Refresh, Save, Share } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { agendasServicioWizardPersona } from '../../store/stateWizard';
import { getReservacionTemporal, insertReservacionTemporal } from '../../store/stateReservacion/thunks';
import { useHorarioEmpleado } from '../../hooks/useHorarioEmpleado';




export const Comp_horasv2 = ({ empleado, seleccionServicio, fecha_selecccionada,nextTab }) => {
  const dispatch = useDispatch();
  const { servicios,personas } = useSelector(state => state.stateWizard);
  const { empleadoid, empleadodes, horaini, horafin } = empleado;
  const {  detalle_servicio, servicioid, serviciominutos, descripcion, personaIndex } = seleccionServicio;
  const [counter, setCounter] = useState(empleadoid);
  const [horarioCita, sethorarioCita] = useState({});
  const { itemshorarios } =  useHorarioEmpleado(horaini, horafin,fecha_selecccionada,serviciominutos);

  useEffect(() => {
    const d = new Date();
    let time = d.getTime();
    localStorage.setItem('userSC', time);
  }, []);


  useEffect(() => {
    //  console.log("servicio detalle cambio " + personaIndex);
  }, [personas[personaIndex]]);
  


  const selectedRadio = (horariostr, itemHorario) => {
    const horario_i = itemHorario[0];
    const horario_f = itemHorario[1];
    sethorarioCita({ horariostr, horario_i: horario_i, horario_f: horario_f });

     //===========
        let horaistr =  dayjs(horario_i).format('DD-MM-YYYY HH:mm A');
        let horafstr = dayjs(horario_f).format('DD-MM-YYYY HH:mm A');

        //fecha para mysql
        let horaistrmysql =  dayjs(horario_i).format('YYYY-MM-DD HH:mm:ss');
        let horafstrmysql = dayjs(horario_f).format('YYYY-MM-DD HH:mm:ss');
       
        // fecha mysql validar temporales
        let fecha = dayjs(horario_i).format('YYYY-MM-DD');

        dispatch(agendasServicioWizardPersona({
          persona_seleccionado: personaIndex,
          servicioid: servicioid,
          detallehorario: {
            horario_i: horaistr,
            horario_f: horafstr
          }
        }));

        let segundosunix_ini  = dayjs().unix();
        let segundosunix_fin  = dayjs().add(5,'minutes').unix();
       
        //FECHAS SE SEGUNDOS A DATE
        // let seguntosToDate_ini = dayjs.unix(segundosunix_ini);
        // let seguntosToDate_fin = dayjs.unix(segundosunix_fin);

        // console.log(seguntosToDate_ini);
        // console.log(seguntosToDate_fin);
        const idstorage = localStorage.getItem('userSC');
        dispatch(insertReservacionTemporal(segundosunix_ini, segundosunix_fin,horaistrmysql,horafstrmysql,serviciominutos,idstorage,empleadoid)); //sucursal, idusuario
        dispatch(getReservacionTemporal('2023-01-01',dayjs().unix()));
        

        // nextTab(0);
    //==============

    // console.log(horaistrmysql);
    // console.log(serviciominutos);

  }


  // const handleClick = () => {


  //   let horaistr = dayjs(horarioCita.horario_i).format('DD-MM-YYYY HH:mm A');
  //   let horafstr = dayjs(horarioCita.horario_f).format('DD-MM-YYYY HH:mm A');


  //   dispatch(agendasServicioWizardPersona({
  //     persona_seleccionado: personaIndex,
  //     servicioid: servicioid,
  //     detallehorario: {
  //       horario_i: horaistr,
  //       horario_f: horafstr
  //     }
  //   }));

  //   nextTab(0);
  // }





  return (
    <Grid container sx={{mt: 12}}
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center">
      {/* <Box sx={{display: {xs: 'none', md: 'initial'}, transform: 'translateZ(0px)', flexGrow: 1, height: 230 }}>
        <List
          sx={{
            width: '250px',
            position: 'absolute',
            right: '5%',
            top: 100
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
      </Box> */}


      <Box sx={{ p: 1 }} elevation={3}>
        <FormControl>
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
            {
              itemshorarios.map((itemHorario, index) => {
                let item_inicio = itemHorario[0];
                let item_iniciostr = dayjs(itemHorario[0]).format('HH:mm A');

                let item_fin = itemHorario[1];
                let item_finstr = dayjs(itemHorario[1]).format('HH:mm A');

                return <FormControlLabel onClick={() => selectedRadio(`${item_iniciostr} - ${item_finstr}`, itemHorario)} key={`${item_iniciostr} - ${item_finstr}`} value={`${item_iniciostr} - ${item_finstr}`} control={<Radio />} label={`${item_iniciostr} - ${item_finstr}`} />

              })
            }
          </RadioGroup>
        </FormControl>
      </Box>
      {/* <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
        <Fab sx={{ position: 'absolute', bottom: 16, right: 16 }} onClick={handleClick} color="primary" aria-label="add">
          <Add />
        </Fab>
      </Box> */}
    </Grid>
  );
}

// Comp_horas.defaultProps = {
//   empleadoid : 1,
//   empleado : 'Ricardo N'
// }
