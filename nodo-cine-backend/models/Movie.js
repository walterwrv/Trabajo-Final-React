import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título de la película es obligatorio'],
  },
  description: {
    type: String,
    required: [true, 'La descripción de la película es obligatoria'],
  },
  category: {
    type: String,
    required: [true, 'La categoría de la película es obligatoria'],
  },
  releaseDate: {
    type: Date,
    required: [true, 'La fecha de estreno es obligatoria'],
  },
  ageRating: {
    type: String,
    required: [true, 'La clasificación por edad es obligatoria'],
  },
  imdbID: {
    type: String,
    unique: true, // evitar duplicados
    sparse: true, // para que no obligue a estar presente en todos
  },
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
