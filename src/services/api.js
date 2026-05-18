// API Service for local Node.js + Express backend

// Get or create unique voter ID for anonymous users
export function getOrCreateVoterId() {
  let voterId = localStorage.getItem('voter_id');
  if (!voterId) {
    // Generate a reliable unique identifier
    voterId = 'voter_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    localStorage.setItem('voter_id', voterId);
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
  const res = await fetch('/api/bands');
  if (!res.ok) throw new Error('Error al cargar la cartelera de bandas.');
  return res.json();
}

// Fetch global settings
export async function getSettings() {
  const res = await fetch('/api/settings');
  if (!res.ok) throw new Error('Error al cargar la configuración del ring.');
  return res.json();
}

// Fetch user vote state
export async function getUserVote() {
  const voterId = getOrCreateVoterId();
  const res = await fetch(`/api/votes/user/${voterId}`);
  if (!res.ok) throw new Error('Error al consultar el voto del usuario.');
  return res.json();
}

// Submit user vote
export async function submitVote(bandId) {
  const voterId = getOrCreateVoterId();
  const res = await fetch('/api/votes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bandId, voterId })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al registrar el voto.');
  return data;
}

// --- ADMIN API CALLS ---

// Fetch vote results (admin only)
export async function adminGetResults() {
  const res = await fetch('/api/admin/results', {
    headers: getAdminHeaders()
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener resultados.');
  return data;
}

// Open or close voting ring (admin only)
export async function adminToggleVoting(isVotingOpen) {
  const res = await fetch('/api/admin/settings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAdminHeaders()
    },
    body: JSON.stringify({ isVotingOpen })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al cambiar estado del ring.');
  return data;
}

// Simulate 10 votes (admin only)
export async function adminSimulateVotes() {
  const res = await fetch('/api/admin/simulate', {
    method: 'POST',
    headers: getAdminHeaders()
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al simular votaciones.');
  return data;
}

// Reset all votes to 0 (admin only)
export async function adminResetVotes() {
  const res = await fetch('/api/admin/reset', {
    method: 'POST',
    headers: getAdminHeaders()
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al reiniciar las votaciones.');
  return data;
}

// Force re-seed database (admin only)
export async function adminForceSeed() {
  const res = await fetch('/api/admin/seed', {
    method: 'POST',
    headers: getAdminHeaders()
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al forzar re-semilla.');
  return data;
}
