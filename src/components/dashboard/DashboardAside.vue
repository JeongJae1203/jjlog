<template>
  <section class="section">
    <article class="aside__toggle">
      <button type="button" @click="toggleHandler">
        <i class="pi pi-bars"></i>
      </button>
    </article>
    <article class="aside__menu">
      <ul>
        <li>
          <router-link to="/my">
            <i class="pi pi-home"></i>
            <span>대시보드</span>
          </router-link>
        </li>
        <li>
          <router-link to="/my/profile">
            <i class="pi pi-user"></i>
            <span>프로필</span>
          </router-link>
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
  export default {
    emits : ['open'],
    methods : {
      toggleHandler() {
        this.$emit('open');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use 'sass:map';
  @use '@/assets/scss/common/color' as *;
  @use '@/assets/scss/dashboard/aside' as *;
  
  .aside__toggle {
    padding: 2rem 0;
    background-color: #5B86E5;

    button {
      color: #fff;
    }
  }
</style>