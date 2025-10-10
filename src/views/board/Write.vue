<template>
  <div class="inner">
    <h2 class="write__title">글쓰기</h2>
    <div class="write__container">
      <form @submit.prevent="">
        <div class="write__wrap">
          <!-- TODO : 카테고리, 제목, 이미지, 등 input 추가 -->
          <div class="write__item">
            <label for="title">제목</label>
            <input type="text" name="title" id="title" v-model="title" ref="title">
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
          <button type="button" class="btn__save" @click="submitPostHandler">등록</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { Editor } from '@toast-ui/editor';
  import '@toast-ui/editor/dist/toastui-editor.css';

  export default {
    name: 'Write',
    data() {
      return {
        editor: null,
        writer: JSON.parse(localStorage.getItem('user')).nickname,
        category: '',
        title: '',
        content: '',
        createdAt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
      }
    },
    computed : {
      writerName() {
        const nickname = JSON.parse(localStorage.getItem('user')).nickname
            , name = JSON.parse(localStorage.getItem('user')).name;

        return nickname ? nickname : name;
      }
    },
    mounted() {
      // 에디터 초기화
      this.editor = new Editor({
        el: this.$refs.editor,
        height: '500px',
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        hooks: {
          addImageBlobHook: (blob, callback) => {
            const formData = new FormData();
            formData.append('image', blob);

            // TODO : 이미지 upload 하는 로직 추가
            callback(blob);
          }
        }
      });
    },
    methods : {
      submitPostHandler() {
        // 입력된 값 받기
        const content = this.editor.getMarkdown()
            , category = this.$refs.category.value
            , writer = this.writerName
            , title = this.title
            , createdAt = this.createdAt;

        if (!this.title.trim()) {
          alert('제목을 입력해주세요.');
          this.$refs.title.focus();

          return;
        }

        if (!content.trim()) {
          alert('내용을 입력해주세요.');
          this.$refs.editor.focus();

          return;
        }

        // TODO : 해당, 데이터 백엔드 전송 (url 지정해서 추가해주면 될 듯)
        const data = {
          title,
          writer,
          content,
          category,
          createdAt
        };

        console.log('data : ', data);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/write/write' as *;
</style>