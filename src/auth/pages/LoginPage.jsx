
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { checkingAuthentication, startGoogleSignIn } from "../../store/auth";
import { useDispatch } from "react-redux";
          

export const LoginPage = () => {

  const dispatch = useDispatch();

  const { email, password, onInputChange, formState } = useForm({
    email: 'r@gmail.com',
    password: '123'
  });


   const onSubmit = ( event ) =>{
    event.preventDefault();
    dispatch( checkingAuthentication() );

  
   }

   const onGoogleSignIn = () =>{
    dispatch( startGoogleSignIn() )
    console.log('onGoogleSignIn');
   }



  return (
     <AuthLayout title="Inicio de sesion">
         <form onSubmit={ onSubmit }>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
              label="Correo electronico"
              type="email"
              placeholder="Ingresa tu correo"
              fullWidth
              name="email"
              value={ email }
              onChange={  onInputChange }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
              label="Contraseña"
              type="password"
              placeholder="Ingresa tu contraseña"
              fullWidth
              name="password"
              value={ password }
              onChange={  onInputChange }
              />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2,mt: 1 }}>
                <Grid item xs={ 12 } sm={ 6 } >
                  <Button type="submit" variant="contained" fullWidth >
                    Enter
                  </Button>
                </Grid>
                <Grid item xs={ 12 } sm={ 6 } >
                  <Button 
                    onClick={ onGoogleSignIn }
                    variant="contained" fullWidth sx={{ pl: 2, pr: 2, backgroundColor: 'color1.main' }}>
                    <Google />
                    <Typography sx={{ ml: 1}}>Google</Typography>
                  </Button> 
                </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Link component={ RouterLink } color="primary.main" to="/auth/register">
                Crear cuenta
              </Link>
            </Grid>

          </Grid>
        </form>
     </AuthLayout>
  )
}
