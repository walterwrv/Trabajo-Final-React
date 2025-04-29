import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
// import RegisterPage from "../pages/Auth/RegisterPage";
// import ProfileSelector from "../pages/Profile/ProfileSelector";
// import MovieCatalog from "../pages/Movies/MovieCatalog";
import ProtectedRoute from "../components/ProtectedRoute";

export const AppRouter = () => (

   
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}

        <Route path="/" element={<ProtectedRoute />}>
          {/* <Route path="perfiles" element={<ProfileSelector />} /> */}
          {/* <Route path="catalogo" element={<MovieCatalog />} /> */}
          {/* <Route path="dashboard" element={<p>Dash</p>} /> */}
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
);
