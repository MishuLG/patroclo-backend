const Publication = require('../models/Publication');
const User = require('../models/User');

// Obtener todas las publicaciones
exports.getPublications = async (req, res) => {
  try {
    const publications = await Publication.findAll({
      order: [['fecha_creacion', 'DESC']], // Las más nuevas primero
      include: [
        {
          model: User,
          as: 'autor', // Debe coincidir con la relación definida en el modelo
          attributes: ['id', 'username', 'nombre', 'apellido'] // Solo traer datos necesarios
        }
      ]
    });
    res.json(publications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las publicaciones.' });
  }
};

// Crear una publicación
exports.createPublication = async (req, res) => {
  try {
    const { titulo, contenido } = req.body;
    const autor_id = req.user.id; // Obtenido del token JWT (middleware de auth)

    // Manejo del archivo subido (si existe)
    let media_url = null;
    let media_type = null;

    if (req.file) {
      // req.file viene de multer
      media_url = `/uploads/${req.file.filename}`;
      media_type = req.file.mimetype;
    }

    const newPublication = await Publication.create({
      titulo,
      contenido, // O 'cuerpo' según tu modelo SQL
      media_url,
      media_type,
      autor_id
    });

    res.status(201).json(newPublication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la publicación.' });
  }
};

// Borrar publicación
exports.deletePublication = async (req, res) => {
  try {
    const { id } = req.params;
    // Verificar que sea el autor o admin antes de borrar (opcional)
    const result = await Publication.destroy({ where: { id } });
    
    if (result) {
      res.json({ message: 'Publicación eliminada correctamente.' });
    } else {
      res.status(404).json({ message: 'Publicación no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la publicación.' });
  }
};