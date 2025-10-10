<template>
  <section class="section">
    <article class="aside__toggle">
      <button type="button" @click="toggleHandler">
        <i class="pi pi-bars"></i>
      </button>
    </article>
  </section>
</template>

<script>
  export default {
    emits : ['open'],
    methods : {
      toggleHandler() {
        this.$emit('open');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .aside__toggle {
    padding: 2rem 0;
    background-color: #5B86E5;

    button {
      color: #fff;
    }
  }
</style>