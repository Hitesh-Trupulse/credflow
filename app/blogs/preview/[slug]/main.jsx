'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import moment from 'moment'
import RelatedBlogs from '../../blog/[id]/components/RelatedBlogs'
import BlogHero from '../../blog/[id]/components/BlogHero'
import BlogContent from '../../blog/[id]/components/BlogContent'
import Loader from '@/components/common/Loader'

export default function PreviewPage({ posts }) {
  const [post, setPost] = useState(null)
  const [user, loading] = useAuthState(auth)
  const [postLoading, setPostLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const currentURL = pathname.split('/')[3]

  useEffect(() => {
    if (!loading && !user) router.push('/blogs/login')
  }, [user, loading])

  useEffect(() => {
    const found = posts.find((p) =>
      p?.data?.customURL?.length > 3
        ? p.data.customURL === currentURL
        : p.data.title.toLowerCase().replace(/[^a-zA-Z ]/g, '').split(' ').join('-') === currentURL
    )
    setPost(found)
    setPostLoading(false)
  }, [posts, currentURL])

  const handlePublishToggle = async () => {
    if (!post) return

    try {
      // Use updateDoc instead of setDoc to preserve existing fields like created_at
      await updateDoc(doc(db, 'posts', post.id), {
        isPublished: !post.data.isPublished,
      })

      // Optional: Notify Zapier if publishing
      if (!post.data.isPublished) {
        await fetch('https://hooks.zapier.com/hooks/catch/14238222/3t7o2n2/', {
          method: 'POST',
          body: JSON.stringify({
            ...post.data,
            isPublished: true,
          }),
        })
      }

      alert(`Blog ${!post.data.isPublished ? 'Published' : 'Unpublished'} Successfully`)
      router.push('/blogs/dashboard')
    } catch (err) {
      console.error(err)
      alert('Failed to update publish status')
    }
  }

  if (postLoading) {
    return <Loader text="Loading blog preview..." full />;
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-white mb-4">Blog not found</div>
          <button 
            onClick={() => router.push('/blogs/dashboard')}
            className="bg-gradient-to-r from-[#5063C6] to-[#B71CD2] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Publish/Unpublish Button - Fixed Position - Only for authorized users */}
      {user && (user.email === 'hitesh@trupulse.ai' || user.email === 'dirk@trupulse.ai') && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            type="button"
            onClick={handlePublishToggle}
            className={`font-semibold px-8 py-4 cursor-pointer rounded-xl shadow-2xl backdrop-blur-sm transition-all duration-300 border ${
              post?.data?.isPublished 
                ? 'bg-red-600/90 hover:bg-red-700 text-white border-red-500' 
                : 'bg-gradient-to-r from-green-600 to-green-700 hover:opacity-90 text-white border-green-500'
            }`}
          >
            {post?.data?.isPublished ? 'Unpublish' : 'Publish'}
          </button>
        </div>
      )}

      {/* Blog Design using same components as blog page */}
      <BlogHero post={post} />
      <div className='py-10'>
        <BlogContent post={post} />
      </div>
    </div>
  )
}
