<template>
  <header class="dashboard-header">
    <div class="inner">
      <h1 class="dashboard-header__left">
        <router-link to="/">JJlog</router-link>
      </h1>
      <div class="dashboard-header__right">
        <div class="user-info">
          <i class="pi pi-user"></i>
          <span>{{ userName }}님</span>
        </div>
        <button @click="handleLogout" class="btn-logout">
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
    computed: {
      userName() {
        return this.userStore.user?.nickname || this.userStore.user?.name || '사용자';
      }
    },
    methods: {
      handleLogout() {
        if (confirm('로그아웃 하시겠습니까?')) {
          this.userStore.logout();
          this.$router.push('/');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/header/dshHeader' as *;
</style>