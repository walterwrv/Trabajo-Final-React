import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
// import RegisterPage from "../pages/Auth/RegisterPage";
import ProfileSelector from "../components/ProfileSelector";
// import MovieCatalog from "../pages/Movies/MovieCatalog";
import PrivateRoute from "../components/PrivateRoute";
import Catalogo from "../components/Catalogo";
import PerfilAdmin from "../components/PerfilAdmin";
import Navbar from "../components/Navbar";
import CreatePerfil from "../components/CreatePerfil";
import EditarPerfil from "../components/EditarPerfil";
import Watchlist from "../components/Watchlist";


export const AppRouter = () => (

   
      <Routes>
        
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}

        
        <Route
          path="/seleccionar-perfil"
          element={
            <PrivateRoute>
              <Navbar />
              <ProfileSelector />
            </PrivateRoute>
          }
        />
        <Route path="/catalogo" element={<PrivateRoute><Navbar /><Catalogo /></PrivateRoute>} />
        <Route path="/administrar-perfiles" element={<PrivateRoute><Navbar /><PerfilAdmin /></PrivateRoute>} />
        <Route path="/crear-perfil" element={<PrivateRoute><Navbar /><CreatePerfil /></PrivateRoute>} />
        <Route path="/editar-perfil/:id" element={<PrivateRoute><Navbar /><EditarPerfil /></PrivateRoute>} />
        <Route path="/watchlist" element={<Watchlist />} />


          {/* <Route path="dashboard" element={<p>Dash</p>} /> */}
       

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
);
