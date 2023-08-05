import { Grid, Paper, TextField } from "@mui/material"




// import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
// import dayjs from 'dayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { PickersDay } from '@mui/x-date-pickers/PickersDay';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, PickersDay, StaticDatePicker } from "@mui/x-date-pickers";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
//import text locate spanish=============
import locale from "../../assets/json/es";
import { Box } from "@mui/system";
import { EventAvailable } from "@mui/icons-material";
dayjs.locale('en-my-settings', locale);
//=======================================


// import { es } from "dayjs/locale/es";
// import localeData from "dayjs/plugin/localeData";
// dayjs.locale("es");
// dayjs.extend(localeData);


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

  const isWeekend = (date) => {
    const day = date.day();
  
    return day === 0 || day === 6;
  };

export const Agendar_Comp3_Calendariov2 = ({selectedDate,empleado,valueTab,nextTab}) => {

    const now = dayjs().locale("es").format("DD/MMMM/YYYY");
    const maxDays = dayjs().add(20, 'day');
    let dias_descansos = diasDescansos();

    //USESTATE
    const [value, setValue] = useState(now);
    const [seleccionFecha, setseleccionFecha] = useState('');
    

    const customDayRenderer = (date, selectedDates, pickersDayProps) => {
        const stringifiedDate = date.toISOString().slice(0, 10);
        if (dias_descansos.includes(stringifiedDate)) {
          return <PickersDay sx={{background: 'background.main'}} {...pickersDayProps} disabled />;
        }
        return <PickersDay sx={{background: 'background.main'}}  {...pickersDayProps} />;
    };


    useEffect(() => {
        setseleccionFecha('');
      }, [empleado]);


    

  

    return (
      
        <Box sx={{mt:12, p: 1, background: 'background.main' }} elevation={3}>
           {/* <Grid container >
              <Grid item md={12} xs={12} lg={3}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                >
                 <center style={{ "fontSize" : "20px", "fontWeight": "bold" }}>{seleccionFecha} <EventAvailable  sx={{pt:1}}></EventAvailable></center>
                </Box>
                  
              </Grid>
              <Grid item md={12} xs={12} lg={9}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker 
                    displayStaticWrapperAs="desktop"
                    openTo="day"
                    onChange={(newValue) => {
                        selectedDate(newValue.format('DD/MM/YYYY')); //funcion props
                        const fecha = `${newValue.format('ddd')}, ${newValue.format('D')} de ${newValue.format('MMM')}`;
                        setseleccionFecha(fecha); //usetate
                    }}
                    minDate={new Date(now)}
                    maxDate={new Date(maxDays)}
                    renderInput={(params) => <TextField {...params} />}
                    renderDay={customDayRenderer}
                />
            </LocalizationProvider>

              </Grid>
           </Grid> */}
           

            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        value={value}
        // shouldDisableDate={isWeekend}
        onChange={(newValue) => {
            console.log(now);
          setValue(newValue);
        }}

        onAccept={(newValue) => {
            console.log("accept");
          
        }}

      
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider> */}



        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker 
                    displayStaticWrapperAs="desktop"
                    openTo="day"
                    onChange={(newValue) => {
                        selectedDate(newValue); //funcion props
                        const fecha = `${newValue.format('ddd')}, ${newValue.format('D')} de ${newValue.format('MMM')}`;
                        setseleccionFecha(fecha); //usetate
                        nextTab(valueTab+1);
                    }}
                    minDate={new Date(now)}
                    maxDate={new Date(maxDays)}
                    renderInput={(params) => <TextField {...params} />}
                    renderDay={customDayRenderer}
                />
        </LocalizationProvider>
        </Box>
    )
}
