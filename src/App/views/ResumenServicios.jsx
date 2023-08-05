import { AccountCircle, BeachAccess, LabelImportant, Schedule, VerifiedUserSharp, Work } from "@mui/icons-material"
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, FormControlLabel, FormGroup, Grid, Link, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Paper, Switch, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";





export const ResumenServicios = () => {

  const { servicios, personas } = useSelector(state => state.stateWizard);



  return (
    <Grid sx={{ mt: 10, p: 4 }} container spacing={2}>
      <Box sx={{ flexGrow: 1, background: 'green', height: 30 }}>
        <FormGroup >
          <FormControlLabel sx={{ position: 'absolute', top: 150, right: 50 }} control={<Switch defaultChecked />} label="Por persona" />

        </FormGroup>
      </Box>
      <Grid item xs={12} md={12} spacing={2}>
        <Paper sx={{ p: 1, height: 'vh', overflow: 'auto' }} elevation={4}>
          <center><Typography sx={{ mb: 2 }} variant="h6" >Resumen</Typography></center>
          <Grid container spacing={1}>

            {
              personas.map((personaItem, index) => {

                let personaIndex = index;
                let items_servicios = [];
                const array_servicios = personas[index].servicios;


                items_servicios = array_servicios.map((serviciosItem, index) => {

                  let { horario_i, horario_f } = serviciosItem.detalle_servicio;
                  let horario_i_str = dayjs(horario_i, "DD-MM-YYYY HH:mm A");
                  let horario_f_str = dayjs(horario_f, "DD-MM-YYYY HH:mm A");


                  return <CardContent key={index}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                           <strong>Servicio: </strong> {serviciosItem.descripcion}
                        </Typography>
                        <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                           Fecha:  
                           {` ${horario_i_str.format('DD/MM/YY HH:mm A')}`}
                        </Typography>
                        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
                            <Typography sx={{ position: 'absolute', right: 16, top: -10, fontWeight: "bold" }}>
                              $
                              {serviciosItem.servicio_precio}
                              </Typography>
                        </Box>
                  </CardContent>
                })

                return <Grid key={index} item xs={12} md={4} spacing={0} >
                  <Card  sx={{ mb: 1 }} key={index} variant="outlined">
                    <CardContent >
                    <Typography sx={{ fontFamily: "revert", fontWeight: "bold" }}>{personaItem.nombre}</Typography>
                      <Divider></Divider>
                    </CardContent>
                    {
                      items_servicios.length > 0 && items_servicios
                    }
                    <CardActions>
                      <Button size="small">ver detalle</Button>
                    </CardActions>
                  </Card>
                </Grid>

              })
            }

          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
