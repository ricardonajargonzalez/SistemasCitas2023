import { Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Radio, RadioGroup } from "@mui/material"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiasDescanso } from "../../store/empleado/thunks";
import { getEmpleados } from "../../store/empleados/thunks";




export const Agendar_Comp2_Personal = ({onSeleccionEmpleado}) => {
    const dispatch = useDispatch();
    //UserSelectors
    const { empleados } = useSelector(state => state.empleados);

    useEffect(() => {
        dispatch(getEmpleados(1));
      }, []);

    const empleado = (empleadosItem) => {

        
        const { usuarioid, empleadodes, horaini, horafin, format_hora_ini, format_minutos_ini, format_hora_fin, format_minutos_fin } = empleadosItem;
        dispatch(getDiasDescanso(1, usuarioid)); //sucursal, idusuario
        onSeleccionEmpleado(usuarioid, empleadodes, horaini, horafin, format_hora_ini, format_minutos_ini, format_hora_fin, format_minutos_fin);
    }




    return (
        <Paper sx={{mt:12, p: 1, minHeight: 300, maxHeight: 300, overflow: 'auto' }} elevation={3}>
            <RadioGroup name="use-radio-group">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton >
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
                        </ListItem>
                    {
                        empleados.map((empleadosItem) => {
                            return <ListItem key={empleadosItem.usuarioid} disablePadding>
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

                           })
                    }

                </List>
            </RadioGroup>
        </Paper>
    )
}
