import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(path: string): string {
  // 이미 완전한 URL인 경우 API 경로로 변환
  if (path.startsWith(`${API_URL}/output/images/`)) {
    // /output/images/ 부분을 제거하고 파일명만 사용
    const filename = path.split('/output/images/')[1]
    return `/api/v1/content/images/${filename}`
  }
  
  // 이미 API 경로인 경우 그대로 반환
  if (path.startsWith('/api/v1/content/images/')) {
    return path
  }
  
  // 그 외의 경우 파일명만 사용하여 API 경로 생성
  const filename = path.split('/').pop() // 마지막 부분(파일명)만 가져오기
  return `/api/v1/content/images/${filename}`
}
