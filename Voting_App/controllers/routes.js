// Importamos la librería Express para crear la aplicación web
const express = require('express');
// Creamos un nuevo router utilizando Express
const router = express.Router();
// Importamos el modelo Movie desde el archivo models/index.js
const { Movie } = require('../models'); 

// Ruta principal para obtener todas las películas
router.get('/', async (req, res) => {
    try {
        // Buscamos todas las películas en la base de datos y las ordenamos por el número de votos de forma descendente
        const movies = await Movie.findAll({
            order: [['votes', 'DESC']]
        });
        
        // Renderizamos la vista "index" y pasamos el título y la lista de películas
        res.render("index", {
            title: "Homepage",
            movies: movies
        });
    } catch (err) {
        // Si ocurre un error, lo mostramos en la consola y respondemos con un error 500
        console.error('Error fetching movies:', err);
        res.status(500).json({ message: err.message });
    }
});

// Ruta para mostrar el formulario de agregar películas
router.get('/add', (req, res) => {
    // Renderizamos la vista "add_movie" con un título específico
    res.render("add_movie", { title: "Add movie" });
});

// Ruta para insertar una nueva película en la base de datos
router.post('/add', async (req, res) => {
    try {
        // Creamos una nueva película con el título proporcionado en el cuerpo de la solicitud y con 0 votos
        const movie = await Movie.create({ 
            movies: req.body.movie,
            votes: 0 
        });

        // Guardamos un mensaje en la sesión y redirigimos a la ruta principal
        req.session.message = 'movie added successfully';
        res.redirect('/');

    } catch (error) {
        // Si ocurre un error al agregar la película, lo mostramos y redirigimos a la ruta principal con un mensaje de error
        console.error('Error adding movie:', error);
        req.session.message = 'Failed to add movie';
        res.redirect('/');
    }
});

// Ruta para editar una película existente
router.put('/edit/:id', async (req, res) => {
    // Obtenemos el ID de la película desde los parámetros de la URL
    const id = parseInt(req.params.id);
    // Extraemos el título y los votos del cuerpo de la solicitud
    const { movies, votes } = req.body;

    try {
        // Buscamos la película por su ID
        const movie = await Movie.findByPk(id);
        
        // Si la película no se encuentra, enviamos un mensaje de error
        if (!movie) {
            req.session.message = 'Failed to find movie';
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Actualizamos los campos de la película solo si se proporcionan en la solicitud
        if (movies !== undefined) movie.movies = movies;
        if (votes !== undefined) movie.votes = votes;

        // Guardamos los cambios en la base de datos
        await movie.save();

        // Respondemos con un mensaje de éxito y la película actualizada
        res.json({ message: 'Movie updated successfully', movie });
        
    } catch (err) {
        // Si ocurre un error al actualizar, lo mostramos y respondemos con un error 500
        console.error('Error updating movie:', err);
        req.session.message = 'Failed to update movie';
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Ruta para eliminar una película
router.delete('/delete/:id', async (req, res) => {
    // Obtenemos el ID de la película desde los parámetros de la URL
    const id = parseInt(req.params.id);

    try {
        // Eliminamos la película de la base de datos utilizando su ID
        await Movie.destroy({
            where: { id: id }
        });

        // Guardamos un mensaje de éxito en la sesión y respondemos con un mensaje
        req.session.message = 'movie deleted successfully';
        return res.status(200).json({ message: req.session.message });
        
    } catch (error) {
        // Si ocurre un error al eliminar, lo mostramos y respondemos con un error 500
        console.error('Error deleting movie:', error);
        req.session.message = 'Failed to delete movie';
        return res.status(500).json({ message: req.session.message });
    }
});

// Ruta para agregar un voto a una película
router.post("/vote/:id", async (req, res) => {
    // Obtenemos el ID de la película desde los parámetros de la URL
    const id = parseInt(req.params.id);

    try {
        // Buscamos la película por su ID
        const movie = await Movie.findByPk(id);

        // Si la película no se encuentra, enviamos un mensaje de error
        if (!movie) {
            req.session.message = 'Failed to find movie';
            return res.status(404).json({ message: 'movie not found' });
        }

        // Actualizamos el número de votos de la película, incrementándolo en 1
        await Movie.update({
            votes: movie.votes + 1
        }, {
            where: { id: id }
        });

        // Guardamos un mensaje de éxito en la sesión y redirigimos a la ruta principal
        req.session.message = 'vote added successfully';
        res.redirect('/');

    } catch (error) {
        // Si ocurre un error al votar, lo mostramos y redirigimos a la ruta principal con un mensaje de error
        console.error('Error liking movie:', error);
        req.session.message = 'Failed to vote movie';
        res.redirect('/');
    }
});

// Exportamos el router para ser utilizado en otras partes de la aplicación
module.exports = router;
