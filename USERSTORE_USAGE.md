# UserStore 전역 관리 가이드

## 📌 개요
Pinia를 사용하여 사용자 인증 상태를 전역적으로 관리합니다.

## 🚀 설정 완료 사항

### 1. Pinia 설정 (main.js)
```javascript
import { createPinia } from 'pinia'

const pinia = createPinia()
app.use(pinia)
```

### 2. UserStore 구조 (src/stores/userStore.js)
- **State**: token, user
- **Getters**: isLoggedIn, userName, userEmail
- **Actions**: login, logout, initializeAuth

## 💡 사용 방법

### 컴포넌트에서 사용하기

#### Options API 방식
```vue
<template>
  <div>
    <p v-if="isLoggedIn">{{ userName }}님 환영합니다!</p>
    <button @click="handleLogout">로그아웃</button>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  computed: {
    isLoggedIn() {
      return this.userStore.isLoggedIn;
    },
    userName() {
      return this.userStore.userName;
    }
  },
  methods: {
    handleLogout() {
      this.userStore.logout();
      this.$router.push('/');
    }
  }
}
</script>
```

#### Composition API 방식
```vue
<template>
  <div>
    <p v-if="userStore.isLoggedIn">{{ userStore.userName }}님 환영합니다!</p>
    <button @click="handleLogout">로그아웃</button>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const handleLogout = () => {
  userStore.logout();
  router.push('/');
};
</script>
```

### 로그인 처리
```javascript
// Login.vue에서
async submitHandler() {
  const result = await this.userStore.login(this.email, this.password);
  
  if (result.success) {
    this.$router.push('/dashboard');
  } else {
    alert(result.error);
  }
}
```

### 라우터 가드에서 사용
```javascript
// routes/index.js
import { useUserStore } from '@/stores/userStore';

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});
```

## 📊 UserStore API

### State
- `token`: JWT 토큰 (string)
- `user`: 사용자 정보 객체 (object | null)

### Getters
- `isLoggedIn`: 로그인 여부 (boolean)
- `userName`: 사용자 이름 (string)
- `userEmail`: 사용자 이메일 (string)

### Actions
- `login(email, password)`: 로그인 처리
  - 반환값: `{ success: boolean, data?: object, error?: string }`
- `logout()`: 로그아웃 처리
- `initializeAuth()`: localStorage에서 인증 정보 복원

## 🔐 인증 흐름

1. **로그인**
   ```
   사용자 입력 → userStore.login() → 서버 요청 → 
   성공 시: state 업데이트 + localStorage 저장 → 대시보드 이동
   ```

2. **페이지 새로고침**
   ```
   앱 시작 → userStore state 초기화 (localStorage에서 자동 복원) →
   라우터 가드 확인 → 적절한 페이지로 이동
   ```

3. **로그아웃**
   ```
   userStore.logout() → state 초기화 + localStorage 삭제 → 홈으로 이동
   ```

## 🎯 주요 장점

1. **중앙 집중식 관리**: 모든 컴포넌트에서 동일한 사용자 상태 공유
2. **반응성**: 상태 변경 시 모든 컴포넌트 자동 업데이트
3. **타입 안정성**: TypeScript 지원 (필요 시)
4. **디버깅 용이**: Vue DevTools에서 상태 추적 가능
5. **코드 간결화**: localStorage 직접 조작 불필요

## 📝 예시 시나리오

### 시나리오 1: 헤더에서 로그인 상태 표시
```vue
<template>
  <header>
    <div v-if="userStore.isLoggedIn">
      {{ userStore.userName }}님
      <button @click="userStore.logout()">로그아웃</button>
    </div>
    <div v-else>
      <router-link to="/login">로그인</router-link>
    </div>
  </header>
</template>
```

### 시나리오 2: 조건부 렌더링
```vue
<template>
  <div>
    <button v-if="!userStore.isLoggedIn" @click="goLogin">
      로그인이 필요합니다
    </button>
    <div v-else>
      <!-- 로그인된 사용자만 볼 수 있는 콘텐츠 -->
    </div>
  </div>
</template>
```

### 시나리오 3: API 요청에 토큰 포함
```javascript
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

axios.get('/api/data', {
  headers: {
    Authorization: `Bearer ${userStore.token}`
  }
});
```

## 🔧 확장 가능성

필요에 따라 userStore에 추가할 수 있는 기능들:
- `updateProfile()`: 프로필 업데이트
- `changePassword()`: 비밀번호 변경
- `refreshToken()`: 토큰 갱신
- `checkAuth()`: 서버에 인증 상태 확인

## ⚠️ 주의사항

1. **보안**: 민감한 정보는 localStorage에 저장하지 않기
2. **토큰 만료**: JWT 토큰 만료 시간 체크 로직 추가 권장
3. **에러 처리**: API 요청 실패 시 적절한 에러 처리 필요