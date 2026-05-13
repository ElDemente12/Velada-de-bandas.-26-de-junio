import { collection, doc, getDocs, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const INITIAL_BANDS = [
  {
    id: 'anastasia-general',
    name: 'Anastasia General',
    city: 'Murcia',
    style: 'Electro-Punk Combat',
    bio: 'Desde las alcantarillas de Murcia, Anastasia trae el ruido que no pediste pero que necesitas. Punk sintético con sabor a asfalto y actitud de combate.',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    stats: { power: 8, attitude: 9, sound: 7 }
  },
  {
    id: 'regular-crowd',
    name: 'Regular Crowd',
    city: 'Murcia',
    style: 'Post-Grunge Overdrive',
    bio: 'Gritos melódicos y guitarras que cortan el aire. No son gente normal, son el ruido de la calle de Murcia personificado en una tormenta sonora.',
    imageUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800',
    stats: { power: 9, attitude: 7, sound: 8 }
  },
  {
    id: 'carajo-baby',
    name: 'Carajo Baby',
    city: 'Madrid',
    style: 'Madrid Garage Kick',
    bio: 'Aterrizando desde la capital con una misión: demoler el escenario. Rock crudo, directo y sin filtros. Carajo, qué pegada tienen estos madrileños.',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=800',
    stats: { power: 7, attitude: 8, sound: 9 }
  }
];

export async function seedInitialData() {
  console.log('--- FIRESTORE SEEDING START ---');
  
  // Check and seed bands
  for (const band of INITIAL_BANDS) {
    const bandRef = doc(db, 'bands', band.id);
    try {
      console.log(`Setting band: ${band.id}`);
      await setDoc(bandRef, band, { merge: true });
    } catch (e) {
      console.error(`Could not seed band ${band.id}:`, e);
    }
  }

  // Check and seed settings
  const settingsRef = doc(db, 'settings', 'global');
  try {
    console.log('Setting global settings');
    await setDoc(settingsRef, {
      isVotingOpen: true,
      eventTitle: 'tortillas de patadas: combate musical'
    }, { merge: true });
  } catch (e) {
    console.error('Could not seed settings:', e);
  }

  // Seed some initial votes for visualization (only if no votes exist)
  try {
    const votesSnap = await getDocs(collection(db, 'votes'));
    if (votesSnap.empty) {
      console.log('Seeding initial dummy votes for visualization...');
      const dummyVoters = ['bot1', 'bot2', 'bot3', 'bot4', 'bot5', 'bot6', 'bot7', 'bot8', 'bot9', 'bot10'];
      const bandIds = INITIAL_BANDS.map(b => b.id);
      
      for (const voterId of dummyVoters) {
        const randomBandId = bandIds[Math.floor(Math.random() * bandIds.length)];
        await setDoc(doc(db, 'votes', voterId), {
          bandId: randomBandId,
          voterId: voterId,
          timestamp: serverTimestamp()
        });
      }
    } else {
      console.log('Votes collection not empty, skipping vote seed.');
    }
  } catch (e) {
    console.error('Could not seed initial votes:', e);
  }
  
  console.log('--- FIRESTORE SEEDING END ---');
}
