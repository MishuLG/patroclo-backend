// src/middlewares/censorMiddleware.js

const BANNED_WORDS = ['tonto', 'idiota', 'estúpido', 'perro', 'puto', 'gay', 'liander'];

const censorMiddleware = (req, res, next) => {
    if (req.body.content) {
        let censored = req.body.content;
        
        BANNED_WORDS.forEach((word) => {
            const regex = new RegExp(word, 'gi');
            const replacement = '*'.repeat(word.length);
            censored = censored.replace(regex, replacement);
        });

        // Reemplazamos el contenido original por el censurado
        req.body.content = censored;
    }
    next();
};

module.exports = censorMiddleware;