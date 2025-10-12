# Toast UI Editor 사용 가이드

## 📌 개요
Toast UI Editor를 사용하여 마크다운 형식의 게시글을 작성하고, Viewer로 렌더링하는 방법입니다.

## 🚀 설치

```bash
npm install @toast-ui/editor
```

## 📝 사용 방법

### 1. 글 작성 (Write.vue) - Editor 사용

#### 컴포넌트 구조
```vue
<template>
  <div ref="editor"></div>
</template>

<script>
import { Editor } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export default {
  data() {
    return {
      editor: null  // 에디터 인스턴스 저장
    }
  },
  mounted() {
    // 에디터 초기화
    this.editor = new Editor({
      el: this.$refs.editor,
      height: '500px',
      initialEditType: 'markdown',  // 'markdown' 또는 'wysiwyg'
      previewStyle: 'vertical',     // 'tab' 또는 'vertical'
      placeholder: '내용을 입력하세요...'
    });
  },
  beforeUnmount() {
    // 컴포넌트 제거 시 에디터도 제거
    if (this.editor) {
      this.editor.destroy();
    }
  }
}
</script>
```

#### 에디터에서 값 가져오기
```javascript
// 마크다운 형식으로 가져오기
const markdown = this.editor.getMarkdown();

// HTML 형식으로 가져오기
const html = this.editor.getHTML();
```

#### 에디터에 값 설정하기 (수정 모드)
```javascript
// 마크다운 설정
this.editor.setMarkdown('# 제목\n\n내용입니다.');

// HTML 설정
this.editor.setHTML('<h1>제목</h1><p>내용입니다.</p>');
```

### 2. 글 조회 (BoardDetail.vue) - Viewer 사용

#### 컴포넌트 구조
```vue
<template>
  <div ref="viewer"></div>
</template>

<script>
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

export default {
  data() {
    return {
      viewer: null,
      content: ''  // 서버에서 받아온 마크다운 내용
    }
  },
  methods: {
    async loadPost() {
      const response = await axios.get(`/api/posts/${postId}`);
      this.content = response.data.board_content;
      
      // 데이터를 받아온 후 Viewer 초기화
      this.$nextTick(() => {
        this.initViewer();
      });
    },
    
    initViewer() {
      if (this.viewer) {
        this.viewer.destroy();
      }
      
      // Viewer 초기화
      this.viewer = new Viewer({
        el: this.$refs.viewer,
        initialValue: this.content || '내용이 없습니다.'
      });
    }
  },
  mounted() {
    this.loadPost();
  },
  beforeUnmount() {
    if (this.viewer) {
      this.viewer.destroy();
    }
  }
}
</script>
```

## 🎨 에디터 옵션

### Editor 옵션
```javascript
new Editor({
  el: element,                    // 에디터를 렌더링할 DOM 요소
  height: '500px',                // 에디터 높이
  initialEditType: 'markdown',    // 초기 편집 모드 ('markdown' | 'wysiwyg')
  previewStyle: 'vertical',       // 미리보기 스타일 ('tab' | 'vertical')
  placeholder: '내용 입력...',     // placeholder 텍스트
  initialValue: '# Hello',        // 초기 값
  
  // 이벤트 훅
  events: {
    load: () => console.log('loaded'),
    change: () => console.log('changed'),
    focus: () => console.log('focused'),
    blur: () => console.log('blurred')
  },
  
  // 이미지 업로드
  hooks: {
    addImageBlobHook: async (blob, callback) => {
      const formData = new FormData();
      formData.append('image', blob);
      
      const response = await axios.post('/api/upload', formData);
      const imageUrl = response.data.url;
      
      callback(imageUrl, '이미지 설명');
    }
  },
  
  // 툴바 커스터마이징
  toolbarItems: [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'image', 'link'],
    ['code', 'codeblock']
  ]
});
```

### Viewer 옵션
```javascript
new Viewer({
  el: element,                    // Viewer를 렌더링할 DOM 요소
  initialValue: '# Hello',        // 마크다운 내용
  
  // 이벤트
  events: {
    load: () => console.log('viewer loaded')
  }
});
```

## 📊 주요 메서드

### Editor 메서드
```javascript
// 내용 가져오기
editor.getMarkdown()              // 마크다운 형식
editor.getHTML()                  // HTML 형식

// 내용 설정하기
editor.setMarkdown(markdown)      // 마크다운 설정
editor.setHTML(html)              // HTML 설정

// 내용 추가하기
editor.insertText('텍스트')       // 커서 위치에 텍스트 추가

// 편집 모드 변경
editor.changeMode('wysiwyg')      // 'markdown' | 'wysiwyg'

// 높이 변경
editor.setHeight('600px')

// 포커스
editor.focus()

// 내용 초기화
editor.reset()

// 활성화/비활성화
editor.disable()
editor.enable()

// 에디터 제거
editor.destroy()
```

### Viewer 메서드
```javascript
// 내용 설정
viewer.setMarkdown(markdown)

// Viewer 제거
viewer.destroy()
```

## 🎯 실전 예제

### 예제 1: 게시글 작성 및 저장
```javascript
async submitPost() {
  const markdown = this.editor.getMarkdown();
  
  if (!markdown.trim()) {
    alert('내용을 입력해주세요.');
    return;
  }
  
  try {
    const response = await axios.post('/api/posts', {
      title: this.title,
      content: markdown
    });
    
    alert('게시글이 등록되었습니다!');
    this.$router.push('/');
  } catch (error) {
    alert('게시글 등록에 실패했습니다.');
  }
}
```

### 예제 2: 게시글 수정
```javascript
async loadPostForEdit() {
  const response = await axios.get(`/api/posts/${this.postId}`);
  const post = response.data;
  
  // 폼에 데이터 설정
  this.title = post.title;
  
  // 에디터에 마크다운 설정
  this.editor.setMarkdown(post.content);
}

async updatePost() {
  const markdown = this.editor.getMarkdown();
  
  await axios.put(`/api/posts/${this.postId}`, {
    title: this.title,
    content: markdown
  });
  
  alert('수정되었습니다!');
}
```

### 예제 3: 게시글 조회
```javascript
async loadPost() {
  const response = await axios.get(`/api/posts/${this.postId}`);
  const post = response.data;
  
  // Viewer에 마크다운 렌더링
  this.$nextTick(() => {
    this.viewer = new Viewer({
      el: this.$refs.viewer,
      initialValue: post.content
    });
  });
}
```

## 🎨 스타일 커스터마이징

### Viewer 스타일 수정 (SCSS)
```scss
// :deep()를 사용하여 Viewer 내부 스타일 수정
:deep(.toastui-editor-contents) {
  font-size: 1.6rem;
  line-height: 1.8;
  
  h1, h2, h3, h4, h5, h6 {
    margin: 2rem 0 1rem;
    font-weight: 600;
  }
  
  p {
    margin: 1.5rem 0;
  }
  
  code {
    background-color: #f8f9fa;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
  }
  
  pre {
    background-color: #f8f9fa;
    padding: 1.5rem;
    border-radius: 5px;
    overflow-x: auto;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  blockquote {
    border-left: 4px solid #5B86E5;
    padding-left: 1.5rem;
    color: #495057;
  }
}
```

## 🔧 플러그인 확장

### 코드 신택스 하이라이팅
```bash
npm install @toast-ui/editor-plugin-code-syntax-highlight
npm install prismjs
```

```javascript
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import 'prismjs/themes/prism.css';

new Editor({
  // ...
  plugins: [codeSyntaxHighlight]
});
```

### 컬러 피커
```bash
npm install @toast-ui/editor-plugin-color-syntax
```

```javascript
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

new Editor({
  // ...
  plugins: [colorSyntax]
});
```

## ⚠️ 주의사항

1. **에디터 인스턴스 저장**: `this.editor`에 저장해야 나중에 값을 가져올 수 있습니다.
2. **메모리 누수 방지**: `beforeUnmount`에서 `destroy()` 호출 필수
3. **Viewer 초기화 타이밍**: 데이터를 받아온 후 `$nextTick()` 사용
4. **마크다운 저장**: HTML이 아닌 마크다운 형식으로 저장하는 것을 권장

## 📚 참고 자료

- [Toast UI Editor 공식 문서](https://github.com/nhn/tui.editor)
- [Toast UI Editor API](https://nhn.github.io/tui.editor/latest/)
- [Toast UI Editor 예제](https://ui.toast.com/tui-editor)