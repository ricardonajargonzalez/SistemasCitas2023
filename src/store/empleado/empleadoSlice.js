import { createSlice } from '@reduxjs/toolkit';

export const empleadoSlice = createSlice({
    name: 'empleado',
    initialState: {
        isLoading : false,
        diasdescanso: []
    },
    reducers: {
        startDiasDescansoReducer: (state) => {
            state.isLoading = true  
        },
        setDiasDescansoReducer: (state, action) => {
            state.diasdescanso = action.payload.dias_descanso;
        }
    }
});


// Action creators are generated for each case reducer function
export const { startDiasDescansoReducer,setDiasDescansoReducer } = empleadoSlice.actions;