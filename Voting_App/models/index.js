const { Sequelize } = require('sequelize');

// Configurar la conexión SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Definir el modelo Movie
const Movie = sequelize.define('Movie', {
    movies: {
        type: Sequelize.STRING,
        allowNull: false
    },
    votes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

// Sincronizar el modelo con la base de datos
(async () => {
    try {
        await sequelize.sync();
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
})();

module.exports = {
    sequelize,
    Movie
};