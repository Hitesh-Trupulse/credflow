import EditBlog from "./EditBlog"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase"

export default async function Page() {
  const snapshot = await getDocs(collection(db, "posts"))
  const posts = snapshot.docs.map((doc) => {
    const data = doc.data()

    return {
      id: doc.id,
      data: {
        ...data,
        created_at: data.created_at?.seconds ? data.created_at.seconds * 1000 : 0,
        last_edit: data.last_edit?.seconds ? data.last_edit.seconds * 1000 : 0,
      }
    }
  })

  const sortedPosts = posts.sort((a, b) => b.data.created_at - a.data.created_at)

  return <EditBlog posts={sortedPosts} />
}
