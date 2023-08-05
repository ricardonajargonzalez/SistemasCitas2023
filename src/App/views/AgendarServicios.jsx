
import { AccessAlarms, Archive, CompressOutlined, Done, EditAttributes, ErrorOutline, EventAvailable, ExpandMore, Favorite, HighlightOff, InsertInvitation, PersonSearch, Restore, ShoppingCart, WarningAmber } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, BottomNavigation, BottomNavigationAction, Chip, CssBaseline, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Box } from "@mui/system";
import { Agendar_Comp1_Serviciosv2 } from "../components/Agendar_Comp1_Serviciosv2";
import { Agendar_Comp2_Personalv2 } from "../components/Agendar_Comp2_Personalv2";
import { Agendar_Comp3_Calendariov2 } from "../components/Agendar_Comp3_Calendariov2";
import { Comp_horasv2 } from "../components/Comp_horasv2";



function refreshMessages() {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(50)).map(
    () => messageExamples[getRandomInt(messageExamples.length)],
  );
}


export const AgendarServicios = () => {

  const { servicios, personas } = useSelector(state => state.stateWizard);
  const [expanded, setExpanded] = useState(false);
  const [seleccionServicio, setseleccionServicio] = useState({});
  const [empleado, setempleado] = useState({});
  const [fechaAgenda, setfechaAgenda] = useState('');

  //COMPONENTE 1 ===================================
  const onSeleccionServicio = ({ servicioid,serviciominutos, descripcion,detalle_servicio, personaIndex }) => {
    setseleccionServicio({ servicioid: servicioid,serviciominutos,descripcion,detalle_servicio,personaIndex });
  }//===============================================


  const onSeleccionEmpleado = (usuarioid, empleadodes, horaini, horafin, format_hora_ini, format_minutos_ini, format_hora_fin, format_minutos_fin) => {
    setempleado({ empleadoid: usuarioid, empleadodes: empleadodes, horaini, horafin, format_hora_ini, format_minutos_ini, format_hora_fin, format_minutos_fin });
  }

  // const selectedEmployed = (employedId, employeddes, horaini, horafin, format_hora_ini, format_minutos_ini, format_hora_fin, format_minutos_fin) => {
  //   //se crear el horario con el dia actual y el horario del empleado
  //   const fechai = `${fechaAgenda} ${format_hora_ini} ${format_minutos_ini}`;
  //   const fechaf = `${fechaAgenda} ${format_hora_fin} ${format_minutos_fin}`;
  //   let horarioini = dayjs(fechai, 'DD-MM-YYYY HH mm');
  //   let horariofin = dayjs(fechaf, 'DD-MM-YYYY HH mm');
  //   setempleado({ empleadoid: employedId, empleadodes: employeddes, horaini, horafin, horarioini, horariofin });
  // }

  const selectedDate = (value) => {
    setfechaAgenda(value);
  }

  const [valueTab, setValueTab] = useState(0);
  const ref = useRef(null);
  const [messages, setMessages] = useState(() => refreshMessages());

  // useEffect(() => {
  //   ref.current.ownerDocument.body.scrollTop = 0;
  //   setMessages(refreshMessages());
  // }, [valueTab, setMessages]);

  const nextTab = (newTab) =>{
    setValueTab(newTab);
  }




  return (
    // <Grid sx={{ mt: 10, p: 4 }} container spacing={2}>
    //   {/* COMPONENTE SELECCIONAR PERSONA/SERVICIO */}
    //   <Grid item xs={12} md={6}>
    //     <Agendar_Comp1_Servicios onSeleccionServicio={onSeleccionServicio} />
    //   </Grid>
    //   {/* COMPONENTE DE SELECCION DE EMPLEADO */}
    //   {seleccionServicio.servicioid > 0 &&
    //     <Grid item xs={12} md={6}>
    //       <Agendar_Comp2_Personal onSeleccionEmpleado={onSeleccionEmpleado} />
    //       {/* <Compempleados selectedEmployed={selectedEmployed} selectedDate={selectedDate} /> */}
    //     </Grid>
    //   }
    //   {/* COMPONENTE DE SELECCION DE FECHA  */}
    //   { empleado.empleadoid > 0 &&
    //     <Grid item xs={12} md={6}>
    //       <Agendar_Comp3_Calendario selectedDate={selectedDate} empleado={empleado}  />
    //     </Grid>
    //   }
    //   {/* COMPONENTE SELECCION DE HORARIO */}
    //   {fechaAgenda != '' &&
    //     <Grid item xs={12} md={6}>
    //       <Comp_horas empleado={empleado} seleccionServicio={seleccionServicio} fecha_selecccionada={fechaAgenda} />
    //     </Grid>
    //   }
    // </Grid>

    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      
      {/* COMPONENTE SELECCIONAR PERSONA/SERVICIO */}
      {valueTab == 0 &&
             <Grid item xs={12} md={6}>
              <Agendar_Comp1_Serviciosv2 valueTab={valueTab} nextTab={nextTab}  onSeleccionServicio={onSeleccionServicio} />
            </Grid>
       }
       {/* COMPONENTE DE SELECCION DE EMPLEADO */}
      { (valueTab == 1 && seleccionServicio.servicioid > 0) &&
          <Agendar_Comp2_Personalv2 valueTab={valueTab} nextTab={nextTab} onSeleccionEmpleado={onSeleccionEmpleado} />
       }
       {/* COMPONENTE DE SELECCION DE FECHA  */}
      { (valueTab == 2 &&  empleado.empleadoid > 0 ) &&
          <Agendar_Comp3_Calendariov2 valueTab={valueTab} nextTab={nextTab} selectedDate={selectedDate} empleado={empleado}  />
       }
       {/* COMPONENTE SELECCION DE HORARIO */}
       { (valueTab == 3 &&  fechaAgenda != '' ) &&
          <Comp_horasv2 empleado={empleado} nextTab={nextTab} seleccionServicio={seleccionServicio} fecha_selecccionada={fechaAgenda} />
       }
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      {/* {`value ${valueTab}`} */}
        <BottomNavigation
          showLabels
          value={valueTab}
          onChange={(event, newValue) => {
            setValueTab(newValue);
          }}
        >
          <BottomNavigationAction label="Servicios" icon={<ShoppingCart />} />
          <BottomNavigationAction label="Personal" icon={<PersonSearch />} />
          <BottomNavigationAction label="Fechas" icon={<InsertInvitation />} />
          <BottomNavigationAction label="Horarios" icon={<AccessAlarms />} />
        </BottomNavigation>
      </Paper>
    </Box>
  )

}

const messageExamples = [
  {
    primary: 'Brunch this week?',
    secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: '/static/images/avatar/5.jpg',
  },
  {
    primary: 'Birthday Gift',
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: '/static/images/avatar/1.jpg',
  },
  {
    primary: 'Recipe to try',
    secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
    person: '/static/images/avatar/2.jpg',
  },
  {
    primary: 'Yes!',
    secondary: 'I have the tickets to the ReactConf for this year.',
    person: '/static/images/avatar/3.jpg',
  },
  {
    primary: "Doctor's Appointment",
    secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
    person: '/static/images/avatar/4.jpg',
  },
  {
    primary: 'Discussion',
    secondary: `Menus that are generated by the bottom app bar (such as a bottom
      navigation drawer or overflow menu) open as bottom sheets at a higher elevation
      than the bar.`,
    person: '/static/images/avatar/5.jpg',
  },
  {
    primary: 'Summer BBQ',
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
    person: '/static/images/avatar/1.jpg',
  },
];
