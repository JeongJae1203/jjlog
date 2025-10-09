<template>
  <div class="inner">
    <h2 class="write__title">글쓰기</h2>
    <div class="write__container">
      <form @submit.prevent="">
        <div class="write__wrap">
          <!-- TODO : 카테고리, 제목, 이미지, 등 input 추가 -->
          <div class="write__item">
            <label for=""></label>
          </div>
          <div class="write__item">
            <label for="editor">내용</label>
            <div class="write__item-editor" ref="editor"></div>
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
        editor: null
      }
    },
    mounted() {
      // 에디터 초기화
      this.editor = new Editor({
        el: this.$refs.editor,
        height: '500px',
        initialEditType: 'markdown',
        previewStyle: 'vertical'
      });
    },
    methods : {
      submitPostHandler() {
        console.log(' ==== 등록 시작 ==== ');

        console.log('this.$refs.editor : ', this.editor);
        // 입력된 값 받기
        const markdown = this.editor.getMarkdown();
        console.log('markdown : ', markdown);

        console.log(' ==== 등록 종료 ==== ');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/write/write' as *;
</style>