<template>
  <h2 class="dashboard__title">
    <i v-if="iconName" :class="['pi', `pi-${iconName}`]"></i>
    {{ title }}
  </h2>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      iconName : {
        type: String,
        required: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use 'sass:map';
  @use '@/assets/scss/common/color' as *;
  
  .dashboard__title {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: 2rem;
    font: {
      size: 1.5rem;
      weight: 700;
    }
    color: map.get($colors, "foreground");
    margin-bottom: 2rem;

    i {
      font-size: 2rem;
    }
  }

  @media all and (min-width: 768px) {
    .dashboard__title {
      margin-bottom: 4rem;
      font-size: 2.5rem;
    }
  }

  @media all and (min-width: 1024px) {
    .dashboard__title {
      gap: 2rem;
      margin-bottom: 5rem;
      font-size: 4rem;

      i {
        font-size: 3rem;
      }
    }
  }
</style>