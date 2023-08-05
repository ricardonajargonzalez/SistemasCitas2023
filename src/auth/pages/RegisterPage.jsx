
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";


export const RegisterPage = () => {
  return (
    <AuthLayout title="Crear cuenta">
    <form>
     <Grid container>

       <Grid item xs={ 12 } sx={{ mt: 2 }}>
         <TextField 
         label="Nombre(s)"
         type="text"
         placeholder="Nombres(s)"
         fullWidth
         />
       </Grid>

       <Grid item xs={ 12 } sx={{ mt: 2 }}>
         <TextField 
         label="Apellido Paterno"
         type="text"
         placeholder="Apellido Paterno"
         fullWidth
         />
       </Grid>

       <Grid item xs={ 12 } sx={{ mt: 2 }}>
         <TextField 
         label="Apellido Materno"
         type="text"
         placeholder="Apellido Materno"
         fullWidth
         />
       </Grid>

       <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
              label="Correo electronico"
              type="email"
              placeholder="Ingresa tu correo"
              fullWidth
              />
        </Grid>

        <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
              label="Celular"
              type="number"
              placeholder="Numero Celular"
              fullWidth
              />
        </Grid>


       <Grid container spacing={ 2 } sx={{ mb: 2,mt: 1 }}>
           <Grid item xs={ 12 } >
             <Button variant="contained" fullWidth >
               Crear cuenta
             </Button>
           </Grid>
       </Grid>

       <Grid container direction="row" justifyContent="end">
        <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
         <Link component={ RouterLink } color="primary.main" to="/auth/login">
           Ingresar
         </Link>
       </Grid>

     </Grid>
   </form>
</AuthLayout>
  )
}
