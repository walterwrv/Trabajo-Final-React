import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePerfil } from '../context/PerfilContext'; // Usamos el contexto para obtener el perfil seleccionado
import { useNavigate } from 'react-router-dom';


const Catalogo = () => {
  const { perfilSeleccionado,eliminarPerfil } = usePerfil(); // Obtenemos el perfil seleccionado
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/movies'); // Ajustá si usás otra ruta
        console.log('peliculas obtenidas ',res.data);
        let filtradas = res.data;

        // Si el perfil es infantil, filtrar contenido según 'ageRating'
        if (perfilSeleccionado?.ageCategory === 'Infantil') {
          // Filtrar películas con ageRating <= 13 para niños
          filtradas = filtradas.filter(pelicula => parseInt(pelicula.ageRating) <= 13);
        }

        setPeliculas(filtradas);
      } catch (error) {
        console.error('Error al obtener películas:', error);
      } finally {
        setCargando(false);
      }
    };

    if (perfilSeleccionado) {
      fetchPeliculas();
    }
  }, [perfilSeleccionado]);

  const agregarAWtachlist = async (peliculaId) => {
    const token = localStorage.getItem('token');
  
    try {
      await axios.post('http://localhost:5000/api/watchlist/add', {
        profileId: perfilSeleccionado._id,
        movieId: peliculaId,
      }, {
        headers: {
          Authorization: `${token}`,
        },
      });
  
      alert('Película agregada a la watchlist');
    } catch (error) {
      console.error('Error al agregar a la watchlist:', error.message);
      alert('No se pudo agregar a la watchlist');
    }
  };

  if (!perfilSeleccionado) return <p>Selecciona un perfil para ver el catálogo</p>;
  if (cargando) return <p>Cargando películas...</p>;

  return (
    <>
    <button
    
    onClick={() => {
      eliminarPerfil();  // Elimina el perfil
      navigate('/seleccionar-perfil');  // Vuelve a la vista de selección de perfil
    }}
      className="fixed bottom-6 right-6 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
    >
      Volver
    </button>
    <div className="p-4">
    <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Catálogo {perfilSeleccionado?.ageCategory === 'Infantil' ? 'Infantil' : 'General'}
        </h1>
        <button
          onClick={() => navigate('/watchlist')}
          className={`px-4 py-2 text-white rounded transition ${
            perfilSeleccionado?.ageCategory === 'Infantil' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Ver Watchlist
        </button>
      </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {peliculas.map((pelicula) => (
            <div key={pelicula._id} className="bg-gray-100 p-2 rounded shadow">
              <img src={pelicula.image } alt={pelicula.title} className="w-full h-48 object-cover rounded" />
              <h2 className="text-lg font-semibold mt-2">{pelicula.title}</h2>
              <p className="text-sm text-gray-600">{pelicula.description}</p>
              <button
                onClick={() => agregarAWtachlist(pelicula._id)}
                className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
              >
                Agregar a Watchlist
              </button>
            </div>
          ))}
          
        </div>
      </div>
      
    </>
  );
};

export default Catalogo;
