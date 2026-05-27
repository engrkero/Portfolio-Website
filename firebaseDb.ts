import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';
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

// --- API METHODS ---

/**
 * Fetch active settings or return default fallbacks
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const path = 'site_settings/active';
  try {
    const docRef = doc(db, 'site_settings', 'active');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...DEFAULT_SITE_SETTINGS, ...docSnap.data() };
    }
    return DEFAULT_SITE_SETTINGS;
  } catch (err) {
    // If it fails on initial boot or permission gaps, trace and return defaults
    try {
      handleFirestoreError(err, OperationType.GET, path);
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  }
}

/**
 * Set and write site settings
 */
export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
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
    return jobs.length > 0 ? jobs : DEFAULT_GRAPHICS_JOBS;
  } catch (err) {
    try {
      handleFirestoreError(err, OperationType.LIST, collectionPath);
    } catch {
      return DEFAULT_GRAPHICS_JOBS;
    }
  }
}

/**
 * Add a new graphics design job node to the gallery
 */
export async function addGraphicsJob(job: Omit<GraphicsJob, 'id'>): Promise<string> {
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
  const docPath = `graphics_jobs/${id}`;
  try {
    await deleteDoc(doc(db, 'graphics_jobs', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, docPath);
  }
}
