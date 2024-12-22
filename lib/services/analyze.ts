import type { AnalysisResponse, ContentRequest } from '@/lib/types/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const analyzeContent = async (
  file?: File,
  url?: string,
  text?: string
): Promise<AnalysisResponse> => {
  console.group('Content Analysis Service')
  console.log('Analysis Request:', { 
    fileInfo: file ? { name: file.name, size: file.size, type: file.type } : null,
    url,
    text 
  })
  
  try {
    if (file) {
      console.log('Starting PDF file analysis...')
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch(`${API_URL}/api/v1/content/analyze/file`, {
        method: 'POST',
        body: formData,
        mode: 'cors',  // CORS 모드 명시적 설정
      })

      if (!response.ok) {
        console.error('File analysis failed:', response.status, response.statusText)
        throw new Error(`File analysis failed: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('File analysis completed successfully:', {
        analysisKeys: Object.keys(result.analysis),
        blogContentLength: result.blog_content.length
      })
      console.groupEnd()
      return result
    } else {
      console.log('Starting content/URL analysis...')
      const contentRequest: ContentRequest = {
        url: url || null,
        text: text || null,
      }

      const response = await fetch(`${API_URL}/api/v1/content/analyze/content`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentRequest),
      })

      if (!response.ok) {
        console.error('Content analysis failed:', response.status, response.statusText)
        throw new Error(`Content analysis failed: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('Content analysis completed successfully')
      console.groupEnd()
      return result
    }
  } catch (error) {
    console.error('Analysis service error:', error)
    console.groupEnd()
    throw error
  }
} 