const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No hay token.' });
  }

  try {
    // Limpiar el prefijo "Bearer " si viene en el header
    const tokenClean = token.replace('Bearer ', '');
    
    const verified = jwt.verify(tokenClean, process.env.JWT_SECRET || 'secreto_super_seguro');
    req.user = verified; // Guardamos los datos del usuario en la request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token no válido.' });
  }
};