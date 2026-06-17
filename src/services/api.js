import anastasiaDirecto from '../images/Directo/AnastasiaDirecto.jpeg';
import regularDirecto from '../images/Directo/RegularDirecto.JPG';
import carajoDirecto from '../images/Directo/CarajoDirecto.jpeg';
import { bands as membersData } from '../data/contendientes';

function computeBandStats(bandId) {
  const band = membersData.find(b => b.id === bandId);
  if (!band || !band.members.length) return { power: 5, attitude: 5, sound: 5, powerLevel: 5 };

  const count = band.members.length;
  const sum = band.members.reduce((acc, m) => ({
    poder: acc.poder + m.stats.poder,
    velocidad: acc.velocidad + m.stats.velocidad,
    puestaEnEscena: acc.puestaEnEscena + m.stats.puestaEnEscena,
    resistencia: acc.resistencia + m.stats.resistencia,
    tecnica: acc.tecnica + m.stats.tecnica,
  }), { poder: 0, velocidad: 0, puestaEnEscena: 0, resistencia: 0, tecnica: 0 });

  const avg = {
    poder: sum.poder / count,
    velocidad: sum.velocidad / count,
    puestaEnEscena: sum.puestaEnEscena / count,
    resistencia: sum.resistencia / count,
    tecnica: sum.tecnica / count,
  };

  const powerLevel = (avg.poder + avg.velocidad + avg.puestaEnEscena + avg.resistencia + avg.tecnica) / 5 / 10;

  return {
    powerLevel: Math.round(powerLevel * 10) / 10,
    stats: {
      power: Math.round(((avg.poder + avg.velocidad) / 2 / 10) * 10) / 10,
      attitude: Math.round(((avg.puestaEnEscena + avg.resistencia) / 2 / 10) * 10) / 10,
      sound: Math.round(powerLevel * 10) / 10,
    },
  };
}

const STORAGE_KEYS = {
  BANDS: 'app_bands',
  SETTINGS: 'app_settings',
  VOTES: 'app_votes',
  VOTER_ID: 'voter_id',
};

const DEFAULT_BANDS = [
  {
    id: "anastasia-general",
    name: "Anastasia General",
    city: "Murcia",
    style: "Electro-Punk Combat",
    bio: "Punk para patos y demás bichos raros. Anastasia General lleva el caos con título propio: energía sin filtro, canciones que aprietan y un SIXPAK que no se digiere fácil.",
    imageUrl: anastasiaDirecto,
    ...computeBandStats("anastasia-general"),
  },
  {
    id: "regular-crowd",
    name: "Regular Crowd",
    city: "Barcelona",
    style: "Indie Pop Nostálgico",
    bio: "Cien por cien actitud, cero por ciento técnica. Regular Crowd no pide disculpas: indie punk murciano que te deja el HURACÁN dentro y las excusas fuera.",
    imageUrl: regularDirecto,
    ...computeBandStats("regular-crowd"),
  },
  {
    id: "carajo-baby",
    name: "Carajo Baby",
    city: "Madrid",
    style: "Garaje Rock Sucio",
    bio: "Si parpadeas te lo pierdes, y con Carajo Baby no te puedes permitir eso. Indie con las tripas a la vista, canciones que van de la cuchara al engaño sin pedir permiso.",
    imageUrl: carajoDirecto,
    ...computeBandStats("carajo-baby"),
  }
];

const DEFAULT_SETTINGS = { isVotingOpen: false, eventTitle: "tortillas de patadas: combate musical" };

function loadBands() {
  const stored = localStorage.getItem(STORAGE_KEYS.BANDS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.BANDS, JSON.stringify(DEFAULT_BANDS));
    return DEFAULT_BANDS;
  }
  return JSON.parse(stored);
}

function loadSettings() {
  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  }
  return JSON.parse(stored);
}

function loadVotes() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.VOTES) || '[]');
}

function saveVotes(votes) {
  localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify(votes));
}

// Get or create unique voter ID for anonymous users
export function getOrCreateVoterId() {
  let voterId = localStorage.getItem(STORAGE_KEYS.VOTER_ID);
  if (!voterId) {
    voterId = 'voter_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    localStorage.setItem(STORAGE_KEYS.VOTER_ID, voterId);
  }
  return voterId;
}

// Retrieve secure admin authorization credentials from sessionStorage
function getAdminHeaders() {
  return {
    'x-admin-user': sessionStorage.getItem('VITE_ADMIN_USER') || '',
    'x-admin-pass': sessionStorage.getItem('VITE_ADMIN_PASS') || ''
  };
}

// --- PUBLIC API CALLS ---

// Fetch list of bands
export async function getBands() {
  return loadBands();
}

// Fetch global settings
export async function getSettings() {
  return loadSettings();
}

// Fetch user vote state
export async function getUserVote() {
  const voterId = getOrCreateVoterId();
  const votes = loadVotes();
  const vote = votes.find(v => v.voterId === voterId);
  return vote || null;
}

// Submit user vote
export async function submitVote(bandId) {
  const voterId = getOrCreateVoterId();
  const votes = loadVotes();
  const existing = votes.findIndex(v => v.voterId === voterId);
  if (existing >= 0) {
    votes[existing] = { voterId, bandId, timestamp: Date.now() };
  } else {
    votes.push({ voterId, bandId, timestamp: Date.now() });
  }
  saveVotes(votes);
  return { success: true };
}

// --- ADMIN API CALLS ---

// Fetch vote results (admin only)
export async function adminGetResults() {
  const bands = loadBands();
  const votes = loadVotes();
  const results = {};
  bands.forEach(b => { results[b.id] = 0; });
  votes.forEach(v => {
    if (results[v.bandId] !== undefined) results[v.bandId]++;
  });
  return { results };
}

// Open or close voting ring (admin only)
export async function adminToggleVoting(isVotingOpen) {
  const settings = loadSettings();
  settings.isVotingOpen = isVotingOpen;
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  return { settings };
}

// Simulate 10 votes (admin only)
export async function adminSimulateVotes() {
  const bands = loadBands();
  const votes = loadVotes();
  for (let i = 0; i < 10; i++) {
    const bandId = bands[Math.floor(Math.random() * bands.length)].id;
    const voterId = 'sim_' + Math.random().toString(36).substring(2, 11);
    votes.push({ voterId, bandId, timestamp: Date.now() });
  }
  saveVotes(votes);
  return { success: true };
}

// Reset all votes to 0 (admin only)
export async function adminResetVotes() {
  saveVotes([]);
  return { success: true };
}

// Force re-seed database (admin only)
export async function adminForceSeed() {
  localStorage.setItem(STORAGE_KEYS.BANDS, JSON.stringify(DEFAULT_BANDS));
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
  saveVotes([]);
  return { bands: DEFAULT_BANDS, settings: DEFAULT_SETTINGS };
}
