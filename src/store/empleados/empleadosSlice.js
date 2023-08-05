import { createSlice } from '@reduxjs/toolkit';

export const empleadosSlice = createSlice({
    name: 'empleados',
    initialState: {
        isLoading: false,
        empleados: []
    },
    reducers: {
        startEmpleados: (state) => {
            state.isLoading = true;
        },
        getEmpleadosReducer: (state,action) => {
            state.isLoading = false;
            state.empleados = action.payload.empleados;
            // console.log("empleados resucer : " + JSON.stringify(action.payload));
        }
    }
});


// Action creators are generated for each case reducer function
export const { startEmpleados,getEmpleadosReducer } = empleadosSlice.actions;