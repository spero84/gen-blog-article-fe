'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface URLInputProps {
  onSubmit: (url: string) => void
}

export const URLInput = ({ onSubmit }: URLInputProps) => {
  console.log('URLInput component rendered')
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    console.group('URL Submit Handler')
    e.preventDefault()
    
    const trimmedUrl = url.trim()
    console.log('Submitted URL:', trimmedUrl)
    
    if (trimmedUrl) {
      console.log('Valid URL, processing...')
      onSubmit(trimmedUrl)
    } else {
      console.warn('Empty URL submitted')
    }
    console.groupEnd()
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="url"
        placeholder="분석할 웹페이지 URL을 입력하세요"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">확인</Button>
    </form>
  )
} 