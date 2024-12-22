'use client'

import { useState } from 'react'
import { FileUpload } from '@/components/content-analysis/file-upload'
import { URLInput } from '@/components/content-analysis/url-input'
import { ModelSelector } from '@/components/content-analysis/model-selector'
import { AnalysisResult } from '@/components/content-analysis/analysis-result'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { analyzeContent } from '@/lib/services/analyze'
import type { AnalysisResponse } from '@/lib/types/api'

type AnalysisStatus = 'idle' | 'processing' | 'completed' | 'error'

const ContentAnalysisPage = () => {
  console.log('ContentAnalysisPage rendered')
  const [status, setStatus] = useState<AnalysisStatus>('idle')
  const [result, setResult] = useState<AnalysisResponse | null>(null)
  const [selectedModel, setSelectedModel] = useState<'gpt' | 'claude' | 'hybrid'>('hybrid')
  const [currentFile, setCurrentFile] = useState<File | null>(null)
  const [currentUrl, setCurrentUrl] = useState<string>('')

  const handleAnalyze = async () => {
    console.group('Content Analysis Process')
    console.log('Starting analysis with:', {
      file: currentFile?.name,
      url: currentUrl,
      model: selectedModel
    })

    if (!currentFile && !currentUrl) {
      console.warn('No file or URL provided')
      console.groupEnd()
      return
    }

    try {
      setStatus('processing')
      console.log('Analysis status set to processing')
      
      const response = await analyzeContent(currentFile || undefined, currentUrl || undefined)
      console.log('Analysis completed:', {
        analysisKeys: Object.keys(response.analysis),
        blogContentPreview: response.blog_content.substring(0, 100) + '...'
      })
      
      setResult(response)
      setStatus('completed')
      console.log('Analysis status set to completed')
    } catch (error) {
      console.error('Analysis failed:', error)
      setStatus('error')
      console.log('Analysis status set to error')
    }
    console.groupEnd()
  }

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', { name: file.name, size: file.size, type: file.type })
    setCurrentFile(file)
    setCurrentUrl('')
  }

  const handleUrlSubmit = (url: string) => {
    console.log('URL submitted:', url)
    setCurrentUrl(url)
    setCurrentFile(null)
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">콘텐츠 분석 및 텍스트 생성</h1>
      
      <Tabs defaultValue="file" className="w-full">
        <TabsList>
          <TabsTrigger value="file">PDF 업로드</TabsTrigger>
          <TabsTrigger value="url">URL 입력</TabsTrigger>
        </TabsList>
        
        <TabsContent value="file">
          <FileUpload onUpload={handleFileUpload} />
          {currentFile && (
            <p className="mt-2 text-sm text-gray-600">
              선택된 파일: {currentFile.name}
            </p>
          )}
        </TabsContent>
        
        <TabsContent value="url">
          <URLInput onSubmit={handleUrlSubmit} />
          {currentUrl && (
            <p className="mt-2 text-sm text-gray-600">
              입력된 URL: {currentUrl}
            </p>
          )}
        </TabsContent>
      </Tabs>

      <ModelSelector
        value={selectedModel}
        onChange={setSelectedModel}
      />

      <Button 
        onClick={handleAnalyze}
        disabled={status === 'processing' || (!currentFile && !currentUrl)}
        className="w-full"
      >
        {status === 'processing' ? '분석 중...' : '분석 시작'}
      </Button>

      <AnalysisResult 
        status={status} 
        result={result} 
      />
    </div>
  )
}

export default ContentAnalysisPage 