import { createContext, useState, useContext } from 'react';

// Crear el contexto
const PerfilContext = createContext();

// Hook para usar el contexto más fácilmente
export const usePerfil = () => useContext(PerfilContext);

// Proveedor del contexto
export const PerfilProvider = ({ children }) => {
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);

  const seleccionarPerfil = (perfil) => {
    setPerfilSeleccionado(perfil);
    localStorage.setItem('perfilSeleccionado', JSON.stringify(perfil));
  };

  const cargarPerfilDesdeLocalStorage = () => {
    const perfilGuardado = localStorage.getItem('perfilSeleccionado');
    if (perfilGuardado) {
      setPerfilSeleccionado(JSON.parse(perfilGuardado));
    }
  };

  // Cargar perfil cuando se monta
  useState(() => {
    cargarPerfilDesdeLocalStorage();
  }, []);

  return (
    <PerfilContext.Provider value={{ perfilSeleccionado, seleccionarPerfil, setPerfilSeleccionado }}>
      {children}
    </PerfilContext.Provider>
  );
};
