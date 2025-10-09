<template>
  <Header />
  <main id="main">
    <div id="contents_body">
      <router-view />
    </div>
  </main>
  <Footer />
</template>

<script>
  import Header from './header/Header.vue';
  import Footer from './footer/Footer.vue';

  export default {
    components : {
      Header,
      Footer
    }
  }
</script>

<style lang="scss" scoped>
  #main {
    background-color: #f7f8f9;
  }

  #contents_body {
    padding: 0 0 3rem;
  }

  @media all and (min-width: 768px) {
    #contents_body {
      padding: 0 0 5rem;
    }
  }

  @media all and (min-width: 1024px) {
    #contents_body {
      padding: 0 0 10rem;
    }
  }
</style>