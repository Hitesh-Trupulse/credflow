import PreviewPage from './main'
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'

async function getPosts() {
  const snapshot = await getDocs(collection(db, 'posts'))
  return snapshot.docs.map((doc) => {
    const data = doc.data()
    
    // Convert Firebase Timestamps to plain values
    return {
      id: doc.id,
      data: {
        ...data,
        created_at: data.created_at?.seconds ? data.created_at.seconds * 1000 : null,
        last_edit: data.last_edit?.seconds ? data.last_edit.seconds * 1000 : null,
      }
    }
  })
}

export default async function Page() {
  const posts = await getPosts()
  const sorted = posts.sort((a, b) => (b.data.created_at || 0) - (a.data.created_at || 0))

  return <PreviewPage posts={sorted} />
}
