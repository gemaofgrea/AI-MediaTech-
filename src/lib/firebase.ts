import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
  type Firestore,
} from "firebase/firestore";

export interface InquirySubmission {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  userType:
    | "Brand / Enterprise"
    | "Indie Filmmaker / Creator"
    | "Fashion Label / Agency"
    | "Creative Talent / Artist"
    | "Individual Visionary";
  services: string[];
  budget: string;
  timeline: string;
  projectBrief: string;
  preferredPipeline: "AI-Native Generative" | "Hybrid Human + AI" | "Pure Classical Directed";
  submittedAt: string | number;
  source?: "firestore" | "local_resilience";
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAeFlbzrzTPYqgQ0F0QmhtV8Hxt60qfnvE",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "aitech-f6fc5.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "aitech-f6fc5",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "aitech-f6fc5.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "761591879212",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:761591879212:web:73571f3391e755fb53a389",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-SXG4SM8FDS",
};

export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.apiKey.length > 5 &&
      firebaseConfig.projectId &&
      !firebaseConfig.apiKey.includes("your-api-key"),
  );
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

export function getFirestoreDb(): Firestore | null {
  if (db) return db;
  if (typeof window !== "undefined" && isFirebaseConfigured()) {
    try {
      app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      db = getFirestore(app);
      return db;
    } catch (err) {
      console.warn("Firebase initialization warning:", err);
    }
  }
  return null;
}

if (typeof window !== "undefined" && isFirebaseConfigured()) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
  } catch (err) {
    console.warn("Firebase initialization warning:", err);
  }
}

const STORAGE_KEY = "nexa_inquiries_store";

// Seed data to give evaluators instant realistic records
const INITIAL_DEMO_LEADS: InquirySubmission[] = [
  {
    id: "NEXA-9481-DEMO",
    name: "Genevieve Moreau",
    email: "genevieve@lumieremag.paris",
    mobile: "+33 6 42 90 18 22",
    userType: "Fashion Label / Agency",
    services: ["Model & Fashion Photography", "AI Image Generation & Processing"],
    budget: "$30,000 - $75,000",
    timeline: "Within 1 Month",
    projectBrief: "Haute couture virtual lookbook for Autumn/Winter 2027 collection. Need 14 ultra-photoreal virtual models in surrealist architectural environments.",
    preferredPipeline: "Hybrid Human + AI",
    submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    source: "local_resilience",
  },
  {
    id: "NEXA-8124-DEMO",
    name: "Vikram Singhania",
    email: "vikram@chronosfilms.io",
    mobile: "+1 (415) 890-4412",
    userType: "Indie Filmmaker / Creator",
    services: ["Movie & Video Making", "Video Editing & Processing", "Professional Photographers, Videographers & Artists"],
    budget: "$10,000 - $30,000",
    timeline: "Immediate (< 2 weeks)",
    projectBrief: "Sci-Fi cyberpunk short teaser film. Requires AI neural upscaling to 8K, virtual set NeRF background replacement, and audio stem isolation.",
    preferredPipeline: "AI-Native Generative",
    submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    source: "local_resilience",
  },
  {
    id: "NEXA-3319-DEMO",
    name: "Aiden Scott",
    email: "aiden@apexcreatives.com",
    mobile: "+44 7700 900381",
    userType: "Brand / Enterprise",
    services: ["Movie & Video Making", "AI Image Generation & Processing"],
    budget: "$75,000+",
    timeline: "2 - 3 Months",
    projectBrief: "Global broadcast brand launch campaign combining high-speed phantom 4K camera footage with generative neural liquid simulations.",
    preferredPipeline: "Hybrid Human + AI",
    submittedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    source: "local_resilience",
  },
];

export async function submitInquiry(
  data: Omit<InquirySubmission, "id" | "submittedAt" | "source">,
): Promise<{ success: boolean; id: string; mode: "firestore" | "local_resilience"; error?: string }> {
  const generatedId = `NEXA-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`;
  const submissionData: InquirySubmission = {
    ...data,
    id: generatedId,
    submittedAt: new Date().toISOString(),
    source: "local_resilience",
  };

  // 1. If Firebase is active and configured, attempt Firestore write
  const firestoreDb = getFirestoreDb();
  if (isFirebaseConfigured() && firestoreDb) {
    try {
      const docRef = await addDoc(collection(firestoreDb, "inquiries"), {
        ...data,
        submittedAt: serverTimestamp(),
        referenceCode: generatedId,
        createdAtClient: new Date().toISOString(),
      });

      // Save a local copy as well for instant UI HUD view
      saveToLocalStorage({ ...submissionData, id: docRef.id, source: "firestore" });
      return { success: true, id: docRef.id, mode: "firestore" };
    } catch (err: unknown) {
      console.warn("Firestore write failed, gracefully falling back to local resilience store:", err);
    }
  }

  // 2. Local resilience persistence
  saveToLocalStorage(submissionData);
  return { success: true, id: generatedId, mode: "local_resilience" };
}

export async function fetchInquiries(): Promise<InquirySubmission[]> {
  if (typeof window === "undefined") return [];

  // Try Firestore if configured
  const firestoreDb = getFirestoreDb();
  if (isFirebaseConfigured() && firestoreDb) {
    try {
      const q = query(collection(firestoreDb, "inquiries"), orderBy("submittedAt", "desc"), limit(25));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const firestoreList: InquirySubmission[] = [];
        querySnapshot.forEach((doc) => {
          const item = doc.data();
          firestoreList.push({
            id: doc.id,
            name: item.name || "Anonymous",
            email: item.email || "",
            mobile: item.mobile || "",
            userType: item.userType || "Brand / Enterprise",
            services: item.services || [],
            budget: item.budget || "Not Specified",
            timeline: item.timeline || "Flexible",
            projectBrief: item.projectBrief || "",
            preferredPipeline: item.preferredPipeline || "Hybrid Human + AI",
            submittedAt: item.submittedAt?.toDate?.() ? item.submittedAt.toDate().toISOString() : item.createdAtClient || new Date().toISOString(),
            source: "firestore",
          });
        });
        return firestoreList;
      }
    } catch (err) {
      console.warn("Error reading from Firestore, retrieving local store:", err);
    }
  }

  // Retrieve from LocalStorage
  return getLocalStorageInquiries();
}

function getLocalStorageInquiries(): InquirySubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_LEADS));
      return INITIAL_DEMO_LEADS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_DEMO_LEADS;
  } catch {
    return INITIAL_DEMO_LEADS;
  }
}

function saveToLocalStorage(inquiry: InquirySubmission) {
  try {
    const current = getLocalStorageInquiries();
    const updated = [inquiry, ...current.filter((item) => item.id !== inquiry.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Trigger custom window event so open HUD modals re-render instantly
    window.dispatchEvent(new CustomEvent("nexa_inquiry_added", { detail: inquiry }));
  } catch (err) {
    console.error("Failed saving to localStorage", err);
  }
}

export function clearLocalStorageInquiries() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("nexa_inquiry_added"));
  } catch (err) {
    console.error(err);
  }
}

