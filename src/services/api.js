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
    'x-admin-user': sessionStorage.getItem('admin_user') || '',
    'x-admin-pass': sessionStorage.getItem('admin_pass') || ''
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
