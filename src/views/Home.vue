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
        // 로그인 안 했을 경우, 로그인 하세요 alert 창 띄운 후, 로그인 페이지로 이동
        if (!localStorage.getItem('user')) {
          alert('로그인 후 이용해주세요.');
          this.$router.push('/login');
          return;
        }
        // 로그인 했을 경우, 글쓰기 페이지로 이동
        this.$router.push('/write');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/home/home' as *;
</style>