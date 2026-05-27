import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  query, 
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db, isConfigValid } from './firebase';
import type { SiteSettings, GraphicsJob } from './types';

// Operation Types for diagnostic tools
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  }
}

// Custom error translator conforming to FirestoreErrorInfo IR
function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: 'anonymous-client', // Public operations allowed under permissions bypass
      email: null
    },
    operationType,
    path
  };
  console.error('Firestore Diagnostic Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Default CEO Fallbacks
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  ceoName: "Keren Godwin Onen",
  ceoBio: "Founder & Creative Director of Kero Graphics Studio Code (KGSC). Experienced front-end developer, registered CAC digital contractor, and high-fidelity UI/UX designer specialized in University of Calabar registration platforms and digital workspace management.",
  ceoImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop", // placeholder portrait
  logo: "",
  favicon: ""
};

// Default Graphics Jobs fallback list so the page has elegant state on first load
export const DEFAULT_GRAPHICS_JOBS: GraphicsJob[] = [
  {
    id: "g_1",
    title: "UNICAL Official GSS Examination Flyer",
    category: "Flyer Design",
    imageUrl: "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=800&auto=format&fit=crop",
    description: "High impact conceptual poster conveying scheduling grid and halls distribution guides for the GSS session.",
    createdAt: new Date(2026, 2, 1).toISOString()
  },
  {
    id: "g_2",
    title: "KGSC Full Brand Identity Node Set",
    category: "Branding",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
    description: "Cohesive visual corporate identity including stationery layouts, official business letterheads, and logo files.",
    createdAt: new Date(2026, 1, 15).toISOString()
  },
  {
    id: "g_3",
    title: "CAC Registration Certification Banner",
    category: "Banner Design",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
    description: "Visual certification trust badge template built to align with premium CAC and corporate branding colors.",
    createdAt: new Date(2026, 0, 10).toISOString()
  }
];

// --- LOCAL FALLBACK HELPERS ---

export function getLocalSettings(): SiteSettings {
  try {
    const saved = localStorage.getItem('kgsc_settings');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("localStorage read error", e);
  }
  return DEFAULT_SITE_SETTINGS;
}

function saveLocalSettings(settings: SiteSettings) {
  try {
    localStorage.setItem('kgsc_settings', JSON.stringify(settings));
  } catch (e) {
    console.warn("localStorage write error", e);
  }
}

export function getLocalGraphicsJobs(): GraphicsJob[] {
  try {
    const saved = localStorage.getItem('kgsc_graphics_jobs');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("localStorage read error", e);
  }
  return DEFAULT_GRAPHICS_JOBS;
}

function saveLocalGraphicsJobs(jobs: GraphicsJob[]) {
  try {
    localStorage.setItem('kgsc_graphics_jobs', JSON.stringify(jobs));
  } catch (e) {
    console.warn("localStorage write error", e);
  }
}

// --- API METHODS ---

/**
 * Fetch active settings or return default fallbacks
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isConfigValid) {
    return getLocalSettings();
  }
  const path = 'site_settings/active';
  try {
    const docRef = doc(db, 'site_settings', 'active');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const merged = { ...DEFAULT_SITE_SETTINGS, ...docSnap.data() };
      saveLocalSettings(merged);
      return merged;
    }
    return getLocalSettings();
  } catch (err) {
    return getLocalSettings();
  }
}

/**
 * Set and write site settings
 */
export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  saveLocalSettings(settings);
  if (!isConfigValid) {
    return;
  }
  const path = 'site_settings/active';
  try {
    const docRef = doc(db, 'site_settings', 'active');
    await setDoc(docRef, {
      ceoName: settings.ceoName,
      ceoBio: settings.ceoBio || '',
      ceoImage: settings.ceoImage || '',
      logo: settings.logo || '',
      favicon: settings.favicon || ''
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

/**
 * Retrieves all graphics design jobs sorted by date desc
 */
export async function getGraphicsJobs(): Promise<GraphicsJob[]> {
  if (!isConfigValid) {
    return getLocalGraphicsJobs();
  }
  const collectionPath = 'graphics_jobs';
  try {
    const q = query(collection(db, collectionPath), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const jobs: GraphicsJob[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      jobs.push({
        id: doc.id,
        title: data.title || '',
        category: data.category || 'General Design',
        imageUrl: data.imageUrl || '',
        description: data.description || '',
        createdAt: data.createdAt || new Date().toISOString()
      });
    });
    const finalJobs = jobs.length > 0 ? jobs : DEFAULT_GRAPHICS_JOBS;
    saveLocalGraphicsJobs(finalJobs);
    return finalJobs;
  } catch (err) {
    return getLocalGraphicsJobs();
  }
}

/**
 * Add a new graphics design job node to the gallery
 */
export async function addGraphicsJob(job: Omit<GraphicsJob, 'id'>): Promise<string> {
  const localId = "g_local_" + Date.now();
  const newJob: GraphicsJob = {
    ...job,
    id: localId,
    createdAt: new Date().toISOString()
  };
  
  const currentJobs = getLocalGraphicsJobs();
  const activeJobs = currentJobs.filter(j => !j.id.startsWith('g_local_'));
  saveLocalGraphicsJobs([newJob, ...activeJobs]);

  if (!isConfigValid) {
    return localId;
  }
  const collectionPath = 'graphics_jobs';
  try {
    const docRef = await addDoc(collection(db, collectionPath), {
      title: job.title,
      category: job.category,
      imageUrl: job.imageUrl,
      description: job.description || '',
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, collectionPath);
  }
}

/**
 * Purge a graphics design job node from the gallery
 */
export async function deleteGraphicsJob(id: string): Promise<void> {
  const currentJobs = getLocalGraphicsJobs();
  const filtered = currentJobs.filter(j => j.id !== id);
  saveLocalGraphicsJobs(filtered);

  if (!isConfigValid) {
    return;
  }
  const docPath = `graphics_jobs/${id}`;
  try {
    await deleteDoc(doc(db, 'graphics_jobs', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, docPath);
  }
}

export const DEFAULT_SKILLS = [
  { id: 'sk_uiux', name: 'UI/UX Design', iconName: 'UiUxIcon' },
  { id: 'sk_graphic', name: 'Graphic Design', iconName: 'GraphicDesignIcon' },
  { id: 'sk_frontend', name: 'Frontend Development', iconName: 'CodeIcon' },
  { id: 'sk_react', name: 'React', iconName: 'ReactIcon' },
  { id: 'sk_ts', name: 'TypeScript', iconName: 'TypescriptIcon' },
  { id: 'sk_tailwind', name: 'Tailwind CSS', iconName: 'TailwindCssIcon' },
  { id: 'sk_figma', name: 'Figma', iconName: 'FigmaIcon' },
  { id: 'sk_adobe', name: 'Adobe Suite', iconName: 'AdobeSuiteIcon' },
  { id: 'sk_brain', name: 'Problem Solving', iconName: 'BrainIcon' },
  { id: 'sk_comm', name: 'Effective Communication', iconName: 'UsersIcon' },
  { id: 'sk_time', name: 'Time Management', iconName: 'ClockIcon' },
  { id: 'sk_eq', name: 'Emotional Intelligence', iconName: 'HeartIcon' },
];

export function getLocalSkills(): any[] {
  try {
    const saved = localStorage.getItem('kgsc_skills');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("localStorage read error for skills", e);
  }
  return DEFAULT_SKILLS;
}

export function saveLocalSkills(skills: any[]) {
  try {
    localStorage.setItem('kgsc_skills', JSON.stringify(skills));
  } catch (e) {
    console.warn("localStorage write error for skills", e);
  }
}

/**
 * Retrieves all custom or default skills from the database/localStorage
 */
export async function getSkills(): Promise<any[]> {
  if (!isConfigValid) {
    return getLocalSkills();
  }
  const collectionPath = 'skills';
  try {
    const q = query(collection(db, collectionPath));
    const querySnapshot = await getDocs(q);
    const loadedSkills: any[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      loadedSkills.push({
        id: doc.id,
        name: data.name || '',
        iconName: data.iconName || '',
        imageUrl: data.imageUrl || ''
      });
    });
    const finalSkills = loadedSkills.length > 0 ? loadedSkills : DEFAULT_SKILLS;
    saveLocalSkills(finalSkills);
    return finalSkills;
  } catch (err) {
    return getLocalSkills();
  }
}

/**
 * Saves or updates a skill element
 */
export async function addSkill(skill: { name: string; iconName?: string; imageUrl?: string }): Promise<string> {
  const localId = "sk_local_" + Date.now();
  const newSkill = {
    ...skill,
    id: localId
  };

  const currentSkills = getLocalSkills();
  const index = currentSkills.findIndex(s => s.name.toLowerCase() === skill.name.toLowerCase());
  if (index >= 0) {
    currentSkills[index] = { ...currentSkills[index], ...skill };
    saveLocalSkills([...currentSkills]);
  } else {
    saveLocalSkills([...currentSkills, newSkill]);
  }

  if (!isConfigValid) {
    return localId;
  }

  const collectionPath = 'skills';
  try {
    const docRef = await addDoc(collection(db, collectionPath), {
      name: skill.name,
      iconName: skill.iconName || '',
      imageUrl: skill.imageUrl || ''
    });
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, collectionPath);
    return localId;
  }
}

/**
 * Deletes a skill node
 */
export async function deleteSkill(id: string): Promise<void> {
  const currentSkills = getLocalSkills();
  const filtered = currentSkills.filter(s => s.id !== id);
  saveLocalSkills(filtered);

  if (!isConfigValid) {
    return;
  }
  const docPath = `skills/${id}`;
  try {
    await deleteDoc(doc(db, 'skills', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, docPath);
  }
}

/**
 * Real-time subscription for site settings
 */
export function subscribeSiteSettings(callback: (settings: SiteSettings) => void): () => void {
  if (!isConfigValid) {
    callback(getLocalSettings());
    return () => {};
  }
  const docRef = doc(db, 'site_settings', 'active');
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const merged = { ...DEFAULT_SITE_SETTINGS, ...docSnap.data() };
      saveLocalSettings(merged);
      callback(merged);
    } else {
      callback(getLocalSettings());
    }
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, 'site_settings/active');
  });
}

/**
 * Real-time subscription for graphics gallery jobs
 */
export function subscribeGraphicsJobs(callback: (jobs: GraphicsJob[]) => void): () => void {
  if (!isConfigValid) {
    callback(getLocalGraphicsJobs());
    return () => {};
  }
  const q = query(collection(db, 'graphics_jobs'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (querySnapshot) => {
    const jobs: GraphicsJob[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      jobs.push({
        id: doc.id,
        title: data.title || '',
        category: data.category || 'General Design',
        imageUrl: data.imageUrl || '',
        description: data.description || '',
        createdAt: data.createdAt || new Date().toISOString()
      });
    });
    const finalJobs = jobs.length > 0 ? jobs : DEFAULT_GRAPHICS_JOBS;
    saveLocalGraphicsJobs(finalJobs);
    callback(finalJobs);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, 'graphics_jobs');
  });
}

/**
 * Real-time subscription for tech stack skills
 */
export function subscribeSkills(callback: (skills: any[]) => void): () => void {
  if (!isConfigValid) {
    callback(getLocalSkills());
    return () => {};
  }
  const q = query(collection(db, 'skills'));
  return onSnapshot(q, (querySnapshot) => {
    const loadedSkills: any[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      loadedSkills.push({
        id: doc.id,
        name: data.name || '',
        iconName: data.iconName || '',
        imageUrl: data.imageUrl || ''
      });
    });
    const finalSkills = loadedSkills.length > 0 ? loadedSkills : DEFAULT_SKILLS;
    saveLocalSkills(finalSkills);
    callback(finalSkills);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, 'skills');
  });
}
