'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getImageUrl } from '@/lib/utils'

interface GeneratedImagesProps {
  images: Record<string, string> | null | undefined
}

export const GeneratedImages = ({ images }: GeneratedImagesProps) => {
  console.log('GeneratedImages rendered:', { imageCount: images ? Object.keys(images).length : 0 })

  if (!images || Object.keys(images).length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>생성된 이미지</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(images).map(([keyword, imageUrl]) => {
            const fullImageUrl = getImageUrl(imageUrl)
            console.log('Processing image:', { keyword, originalUrl: imageUrl, fullUrl: fullImageUrl })
            
            return (
              <div key={keyword} className="space-y-2">
                <div className="relative aspect-square overflow-hidden rounded-lg border">
                  <Image
                    src={fullImageUrl}
                    alt={`${keyword} 관련 이미지`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <p className="text-sm text-center text-muted-foreground">{keyword}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 