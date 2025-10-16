# 프로젝트
## 프로젝트명
* **JJlog**
  - Vue.js 기반의 간단한 커뮤니티 웹

## 상태 관리
* **Pinia**
  - 사용자 인증 상태를 전역적 관리


## Editor
* **Toast UI Editor (Vue 3)**
  - `npm i @toast-ui/editor`
  - 사용 이유
    - NHN에서 만든 Editor (지속적으로 유지보수 진행)
    - Markdown & Preview 지원


## Test 계정
1. test@test.com / 1111


## 에러
* 수정 버튼 클릭 시, Toast UI Editor `Uncaught (in promise) RangeError: Applying a mismatched transaction` 에러 발생
  - Toast UI Editor에서 setMarkdown을 호출할 때 발생하는 문제임을 확인
  - 에디터가 초기화되기 전 내용을 설정하려고 할 때 발생
  - [해결 방법]
    - 에디터가 완전히 로딩이 된 후 내용 설정 (초기화 순서 변경)