<template>
  <section class="login">
    <div class="login__container">
      <div class="login__logo">
        <router-link to="/" title="메인으로">
          <img src="@/assets/images/jjlog_logo.png" alt="logo">
        </router-link>
      </div>
      <div class="login__content">
        <h2 class="login__title">회원가입</h2>
        <!-- TODO : form -->
        <form @submit.prevent="submitHandler">
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
          <div class="input__wrap">
            <label for="nickname">별명</label>
            <input 
              type="text" 
              name="nickname" 
              id="nickname"
              placeholder="별명"
              autocomplete="off"
              required
              v-model="nickname"
            />
          </div>
          <div class="btn__container">
            <button type="submit">회원가입</button>
          </div>
          <div class="find">
            <div class="find__item">
              <span>✅ 회원이시라면 ?</span>
              <router-link to="/login">로그인</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        email: '',
        password: '',
        nickname: ''
      }
    },
    methods : {
      // 회원가입 클릭 시, 메인으로 이동
      async submitHandler() {
        const email = this.email
            , password = this.password
            , nickname = this.nickname;

        try {
          const response = await axios.post('http://jarryjeong.pe.kr/auth/regist', {
            email,
            password,
            nickname
          });

          // 성공했을 경우, input 초기화 및 main으로 이동
          if (response.status === 200) {
            this.email = '';
            this.password = '';
            this.nickname = '';
            this.$router.push('/');
          }
        } catch (error) {
          console.error('error : ', error);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/login/login' as *;
</style>