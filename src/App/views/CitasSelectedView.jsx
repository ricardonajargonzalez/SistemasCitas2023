import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, TextField, Typography } from "@mui/material"
import HorizontalNonLinearStepper from "../components/HorizontalNonLinearStepper"
import calendario from "../../assets/img/calendario.gif";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWizardNroPersonas, setWizardPersonas } from "../../store/stateWizard/stateWizardSlice";
import { SaveAs } from "@mui/icons-material";
import { useForm } from "../../hooks/useForm";


export const CitasSelectedView = () => {
  const dispatch = useDispatch();
  const { nro_personas, personas } = useSelector(state => state.stateWizard);
  const [personasCitas, setpersonasCitas] = useState(0);

  const initpersonas = {
    TFPersonas: 0
  };

  const { TFPersonas, formState, onInputChange, onResetForm } = useForm(initpersonas);



  const onInputChangePersona = (event) => {



    if (Number(event.target.value)  || event.target.value == 0) { //ES NUMERO
      setpersonasCitas(event.target.value);
      onInputChange(event); //userForm
      dispatch(setWizardNroPersonas(event.target.value));

      const itemspersonas = [];
      for (let i = 0; i < event.target.value; i++) {
        console.log(event.target.value);
        itemspersonas[i] = {
          nombre: `Persona ${i + 1}`,
          completada: false, //propiedad pata determinar el cambio de nombre
          agendada: false, //propiedad pata determinar si ya se agendo 
          servicios: []
        };
      }

      dispatch(setWizardPersonas(itemspersonas));

    }

  }

  useEffect(() => {
    //EJECUTAMOS EL SET PERSONAS/WIZZARD
  }, [personasCitas])




  return (
    <>

      <Grid sx={{ mt: 10, p: 2 }} container spacing={2}>
        <Grid item md={12} lg={12}>

          <Box sx={{height: 70,transform: 'translateZ(0px)', flexGrow: 1}}>
            <TextField sx={{ mb: 2, position: 'absolute', right: 0, bottom: 0, width: { xs: '100%', md: '200px' } }} autoFocus inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              // onChange={(event) => onInputChange(event)}
              onChange={onInputChangePersona}
              name="TFPersonas"
              label="Numero de personas"
              type="number"
              placeholder="Numero de personas"
              fullWidth
              // value={nro_personas}
              defaultValue={nro_personas > 0 && nro_personas}
            />
          </Box>

          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                <Typography> Ingrese el numero de persona(s). Para mayor control puede ingresar los nombres de las personas</Typography>
              </ListSubheader>
            }
          >
            {
              personas.map((person) =>
                <ListItemButton key={person.nombre}>
                  <ListItemIcon>
                    <SaveAs />
                  </ListItemIcon>
                  <ListItemText primary={person.nombre} />
                </ListItemButton>
              )
            }
          </List>
        </Grid>
      </Grid>

    </>
  )
}
