const Comment = require('../models/Comment');
const User = require('../models/User');

// Obtener comentarios de un post específico
exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.findAll({
      where: { foro_post_id: postId },
      include: [
        {
          model: User,
          as: 'autor',
          attributes: ['id', 'username', 'nombre', 'apellido']
        }
      ],
      order: [['fecha_creacion', 'ASC']]
    });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener comentarios' });
  }
};

// Crear un comentario
exports.createComment = async (req, res) => {
  try {
    const { contenido, foro_post_id } = req.body;
    const autor_id = req.user.id;

    if (!foro_post_id) {
      return res.status(400).json({ message: 'El ID del post es obligatorio' });
    }

    const newComment = await Comment.create({
      contenido,
      foro_post_id,
      autor_id
    });

    const commentWithAuthor = await Comment.findByPk(newComment.id, {
      include: [{ model: User, as: 'autor', attributes: ['username', 'nombre'] }]
    });

    res.status(201).json(commentWithAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el comentario' });
  }
};