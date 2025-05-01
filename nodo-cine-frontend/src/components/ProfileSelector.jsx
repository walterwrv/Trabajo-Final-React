import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usePerfil } from '../context/PerfilContext'; // Importamos el contexto

const ProfileSelector = () => {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { setPerfilSeleccionado } = usePerfil(); // Usamos el contexto

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/profiles/all', {
          headers: { Authorization: `${token}` }
        });
        // console.log('Res-> ',res.data.profiles);
        setProfiles(res.data.profiles);
        
      } catch (error) {
        console.error('Error al obtener perfiles', error);
      }
    };

    if (token) {
      fetchProfiles();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleSelect = (profile) => {
    localStorage.setItem('selectedProfile', JSON.stringify(profile));
    setPerfilSeleccionado(profile); // Actualizamos el perfil seleccionado en el contexto
    navigate('/catalogo');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-2xl font-semibold mb-6">¿Quién está viendo?</h1>
      <div className="grid grid-cols-2 gap-6">
        {profiles.map((profile) => (
          <button
            key={profile._id}
            onClick={() => handleSelect(profile)}
            className="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition"
          >
            <p className="text-lg">{profile.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileSelector;
