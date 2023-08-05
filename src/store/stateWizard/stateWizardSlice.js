import { createSlice } from '@reduxjs/toolkit';

export const stateWizardSlice = createSlice({
    name: 'stateWizard',
    initialState: {
       pasoactivo: 0,
       sucursal: {
          id : 0,
          descripcion: "",
          wizardlng: 0,
          wizardlat: 0
       },
       nro_personas: 0,
       persona_selected: null,
       personas: [], 
        //persona[index]: { 
        //         nombre: "",
        //         completada : false, //propiedad pata determinar el cambio de nombre
        //         servicios : [] //servicios agregados a la persona
        //    }
       pasoscompletados:[]
    },
    reducers: {
        startStateWizard: (state) => {
           state.pasoactivo = 0;
        },
        setPasoActivo: (state,action) =>{
           state.pasoactivo = action.payload;
           //console.log(action.payload);
        },
        setPasoCompleto: (state,action)=>{

        },
        setWizardSucursal: (state,action) =>{
            // console.log(action.payload.id,action.payload.descripcion);
            state.sucursal = {
                id : action.payload.id,
                descripcion : action.payload.descripcion
                // wizardlng: action.payload.wizardlng,
                // wizardlat:action.payload.wizardlat
            }
        },
        setWizardNroPersonas: (state,action) =>{
          state.nro_personas = action.payload;
        },
        setWizardPersonas: (state,action) =>{
            state.personas = action.payload;
        },
        editWizardPersonas: (state,action) =>{
            state.personas[action.payload.index] = {
                nombre : action.payload.value,
                completada: false,
                servicios : []
            }
        },
        setWizardPersonaSelected: (state,action) =>{
            state.persona_selected = action.payload;
        },
        completarWizardPersonas: (state,action) =>{

            const stateA = state.personas[action.payload.index];
            const stateN = { ...stateA, completada: true };
            state.personas[action.payload.index] = stateN;
        },
        addServiciosWizardPersonas: (state,action) =>{
            const persona = state.personas[state.persona_selected];
            const {servicios} = persona;

            const serviciosN = [...servicios, {
                servicioid : parseInt(action.payload.servicioid),
                tipo:  action.payload.tipo,
                descripcion: action.payload.descripcion,
                serviciominutos : action.payload.serviciominutos,
                servicio_agendado: false,
                servicio_precio: action.payload.servicioPrecio

            }];
            const stateN = { ...persona, servicios: serviciosN };
            state.personas[state.persona_selected] = stateN;
        },
        agendasServicioWizardPersona: (state,action) =>{
             const persona = action.payload.persona_seleccionado;
             const servicioid = action.payload.servicioid;
             const detallehorario = action.payload.detallehorario;

             const personaseleccionada = state.personas[persona];
             const {servicios} = personaseleccionada;
    

             //buscamos el indice con la busqueda del servicioid
             const index = servicios.findIndex(servicio => {
                return servicio.servicioid == servicioid;
              });

           

             servicios[index].servicio_agendado = true;
             servicios[index]['detalle_servicio'] = detallehorario;
             const stateN = { ...personaseleccionada, servicios: servicios };
             state.personas[persona] = stateN;
        },
        removeServicioWizardPersona: (state,action) =>{
            const persona = state.personas[action.payload.personaid]; //
            const {servicios} = persona;
            const indexremove = servicios.map(e => e.servicioid).indexOf(action.payload.servicioid); //buscamos en que indice se encuentra el servicio
            
            const servicioN = servicios.splice(indexremove, 1);// 2nd parameter means remove one item only
        }
    }
});


// Action creators are generated for each case reducer function
export const { startStateWizard,setPasoActivo,setPasoCompleto,setWizardSucursal,setWizardNroPersonas,setWizardPersonas,editWizardPersonas,completarWizardPersonas,addServiciosWizardPersonas,setWizardPersonaSelected,removeServicioWizardPersona,agendasServicioWizardPersona } = stateWizardSlice.actions;