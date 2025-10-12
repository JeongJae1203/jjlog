<template>
  {{ board }}
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        board: [],
        boardId: this.$route.params.boardId
      }
    },
    methods: {
      async getBoardDetail(boardId) {
        const response = await axios.get(`http://jarryjeong.pe.kr/board/${boardId}`);
        this.board = response.data.data;
      }
    },
    mounted() {
      this.getBoardDetail(this.boardId);
    }
  }
</script>

<style lang="scss" scoped>

</style>