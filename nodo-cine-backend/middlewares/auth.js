import jwt from 'jsonwebtoken';

// Middleware para verificar el JWT
const verifyToken = (req, res, next) => {
  // console.log('Authorization header:', req.headers.authorization);

  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    req.user = decoded;  // Guardamos los datos del usuario en el objeto request
    next(); // Continúa con la ejecución del siguiente middleware o ruta
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export default verifyToken;
