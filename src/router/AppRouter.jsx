import { Routes, Route, Navigate } from "react-router-dom"

import { AppRoutes } from "../App/routes/AppRoutes"
import { AuthRoutes } from "../auth/routes/AuthRoutes"

const subcarpeta = '/Citas';


export const AppRouter = () => {
  return (
    <Routes>
        {/* Login y registro */}
        <Route path="/auth/*" element={ <AuthRoutes /> } />

        {/* App Citas */}
        <Route path="/citas/*" element={ <AppRoutes /> } />

   
       <Route path='/*' element={ <Navigate to="/citas/" /> } /> 

    </Routes>
  )
}
