// Importamos la clase Sequelize desde la librería 'sequelize'
const { Sequelize } = require('sequelize');

// Configuramos la conexión a la base de datos SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite', // Especificamos que el dialecto de la base de datos es SQLite
    storage: './database.sqlite' // Indicamos la ruta del archivo de la base de datos
});

// Definimos el modelo 'Movie' que representará la tabla de películas en la base de datos
const Movie = sequelize.define('Movie', {
    // Definimos la columna 'movies' que almacenará el nombre de la película
    movies: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // Definimos la columna 'votes' que almacenará el número de votos
    votes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

// Sincronizamos el modelo con la base de datos
(async () => {
    try {
        // Esperamos a que la sincronización se complete
        await sequelize.sync();
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
})();

// Exportamos el objeto 'sequelize' y el modelo 'Movie' para ser utilizados en otras partes de la aplicación
module.exports = {
    sequelize,
    Movie
};
