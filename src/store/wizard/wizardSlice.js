
import { createSlice } from '@reduxjs/toolkit';

export const wizardSlice = createSlice({
    name: 'wizard',
    initialState: {
        isLoading: false,
        page: 1,
        pasos: []
    },
    reducers: {
        startLoadingSteps: (state) => {
            state.isLoading = true;
        },
        setSteps: (state,action) => {
                state.isLoading = true;
                // state.pasos = action.payload.pokemons;
                state.page = 2;
                // console.log("payload" + action.payload.pokemons);
        },
        prueba: (state,action) =>{
            state.page = 2;
            state.pasos = action.payload.pokemons;  
        }
    }
});


// Action creators are generated for each case reducer function
export const { startLoadingSteps, setSteps, prueba} = wizardSlice.actions;