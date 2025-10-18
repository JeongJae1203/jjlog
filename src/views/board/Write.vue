<template>
  <div class="inner">
    <h2 class="write__title">{{ pageTitle }}</h2>
    <div class="write__container">
      <form>
        <div class="write__wrap">
          <div class="write__item">
            <label for="title">제목</label>
            <input type="text" name="title" id="title" v-model="board_title" ref="title">
          </div>
          <div class="write__item">
            <label for="writer">작성자</label>
            <input 
              type="text" 
              name="writer" 
              id="writer" 
              :value="writerName"
              readonly
            />
          </div>
          <div class="write__item">
            <label for="category">카테고리</label>
            <select name="category" id="category" ref="category">
              <option value="develop">개발</option>
              <option value="design">디자인</option>
              <option value="etc">기타</option>
            </select>
          </div>
          <div class="write__item align-start">
            <label for="editor">내용</label>
            <div class="write__item-editor" ref="editor"></div>
          </div>
          <div class="write__item">
            <label for="createdAt">등록일자</label>
            <input 
              type="date" 
              name="createdAt" 
              id="createdAt" 
              readonly 
              :value="createdAt" 
            />
          </div>
        </div>
        <div class="btn__container">
          <button type="button" class="btn__list">목록</button>
          <button type="submit" class="btn__save" @click.prevent="submitPostHandler">등록</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { Editor } from '@toast-ui/editor';
  import '@toast-ui/editor/dist/toastui-editor.css';
  import axios from 'axios';

  export default {
    name: 'Write',
    props: {
      boardId: {
        type: [String, Number],
        default: null
      }
    },
    data() {
      return {
        editor: null,
        name: JSON.parse(localStorage.getItem('user')).nickname,
        board_category: '',
        board_title: '',
        board_content: '',
        createdAt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        email: JSON.parse(localStorage.getItem('user')).email,
        imageList: null,
        isEdit: false,
        originalBoard: null
      }
    },
    computed : {
      writerName() {
        const nickname = JSON.parse(localStorage.getItem('user')).nickname
            , name = JSON.parse(localStorage.getItem('user')).name;

        return name ? name : nickname;
      },
      pageTitle() {
        return this.isEdit ? '글 수정' : '글쓰기';
      }
    },
    mounted() {
      // this 컨텍스트를 변수에 저장
      const self = this;
      
      // route params에서 boardId 가져오기
      const boardId = this.boardId || this.$route.params.boardId;
      
      // 에디터 초기화
      this.editor = new Editor({
        el: this.$refs.editor,
        height: '500px',
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        hooks: {
          addImageBlobHook: (blob, callback) => {
            self.uploadImage(blob, callback);
          }
        },
        events : {
          load: () => {
            if (boardId) {
              this.isEdit = true;
              this.loadBoardData(boardId);
            }
          }
        }
      });
    },
    methods : {
      async loadBoardData(boardId) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/board/${boardId}`);
          this.originalBoard = await response.data.data;

          // 폼 데이터 채우기
          this.board_title = this.originalBoard.board_title;
          this.board_category = this.originalBoard.board_category;
          this.createdAt = this.originalBoard.created_at ? 
            new Date(this.originalBoard.created_at).toISOString().split('T')[0] : 
            this.createdAt;
          
          // 에디터에 기존 내용 설정 (에디터가 완전히 준비된 후)
          // ✨ 4. 에디터가 준비된 것이 보장되므로, 바로 setMarkdown을 호출합니다.
          if (this.originalBoard.board_content) {
            this.editor.setMarkdown(this.originalBoard.board_content);
          }
        } catch (error) {
          console.error('게시글 로딩 실패:', error);
          alert('게시글을 불러오는데 실패했습니다.');
          this.$router.push('/');
        }
      },
      async submitPostHandler() {
        // 입력된 값 받기
        const board_content = this.editor.getMarkdown()
            , board_category = this.$refs.category.value
            , email = this.email
            , board_title = this.board_title
            , createdAt = this.createdAt
            , imageList = this.imageList;

        if (!this.board_title.trim()) {
          alert('제목을 입력해주세요.');
          this.$refs.title.focus();

          return;
        }

        if (!board_content.trim()) {
          alert('내용을 입력해주세요.');
          this.$refs.editor.focus();

          return;
        }

        const data = {
          board_title,
          board_content,
          board_category,
          createdAt,
          email,
          imageList
        };

        try {
          console.log(this.isEdit);
          let response;
          const boardId = this.boardId || this.$route.params.boardId;
          
          if (this.isEdit) {
            // 수정 모드
            alert('현재 해당 기능은 개발 중이므로 사용할 수 없습니다.');
            return;
            // response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/board/update/${boardId}`, data);
            // alert('게시글 수정 완료');
          } else {
            // 등록 모드
            response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/board/create`, data);
            alert('게시글 등록 완료');
          }

          this.$router.push('/');
        } catch (error) {
          // 실패했을 경우, 에러 메시지 띄우고, 다시 작성 페이지 이동
          console.error('error : ', error);
          alert(this.isEdit ? '게시글 수정 실패' : '게시글 등록 실패');

          if (this.isEdit) {
            const boardId = this.boardId || this.$route.params.boardId;
            this.$router.push(`/write/${boardId}`);
          } else {
            this.$router.push('/write');
          }
        }
      },
      setEditorContent() {
        // 에디터가 준비될 때까지 대기
        const checkEditor = () => {
          if (this.editor && this.originalBoard && this.originalBoard.board_content) {
            try {
              // 에디터에 내용 설정
              this.editor.setMarkdown(this.originalBoard.board_content);
            } catch (error) {
              console.error('에디터 내용 설정 실패:', error);
              // 재시도
            }
          } else if (this.originalBoard && this.originalBoard.board_content) {
            // 에디터가 아직 준비되지 않았으면 재시도
            setTimeout(checkEditor, 5000);
          }
        };
        
        // 즉시 체크 시작
        checkEditor();
      },
      uploadImage(blob, callback) {
        const formData = new FormData();
        formData.append('image', blob);
        
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/board/uploadImage`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          const imageUrl = response.data.url;
          
          // Toast UI Editor의 callback에 URL 문자열 전달
          callback(imageUrl);          

          // 성공 시, data에 이미지 주소 저장
          if (!this.imageList) {
            this.imageList = null;
          }
          this.imageList = imageUrl;
        })
        .catch(error => {
          console.error('이미지 업로드 에러 : ', error);
          // 에러 발생 시 callback에 빈 문자열 전달
          callback('');
        });
      }
    },
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/write/write' as *;
</style>