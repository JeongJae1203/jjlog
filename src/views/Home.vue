<template>
  <div class="inner">
    <div class="home__top">
      <button 
        type="button"
        ref="writeBtn"
        class="btn__write"
        @click="writeHandler"
      >글쓰기</button>
    </div>
    <div class="card__wrap">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  </div>
</template>

<script>
  import Card from '../components/elements/Card.vue';

  export default {
    components : {
      Card
    },
    methods : {
      writeHandler() {
        this.$router.push('/write');
      }
    },
    mounted() {
      if (localStorage.getItem('user')) {
      } else {
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/home/home' as *;
</style>