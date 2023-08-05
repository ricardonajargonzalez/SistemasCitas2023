

import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { empleadoSlice } from './empleado/empleadoSlice';
import { empleadosSlice } from './empleados/empleadosSlice';
import { serviciosPaquetesSlice } from './serviciosPaquetes';
import { stateReservacionSlice } from './stateReservacion/stateReservacionSlice';
import { stateWizardSlice } from './stateWizard/stateWizardSlice';
import { sucursalSlice } from './sucursal/sucursalSlice';
import { wizardSlice } from './wizard/wizardSlice';

export const store = configureStore({
  reducer: {
    auth : authSlice.reducer,
    wizard: wizardSlice.reducer,
    sucursales: sucursalSlice.reducer,
    stateWizard : stateWizardSlice.reducer,
    serviciosPaquetes: serviciosPaquetesSlice.reducer,
    empleados: empleadosSlice.reducer,
    empleado : empleadoSlice.reducer,
    stateReservacion : stateReservacionSlice.reducer
  },
})