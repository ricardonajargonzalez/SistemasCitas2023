
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Box, Fab, Skeleton, Stack } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSucursales } from '../../store/sucursal/thunks';
import { selectedCoordinate } from '../../store/sucursal/sucursalSlice';
import { NearMe } from '@mui/icons-material';
import { useMapBox } from '../../hooks';
import { setWizardSucursal } from '../../store/stateWizard';
import '../../assets/css/Map.css';





export const BoxDirecciones = () => {

  const dispatch = useDispatch();
  const { isLoading, sucursales, selected } = useSelector(state => state.sucursales);
  const { sucursal: sucursalactivo, pasoactivo } = useSelector(state => state.stateWizard);
  const { mapContainer, coordenadas, changeCoordinates } = useMapBox({ longitud: 0, latitud: 0 }); //Hook Custom
  const [showHideBoxSucursales, setshowHideBoxSucursales] = useState('initial');

  useEffect(() => {
    //console.log("carga de direcciones");
    dispatch(getSucursales());
  }, [])
  //MOSTRAR Y ESCONDER BOX DE SUCURSALES PARA DISPOSITIVOS PEQUEÑOS
  const showHideSucursales = () => {
    if (showHideBoxSucursales == 'initial') {
      setshowHideBoxSucursales('none');
    } else {
      setshowHideBoxSucursales('initial');
    }
  }
  //SELECCIONAR Y CAMBIAR ESTADO DE COORDENADAS
  const click = (parametros) => {
    const { latitude, longitude, sucursalid, sucursaldes } = parametros;
    changeCoordinates({
      initial: 0,
      latitud: latitude,
      longitud: longitude,
      zoom: 17
    });
    dispatch(selectedCoordinate(
      {
        latitud: latitude,
        longitud: longitude
      }
    ));
   
    dispatch(setWizardSucursal(

      {
        id: sucursalid,
        descripcion: sucursaldes,
        //     wizardlng: longitude,
        //     wizardlat: latitude
      }

    ));
  }

  return (
    <>

      <Box
        sx={{
          display: `${showHideBoxSucursales}`,
          bgcolor: 'rgb(245, 245, 245)',
          position: 'absolute',
          top: 240,
          left: 10,
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: { xs: 200, md: 300 },
          zIndex: 11111111
        }}
      >
        {
          //isLoading
             <FormControl>
              {
                isLoading ?
                 <Box sx={{ width: '100%' }}>
                  <Stack spacing={1}>
                        <Skeleton variant="rectangular" width={300} height={30} />
                        <Skeleton variant="rectangular" width={300} height={30} />
                        <Skeleton variant="rectangular" width={300} height={30} />
                        <Skeleton variant="rectangular" width={300} height={30} />
                  </Stack>
                </Box>
                :
                <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                //defaultValue={sucursalactivo.id !=0 ? sucursalactivo.descripcion : 0}
                value={sucursalactivo.id != 0 ? sucursalactivo.descripcion : 0}
                name="radio-buttons-group">
                {
                  sucursales.map(sucursal => (
                    <FormControlLabel onClick={() => click(sucursal)}
                      key={sucursal.sucursalid} value={sucursal.sucursaldes} control={<Radio />} label={sucursal.sucursaldes
                      } />
                  ))
                }
              </RadioGroup>
              }
            </FormControl>
        }
      </Box>
      <Box
        sx={{
          display: { xs: 'initial', md: 'none' },
          position: 'absolute',
          bottom: 30,
          right: 5,
        }}
      >
        <Fab onClick={() => showHideSucursales()} variant="extended">
          <NearMe sx={{ fontSize: 30, color: '#009ee3' }} />
          Sucursales
        </Fab>
      </Box>
      <div >
        <div ref={mapContainer} className="map-container" />
      </div>

    </>
  )
}
