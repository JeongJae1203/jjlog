<template>
  <div class="inner">
    <h2 class="write__title">글쓰기</h2>
    <div class="write__container">
      <form>
        <div class="write__wrap">
          <!-- TODO : 카테고리, 제목, 이미지, 등 input 추가 -->
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
    data() {
      return {
        editor: null,
        name: JSON.parse(localStorage.getItem('user')).nickname,
        board_category: '',
        board_title: '',
        board_content: '',
        createdAt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        email: JSON.parse(localStorage.getItem('user')).email,
        imageList: null
      }
    },
    computed : {
      writerName() {
        const nickname = JSON.parse(localStorage.getItem('user')).nickname
            , name = JSON.parse(localStorage.getItem('user')).name;

        return name ? name : nickname;
      }
    },
    mounted() {
      // this 컨텍스트를 변수에 저장
      const self = this;
      
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
        }
      });
    },
    methods : {
      async submitPostHandler() {
        console.log('imageList : ', this.imageList);
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
          // 성공했을 경우, 게시글 등록 완료라는 alert 띄우고, 목록 페이지 이동
          const response = await axios.post('http://jarryjeong.pe.kr/board/create', data);
          alert('게시글 등록 완료');

          this.$router.push('/');
        } catch (error) {
          // 실패했을 경우, 에러 메시지 띄우고, 다시 작성 페이지 이동
          console.log('error : ', error);
          alert('게시글 등록 실패');

          this.$router.push('/write');
        }
      },
      uploadImage(blob, callback) {
        const formData = new FormData();
        formData.append('image', blob);
        
        axios.post('http://jarryjeong.pe.kr/board/uploadImage', formData, {
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
          console.log('이미지 업로드 에러 : ', error);
          // 에러 발생 시 callback에 빈 문자열 전달
          callback('');
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/write/write' as *;
</style>