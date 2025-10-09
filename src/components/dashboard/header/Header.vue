<template>
  <header class="dashboard-header">
    <div class="inner">
      <div class="dashboard-header__left">
        <h1>대시보드</h1>
      </div>
      <div class="dashboard-header__right">
        <div class="user-info">
          <i class="pi pi-user"></i>
          <span>{{ userName }}님</span>
        </div>
        <button @click="handleLogout" class="btn-logout">
          <i class="pi pi-sign-out"></i>
          로그아웃
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
.dashboard-header {
  background: #2c3e50;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  .inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__left {
    h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.95rem;

      i {
        font-size: 1.2rem;
      }
    }

    .btn-logout {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background-color 0.3s;

      &:hover {
        background: #c0392b;
      }

      i {
        font-size: 1rem;
      }
    }
  }
}
</style>