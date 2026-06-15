import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;
const DB_PATH = path.resolve('data/db.json');

app.use(express.json());

// Load or Seed local JSON database
async function readDb() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    const initialDb = {
      bands: [
        {
          id: "anastasia-general",
          name: "Anastasia General",
          city: "Murcia",
          style: "Electro-Punk Combat",
          bio: "Desde las alcantarillas de Murcia, Anastasia trae el ruido que no pediste pero que necesitas. Punk sintético con sabor a asfalto y actitud de combate.",
          imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
          stats: { power: 8, attitude: 9, sound: 7 }
        },
        {
          id: "regular-crowd",
          name: "Regular Crowd",
          city: "Barcelona",
          style: "Indie Pop Nostálgico",
          bio: "Melodías agridulces y ritmos de batería vibrantes. Regular Crowd escribe himnos para bailar llorando en la pista de baile de cualquier club indie.",
          imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=800",
          stats: { power: 6, attitude: 7, sound: 9 }
        },
        {
          id: "carajo-baby",
          name: "Carajo Baby",
          city: "Madrid",
          style: "Garaje Rock Sucio",
          bio: "Tres acordes, distorsión al máximo y letras gritadas al micrófono. Carajo Baby recupera el sonido primitivo del garaje de los sesenta con un toque moderno y macarra.",
          imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
          stats: { power: 9, attitude: 8, sound: 6 }
        }
      ],
      settings: {
        isVotingOpen: true,
        eventTitle: "tortillas de patadas: combate musical"
      },
      votes: []
    };
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(initialDb, null, 2), 'utf-8');
    return initialDb;
  }
}

async function writeDb(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// Admin authorization middleware
const adminUser = process.env.VITE_ADMIN_USER;
const adminPass = process.env.VITE_ADMIN_PASS;

function adminAuth(req, res, next) {
  const user = req.headers['x-admin-user'];
  const pass = req.headers['x-admin-pass'];

  if (user === adminUser && pass === adminPass) {
    next();
  } else {
    res.status(401).json({ error: 'ACCESO DENEGADO: Credenciales de administrador inválidas.' });
  }
}

// --- PUBLIC API ---

// Get all bands
app.get('/api/bands', async (req, res) => {
  try {
    const db = await readDb();
    res.json(db.bands);
  } catch (err) {
    res.status(500).json({ error: 'Error al leer las bandas.' });
  }
});

// Get global settings
app.get('/api/settings', async (req, res) => {
  try {
    const db = await readDb();
    res.json(db.settings);
  } catch (err) {
    res.status(500).json({ error: 'Error al leer la configuración.' });
  }
});

// Get user specific vote
app.get('/api/votes/user/:voterId', async (req, res) => {
  try {
    const db = await readDb();
    const vote = db.votes.find(v => v.voterId === req.params.voterId) || null;
    res.json(vote);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el voto del usuario.' });
  }
});

// Submit a vote
app.post('/api/votes', async (req, res) => {
  const { bandId, voterId } = req.body;

  if (!bandId || !voterId) {
    return res.status(400).json({ error: 'Parámetros inválidos (se requiere bandId y voterId).' });
  }

  try {
    const db = await readDb();

    // Check if voting is open
    if (!db.settings.isVotingOpen) {
      return res.status(400).json({ error: '⚠️ EL RING ESTÁ CERRADO: No se permiten más votos.' });
    }

    // Check if band is valid
    if (!db.bands.some(b => b.id === bandId)) {
      return res.status(400).json({ error: 'Banda no válida.' });
    }

    // Find and update existing vote or add new one
    const existingIndex = db.votes.findIndex(v => v.voterId === voterId);
    const newVote = { voterId, bandId, timestamp: new Date().toISOString() };

    if (existingIndex > -1) {
      db.votes[existingIndex] = newVote;
    } else {
      db.votes.push(newVote);
    }

    await writeDb(db);
    res.json({ success: true, vote: newVote });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar el voto.' });
  }
});

// --- ADMIN API ---

// Get detailed real-time statistics
app.get('/api/admin/results', adminAuth, async (req, res) => {
  try {
    const db = await readDb();
    const results = {};
    db.bands.forEach(b => {
      results[b.id] = db.votes.filter(v => v.bandId === b.id).length;
    });

    const totalVotes = db.votes.length;

    res.json({
      totalVotes,
      results
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al compilar las estadísticas.' });
  }
});

// Open or close voting ring
app.post('/api/admin/settings', adminAuth, async (req, res) => {
  const { isVotingOpen } = req.body;

  if (typeof isVotingOpen !== 'boolean') {
    return res.status(400).json({ error: 'isVotingOpen debe ser un booleano.' });
  }

  try {
    const db = await readDb();
    db.settings.isVotingOpen = isVotingOpen;
    await writeDb(db);
    res.json({ success: true, settings: db.settings });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar la configuración.' });
  }
});

// Simulate 10 votes
app.post('/api/admin/simulate', adminAuth, async (req, res) => {
  try {
    const db = await readDb();
    const bandIds = db.bands.map(b => b.id);
    const mockVoters = Array.from({ length: 10 }, (_, i) => `sim_${Date.now()}_${i}`);

    mockVoters.forEach(voterId => {
      const randomBandId = bandIds[Math.floor(Math.random() * bandIds.length)];
      db.votes.push({
        voterId,
        bandId: randomBandId,
        timestamp: new Date().toISOString()
      });
    });

    await writeDb(db);
    res.json({ success: true, count: 10 });
  } catch (err) {
    res.status(500).json({ error: 'Error al simular votos.' });
  }
});

// Reset votes to 0 (hard delete)
app.post('/api/admin/reset', adminAuth, async (req, res) => {
  try {
    const db = await readDb();
    db.votes = [];
    await writeDb(db);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al reiniciar los votos.' });
  }
});

// Force re-seed database
app.post('/api/admin/seed', adminAuth, async (req, res) => {
  try {
    // Delete database file to trigger seed on reload
    await fs.rm(DB_PATH, { force: true });
    const freshDb = await readDb();
    res.json({ success: true, bands: freshDb.bands });
  } catch (err) {
    res.status(500).json({ error: 'Error al forzar re-semilla.' });
  }
});

// --- PRODUCTION SERVING ---

const distPath = path.resolve('dist');

// Serve compiled static production React files
app.use(express.static(distPath));

// Fallback routing for Single Page Application
app.get('*', (req, res) => {
  // If requesting api routes that were not matched, return 404
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ error: 'Ruta API no encontrada.' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor de Votación escuchando en http://localhost:${PORT}`);
});
