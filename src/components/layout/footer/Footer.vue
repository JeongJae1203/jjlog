<template>
  <footer id="footer">
    <div class="inner">
      <div class="footer__info">
        <div class="footer__info-item">
          <router-link to="/">
            <img src="@/assets/images/jjlog_logo_white.png" alt="logo">
          </router-link>
          <p class="footer__info-item-desc">JJlog는 개인 커뮤니티 서비스입니다.</p>
        </div>
      </div>
      <div class="footer__copyright">
        <small>Copyright 2025 LEEJEONGJAE. All Rights Reserved.</small>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/footer/footer' as *;
</style>