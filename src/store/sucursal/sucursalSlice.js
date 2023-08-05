import { createSlice } from '@reduxjs/toolkit';

export const sucursalSlice = createSlice({
    name: 'sucursal',
    initialState: {
        sucursales : [],
        selected: {
            longitud : 0,
            latitud : 0
        },
        isLoading : false
    },
    reducers: {
        startSucursales: (state) => {
            state.isLoading = true;  
        },
        reducegetSucursales: (state,action) => {
            state.isLoading = false;
            state.sucursales = action.payload.sucursales;

        },
        selectedCoordinate: (state,action) =>{
           state.selected = {
            longitud : action.payload.longitud,
            latitud : action.payload.latitud
           }
        }
    }
});


// Action creators are generated for each case reducer function
export const { startSucursales,reducegetSucursales,selectedCoordinate } = sucursalSlice.actions;