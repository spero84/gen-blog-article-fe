'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { GeneratedImages } from './generated-images'
import type { AnalysisResponse } from '@/lib/types/api'

interface AnalysisResultProps {
  status: 'idle' | 'processing' | 'completed' | 'error'
  result: AnalysisResponse | null
}

export const AnalysisResult = ({ status, result }: AnalysisResultProps) => {
  console.log('AnalysisResult rendered:', { status, hasImages: result?.images ? 'yes' : 'no' })

  if (status === 'idle') {
    console.log('Analysis is idle')
    return null
  }

  if (status === 'processing') {
    console.log('Analysis is processing')
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">분석 중입니다...</span>
      </div>
    )
  }

  if (status === 'error') {
    console.error('Analysis resulted in error')
    return (
      <Alert variant="destructive">
        <AlertTitle>오류 발생</AlertTitle>
        <AlertDescription>
          콘텐츠 분석 중 오류가 발생했습니다. 다시 시도해주세요.
        </AlertDescription>
      </Alert>
    )
  }

  if (!result) {
    return null
  }

  console.log('Analysis completed, showing results with images')
  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6 space-y-4">
        <h3 className="text-lg font-medium">분석 결과</h3>
        <div className="whitespace-pre-wrap">{result.analysis}</div>
      </div>
      
      <div className="rounded-lg border p-6 space-y-4">
        <h3 className="text-lg font-medium">블로그 콘텐츠</h3>
        <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: result.blog_content }} />
      </div>

      {result.images && <GeneratedImages images={result.images} />}
    </div>
  )
} 