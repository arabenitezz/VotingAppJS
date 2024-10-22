const express = require('express');
const session = require('express-session');
const routes = require('./controllers/routes');
const { sequelize } = require('./models');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'tu_secreto_aqui',
    resave: false,
    saveUninitialized: true
}));

// Motor de vistas
app.set('view engine', 'ejs');

// Rutas
app.use('/', routes);

// Middleware para pasar el mensaje de sesión a las vistas
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});


// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
