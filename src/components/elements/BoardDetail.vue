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
          <button @click="deleteBoard" class="btn-delete">삭제</button>
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
        viewer: null,
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
              this.userStore.user?.email === this.board.email;
      }
    },
    methods: {
      async getBoardDetail(boardId) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/board/${boardId}`);
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
      editPost() {
        // 수정 모드
        alert('현재 해당 기능은 개발 중이므로 사용할 수 없습니다.');
        return;
        // 수정 페이지로 이동 (boardId를 파라미터로 전달)
        // this.$router.push(`/write/${this.boardId}`);
      },
      /**
       * 삭제 기능
       * 회원이 작성한 게시글이면 삭제 가능
       */
      async deleteBoard() {
        if (this.isAuthor) {
          if (confirm('삭제하시겠습니까?')) {
            const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/board/remove/${this.boardId}`);

            if (response.data.success) {
              alert('게시글이 성공적으로 삭제되었습니다.');
              this.$router.push('/');
            } else {
              alert('게시글 삭제에 실패했습니다.');
            }
          }
        } else {
          alert('삭제 권한이 없습니다.');
        }
      }
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