<template>
  <div id="dashboard" :class="['dashboard', { 'open' : isOpen }]">
    <aside class="dashboard__aside">
      <DashboardAside @open="openHandler" />
    </aside>
    <div class="dashboard__content">
      <Header />
      <main id="main">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/dashboard/header/Header.vue';
  import DashboardAside from './DashboardAside.vue';

  export default {
    components : {
      Header,
      DashboardAside
    },
    data() {
      return {
        isOpen : false
      }
    },
    methods : {
      openHandler() {
        this.isOpen = !this.isOpen;
      },
      resizeHandler() {
        // 768px 이상일 땐, dashboard에 항상 open 클래스 추가
        if (window.innerWidth >= 768) {
          this.isOpen = true;
        } else {
          this.isOpen = false;
        }
      }
    },
    mounted() {
      // 최초 로드 시, 768px 이상일 땐, dashboard에 항상 open 클래스 추가
      // resize 이벤트 리스너 추가
      if (window.innerWidth >= 768) {
        this.isOpen = true;
      } else {
        this.isOpen = false;
      }
      // resize 이벤트 리스너 추가
      window.addEventListener('resize', this.resizeHandler);
    },
    unmounted() {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/dashboard/dashboard' as *;
</style>