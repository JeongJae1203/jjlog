<template>
  <section class="Profile">
    <Title :title="'프로필'" :iconName="'user'" />
    <article>
      <p>여기는 이제 프로필 나오는 영역</p>
    </article>
  </section>
</template>

<script>
  import Title from '@/components/dashboard/common/Title.vue';

  export default {
    components: {
      Title
    }
  }
</script>

<style lang="scss" scoped>

</style>