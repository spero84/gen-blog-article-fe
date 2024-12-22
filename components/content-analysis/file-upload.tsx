'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onUpload: (file: File) => void
}

export const FileUpload = ({ onUpload }: FileUploadProps) => {
  console.log('FileUpload component rendered')
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    console.group('File Drop Handler')
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    console.log('Dropped file:', file ? {
      name: file.name,
      type: file.type,
      size: file.size
    } : 'No file')
    
    if (file?.type === 'application/pdf') {
      console.log('Valid PDF file, uploading...')
      onUpload(file)
    } else {
      console.warn('Invalid file type:', file?.type)
    }
    console.groupEnd()
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center",
        isDragging ? "border-primary bg-primary/10" : "border-gray-300"
      )}
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2">PDF 파일을 드래그하거나 클릭하여 업로드하세요</p>
      <input
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onUpload(file)
        }}
      />
    </div>
  )
} 