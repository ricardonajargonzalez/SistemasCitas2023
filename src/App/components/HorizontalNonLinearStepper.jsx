import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStepsWizard } from '../../store/wizard/thunks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import { setPasoActivo } from '../../store/stateWizard/stateWizardSlice';
import { StepLabel, Typography } from '@mui/material';






export default function HorizontalNonLinearStepper() {
  const dispatch = useDispatch();
  const {sucursal,pasoactivo,nro_personas:wizardPersonas,personas} = useSelector( state => state.stateWizard );

  const [activeStep, setActiveStep] = React.useState(pasoactivo);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);

  };

  const handleBack = () => { //click en boton
     setActiveStep(prevActiveStep => prevActiveStep - 1);
    

      const size = Object.keys(completed).length;
      const lastKey = Object.keys(completed).pop();
      delete completed[lastKey];
      setCompleted(completed);
      dispatch( setPasoActivo(activeStep- 1));
      
    
  };

  const handleStep = (step) => () => { //click en steps
    setActiveStep(step);
    // console.log("next 2");
  };

  const notify = (texto) => {toast.warn(texto)};

  const handleComplete = () => {
    const newCompleted = completed;
    const {id} = sucursal; //SUCURSAL SELECCIONADA Y GUARDARA EN STORE
   //HARCODEADO - PARAMETRIZAR POR BASE DE DATOS O METER LOGICA DE PROCESO
   if(activeStep==0){ //PASO 1
       if(id != 0){
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
          handleNext();
          dispatch( setPasoActivo(activeStep+ 1));
       }else{
          notify("Seleccione alguna sucursal");
       }
   }else if(activeStep==1){//PASO 2
      if(wizardPersonas>0){
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
        dispatch( setPasoActivo(activeStep+ 1));
      }else{
        notify("Ingrese cuantas personas van a necesitar cita!");
     }
   }else if(activeStep==2){//PASO 3
       let servicios_comp = true;
        if(personas.length>0){
          for (let j = 0; j < personas.length; j++) {
            let {servicios:servicios_persona } = personas[j];
            if(servicios_persona.length==0){
              servicios_comp = false;
              break
            }
          }
          if(servicios_comp==true){
            newCompleted[activeStep] = true;
            setCompleted(newCompleted);
            handleNext();
            dispatch( setPasoActivo(activeStep+ 1));
          }else{
            notify("Ingrese por lo menos un servicio o paquete a todas las personas agregadas");
          }
        }
   }else if(activeStep==3){//PASO 4
          let completado = 1;
          //BUSCAMOS EN TODAS LAS PERSONAS
          for (let j = 0; j < personas.length; j++) {
             let persona = personas[j];
             let {servicios} = persona;
            
                //buscamos servicios que no ah sido agendado
                let servicioSinAgendar = servicios.filter(({ servicio_agendado }) => servicio_agendado == false);

              if(servicioSinAgendar.length > 0){
                completado = 0;
                break;
              }
        }

        if(completado==0){
          notify("Existen servicios sin agendar. Por favor seleccione fecha y hora");
        }else{
            newCompleted[activeStep] = true;
            setCompleted(newCompleted);
            handleNext();
            dispatch( setPasoActivo(activeStep+ 1));
        }
         
   }else if(activeStep==4){//PASO 5
          newCompleted[activeStep] = true;
          setCompleted(newCompleted);
          handleNext();
          dispatch( setPasoActivo(activeStep+ 1));
    }else if(activeStep==5){//PASO 6 - pagar
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
      dispatch( setPasoActivo(activeStep+ 1));
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

 
  //CARGAMOS LOS STEPS
  const {isLoading,page,pasos} = useSelector( state => state.wizard );
  const steps = [];
  pasos.map(function(element){
    steps.push(element.wizarddetdes)
  })
  

  useEffect(() => {
    dispatch( getStepsWizard(1) );
  },[])


  // const steps = ['Seleccion ubicacion', 'Selecciona servicio', 'Pagar'];

  return (
    <Box sx={{ width: '100%',height: '50px', pt: 2, backgroundColor: '#ffffff', position: 'fixed',top:55 }}>
      <Stepper sx={{display: {xs: 'none', md: 'flex' }}} nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepLabel  color="inherit" >
              {label}
            </StepLabel >
          </Step>
        ))}
      </Stepper>

    <Stepper sx={{ display: {md: 'none', xs: 'initial'} }} nonLinear activeStep={activeStep}>
       {steps.map((label, index) => (
         index==activeStep &&
         <Step key={label} completed={true}>
         <StepLabel color="inherit" >
           {label}
         </StepLabel>
       </Step>
         ))}
      </Stepper>


      <div>
        {allStepsCompleted() ? (
          <>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography> */}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, position: 'absolute', widht: '100%' }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>RESETEAR</Button>
            </Box>
          </>
        ) : (
          <React.Fragment >
            {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Step {activeStep + 1}
            </Typography> */}
            <></>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, position: 'absolute', widht: '100%',  }}>
              <Button
                variant="contained"
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                REGRESAR
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {/* BOTON SIGUIENTE */}
              {/* <Button variant="contained" 
                   onClick={handleNext} 
                sx={{ mr: 1 }}>
                SIGUIENTE
              </Button> */}
              {activeStep !== steps.length &&


                (completed[activeStep] ? (
                  <>
                   <Typography variant="caption" sx={{ display: 'inline-block' }}>
                       Step {activeStep + 1} already completed
                   </Typography>
                  </>
                ) : (
                  <Button variant="contained" onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'TERMINAR'
                      : 'COMPLETAR PASO'}
                  </Button>
                ))
                
                
                }
            </Box>
          </React.Fragment>
        )}
      </div>
      <ToastContainer />
    </Box>
  );
}
