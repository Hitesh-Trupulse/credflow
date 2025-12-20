'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth, db, storage } from '@/firebase'
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

// Dynamic import with no SSR to avoid React Quill issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">Loading editor...</div>,
})

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ font: [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block', 'link'],
    ['image'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['clean'],
  ],
}

export default function CreateBlogPage() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [altTag, setAltTag] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [customURL, setCustomURL] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)
  const [percent, setPercent] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [publishDate, setPublishDate] = useState("")

  // Image cropping states
  const [imgSrc, setImgSrc] = useState('')
  const [crop, setCrop] = useState()
  const [completedCrop, setCompletedCrop] = useState()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState(16 / 9)
  const imgRef = useRef(null)
  const previewCanvasRef = useRef(null)

  useEffect(() => {
    if (!loading && !user) router.push('/resources/login')
  }, [loading, user])

  useEffect(() => {
    setMounted(true)
    // Load CSS on client side
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css'
    document.head.appendChild(link)
  }, [])

  // Image cropping utility functions
  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 90,
          },
          aspect,
          width,
          height
        ),
        width,
        height
      ))
    }
  }

  function getCroppedImg(image, crop, fileName) {
    if (typeof window === 'undefined') {
      throw new Error('This function must run on the client side')
    }
    
    if (!image || !crop) {
      throw new Error('Image or crop is missing')
    }
    
    // Ensure we have a valid image element
    if (!(image instanceof HTMLImageElement)) {
      throw new Error('Invalid image element')
    }
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('No 2d context')
    }

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const pixelRatio = window.devicePixelRatio || 1

    canvas.width = Math.floor(crop.width * pixelRatio * scaleX)
    canvas.height = Math.floor(crop.height * pixelRatio * scaleY)

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    )

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'))
            return
          }
          blob.name = fileName
          resolve(blob)
        },
        'image/jpeg',
        1
      )
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (400KB = 400 * 1024 bytes)
      const maxSize = 400 * 1024 // 400KB in bytes
      if (file.size > maxSize) {
        alert('Image size must be less than 400KB. Please choose a smaller image.')
        e.target.value = '' // Clear the input
        return
      }

      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '')
      })
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = async () => {
    if (!completedCrop || !imgRef.current) return
    
    // Ensure we're on the client side
    if (typeof window === 'undefined') {
      alert('Image cropping is only available on the client side')
      return
    }

    try {
      // Ensure the image is fully loaded
      if (!imgRef.current.complete || imgRef.current.naturalWidth === 0) {
        alert('Please wait for the image to load completely')
        return
      }
      
      const croppedImageBlob = await getCroppedImg(
        imgRef.current,
        completedCrop,
        'cropped-image.jpg'
      )
      
      setFile(croppedImageBlob)
      setCoverImage(URL.createObjectURL(croppedImageBlob))
    } catch (error) {
      console.error('Error cropping image:', error)
      alert(`Error cropping image: ${error.message}. Please try again.`)
    }
  }

  const handleUpload = async () => {
    if (!file) return alert('Please crop and process the image first!')

    const storageRef = ref(storage, `/${Date.now()}-${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setPercent(progress)
      },
      (error) => console.error(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        setCoverImage(downloadURL)
        alert('Image uploaded successfully!')
      }
    )
  }

  const handleSubmit = async () => {
    if (!title || !content) {
      alert('Please fill all required fields')
      return
    }

    try {
      const manualCreatedAt = publishDate ? new Date(publishDate) : null
      if (manualCreatedAt && Number.isNaN(manualCreatedAt.getTime())) {
        alert('Please provide a valid date.')
        return
      }
      await addDoc(collection(db, 'posts'), {
        title,
        cover_image: coverImage,
        content,
        altTag,
        metaTitle,
        metaDes: metaDescription,
        customURL: customURL.includes('-')
          ? customURL
          : customURL.toLowerCase().replace(/[^a-zA-Z ]/g, '').split(' ').join('-'),
        created_at: manualCreatedAt ?? serverTimestamp(),
        last_edit: serverTimestamp(),
        isPublished: false,
      })

      alert('Blog created successfully!')
      router.push('/resources/dashboard')
    } catch (err) {
      console.error(err)
      alert('Something went wrong while creating the blog.')
    }
  }
  console.log("content:",content)

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-4">Create New Blog</div>
          <div className="text-gray-400">Loading editor...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 xl:pt-40 bg-black px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-5 mb-8">
          <button 
            onClick={() => router.push('/resources/dashboard')}
            className="text-2xl text-white hover:text-[#5063C6] transition-colors cursor-pointer"
          >
            ←
          </button>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">Create New Blog</h2>
        </div>
        <div className="space-y-6 bg-black/50 backdrop-blur-sm border border-[#454545] rounded-xl p-6 md:p-8">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800/50 border border-[#454545] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5063C6] focus:border-transparent placeholder-gray-500"
              placeholder="Enter blog title"
            />
          </div>

        {/* Image Upload and Crop */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Cover Image (optional, 16:9 aspect ratio, max 400KB)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-300 cursor-pointer bg-gray-800/50 border border-[#454545] p-3 rounded-lg mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-[#5063C6] file:to-[#B71CD2] file:text-white hover:file:opacity-90 file:cursor-pointer"
          />
          
          {imgSrc && mounted && (
            <div className="space-y-4">
              <div className="max-w-2xl">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspect}
                  minWidth={160}
                  minHeight={90}
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc}
                    style={{ maxHeight: '400px', maxWidth: '100%' }}
                    onLoad={onImageLoad}
                    crossOrigin="anonymous"
                  />
                </ReactCrop>
              </div>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCropComplete}
                  className="px-4 py-2 bg-green-600/80 text-white rounded-lg hover:bg-green-700 transition-colors border border-green-500/50"
                >
                  Crop Image
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setImgSrc('')
                    setCrop(undefined)
                    setCompletedCrop(undefined)
                    setFile(null)
                    setCoverImage('')
                  }}
                  className="px-4 py-2 bg-gray-700/80 text-white rounded-lg hover:bg-gray-600 transition-colors border border-gray-500/50"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
          
          {coverImage && (
            <div className="mt-4">
              <p className="text-sm text-green-400 mb-2">✓ Image cropped successfully!</p>
              <div className="max-w-md">
                <img
                  src={coverImage}
                  alt="Cropped preview"
                  className="w-full h-auto rounded-lg border border-[#454545]"
                />
              </div>
              <button
                type="button"
                onClick={handleUpload}
                className="mt-2 px-4 py-2 bg-[#5063C6]/80 text-white rounded-lg hover:bg-[#5063C6] transition-colors border border-[#5063C6]/50"
                disabled={percent > 0}
              >
                {percent > 0 ? `Uploading... ${percent}%` : 'Upload to Storage'}
              </button>
            </div>
          )}
        </div>

        {/* Alt tag */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Alt Tag</label>
          <input
            type="text"
            value={altTag}
            onChange={(e) => setAltTag(e.target.value)}
            className="w-full bg-gray-800/50 border border-[#454545] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5063C6] placeholder-gray-500"
            placeholder="Image alt text"
          />
        </div>

        {/* Meta title */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Meta Title</label>
          <input
            type="text"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className="w-full bg-gray-800/50 border border-[#454545] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5063C6] placeholder-gray-500"
            placeholder="Meta title for SEO"
          />
        </div>

        {/* Meta description */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Meta Description</label>
          <input
            type="text"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="w-full bg-gray-800/50 border border-[#454545] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5063C6] placeholder-gray-500"
            placeholder="Meta description for SEO"
          />
        </div>

        {/* Custom URL */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Custom URL</label>
          <input
            type="text"
            value={customURL}
            onChange={(e) => setCustomURL(e.target.value)}
            className="w-full bg-gray-800/50 border border-[#454545] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5063C6] placeholder-gray-500"
            placeholder="Custom slug for the URL"
          />
        </div>

        {/* Display/Publish date */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Display Date (optional)
          </label>
          <input
            type="datetime-local"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            className="w-full bg-gray-800/50 border border-[#454545] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5063C6] placeholder-gray-500"
          />
          <p className="mt-1 text-xs text-gray-400">
            Leave blank to auto-use the creation timestamp shown on the blog.
          </p>
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Content *</label>
          <div className="bg-gray-900/80 border border-[#454545] rounded-lg overflow-hidden quill-editor-wrapper">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              placeholder="Write your blog here..."
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 px-8 py-3 cursor-pointer bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold shadow-lg"
        >
          Create Blog
        </button>
        </div>
      </div>
    </div>
  )
}
