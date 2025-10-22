<template>
  <div class="inner">
    <div class="home__top">
      <button 
        type="button"
        ref="writeBtn"
        class="btn__write"
        @click="writeHandler"
      ><i class="pi pi-pencil"></i> 글쓰기</button>
    </div>
    <template v-if="boardList.length > 0">
      <div class="card__wrap">
        <Card 
          v-for="board in boardList" 
          :key="board.board_id" 
          :board="board" 
          @click="detailHandler(board.name, board.board_id)" 
        />
      </div>
    </template>
    <template v-else>
      <div class="no__board">
        <img src="@/assets/images/no_img.png" alt="게시글이 없습니다.">
        <p>게시글이 없습니다.</p>
      </div>
    </template>
  </div>
</template>

<script>
  import Card from '../components/elements/Card.vue';
  import axios from 'axios';

  export default {
    data() {
      return {
        boardList: []
      }
    },
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
      },
      async getBoardList() {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/board/`);
        const data = response.data.data.boards;

        this.boardList = data;
      },
      // 카드 클릭 시, detail 페이지로 이동
      // state로 board_id를 넘겨 detail 페이지에서 state로 상세 조회
      async detailHandler(userName,boardId) {
        this.$router.push(`/@${userName}/${boardId}`, {
          state: {
            boardId: boardId
          },
        });
      }
    },
    mounted() {
      this.getBoardList();
    }
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/home/home' as *;
</style>