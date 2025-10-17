<template>
  <section class="login">
    <div class="login__container">
      <div class="login__logo">
        <router-link to="/" title="메인으로">
          <img src="@/assets/images/jjlog_logo_white.png" alt="logo">
        </router-link>
      </div>
      <div class="login__content">
        <h2 class="login__title">다시 오신 것을 환영합니다.</h2>
        <form action="" @submit.prevent="submitHandler">
          <div class="input__wrap">
            <label for="email">이메일</label>
            <input 
              type="email" 
              name="email" 
              id="email"
              placeholder="이메일을 입력하세요."
              autocomplete="off"
              required
              v-model="email"
            />
          </div>
          <div class="input__wrap">
            <label for="password">비밀번호</label>
            <input 
              type="password" 
              name="password" 
              id="password"
              placeholder="비밀번호 최대 13자리까지 입력해주세요."
              autocomplete="off"
              maxlength="13"
              required
              v-model="password"
            />
          </div>
          <div class="btn__container">
            <button type="submit">로그인</button>
          </div>
          <div class="find">
            <div class="find__item">
              <span>✅ 계정이 없으신가요 ?</span>
              <router-link to="/join">회원가입</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
  import { useUserStore } from '@/stores/userStore';

  export default {
    data() {
      return {
        email: '',
        password: '',
      }
    },
    setup() {
      const userStore = useUserStore();
      return { userStore };
    },
    methods : {
      async submitHandler() {
        const email = this.email
            , password = this.password;

        // userStore의 login 액션 사용
        const result = await this.userStore.login(email, password);
        
        if (result.success) {
          // 로그인 성공
          this.$router.push('/dashboard');
        } else {
          // 로그인 실패
          alert(result.error);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/login/login' as *;
</style>