const express = require('express'); // Importa el módulo express, que es un framework para crear aplicaciones web en Node.js.
const session = require('express-session');  // Importa el módulo express-session, que permite manejar sesiones en la aplicación.
const routes = require('./controllers/routes'); // Importa las rutas definidas en el archivo de controladores 'routes'.

const { sequelize } = require('./models'); // Importa la instancia de Sequelize desde el archivo de modelos, que es un ORM para bases de datos.

// Crea una instancia de la aplicación Express.
const app = express();

// Middleware para parsear el cuerpo de las solicitudes JSON.
app.use(express.json());

// Middleware para parsear el cuerpo de las solicitudes URL-encoded, lo que permite enviar datos desde formularios.
app.use(express.urlencoded({ extended: true }));

// Configura el middleware de sesiones con una clave secreta y otras opciones.
app.use(session({
    secret: 'tu_secreto_aqui', // Clave secreta para firmar la sesión.
    resave: false, // No vuelve a guardar la sesión si no ha sido modificada.
    saveUninitialized: true // Guarda sesiones que no han sido inicializadas.
}));

// Establece 'ejs' como el motor de plantillas para renderizar vistas.
app.set('view engine', 'ejs');

// Define las rutas de la aplicación. Se utilizarán para manejar las solicitudes HTTP.
app.use('/', routes);

// Middleware para pasar el mensaje de la sesión a las vistas.
// Esto permite mostrar mensajes almacenados en la sesión en las plantillas.
app.use((req, res, next) => {
    res.locals.message = req.session.message; // Asigna el mensaje de la sesión a 'res.locals'.
    delete req.session.message; // Elimina el mensaje de la sesión después de pasarlo.
    next(); // Llama al siguiente middleware en la pila.
});

// Inicia el servidor y escucha en el puerto especificado.
const PORT = process.env.PORT || 3000; // Usa el puerto definido en las variables de entorno o 3000 como valor por defecto.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Muestra un mensaje en la consola indicando que el servidor está corriendo.
});

