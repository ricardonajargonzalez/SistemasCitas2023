import { Avatar, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Radio, RadioGroup } from "@mui/material"
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { useDispatch, useSelector } from "react-redux";
import { getEmpleados } from "../../store/empleados/thunks";
import { getDiasDescanso } from "../../store/empleado/thunks";

const diasDescansos = () => {
  const { diasdescanso } = useSelector(state => state.empleado);
  let nowtemp = dayjs().subtract(1, 'day');
  let dias_descanso = [];
  for (let index = 1; index < 21; index++) {
    let dia = nowtemp.add(index, 'day');
    let { $W: day_week } = dia; //dias de la semana [0-6] Domingo = 0

    let dia_disp_add = true;
    if (diasdescanso.length > 0) {
      for (let i = 0; i < diasdescanso.length; i++) {
        let diadescanso = diasdescanso[i].day;
        // console.log("dia descanso " + diadescanso + " dia dias " + day_week);
        if (diadescanso == day_week) {
          dia_disp_add = true; //desactivamos el dia(dia de descans0)
          break
        } else {
          dia_disp_add = false;
        }
      } //for dias descanso
    } else {
      dia_disp_add = false;
    }
    if (dia_disp_add) {
      dias_descanso = [...dias_descanso, dia.format('YYYY-MM-DD')];
    }
  }//for rango de dias
  return dias_descanso;
}

const seleccionarDiahabil = () => { //seleccionamos el primer dia habil disponible en el calendario
  let diaHabil = 0;
  let now = dayjs();
  let stringnow = now.toISOString().slice(0, 10);
  const dias_descansos = diasDescansos();

  do {
    if (dias_descansos.includes(stringnow)) {
      now = now.add(1, 'day');
      stringnow = now.toISOString().slice(0, 10);
      diaHabil = 0;
      // console.log("dia inhabil y agregamos un dia mas " + stringnow);
    } else {
      diaHabil = 1;
      // console.log("dia habil " + stringnow);
    }
  } while (diaHabil == 0);

  return stringnow;
}


export const Compempleados = ({ selectedEmployed, selectedDate }) => {
  const dispatch = useDispatch();
  const { empleados } = useSelector(state => state.empleados);



  const now = dayjs();
  // let now = dayjs(seleccionarDiahabil());
  let diaHabil = dayjs(seleccionarDiahabil());
  const maxDays = dayjs().add(20, 'day');


  const dia = dayjs("2022-10-03").day();
  let dias_descansos = diasDescansos();
  const [value, setValue] = useState(now);
  const stringnow = value.toISOString().slice(0, 10);
  const [empleado_seleccionado, setempleado_seleccionado] = useState(null);
 


  const customDayRenderer = (date, selectedDates, pickersDayProps) => {
    const stringifiedDate = date.toISOString().slice(0, 10);


    if (dias_descansos.includes(stringifiedDate)) {
      return <PickersDay {...pickersDayProps} disabled />;
    }
    return <PickersDay {...pickersDayProps} />;
  };

  useEffect(() => {
    dispatch(getEmpleados(1));
  }, []);

  const empleado = ({ usuarioid, empleadodes, horaini, horafin, format_hora_ini, format_minutos_ini, format_hora_fin, format_minutos_fin }) => {
    const now = dayjs();
    // setValue(now);
    dispatch(getDiasDescanso(1, usuarioid)); //sucursal, idusuario
    setempleado_seleccionado(usuarioid);
    selectedEmployed(usuarioid, empleadodes, horaini, horafin, format_hora_ini, format_minutos_ini, format_hora_fin, format_minutos_fin);
  }


  return (

    <Paper sx={{ p: 1, minHeight: 300, maxHeight: 300, overflow: 'auto' }} elevation={3}>

      <Grid container>
        <Grid item md={12} xs={12} lg={6}>
          <RadioGroup name="use-radio-group">
            <List>

              {/* <ListItem disablePadding>
            <ListItemButton>
              <Radio
                size="small"
                value="SF"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'SF' }}
              />
              <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://www.donquijobs.com/user_images/empty-image.png" />
              </ListItemIcon>
              <ListItemText primary="Sin preferencia " />
            </ListItemButton>
          </ListItem> */}

              {
                empleados.map((empleadosItem) => (
                  <ListItem key={empleadosItem.usuarioid} disablePadding>
                    <ListItemButton onClick={() => empleado(empleadosItem)}>
                      <Radio 
                        size="small"
                        value={empleadosItem.usuarioid}
                        name="radio-buttons"
                        inputProps={{ 'aria-label': `${empleadosItem.usuarioid}` }}
                      />
                      <ListItemIcon>
                        <Avatar alt="Remy Sharp" src={empleadosItem.empleadoimg} />
                      </ListItemIcon>
                      <ListItemText primary={empleadosItem.empleadodes} secondary="Barbero / Peluquero" />
                    </ListItemButton>
                  </ListItem>

                ))
              }

            </List>
          </RadioGroup>
        </Grid>

        <Grid item md={12} xs={12} lg={6}>
          {
            empleado_seleccionado != null &&
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              openTo="day"
              // defaultValue={null}
              // value={value}
              onChange={(newValue) => {
                
                // let stringdate = newValue.toISOString().slice(0, 10);
                // stringdate = dayjs(stringdate);
                selectedDate(newValue.format('DD/MM/YYYY'));
                setValue(newValue);
              }}
              minDate={new Date(now)}
              maxDate={new Date(maxDays)}
              renderInput={(params) => <TextField {...params} />}
              renderDay={customDayRenderer}
            />
          </LocalizationProvider>
           }
        </Grid>
      </Grid>


    </Paper>


  )
}
