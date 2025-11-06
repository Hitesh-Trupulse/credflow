import { db } from "@/firebase";
import { collection, getDocs, doc, getDoc, query, orderBy } from "firebase/firestore";

export async function getAllBlogs() {
  const q = query(collection(db, "posts"), orderBy("created_at", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getBlogById(id) {
  const ref = doc(db, "posts", id);
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}
