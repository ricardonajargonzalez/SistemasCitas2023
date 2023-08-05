import { backEndApi} from "../../api/BackEndApi";
import { setSteps, startLoadingSteps,prueba } from "./wizardSlice"



export const getStepsWizard = (id) => {
    return async ( dispatch, getState ) => {
        dispatch( startLoadingSteps() );

        //TODO: realizar tarea asincrona(http)
         const { data } = await backEndApi.get(`/wizard/${id}`)
        dispatch( prueba({pokemons: data.results}) );
    }
}
