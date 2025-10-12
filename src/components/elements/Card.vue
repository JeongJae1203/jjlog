<template>
  <div class="card">
    <!-- 등록한 썸네일 -->
    <div class="card__thumbnail">
      <img src="https://picsum.photos/348/150" alt="썸네일">
    </div>
    <div class="card__content">
      <!-- 제목 -->
      <h2 class="card__content-title">{{ board.board_title }}</h2>
      <!-- 설명 (3줄까지) -->
      <p class="card__content-summary">{{ board.board_content }}</p>
      <!-- 등록한 날짜 -->
      <p class="card__content-date">{{ computedDate }}</p>
    </div>
    <!-- 작성자, 조회 수 -->
    <div class="card__content--writer">
      <p class="writer__name">{{ board.name }}</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    props: {
      board: {
        type: Object,
        required: true
      }
    },
    computed: {
      // DB 등록 시간 포맷팅 변경
      computedDate() {
        const createdAt = this.board.created_at;
        const date = new Date(createdAt);

        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/elements/card' as *;
</style>