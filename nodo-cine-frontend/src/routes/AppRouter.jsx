import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
// import RegisterPage from "../pages/Auth/RegisterPage";
import ProfileSelector from "../components/ProfileSelector";
// import MovieCatalog from "../pages/Movies/MovieCatalog";
import PrivateRoute from "../components/PrivateRoute";

export const AppRouter = () => (

   
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}

        
        <Route
          path="/seleccionar-perfil"
          element={
            <PrivateRoute>
              <ProfileSelector />
            </PrivateRoute>
          }
        />
          {/* <Route path="perfiles" element={<ProfileSelector />} /> */}
          {/* <Route path="catalogo" element={<MovieCatalog />} /> */}
          {/* <Route path="dashboard" element={<p>Dash</p>} /> */}
       

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
);
