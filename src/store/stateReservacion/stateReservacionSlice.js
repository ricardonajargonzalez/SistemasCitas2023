import { createSlice } from '@reduxjs/toolkit';

export const stateReservacionSlice = createSlice({
    name: 'stateReservacion',
    initialState: {
        temporales : [],
        isLoading : false
    },
    reducers: {
        reduceBusquedaTemporales: (state) => {
            state.isLoading = true;  
        },
        reducer_INS_ReservacionTempActivas: (state,action) => {
            state.isLoading = true;
            state.temporales = action.payload.temporales;

        }
    }
});


// Action creators are generated for each case reducer function
export const { reduceBusquedaTemporales,reducer_INS_ReservacionTempActivas } = stateReservacionSlice.actions;