// src/data/mockDB.js
const db = {
    // Datos precargados para probar Login de inmediato
    users: [
        { id: 1, username: 'admin', email: 'admin@unefa.edu.ve', password: '123', role: 'admin', carrera: 'Sistemas' },
        { id: 2, username: 'estudiante', email: 'user@unefa.edu.ve', password: '123', role: 'student', carrera: 'Civil' }
    ],
    publications: [], // CRUD Adicional 1
    forumPosts: [],   // CRUD Adicional 2
    comments: []      // CRUD Adicional 3
};

module.exports = db;