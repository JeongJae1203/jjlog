<template>
  <div class="BoardDetail">
    <div class="inner">
      <div class="BoardDetail__header">
        <h2>{{ board.board_title }}</h2>
        <div class="BoardDetail__header-info">
          <strong>{{ board.name }}</strong>
          <span>{{ formattedDate }}</span>
        </div>
        <div class="BoardDetail__header-category">
          <span>{{ board.board_category }}</span>
        </div>
      </div>
      <div class="BoardDetail__content">
        <!-- Toast UI Viewer로 마크다운 렌더링 -->
        <div ref="viewer"></div>
      </div>
      <div class="BoardDetail__footer">
        <button @click="goList" class="btn-list">목록으로</button>
        <div v-if="isAuthor" class="btn-group">
          <button @click="editPost" class="btn-edit">수정</button>
          <button @click="deletePost" class="btn-delete">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
  import '@toast-ui/editor/dist/toastui-editor-viewer.css';
  import { useUserStore } from '@/stores/userStore';

  export default {
    data() {
      return {
        board: {},
        boardId: this.$route.params.boardId,
        viewer: null
      }
    },
    setup() {
      const userStore = useUserStore();
      return { userStore };
    },
    computed: {
      formattedDate() {
        if (!this.board.created_at) return '';
        const date = new Date(this.board.created_at);
        return date.toLocaleDateString('ko-KR') + ' ' + date.toLocaleTimeString('ko-KR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
      },
      isAuthor() {
        // 현재 로그인한 사용자가 게시글 작성자인지 확인
        return this.userStore.isLoggedIn && 
              this.userStore.user?.id === this.board.user_id;
      }
    },
    methods: {
      async getBoardDetail(boardId) {
        try {
          const response = await axios.get(`http://jarryjeong.pe.kr/board/${boardId}`);
          this.board = response.data.data;
          
          // 데이터를 받아온 후 Viewer 초기화
          this.$nextTick(() => {
            this.initViewer();
          });
        } catch (error) {
          console.error('게시글 로딩 실패:', error);
          alert('게시글을 불러오는데 실패했습니다.');
          this.$router.push('/');
        }
      },
      initViewer() {
        if (this.viewer) {
          this.viewer.destroy();
        }
        
        // Toast UI Viewer 초기화
        this.viewer = new Viewer({
          el: this.$refs.viewer,
          initialValue: this.board.board_content || '내용이 없습니다.'
        });
      },
      goList() {
        this.$router.push('/');
      },
    },
    mounted() {
      this.getBoardDetail(this.boardId);
    },
    beforeUnmount() {
      // 컴포넌트 제거 시 Viewer도 제거
      if (this.viewer) {
        this.viewer.destroy();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/board/boardDetail' as *;
</style>