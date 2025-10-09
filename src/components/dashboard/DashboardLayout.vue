<template>
  <div id="dashboard" class="dashboard">
    <aside class="aside">

    </aside>
    <div class="content">
      <Header />
      <main id="main">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/dashboard/header/Header.vue';

  export default {
    components : {
      Header
    }
  }
</script>

<style lang="scss" scoped>

</style>