const express = require('express');
const router = express.Router();
const { Movie } = require('../models'); // Importamos el modelo desde models/index.js

// Ruta principal
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.findAll({
            order: [['votes', 'DESC']]
        });
        
        res.render("index", {
            title: "Homepage",
            movies: movies
        });
    } catch (err) {
        console.error('Error fetching movies:', err);
        res.status(500).json({ message: err.message });
    }
});

// Agregar peliculas
router.get('/add', (req, res) => {
    res.render("add_movie", { title: "Add movie" });
});

// Insert a movie into the database route
router.post('/add', async (req, res) => {
    try {
        const movie = await Movie.create({ 
            movies: req.body.movie,
            votes: 0 
        });

        req.session.message = 'movie added successfully';
        res.redirect('/');

    } catch (error) {
        console.error('Error adding movie:', error);
        req.session.message = 'Failed to add movie';
        res.redirect('/');
    }
});

// Edit a movie from the list (form)
router.put('/edit/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { movies, votes } = req.body;

    try {
        const movie = await Movie.findByPk(id);
        
        if (!movie) {
            req.session.message = 'Failed to find movie';
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Actualizar los campos de la película con los datos recibidos
        if (movies !== undefined) movie.movies = movies;
        if (votes !== undefined) movie.votes = votes;

        await movie.save();

        res.json({ message: 'Movie updated successfully', movie });
        
    } catch (err) {
        console.error('Error updating movie:', err);
        req.session.message = 'Failed to update movie';
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Delete a movie route
router.delete('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await Movie.destroy({
            where: { id: id }
        });

        req.session.message = 'movie deleted successfully';
        return res.status(200).json({ message: req.session.message });
        
    } catch (error) {
        console.error('Error deleting movie:', error);
        req.session.message = 'Failed to delete movie';
        return res.status(500).json({ message: req.session.message });
    }
});

// Add a vote route
router.post("/vote/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const movie = await Movie.findByPk(id);

        if (!movie) {
            req.session.message = 'Failed to find movie'
            return res.status(404).json({ message: 'movie not found' });
        }

        await Movie.update({
            votes: movie.votes + 1
        }, {
            where: { id: id }
        });

        req.session.message = 'vote added successfully';
        res.redirect('/');

    } catch (error) {
        console.error('Error liking movie:', error);
        req.session.message = 'Failed to vote movie';
        res.redirect('/');
    }
});
    
module.exports = router;