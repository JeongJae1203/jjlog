<template>
  <div class="card">
    <!-- 등록한 썸네일 -->
    <div class="card__thumbnail">
      <img src="https://picsum.photos/348/150" alt="썸네일">
    </div>
    <div class="card__content">
      <!-- 제목 -->
      <!-- 설명 (3줄까지) -->
      <!-- 등록한 날짜 -->
      <!-- 작성자 -->
    </div>
  </div>
</template>

<script>
  // TODO : 해당, 정보들은 Props 로
  export default {

  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/elements/card' as *;
</style>