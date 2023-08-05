

import { createSlice } from '@reduxjs/toolkit';

export const serviciosPaquetesSlice = createSlice({
    name: 'serviciosPaquetes',
    initialState: {
        isLoading: false,
        servicios_paquetes: []
    },
    reducers: {
        startServiciosPaquetes: (state) => {
            state.isLoading = true;  
        },
        reducegetServiciosPaquetes: (state,action) => {
            state.isLoading = false;
            state.servicios_paquetes = action.payload.servicios_paquetes;
        },
    }
});


// Action creators are generated for each case reducer function
export const { startServiciosPaquetes,reducegetServiciosPaquetes } = serviciosPaquetesSlice.actions;