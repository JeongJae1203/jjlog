<template>
  <header id="header">
    <div class="inner">
      <div class="header__logo">
        <router-link to="/" class="header__logo-link">JJlog</router-link>
      </div>
      <div class="header__util">
        <div class="header__util-profile" ref="profile" @click="dashboardHandler">
          <p class="header__util-profile-name">
            <i class="pi pi-user"></i>
            <span ref="profileName"></span> 
            님 환영합니다!
          </p>
        </div>
        <button 
          type="button"
          class="btn__search"
          @click="searchHandler"
        ><i class="pi pi-search"></i></button>
        <button
          type="button" 
          class="btn__login"
          ref="loginBtn"
          @click="loginHandler"
        >
          <i class="pi pi-key"></i>
        </button>
        <button
          type="button"
          class="btn__logout"
          ref="logoutBtn"
          @click="logoutHandler"
        >
          <i class="pi pi-sign-out"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
  import { useUserStore } from '@/stores/userStore';

  export default {
    setup() {
      const userStore = useUserStore();
      return { userStore };
    },
    computed : {
      isLoggedIn() {
        return this.userStore.isLoggedIn;
      },
      userName() {
        return this.userStore.user?.nickname || this.userStore.userName;
      }
    },
    methods : {
      searchHandler() {
        console.log('검색 버튼 클릭');
      },
      dashboardHandler() {
        this.$router.push('/dashboard');
      },
      loginHandler() {
        // 로그인 정보가 없으면 로그인 페이지로 이동
        if (!this.isLoggedIn) {
          this.$router.push('/login');
        } else {
          // 로그인 되어있으면 대시보드로 이동
          this.$router.push('/dashboard');
        }
      },
      logoutHandler() {
        // userStore의 logout 액션 사용
        if (confirm('로그아웃 하시겠습니까?')) {
          this.userStore.logout();
          this.$router.push('/');
        }
      }
    },
    watch : {
      isLoggedIn: {
        handler(newVal) {
          this.$nextTick(() => {
            if (newVal) {
              this.$refs.loginBtn.style.display = 'none';
              this.$refs.logoutBtn.style.display = 'block';
              this.$refs.profile.classList.add('login');
              this.$refs.profileName.textContent = this.userName;
            } else {
              this.$refs.loginBtn.style.display = 'block';
              this.$refs.logoutBtn.style.display = 'none';
              this.$refs.profile.classList.remove('login');
            }
          });
        },
        immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/header/header' as *;
</style>