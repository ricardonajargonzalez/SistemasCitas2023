import { Navigate, Route, Routes } from "react-router-dom"
import { AppPage } from "../pages/AppPage"
import { AppPageNormal } from "../pages/AppPageNormal"
import { AcercaNosotros } from "../views/AcercaNosotros"
import { OrdenID } from "../views/OrdenID"




export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <AppPage /> } />
        <Route path="acerca" element={<AppPageNormal><AcercaNosotros /></AppPageNormal>} />
        <Route path="orden/" element={<AppPageNormal><OrdenID /></AppPageNormal>} />
        <Route path='/*' element={ <Navigate to="/citas/acerca" /> } />
    </Routes>
  )
}
