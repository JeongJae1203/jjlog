<template>
  <section class="Profile">
    <Title :title="'프로필'" :iconName="'user'" />
    <article class="Profile__content">
      <div class="user__info">
        <strong>{{ userInfo.name }}</strong>
        <span>{{ '@' +userInfo.nickname }}</span>
        <p>{{ userInfo.email }}</p>
        <hr>
        <div class="info__chart__list">
          <div class="info__chart">
            <div class="item">
              <strong>{{ countList }}</strong>
              <p>게시글</p>
            </div>
          </div>
        </div>
      </div>
      <div class="board__list">
        <h3 class="board__list__title">"{{ userInfo.name }}" 님이 작성한 게시글</h3>
        <div class="board__list__item" v-for="board in userBoardList" :key="board.boardId">
          <h3>{{ board.board_title }}</h3>
          <p>작성일 : {{ new Date(board.created_at).toLocaleDateString() }}</p>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
  import Title from '@/components/dashboard/common/Title.vue';
  import axios from 'axios';
  import { useUserStore } from '@/stores/userStore';

  export default {
    setup() {
      const userStore = useUserStore();
      return {
        userStore
      }
    },
    data() {
      return {
        userBoardList : [],
        userInfo : {}
      }
    },
    computed : {
      formattedDate(date) {
        return date.toLocaleDateString();
      },
      countList() {
        return this.userBoardList.length;
      }
    },
    components: {
      Title
    },
    mounted() {
      this.getUserBoardList();
      this.getUserInfo();
    },
    methods: {
      async getUserBoardList() {
        try {
          const response = await axios.get(`http://localhost:8080/board/userBoardList/${this.userStore.user.email}`);
          this.userBoardList = await response.data.data;
        } catch (error) {
          console.error('error : ', error);
          alert('게시글 목록을 불러오는데 실패했습니다.');
        }
      },
      async getUserInfo() {
        try {
          const response = await axios.get(`http://localhost:8080/user/${this.userStore.user.email}`);
          console.log(response.data.data);
          this.userInfo = await response.data.data;
        } catch (error) {
          console.error('error : ', error);
          alert('사용자 정보를 불러오는데 실패했습니다.');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/dashboard/profile/profile' as *;
</style>