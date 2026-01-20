const ForumPost = require('../models/ForumPost');
const User = require('../models/User');
// Si tienes un modelo de Comentarios separado:
const Comment = require('../models/Comment'); 

// Obtener todos los posts del foro
exports.getForumPosts = async (req, res) => {
  try {
    const posts = await ForumPost.findAll({
      order: [['fecha_creacion', 'DESC']],
      include: [
        {
          model: User,
          as: 'autor',
          attributes: ['username', 'nombre']
        },
        {
          // Incluir comentarios si tienes la relación definida
          model: Comment,
          as: 'comentarios',
          include: [{ model: User, as: 'autor', attributes: ['username'] }]
        }
      ]
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al cargar el foro.' });
  }
};

// Crear nuevo tema en el foro
exports.createForumPost = async (req, res) => {
  try {
    const { contenido } = req.body; // O 'titulo' y 'contenido' si tu tabla tiene ambos
    const autor_id = req.user.id;

    const newPost = await ForumPost.create({
      contenido,
      autor_id,
      likes: 0
    });

    // Devolver el post con los datos del autor recién creado
    const postWithAuthor = await ForumPost.findByPk(newPost.id, {
        include: [{ model: User, as: 'autor', attributes: ['username'] }]
    });

    res.status(201).json(postWithAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el post en el foro.' });
  }
};

// Dar Like a un post
exports.likeForumPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await ForumPost.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado.' });
    }

    // Incrementa el contador de likes
    // Nota: Para una solución profesional real, deberías tener una tabla 'likes' intermedia
    // para evitar que un usuario de like infinitas veces.
    post.likes += 1;
    await post.save();

    res.json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: 'Error al dar like.' });
  }
};