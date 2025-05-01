import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePerfil } from '../context/PerfilContext'; // Usamos el contexto para obtener el perfil seleccionado


const Catalogo = () => {
  const { perfilSeleccionado } = usePerfil(); // Obtenemos el perfil seleccionado
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);

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

  if (!perfilSeleccionado) return <p>Selecciona un perfil para ver el catálogo</p>;
  if (cargando) return <p>Cargando películas...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {peliculas.map((pelicula) => (
        <div key={pelicula._id} className="bg-gray-100 p-2 rounded shadow">
          <img src={pelicula.image } alt={pelicula.title} className="w-full h-48 object-cover rounded" />
          <h2 className="text-lg font-semibold mt-2">{pelicula.title}</h2>
          <p className="text-sm text-gray-600">{pelicula.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Catalogo;
