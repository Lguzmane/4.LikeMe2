const express = require('express');
const cors = require('cors');
const pool = require('./database');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta GET para obtener posts
app.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error en GET /posts:', error);
    res.status(500).json({ error: 'Error al obtener posts' });
  }
});

// Ruta POST para crear posts
app.post('/posts', async (req, res) => {
  try {
    const { titulo, img, description } = req.body;
    
    if (!titulo || !img || !description) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const { rows } = await pool.query(
      'INSERT INTO posts (titulo, img, description, likes) VALUES ($1, $2, $3, 0) RETURNING *',
      [titulo, img, description]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error en POST /posts:', error);
    res.status(500).json({ error: 'Error al crear post' });
  }
});

// Ruta PUT para likes
app.put('/posts/like/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows, rowCount } = await pool.query(
      'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error en PUT /posts/like/:id:', error);
    res.status(500).json({ error: 'Error al actualizar like' });
  }
});

// Ruta DELETE para posts
app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query(
      'DELETE FROM posts WHERE id = $1',
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.status(200).json({ message: 'Post eliminado correctamente' });
  } catch (error) {
    console.error('Error en DELETE /posts/:id:', error);
    res.status(500).json({ error: 'Error al eliminar post' });
  }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});