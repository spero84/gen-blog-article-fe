# GBA (Gen Blog Article) PRD

본 문서는 **GBA(Gen Blog Article)** 프로젝트의 제품 기획 및 개발을 위한 요구사항을 정리한 PRD(제품 요구사항 문서)입니다. 

---

## 1. 프로젝트 개요

### 1.1 프로젝트 명
- **GBA (Gen Blog Article)**

### 1.2 프로젝트 목적
- **효율적인 블로그 자동화**: 새로운 정보(예: PDF, URL 등)가 주어졌을 때 이를 기반으로 블로그 글을 자동 생성  
- **트렌드 및 검색 친화**: 자동으로 추출한 중요 키워드와 태그를 활용하여 검색 엔진 노출을 극대화하고, 독자에게 가독성 높은 콘텐츠를 제공  
- **신속한 업무 프로세스**: 사람이 직접 작성할 때 소요되는 시간을 절감하고, 데이터를 통해 기반 정보만 정확히 전달하는 서비스를 목표로 함

### 1.3 주요 특징
1. **블로그 텍스트 생성**  
   - PDF, URL 등으로부터 텍스트 정보를 추출하고, 파싱된 내용을 바탕으로 블로그 문서를 자동 생성  
2. **키워드 및 태그 자동 추출**  
   - 생성된 문서에서 중요한 키워드와 태그를 추출한 뒤, 블로그 제목과 본문에 7회 이상 노출  
3. **이미지 생성 및 삽입**  
   - 키워드와 연관된 이미지를 자동 생성(AI 이미지 생성 API 활용)하여 본문 중 관련 텍스트가 등장할 때 삽입  
4. **인용구 스타일링**  
   - “인용구” 형식으로 텍스트를 표현  
5. **3단 구성(서론, 본론, 결론) 자동 구성**  
   - 다만, ‘서론’, ‘본론’, ‘결론’이라는 표현 자체는 직접 사용하지 않고 블로그가 자연스럽게 해당 구조를 갖추도록 구현  
6. **사실 기반 작성**  
   - 창의적인 허구가 아닌, 주어진 자료에 대한 사실만을 반영하여 블로그를 생성  
7. **LLM 이중 활용**  
   - ChatGPT와 AWS Bedrock의 Claude 모델을 적절히 혼합 사용하여 높은 정확도와 유연성을 목표로 함

### 1.4 프로젝트 기대 효과
- **콘텐츠 생산성 향상**: 다양한 자료(PDF, URL 등)에 대한 블로그 글 작성을 자동화하여 마케팅, 지식 공유, 회사 공식 블로그 등에서 활용  
- **검색 엔진 최적화(SEO) 기여**: 중요 키워드가 7회 이상 노출되며, 자동 생성 이미지 태그 등도 함께 제공함으로써 검색 엔진 최적화 효과  
- **피드백 루프 자동화**: 생성된 블로그 글의 반응(조회, 좋아요, 댓글 등)을 모델 개선에 반영하여 점진적인 콘텐츠 품질 개선 가능  
- **안정적 인프라 운영**: AWS EKS로 컨테이너 오케스트레이션을 수행하여 스케일링과 가용성 측면에서 안정적으로 서비스 운영 가능

---

## 2. 유저 플로우

1. **사용자 자료 업로드**  
   - PDF 문서 업로드 또는 참고할 URL 입력  
   - 예) 회사 소개서 PDF를 GBA에 업로드하거나, 특정 블로그 글의 URL을 입력  

2. **블로그 생성 옵션 설정**  
   - 글 길이, 이미지 삽입 여부, 키워드 추출 우선순위 등을 지정  
   - 예) 원하는 블로그 분량을 ‘중간’, 키워드 추출을 ‘3개 이상’ 등으로 설정  

3. **자동 텍스트 생성 요청**  
   - 업로드/분석된 자료 기반으로 블로그 문서 초안을 생성  
   - ChatGPT와 AWS Bedrock Claude 모델을 혼합 사용해 Fact 기반 텍스트를 최대한 정확하게 생성  
   - 블로그는 ‘서론’ → ‘본론’ → ‘결론’ 구조이되, 실제 텍스트에서는 해당 단어 노출을 지양  

4. **자동 키워드 및 태그 추출**  
   - 작성된 블로그 글에서 중요 키워드를 자동 추출  
   - 해당 키워드를 블로그 제목과 본문에 7회 이상 반영  

5. **이미지 자동 생성 및 삽입**  
   - 키워드/태그를 기반으로 AI 이미지 생성 API 또는 자체 모델을 활용  
   - 본문 내 적절한 위치에 자동 삽입  

6. **인용구 스타일 적용**  
   - 예) “GBA는 자동화 시대의 핵심 도구입니다.” 와 같은 형태로 글 내 필요한 부분에 삽입  

7. **결과 검토 및 게시**  
   - 작성된 블로그 미리 보기, 편집 후 자동 게시 또는 예약 게시  
   - 예) WordPress, Medium, 사내 블로그 플랫폼 등 연동 가능  

---

## 3. 핵심 기능

### 3.1 콘텐츠 분석 및 텍스트 생성
- **LangChain + LangGraph 기반 텍스트 생성 파이프라인**  
  - PDF 혹은 URL에서 텍스트를 추출한 후, 자연어 처리(NLP)를 통해 자동 요약, 분류, 인사이트 분석을 수행  
  - ChatGPT와 AWS Bedrock Claude 모델을 혼합하여 생성된 텍스트 품질과 정확도 향상  

- **LLM 모델 선택/혼합 옵션**  
  - 상황에 따라 ChatGPT, Claude 모델을 각각 혹은 함께 호출하여 최적의 결과 도출  
  - 예) 사실 검증(Claude) + 글 스타일링(ChatGPT) 순서로 적용  

### 3.2 키워드 및 태그 추출
- **KeyPhrase Extraction 모듈**  
  - 사용 라이브러리 예시: spaCy, NLTK, 또는 Hugging Face의 Transformers  
  - 추출된 키워드를 제목, 본문에 자동으로 균등 분배(최소 7회 삽입)

### 3.3 자동 이미지 생성 및 삽입
- **AI 이미지 생성 API 연동**  
	- AWS Bedrock 이미지 생성 API 활용을 우선적으로 만들어줘.
  - 예) DALL·E API, Stability AI, Midjourney API(서드파티 API 활용)  
  - 키워드/태그를 이용해 이미지 프롬프트를 생성하고, 자동 삽입 위치 계산  
- **이미지 태그 자동 기입(SEO 최적화)**  

### 3.4 인용구 처리
- **쌍따옴표를 활용한 인용구 자동 스타일 적용**  
  - 블로그 생성을 위한 텍스트에서 특정 문구를 감지하여 “ ” 표기  
  - TailWindCSS를 통해 폰트 스타일이나 레이아웃 반영 가능  

### 3.5 반응형 웹 UI 및 자동 게시
- **React + ShadCN + TailWindCSS + Next.js App Router**  
  - 사용자 친화적인 UI/UX 제공  
  - 블로그 생성 과정을 Step by step으로 안내  
- **게시 플랫폼 연동**  
  - 예) WordPress REST API, Medium API, GitHub Pages, 사내 블로그 시스템 등  

---

## 4. 기술 스택

1. **Front-end**
   - **React** (필수)  
   - **ShadCN** (UI 컴포넌트 집합)  
   - **TailWindCSS** (디자인 및 스타일링)  
   - **Next.js App Router** (필수, React 기반의 서버 사이드 렌더링 및 라우팅)

2. **Back-end**
   - **FastAPI with Python** (필수, REST API 구현, Python 라이브러리 호환성 높음)  
   - **LangChain** (필수, LLM과의 워크플로우 구성)  
   - **LangGraph** (필수, NLP 파이프라인 시각화 및 관리)

3. **LLM(대형 언어 모델)**
   - **ChatGPT** (사실 기반 텍스트 생성과 스타일링에 활용)  
   - **AWS Bedrock Claude** (정확한 정보 추출, 사실 검증, 대규모 데이터 처리에 활용)

4. **인프라**
   - **AWS EKS**  
     - Kubernetes 기반 컨테이너 오케스트레이션으로 스케일링과 가용성 극대화  
     - Application Load Balancer와 연동하여 트래픽 분산 및 보안 그룹 관리  
   - **Terraform**  
     - IaC(Infrastructure as Code) 방식으로 EKS 클러스터, 네트워킹, IAM, 보안 정책 등 환경 설정 자동화  
     - 지속적인 배포 및 버전 관리에 유리  

5. **데이터베이스/저장소(선택)**
   - **MongoDB** 또는 **PostgreSQL**  
   - Blob 스토리지(AWS S3 등)  
   - 캐시 서버(Redis 등)

6. **AI/ML 라이브러리(선택)**
   - PyTorch, TensorFlow 또는 Hugging Face Transformers  
   - OCR 및 PDF 텍스트 추출을 위해 PyPDF2, Tesseract 등  

7. **이미지 생성 API(선택)**
   - OpenAI DALL·E API  
   - Stable Diffusion API  
   - Midjourney API  

8. **CI/CD(선택)**
   - GitHub Actions, AWS CodePipeline, AWS CodeBuild 등  
   - Docker 컨테이너 이미지를 빌드 및 EKS로 배포 자동화  

---

## 5. MVP 핵심 기능 및 이후 추가 기능

### 5.1 MVP 핵심 기능

1. **PDF/URL 기반 텍스트 추출 및 블로그 자동 생성**  
   - 최소한 텍스트를 성공적으로 추출하고, 자동 블로그 생성까지 수행  

2. **중요 키워드 추출 및 7회 이상 삽입**  
   - 본문에서 키워드를 파악하고 적절히 배치  

3. **이미지 생성/삽입 연동(1종 이상의 이미지 생성 API 활용)**  
   - 키워드 입력 시 간단한 이미지 생성 및 본문 내 자동 삽입  

4. **인용구 자동 스타일 적용**  
   - “ ” 표기를 통한 인용 강조  

5. **React + ShadCN + TailWindCSS + Next.js App Router + FastAPI + LangChain + LangGraph**  
   - 사용자가 직접 업로드 → 블로그 생성 → 출력 확인 → 게시하는 플로우 구현  

6. **ChatGPT 및 Claude 연동(최소 1회 이상 혼합 사용 테스트)**  
   - 초기 버전에서는 단순 생성(예: ChatGPT) + 간단 검증(예: Claude)만 해도 됨  

7. **AWS EKS & Terraform 기본 구성**  
   - EKS 클러스터와 노드 그룹 자동 프로비저닝  
   - CI/CD 파이프라인을 통해 테스트/배포 자동화  

8. **기본 SEO 메타데이터 구성**  
   - 제목, 메타 키워드, 이미지 태그 추가  

### 5.2 이후 추가 기능 (확장 계획)

1. **멀티 언어 지원**  
   - 영문, 중문 등 다국어 자료를 입력받아 자동 번역 후 블로그 생성  
   - 예) AWS Lambda와 FastAPI를 결합하여 확장성 있는 서버리스 번역 API 연동  

2. **콘텐츠 분석 및 품질 평가**  
   - 작성된 블로그 글의 유사도 검사, 표절 방지 기능 추가  
   - 예) GPT-4 API를 통한 결과물 퀄리티 검증  

3. **커스텀 테마 및 디자인 편집**  
   - 사용자마다 다른 레이아웃, CSS 테마 적용  
   - 예) TailWindCSS 테마 확장 활용  

4. **소셜 미디어 자동 연동**  
   - 생성된 블로그를 Twitter, LinkedIn 등 SNS에 자동 포스팅  

5. **사용자별 커스텀 모델 학습**  
   - 반복적인 블로그 생성 패턴을 통해 스타일이나 어조를 학습  
   - 예) 개인 또는 조직별 모델 파인튜닝  

6. **고급 데이터 파이프라인**  
   - AWS Glue, AWS Lambda 등을 통한 데이터 전처리 파이프라인 확대  
   - 장기적으로 빅데이터 분석 플랫폼(Athena, Redshift 등) 연동  

---

## 6. 마무리

위에서 제시한 PRD는 **GBA(Gen Blog Article)**를 성공적으로 개발하기 위한 종합적 청사진입니다. 특히 **AWS EKS**를 통해 컨테이너 오케스트레이션을 수행함으로써 대규모 트래픽 처리와 안정적인 배포가 가능합니다. 또한 **Terraform**을 활용하여 인프라를 코드로 관리함으로써, 환경 재현성과 배포 자동화를 실현할 수 있습니다.

LLM은 **ChatGPT**와 **AWS Bedrock Claude**를 혼합 적용하여 데이터 분석 능력과 글 생성 능력을 결합함으로써 보다 정확하고 풍부한 콘텐츠를 자동으로 생산할 수 있습니다. MVP 범위를 충실히 구현한 뒤, 이후 다양한 추가 기능과 아키텍처 확장을 통해 서비스 품질과 기능을 더욱 고도화할 수 있을 것입니다.

GBA를 통해 효율적이고 정확한 블로그 콘텐츠 제작을 경험하시길 바라며, 본 문서가 프로젝트 진행 전반에 걸쳐 의미 있는 참고 자료가 되기를 기대합니다.